"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
  useAnimationFrame,
} from "framer-motion";

// ============================================================================
// 1. TIPAGENS, EXPRESSÕES E ESTADOS
// ============================================================================

export type ContactField = "nome" | "email" | "mensagem" | null;
export type ContactStatus = "idle" | "loading" | "success" | "error";

interface ContactMascotProps {
  focused: ContactField;
  nameValue: string;
  emailValue: string;
  status: ContactStatus;
  caption: string;
  hovered: string | null;
}

export type Expression =
  | "idle"
  | "nome"
  | "email"
  | "mensagem"
  | "success"
  | "error"
  | "curious"
  | "surprised"
  | "sleep"
  | "typing"
  | "confused"
  | "hyper";

const MOUTH: Record<Expression, string> = {
  idle: "M46 80 Q60 87 74 80",
  nome: "M46 80 Q60 91 74 80",
  email: "M48 80 Q60 85 72 80",
  mensagem: "M50 82 Q60 86 70 82",
  success: "M44 78 Q60 97 76 78",
  error: "M46 86 Q60 79 74 86",
  curious: "M48 80 Q60 89 72 80",
  surprised: "M50 85 Q60 96 70 85",
  sleep: "M55 83 Q60 85 65 83",
  typing: "M48 80 Q60 86 72 80",
  confused: "M48 84 Q60 80 72 86",
  hyper: "M42 78 Q60 100 78 78",
};

const BROW_L: Record<Expression, string> = {
  idle: "M34 45 Q44 41 52 44",
  nome: "M34 45 Q44 41 52 44",
  email: "M34 40 Q44 35 52 39",
  mensagem: "M34 44 Q44 41 52 44",
  success: "M34 41 Q44 37 52 41",
  error: "M34 40 Q44 45 52 47",
  curious: "M34 43 Q44 39 52 42",
  surprised: "M34 35 Q44 30 52 38",
  sleep: "M36 47 Q44 46 50 47",
  typing: "M34 43 Q44 40 52 44",
  confused: "M34 45 Q44 40 52 42",
  hyper: "M32 38 Q44 32 54 40",
};

