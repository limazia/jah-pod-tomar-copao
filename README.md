# Jah pode tomar copão? 🍺

Será que já chegou a hora de abrir uma latinha? O site responde isso baseado no
dia da semana, e libera confete quando a resposta é sim.

🔗 https://jah-pod-tomar-copao.vercel.app

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Estilo | Tailwind CSS 4 |
| Linguagem | TypeScript 6 |
| Lint | ESLint 9 + `eslint-config-next` (flat config) |
| Deploy | Vercel |

## Rodando local

```bash
yarn
yarn dev
```

Abra http://localhost:3000.

| Script | O que faz |
|---|---|
| `yarn dev` | Servidor de desenvolvimento |
| `yarn build` | Build de produção |
| `yarn start` | Sobe o build de produção |
| `yarn lint` | ESLint |

## Como o dia é decidido

O dia da semana vem do **relógio do servidor**, nunca do cliente. Se viesse do
cliente, bastava adiantar o relógio do sistema pra sextar numa terça.

O fuso é `America/Sao_Paulo` (definido em `src/utils/status.ts`), e **não** UTC
puro. UTC está 3h à frente do horário de Brasília, então às 22h de quarta em São
Paulo já seria quinta em UTC, e a bebida liberaria cedo demais, justamente o que
se quer evitar.

Por isso a página é um Server Component com `dynamic = "force-dynamic"`: ela é
renderizada a cada request e não pode ser congelada em build nem cacheada por
CDN. A lógica de liberação não existe no bundle enviado ao browser.

| Dia | Liberado |
|---|---|
| Segunda a quarta | ❌ |
| Quinta | ✅ (com moderação) |
| Sexta e sábado | ✅ |
| Domingo | ✅ |

## Estrutura

```
src/
├── app/
│   ├── (home)/
│   │   ├── page.tsx           Server Component, resolve o dia no servidor
│   │   └── drink-screen.tsx   Client Component, confete e áudio
│   ├── layout.tsx             Metadata, JSON-LD, fonte
│   ├── globals.css            Entrada do Tailwind + tema
│   ├── opengraph-image.png    Imagem social (convenção de arquivo do Next)
│   ├── robots.ts              robots.txt
│   └── sitemap.ts             sitemap.xml
├── hooks/
│   └── use-window-size.ts     Dimensões da janela via useSyncExternalStore
└── utils/
    ├── site.ts                URL, nome e descrição do site
    ├── status.ts              Dias, textos e o fuso de referência
    └── cn.ts                  clsx + tailwind-merge
```

## Configuração

A config do PostCSS mora na chave `postcss` do `package.json` em vez de um
`postcss.config.*` na raiz. O Tailwind 4 no Next precisa passar pelo plugin
`@tailwindcss/postcss`. Não existe integração nativa como o `@tailwindcss/vite`.

O tema do Tailwind 4 é declarado em CSS (`@theme` em `src/app/globals.css`), não
há mais `tailwind.config.js`.

## SEO

O site é indexável e libera crawlers de IA explicitamente em `src/app/robots.ts`,
incluindo GPTBot, ClaudeBot, PerplexityBot e Google-Extended, que funcionam
como opt-out e só respeitam uma regra com o próprio nome.

A imagem de preview usa a convenção `src/app/opengraph-image.png`, então o Next
deriva `width`, `height` e `type` do arquivo real, sem risco de declarar
dimensão errada.
