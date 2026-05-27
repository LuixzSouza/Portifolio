"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-br">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.8125rem",
              color: "#8a8a8a",
              marginBottom: "1rem",
            }}
          >
            Erro 500
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 600, margin: "0 0 1rem" }}>
            Algo deu errado.
          </h1>
          <p style={{ color: "#a3a3a3", lineHeight: 1.6, margin: "0 0 2rem" }}>
            Tivemos um problema inesperado. Tente recarregar a página.
          </p>
          <button
            onClick={reset}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "9999px",
              padding: "0.75rem 1.75rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              backgroundColor: "#f5f5f5",
              color: "#0a0a0a",
            }}
          >
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  );
}