const BROW_R: Record<Expression, string> = {
  idle: "M68 44 Q76 41 86 45",
  nome: "M68 44 Q76 41 86 45",
  email: "M68 39 Q76 35 86 40",
  mensagem: "M68 44 Q76 41 86 45",
  success: "M68 41 Q76 37 86 41",
  error: "M68 47 Q76 45 86 40",
  curious: "M68 40 Q76 34 86 39",
  surprised: "M68 38 Q76 30 86 35",
  sleep: "M70 47 Q76 46 84 47",
  typing: "M68 44 Q76 40 86 43",
  confused: "M68 38 Q76 35 86 42",
  hyper: "M66 40 Q76 32 88 38",
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/**
 * Ruído suave estilo fBm (soma de senos incomensuráveis) — contínuo porém sem
 * padrão perceptível. Cada chamada recebe uma seed aleatória, então duas
 * instâncias nunca oscilam igual.
 */
function makeNoise(seed: number = 0) {
  return (t: number) =>
    (Math.sin(t + seed) * 0.5 +
      Math.sin(t * 2.13 + seed * 1.7) * 0.25 +
      Math.sin(t * 4.31 + seed * 2.3) * 0.125 +
      Math.sin(t * 8.57 + seed * 0.9) * 0.0625) /
    0.9375;
}

/**
 * Emotion blending: interpola dois paths SVG que compartilham o mesmo esqueleto
 * de comandos (todos os MOUTH/BROW são "M x y Q x y x y" = mesma contagem de
 * números). Permite misturar expressões (ex.: 70% typing + 30% curious) em vez
 * de trocar estados de forma seca.
 */
function lerpPath(a: string, b: string, w: number): string {
  if (w <= 0.001) return a;
  const nb = b.match(/-?\d+\.?\d*/g);
  if (!nb) return a;
  let i = 0;
  return a.replace(/-?\d+\.?\d*/g, (token) => {
    const va = parseFloat(token);
    const vb = parseFloat(nb[i] ?? token);
    i++;
    return (va + (vb - va) * w).toFixed(2);
  });
}

// Triplo de emoção: principal + secundária + peso da mistura (0..~0.45).
type EmotionBlend = { primary: Expression; secondary: Expression; blend: number };

const sameBlend = (a: EmotionBlend, b: EmotionBlend) =>
  a.primary === b.primary && a.secondary === b.secondary && Math.abs(a.blend - b.blend) < 0.02;

// ============================================================================
// 2. CÉREBRO
// ============================================================================

function useMascotBrain(props: ContactMascotProps, svgRef: React.RefObject<SVGSVGElement | null>) {
  const { focused, nameValue, emailValue, status, hovered, caption } = props;

  const [poked, setPoked] = useState(false);
  const [energy, setEnergy] = useState(50);
  const [isBlinking, setIsBlinking] = useState(false);
  const [particles, setParticles] = useState<string>("none");
  const [emotion, setEmotion] = useState<EmotionBlend>({ primary: "idle", secondary: "idle", blend: 0 });
  const [rage, setRage] = useState(false); // digitação frenética
  const [noiseSeed, setNoiseSeed] = useState(0); // seed para ruído - só no cliente
  const [breathPhase, setBreathPhase] = useState(0); // fase da respiração - só no cliente

  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const speakingTimer = useRef<NodeJS.Timeout | null>(null);
  const memoryTimeout = useRef<NodeJS.Timeout | null>(null);
  const rageTimer = useRef<NodeJS.Timeout | null>(null);
  const memoryLock = useRef<boolean>(false);
  const isTypingRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const deepBreath = useRef(false); // "respirar fundo" subconsciente
  const keyTimes = useRef<number[]>([]); // janela de timestamps p/ detectar rage

  // Inicializar seeds aleatórias apenas no cliente (evita hydration mismatch)
  useEffect(() => {
    setNoiseSeed(Math.random() * 1000);
    setBreathPhase(Math.random() * Math.PI * 2);
  }, []);

  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();

  // Adaptive performance: corta filtros caros em mobile/low-end.
  const lowPerf = useRef(
    typeof navigator !== "undefined" &&
      (((navigator.hardwareConcurrency ?? 8) <= 4) ||
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent))
  ).current;

  // Sementes/offsets por instância → cada mascote respira e oscila diferente.
  const noise = useMemo(() => ({
    bx: makeNoise(noiseSeed),
    by: makeNoise(noiseSeed * 1.3),
    breath: makeNoise(noiseSeed * 1.7)
  }), [noiseSeed]);

  // VETORES BASE
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  const organicNoiseX = useMotionValue(0);
  const organicNoiseY = useMotionValue(0);
  const breathScaleX = useMotionValue(1);
  const breathScaleY = useMotionValue(1);
  const talkScale = useMotionValue(1); // Modulador de fonema falso

  // FÍSICA COM OVERSHOOT INTELIGENTE — eye focus priority via stiffness
  // decrescente: olhos → rosto → cabeça → corpo.
  const eyeX = useSpring(useTransform(() => targetX.get() + organicNoiseX.get() * 1.5), { stiffness: 600, damping: 18, mass: 0.1 });
  const eyeY = useSpring(useTransform(() => targetY.get() + organicNoiseY.get() * 1.5), { stiffness: 600, damping: 18, mass: 0.1 });

  const faceX = useSpring(useTransform(() => targetX.get() + organicNoiseX.get()), { stiffness: 250, damping: 14, mass: 0.6 });
  const faceY = useSpring(useTransform(() => targetY.get() + organicNoiseY.get()), { stiffness: 250, damping: 14, mass: 0.6 });

  const headContextTilt = useMotionValue(0);
  const headRotate = useSpring(useTransform(() => faceX.get() * 10 + headContextTilt.get()), { stiffness: 100, damping: 12, mass: 1.2 });
  const bodyLean = useSpring(useTransform(faceX, [-1, 1], [-4, 4]), { stiffness: 50, damping: 10, mass: 1.5 });
  const earX = useSpring(useTransform(faceX, (v) => v * -0.9), { stiffness: 35, damping: 6, mass: 0.8 });

  // DEFORMAÇÃO SECUNDÁRIA
  const faceVelX = useVelocity(faceX);
  const faceVelY = useVelocity(faceY);

  const squashX = useTransform(faceVelX, [-300, 0, 300], [1.06, 1, 1.06]);
  const squashY = useTransform(faceVelY, [-300, 0, 300], [1.06, 1, 1.06]);

  const mouthSkew = useTransform(faceVelX, [-400, 400], [-10, 10]);
  const mouthStretch = useTransform(faceVelY, [-400, 0, 400], [1.3, 1, 0.7]);
  const cheekDeformX = useTransform(faceVelX, [-400, 0, 400], [-3, 0, 3]);

  // SHADER FAKE + MOTION BLUR
  const totalSpeed = useTransform(() => Math.abs(faceVelX.get()) + Math.abs(faceVelY.get()));
  const glowOpacity = useTransform(totalSpeed, [0, 400], [0.35, 1]);
  const glowScale = useTransform(totalSpeed, [0, 400], [1, 1.5]);
  // Specular móvel (lightX/lightY) — segue o rosto pela casca.
  const lightX = useTransform(faceX, [-1, 1], [38, 82]);
  const lightY = useTransform(faceY, [-1, 1], [30, 64]);
  // Mesh distortion / motion blur fake: displacement reativo à velocidade.
  const dispScale = useSpring(useTransform(totalSpeed, [0, 120, 600], [0, 1.2, 6]), { stiffness: 300, damping: 30, mass: 0.4 });

  // TRANSFORMS COMPOSTOS (movidos pra fora do render → não recriam por frame)
  const combinedScaleX = useTransform(() => squashX.get() * breathScaleX.get());
  const combinedScaleY = useTransform(() => squashY.get() * breathScaleY.get());
  // Shadow physics: a sombra alarga quando o corpo achata (squashY < 1) e segue a respiração.
  const shadowScaleX = useTransform(() => breathScaleX.get() * 1.15 * (2 - squashY.get()));
  const bubbleX = useTransform(faceX, (v) => v * 1.5);

  // Posições das pupilas/specular dos olhos (evita useTransform inline no JSX).
  const pupilLcx = useTransform(eyeX, (v) => 44 + v * 1.6);
  const pupilRcx = useTransform(eyeX, (v) => 76 + v * 1.6);
  const pupilCy = useTransform(eyeY, (v) => 56 + v * 1.6);
  const wetLcx = useTransform(eyeX, (v) => 42.5 + v * 1.6);
  const wetRcx = useTransform(eyeX, (v) => 74.5 + v * 1.6);
  const wetCy = useTransform(eyeY, (v) => 54.5 + v * 1.6);
  const wetR = useTransform(glowScale, (v) => 2.5 * v);

  // --- CONTROLE DE FALA (Phonemes) ---
  useEffect(() => {
    isSpeakingRef.current = true;
    if (speakingTimer.current) clearTimeout(speakingTimer.current);
    speakingTimer.current = setTimeout(() => {
      isSpeakingRef.current = false;
    }, Math.min(caption.length * 40, 2000));
  }, [caption]);

  // --- ENGINE PROCEDURAL CONTÍNUA ---
  useAnimationFrame((time) => {
    if (prefersReducedMotion) return;
    const t = time / 1000;
    const isSleeping = energy < 20 && !focused;
    const speed = isSleeping ? 0.6 : rage ? 3.2 : energy > 80 ? 2.5 : 1.2;

    // Ruído orgânico (fBm) → micro-movimento contínuo, sem loop perceptível.
    organicNoiseX.set(noise.bx(t * 0.55 * speed) * 0.3);
    organicNoiseY.set(noise.by(t * 0.45 * speed) * 0.2);

    // Respiração: ritmo base (seno + offset aleatório) misturado a variação orgânica.
    // "Respirar fundo" amplia a amplitude por alguns segundos.
    const amp = deepBreath.current ? 0.042 : 0.018;
    const breath = Math.sin(t * 1.5 * speed + breathPhase) * 0.82 + noise.breath(t * 0.7 * speed) * 0.18;
    breathScaleY.set(1 + breath * amp);
    breathScaleX.set(1 - breath * (amp * 0.66));

    // Fonema Fake / Elastic Cheeks
    if (isTypingRef.current || isSpeakingRef.current) {
      talkScale.set(1 + Math.sin(time * 0.04) * (rage ? 0.34 : 0.25));
    } else {
      talkScale.set(1);
    }
  });

  // --- SACCADES + SUBCONSCIOUS BEHAVIORS ---
  useEffect(() => {
    let saccadeTimeout: NodeJS.Timeout;
    const tickSaccade = () => {
      if (energy > 30 && typeof window !== 'undefined') {
        // Micro tremida rápida (saccade) antes de assentar — dois micro-steps.
        const jx = (Math.random() - 0.5) * 0.18;
        const jy = (Math.random() - 0.5) * 0.1;
        targetX.set(targetX.get() + jx * 1.6);
        targetY.set(targetY.get() + jy * 1.6);
        setTimeout(() => {
          targetX.set(targetX.get() - jx);
          targetY.set(targetY.get() - jy);
        }, 45);
      }
      saccadeTimeout = setTimeout(tickSaccade, typeof window !== 'undefined' ? Math.random() * 800 + 200 : 1000);
    };
    tickSaccade();
    return () => clearTimeout(saccadeTimeout);
  }, [energy, targetX, targetY]);

  // Comportamentos subconscientes: olhar pro canto, respirar fundo, auto-inclinar.
  useEffect(() => {
    if (prefersReducedMotion) return;
    let to: NodeJS.Timeout;
    const tick = () => {
      const idleNow = !focused && !hovered && status === "idle" && !poked;
      if (idleNow && typeof window !== 'undefined') {
        const r = Math.random();
        if (r < 0.4) {
          // glance para um canto aleatório, depois volta
          targetX.set((Math.random() - 0.5) * 1.6);
          targetY.set((Math.random() - 0.5) * 1.1);
          setTimeout(() => {
            if (!focused && !hovered) { targetX.set(0); targetY.set(0); }
          }, 850);
        } else if (r < 0.62) {
          deepBreath.current = true;
          setTimeout(() => { deepBreath.current = false; }, 2400);
        } else if (r < 0.8) {
          headContextTilt.set((Math.random() - 0.5) * 16);
          setTimeout(() => { if (!focused) headContextTilt.set(0); }, 1200);
        }
      }
      to = setTimeout(tick, typeof window !== 'undefined' ? Math.random() * 4000 + 3000 : 7000);
    };
    to = setTimeout(tick, 4000);
    return () => clearTimeout(to);
  }, [focused, hovered, status, poked, prefersReducedMotion, targetX, targetY, headContextTilt]);

  // --- IDLE AI MEMORY: segura o último pose por uns segundos antes do idle ---
  useEffect(() => {
    if (!focused && !hovered) {
      memoryLock.current = true;
      if (memoryTimeout.current) clearTimeout(memoryTimeout.current);
      memoryTimeout.current = setTimeout(() => { memoryLock.current = false; }, 2500);
    } else {
      memoryLock.current = false;
      if (memoryTimeout.current) clearTimeout(memoryTimeout.current);
    }
  }, [focused, hovered]);

  // --- ENERGIA / MOOD PERSISTENCE ---
  useEffect(() => {
    const interval = setInterval(() => setEnergy((e) => clamp(e - 2.5, 0, 100)), 1000);
    return () => clearInterval(interval);
  }, []);

  // --- TECLADO + CONTEXT AWARENESS (rage typing) ---
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.length !== 1 && e.key !== "Backspace") return;
      setEnergy((prev) => clamp(prev + 15, 0, 100));
      isTypingRef.current = true;
      if (typingTimer.current) clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => { isTypingRef.current = false; }, 800);

      // Detecta digitação frenética pela média dos intervalos recentes.
      const now = performance.now();
      keyTimes.current = [...keyTimes.current, now].slice(-6);
      if (keyTimes.current.length >= 4) {
        let sum = 0;
        for (let i = 1; i < keyTimes.current.length; i++) sum += keyTimes.current[i] - keyTimes.current[i - 1];
        const avg = sum / (keyTimes.current.length - 1);
        if (avg < 110) setRage(true);
        else if (avg > 220) setRage(false);
      }
      if (rageTimer.current) clearTimeout(rageTimer.current);
      rageTimer.current = setTimeout(() => setRage(false), 1300);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // --- MAGNETIC CURSOR + ARBITRAGEM DE ALVOS ---
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (focused || poked || status !== "idle" || memoryLock.current) return;
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      targetX.set(clamp((e.clientX - (r.left + r.width / 2)) / 180, -1, 1));
      targetY.set(clamp((e.clientY - (r.top + r.height / 2)) / 180, -1, 1));
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [targetX, targetY, focused, poked, status, svgRef]);

  const isEmailInvalid = emailValue.length > 4 && !emailValue.includes("@");

  useEffect(() => {
    if (poked) return;
    const sName = Math.sin(nameValue.length * 0.6) * 0.4;
    const sEmail = Math.sin(emailValue.length * 0.6) * 0.4;

    if (status === "loading") {
      targetX.set(0); targetY.set(-0.9); headContextTilt.set(-10);
    } else if (isEmailInvalid && focused === "email") {
      headContextTilt.set(16);
    } else if (status === "success" || status === "error") {
      targetX.set(0); targetY.set(0); headContextTilt.set(0);
    } else if (focused === "nome") {
      targetX.set(sName); targetY.set(0.7); headContextTilt.set(4);
    } else if (focused === "email") {
      targetX.set(sEmail); targetY.set(0.8); headContextTilt.set(isEmailInvalid ? 16 : 0);
    } else if (focused === "mensagem") {
      targetX.set(0); targetY.set(1); headContextTilt.set(-4);
    } else if (hovered) {
      targetX.set(-0.9); targetY.set(0); headContextTilt.set(-8);
    } else {
      headContextTilt.set(0);
    }
  }, [focused, nameValue, emailValue, hovered, status, poked, targetX, targetY, isEmailInvalid, headContextTilt]);

  // --- CÁLCULO DE EMOÇÃO BRUTA (com blending) ---
  const isSleeping = energy < 20 && !focused;
  const rawBlend = useMemo<EmotionBlend>(() => {
    if (poked) return { primary: "surprised", secondary: "hyper", blend: 0.3 };
    if (status === "success") return { primary: "hyper", secondary: "surprised", blend: 0.28 };
    if (status === "error") return { primary: "error", secondary: "confused", blend: 0.3 };
    if (status === "loading") return { primary: "curious", secondary: "typing", blend: 0.3 };
    if (focused === "email" && isEmailInvalid)
      return { primary: "confused", secondary: energy < 35 ? "sleep" : "error", blend: 0.3 };
    if (rage) return { primary: "hyper", secondary: "typing", blend: 0.4 };
    if (isSleeping) return { primary: "sleep", secondary: "idle", blend: 0.2 };
    if (isTypingRef.current && hovered) return { primary: "typing", secondary: "curious", blend: 0.32 };
    if (isTypingRef.current) return { primary: "typing", secondary: focused ?? "idle", blend: 0.25 };
    if (focused) return { primary: focused, secondary: hovered ? "curious" : "idle", blend: hovered ? 0.3 : 0.12 };
    if (hovered) return { primary: "curious", secondary: "idle", blend: 0.3 };
    if (energy > 80) return { primary: "hyper", secondary: "idle", blend: 0.3 };
    return { primary: "idle", secondary: energy < 35 ? "sleep" : "idle", blend: energy < 35 ? 0.18 : 0 };
  }, [poked, status, focused, isEmailInvalid, energy, rage, isSleeping, hovered]);

  // --- TINY EMOTIONAL DELAYS (120ms) — reação não-instantânea ---
  useEffect(() => {
    const t = setTimeout(() => {
      setEmotion((prev) => (sameBlend(prev, rawBlend) ? prev : rawBlend));
    }, 120);
    return () => clearTimeout(t);
  }, [rawBlend]);

  // --- EVENTOS POKE E PISCADAS ---
  const triggerPoke = async () => {
    if (poked || prefersReducedMotion) return;
    setPoked(true);
    setEnergy(100);
    setParticles("poke");
    setTimeout(() => setParticles("none"), 1000);

    // Micro-anticipation: comprime 40ms antes do salto (sensação Pixar).
    await controls.start({
      scaleY: 0.8,
      scaleX: 1.15,
      y: 12,
      transition: { duration: 0.04, ease: "easeOut" },
    });

    await controls.start({
      x: [0, (Math.random() > 0.5 ? 1 : -1) * 18, 0],
      y: [-40, 8, 0],
      scaleY: [1.25, 0.85, 1],
      scaleX: [0.75, 1.15, 1],
      transition: { duration: 0.65, ease: "easeInOut" },
    });
    setPoked(false);
  };

  useEffect(() => {
    if (status === "success") {
      setParticles("success");
      setEnergy(100);
      // Micro-anticipation antes do pulo de comemoração.
      controls.start({ scaleY: 0.82, y: 8, transition: { duration: 0.05, ease: "easeOut" } }).then(() =>
        controls.start({ y: [0, -28, 0], scaleY: [1.22, 0.85, 1], transition: { duration: 0.6, ease: "circOut" } })
      );
    }
  }, [status, controls]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const autoBlink = () => {
      if (energy < 20 && !focused) return;
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);

      if (energy > 75 && Math.random() < 0.25) {
        setTimeout(() => { setIsBlinking(true); setTimeout(() => setIsBlinking(false), 100); }, 180);
      }
      timeout = setTimeout(autoBlink, energy > 60 ? Math.random() * 2000 + 1000 : Math.random() * 4000 + 3000);
    };
    timeout = setTimeout(autoBlink, 2000);
    return () => clearTimeout(timeout);
  }, [energy, focused]);

  return {
    refs: { svgRef },
    state: {
      emotion,
      energy,
      poked,
      isBlinking,
      isSleeping,
      rage,
      lowPerf,
      covered: emotion.primary === "mensagem",
      particles,
    },
    actions: { triggerPoke },
    physics: {
      controls, faceX, faceY, headRotate, bodyLean, earX, eyeX, eyeY,
      squashX, squashY, cheekDeformX, mouthSkew, mouthStretch,
      lightX, lightY, glowOpacity, glowScale, breathScaleX, breathScaleY, talkScale,
      dispScale, combinedScaleX, combinedScaleY, shadowScaleX, bubbleX,
      pupilLcx, pupilRcx, pupilCy, wetLcx, wetRcx, wetCy, wetR,
    },
  };
}

