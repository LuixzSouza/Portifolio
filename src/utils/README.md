# 2. Utils: O que são e como usar?
Utils (Utilities) são funções auxiliares que realizam tarefas específicas e podem ser reutilizadas em várias partes do projeto. O objetivo é manter o código mais limpo e organizado, centralizando a lógica repetitiva em funções utilitárias.

## Como usar utils no seu projeto?
Passo 1: Crie uma pasta utils/ para organizar suas funções utilitárias:

```bash
src/utils/
└── formatDate.ts
```

## Exemplo de Função Utilitária: formatDate
Esta função formata uma data no estilo DD/MM/YYYY.

```typescript
// src/utils/formatDate.ts
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
```

## Como usar a Função Utilitária em um Componente:

```jsx
import { formatDate } from "@/utils/formatDate";

export default function HomePage() {
  const today = new Date();

  return (
    <div>
      <h1>Data Atual</h1>
      <p>{formatDate(today)}</p>
    </div>
  );
}
```

## Quando usar funções utilitárias?
Quando você precisa realizar tarefas comuns repetidamente (como formatar datas).
Para centralizar a lógica e evitar duplicação de código.

## Resumo
- Funções utilitárias que não têm nada a ver com a interface (UI), mas realizam tarefas comuns, como manipulação de datas, strings, ou arrays.
- Exemplo: Uma função como formatDate pode ser usada para formatar uma data em qualquer lugar do projeto.