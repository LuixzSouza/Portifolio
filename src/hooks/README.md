# 1. Hooks: O que são e como usar?
Hooks são funções especiais do React que permitem usar estado e outros recursos do React em componentes funcionais. Além dos hooks nativos do React (como **useState**, **useEffect**), você pode criar hooks personalizados (custom hooks) para reutilizar lógica entre componentes.

## Como usar hooks no seu projeto?
Passo 1: Crie uma pasta **hooks/** para organizar seus hooks personalizados:

```
src/hooks/
└── useWindowSize.ts
```

## Exemplo de Hook Personalizado: useWindowSize
Este hook detecta o tamanho da janela e retorna a largura e altura.

```typescript
// src/hooks/useWindowSize.ts
import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Chamar uma vez para garantir valores iniciais corretos

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
```

## Como usar o Hook em um Componente:
```jsx
import { useWindowSize } from "@/hooks/useWindowSize";

export default function HomePage() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h1>Tamanho da Janela</h1>
      <p>Largura: {width}px</p>
      <p>Altura: {height}px</p>
    </div>
  );
}
```

## Quando usar hooks personalizados?
Quando você precisa reutilizar a mesma lógica entre múltiplos componentes (como useWindowSize para várias páginas).
Para encapsular lógica complexa e mantê-la fora dos componentes principais.

## Resumo
- Use para encapsular lógica de estado e efeitos colaterais que pode ser reutilizada por vários componentes.
- Exemplo: useWindowSize pode ser usado em diferentes partes do seu projeto para capturar a largura/altura da tela.