// ============================================================================
// 3. AUXILIARES
// ============================================================================

function SmartBubble({ text, emotion }: { text: string; emotion: string }) {
  const [displayed, setDisplayed] = useState("");
  const pulse = useAnimationControls();

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const speed = emotion === "sleep" || emotion === "confused" ? 70 : 25;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, emotion]);

  // Audio-reactive fake: micro bounce a cada caractere que aparece.
  useEffect(() => {
    if (!displayed) return;
    pulse.start({ scale: [1, 1.035, 1], transition: { duration: 0.11, ease: "easeOut" } });
  }, [displayed, pulse]);

  return <motion.span animate={pulse} className="inline-block">{displayed || " "}</motion.span>;
}

function ParticleSystem({ type, count }: { type: string; count: number }) {
  if (type === "none") return null;
  const colors = type === "success" ? ["#10b981", "#06b6d4", "#f59e0b"] : ["#cbd5e1"];
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i + type}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: Math.random() * 0.9 + 0.4,
            x: (Math.random() - 0.5) * 280,
            y: (Math.random() - 0.5) * 280 - 60,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: type === "success" ? 1.6 : 0.6, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full shadow-md"
          style={{ backgroundColor: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// 4. RENDERIZAÇÃO
// ============================================================================

export function ContactMascot(props: ContactMascotProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const brain = useMascotBrain(props, svgRef);

  const { emotion, energy, poked, isBlinking, isSleeping, covered, particles, lowPerf } = brain.state;
  const {
    controls, faceX, headRotate, bodyLean, earX,
    cheekDeformX, mouthSkew, mouthStretch,
    glowOpacity, talkScale,
    lightX, lightY, dispScale, combinedScaleX, combinedScaleY, shadowScaleX, bubbleX,
    pupilLcx, pupilRcx, pupilCy, wetLcx, wetRcx, wetCy, wetR,
  } = brain.physics;

  const { primary, secondary, blend } = emotion;

  // Emotion blending: paths interpolados entre principal e secundária.
  const mouthD = useMemo(() => lerpPath(MOUTH[primary], MOUTH[secondary], blend), [primary, secondary, blend]);
  const browLD = useMemo(() => lerpPath(BROW_L[primary], BROW_L[secondary], blend), [primary, secondary, blend]);
  const browRD = useMemo(() => lerpPath(BROW_R[primary], BROW_R[secondary], blend), [primary, secondary, blend]);

  const eyeScaleY = poked ? 1.35 : (isSleeping || isBlinking) ? 0.04 : primary === "success" ? 0.5 : 1;
  const blushOn = ["idle", "curious", "success", "typing", "confused", "hyper"].includes(primary);
  const morphSpeed = energy > 70 ? 0.25 : energy < 30 ? 0.6 : 0.4;
  const morph = { duration: morphSpeed, ease: [0.34, 1.56, 0.64, 1] as const };
  // Pseudo-músculos: a sobrancelha direita reage com leve atraso/timing diferente.
  const morphR = { duration: morphSpeed * 1.15, ease: [0.34, 1.56, 0.64, 1] as const, delay: 0.04 };

  const useMesh = !lowPerf;

  return (
    <div className="relative flex flex-col items-center gap-6">
      <ParticleSystem type={particles} count={lowPerf ? 6 : 12} />

      <div className="relative z-10">
        <motion.div style={{ rotate: bodyLean, scaleX: combinedScaleX, scaleY: combinedScaleY }}>
          <motion.div animate={controls} style={{ rotate: headRotate }}>
            <svg
              ref={svgRef}
              width="130"
              height="130"
              viewBox="0 0 120 120"
              onClick={brain.actions.triggerPoke}
              className="cursor-pointer select-none overflow-visible drop-shadow-[0_25px_40px_rgb(var(--foreground)/0.18)]"
            >
              <defs>
                <radialGradient id="rimGlow3D" cx="50%" cy="50%" r="75%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                <linearGradient id="lensSpecGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                <radialGradient id="moveSpec" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                {useMesh && (
                  <filter id="meshWarp" x="-30%" y="-30%" width="160%" height="160%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={2} seed={7} result="noise" />
                    <motion.feDisplacementMap in="SourceGraphic" in2="noise" scale={dispScale} xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                )}
              </defs>

              <motion.g style={{ x: earX }}>
                <path d="M10 40 L4 36 M110 40 L116 36" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
                <circle cx="4" cy="36" r="4.5" className="fill-foreground" />
                <circle cx="116" cy="36" r="4.5" className="fill-foreground" />
              </motion.g>

              <rect x="12" y="16" width="96" height="88" rx="38" className="fill-foreground" />
              <motion.rect x="12" y="16" width="96" height="88" rx="38" fill="url(#rimGlow3D)" style={{ opacity: glowOpacity }} />
              {/* Reactive light: specular móvel seguindo o rosto pela casca. */}
              <motion.ellipse rx="26" ry="20" fill="url(#moveSpec)" style={{ cx: lightX, cy: lightY, opacity: glowOpacity }} />

              <motion.g style={useMesh ? { x: faceX, y: brain.physics.faceY, filter: "url(#meshWarp)" } : { x: faceX, y: brain.physics.faceY }}>

                {/* Elastic Cheeks animadas no phoneme simulation */}
                <motion.g style={{ x: cheekDeformX, scaleY: talkScale }} animate={{ opacity: blushOn ? 1 : 0 }} transition={morph}>
                  <ellipse cx="32" cy="74" rx="7.5" ry="4.5" className="fill-background/30" />
                  <ellipse cx="88" cy="74" rx="7.5" ry="4.5" className="fill-background/30" />
                </motion.g>

                <motion.g animate={{ scaleY: eyeScaleY }} transition={{ duration: isBlinking ? 0.08 : morphSpeed }} style={{ transformOrigin: "60px 56px" }}>
                  <ellipse cx="44" cy="56" rx="12" ry="14" className="fill-background" />
                  <ellipse cx="76" cy="56" rx="12" ry="14" className="fill-background" />

                  <motion.g animate={{ opacity: isSleeping ? 0 : 1 }}>
                    <motion.circle r="6" className="fill-foreground" style={{ cx: pupilLcx, cy: pupilCy }} />
                    <motion.circle r="6" className="fill-foreground" style={{ cx: pupilRcx, cy: pupilCy }} />
                    {/* Eye wetness: highlight especular minúsculo. */}
                    <motion.circle style={{ r: wetR, cx: wetLcx, cy: wetCy }} fill="url(#lensSpecGlow)" />
                    <motion.circle style={{ r: wetR, cx: wetRcx, cy: wetCy }} fill="url(#lensSpecGlow)" />
                  </motion.g>
                </motion.g>

                <motion.path animate={{ d: browLD }} transition={morph} className="fill-none stroke-background" strokeWidth="4" strokeLinecap="round" />
                <motion.path animate={{ d: browRD }} transition={morphR} className="fill-none stroke-background" strokeWidth="4" strokeLinecap="round" />

                {/* Mouth Phoneme Simulation com Força G */}
                <motion.g style={{ scaleY: talkScale, transformOrigin: "60px 82px" }}>
                  <motion.path
                    style={{ skewX: mouthSkew, scaleY: mouthStretch, transformOrigin: "60px 82px" }}
                    animate={{ d: mouthD }}
                    transition={morph}
                    className="fill-none stroke-background"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </motion.g>
              </motion.g>

              <AnimatePresence>
                {covered && (
                  <motion.g
                    initial={{ y: 70, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 70, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <circle cx="44" cy="56" r="18" className="fill-foreground stroke-background" strokeWidth="3" />
                    <circle cx="76" cy="56" r="18" className="fill-foreground stroke-background" strokeWidth="3" />
                    <path d="M36 49 v14 M44 48 v16 M52 49 v14" className="stroke-background" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M68 49 v14 M76 48 v16 M84 49 v14" className="stroke-background" strokeWidth="2.5" strokeLinecap="round" />
                  </motion.g>
                )}
              </AnimatePresence>

            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ scaleX: shadowScaleX }}
          animate={{ opacity: [0.25, 0.1, 0.25] }}
          transition={{ duration: isSleeping ? 5 : 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-5 left-1/2 h-3 w-26 -translate-x-1/2 rounded-[100%] bg-foreground/30 blur-[5px]"
        />

        <AnimatePresence>
          {isSleeping && (
            <motion.div
              initial={{ opacity: 0, x: -10, y: 10, scale: 0.5 }}
              animate={{ opacity: 1, x: 28, y: -35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -right-6 -top-4 font-serif text-3xl font-bold italic text-foreground/45 pointer-events-none"
            >
              Zzz
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        style={{ x: bubbleX }}
        className="relative flex h-10 items-center justify-center z-20"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={props.caption}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-full bg-foreground px-6 py-2.5 text-center text-[15px] font-medium tracking-wide text-background shadow-2xl"
          >
            <SmartBubble text={props.caption} emotion={primary} />
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
