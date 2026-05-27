"use client";

import { useTranslations } from "@/content/useTranslations";

export function SkipLink() {
  const t = useTranslations();

  return (
    <a
      href="#conteudo"
      className="skip-link"
      onClick={(e) => {
        const el = document.getElementById("conteudo");
        if (!el) return;
        e.preventDefault();
        el.setAttribute("tabindex", "-1");
        el.focus();
        el.scrollIntoView();
      }}
    >
      {t.a11y.skipToContent}
    </a>
  );
}
