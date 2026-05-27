/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseImageLazyLoadOptions {
  /** Margem para iniciar o carregamento antes da imagem entrar na viewport */
  rootMargin?: string;
  /** Limite de threshold para trigger do loading */
  threshold?: number;
  /** Se deve fazer preload da imagem */
  preload?: boolean;
  /** Callback quando a imagem termina de carregar */
  onLoad?: () => void;
  /** Callback quando a imagem falha em carregar */
  onError?: () => void;
}

interface UseImageLazyLoadReturn {
  /** Ref para anexar ao elemento que contém a imagem */
  ref: React.RefObject<HTMLElement | null>;
  /** Se a imagem deve ser carregada */
  shouldLoad: boolean;
  /** Se a imagem já foi carregada com sucesso */
  isLoaded: boolean;
  /** Se houve erro no carregamento */
  hasError: boolean;
  /** Função para forçar o carregamento */
  forceLoad: () => void;
  /** Função para resetar o estado */
  reset: () => void;
}

export function useImageLazyLoad(
  src: string,
  {
    rootMargin = "50px",
    threshold = 0.1,
    preload = false,
    onLoad,
    onError,
  }: UseImageLazyLoadOptions = {}
): UseImageLazyLoadReturn {
  const [shouldLoad, setShouldLoad] = useState(preload);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Intersection Observer para detectar quando a imagem entra na viewport
  useEffect(() => {
    if (preload || shouldLoad) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold, preload, shouldLoad]);

  // Carregar a imagem quando shouldLoad for true
  useEffect(() => {
    if (!shouldLoad || !src) return;

    // Se já temos uma imagem carregando, não criar uma nova
    if (imageRef.current?.src === src) return;

    const img = new Image();
    imageRef.current = img;

    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoaded(false);
      onError?.();
    };

    img.src = src;

    return () => {
      if (imageRef.current) {
        imageRef.current.onload = null;
        imageRef.current.onerror = null;
      }
    };
  }, [shouldLoad, src, onLoad, onError]);

  const forceLoad = useCallback(() => {
    setShouldLoad(true);
  }, []);

  const reset = useCallback(() => {
    setShouldLoad(preload);
    setIsLoaded(false);
    setHasError(false);
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  }, [preload]);

  return {
    ref,
    shouldLoad,
    isLoaded,
    hasError,
    forceLoad,
    reset,
  };
}

// Hook para precarregar múltiplas imagens
export function useImagePreloader(sources: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const preloadImages = useCallback(async (imageSources: string[]) => {
    if (imageSources.length === 0) return;

    setIsLoading(true);
    const promises = imageSources.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
      });
    });

    const results = await Promise.allSettled(promises);

    const loaded = new Set<string>();
    const failed = new Set<string>();

    results.forEach((result, _index) => {
      const src = imageSources[_index];
      if (result.status === "fulfilled") {
        loaded.add(src);
      } else {
        failed.add(src);
      }
    });

    setLoadedImages(loaded);
    setFailedImages(failed);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    preloadImages(sources);
  }, [sources, preloadImages]);

  return {
    loadedImages,
    failedImages,
    isLoading,
    preloadImages,
  };
}

// Hook para gerenciar carregamento progressivo de imagens (placeholder -> baixa qualidade -> alta qualidade)
export function useProgressiveImage(
  placeholder: string,
  lowQuality: string,
  highQuality: string,
  options: UseImageLazyLoadOptions = {}
) {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [quality, setQuality] = useState<"placeholder" | "low" | "high">("placeholder");

  const {
    ref,
    shouldLoad,
    isLoaded: lowLoaded,
  } = useImageLazyLoad(lowQuality, {
    ...options,
    onLoad: () => {
      setCurrentSrc(lowQuality);
      setQuality("low");
      options.onLoad?.();
    },
  });

  const {
    isLoaded: highLoaded,
  } = useImageLazyLoad(highQuality, {
    ...options,
    preload: lowLoaded,
    onLoad: () => {
      setCurrentSrc(highQuality);
      setQuality("high");
    },
  });

  return {
    ref,
    src: currentSrc,
    quality,
    shouldLoad,
    isFullyLoaded: quality === "high",
  };
}