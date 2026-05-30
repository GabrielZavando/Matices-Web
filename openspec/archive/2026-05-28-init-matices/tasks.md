# Development Tasks: Setup & Phase 1

- [x] **Task 1: Environment Initialization (30m)**
  - Instalar Astro en plantilla limpia (SSG).
  - Integrar Tailwind CSS v4 con variables estandarizadas en `global.css`.
  - Configurar TypeScript en modo `strictest` (`tsconfig.json`).

- [x] **Task 2: Global Layouts & SEO Foundation (1h)**
  - Construir base de `src/layouts/Layout.astro`.
  - Aplicar directivas de lang, charset, viewport y meta-tags base de Open Graph.
  - Verificar carga de fuente "Plus Jakarta Sans" y "Playfair Display".

- [x] **Task 3: Reusable Global Component `Header.astro` (1.5h)**
  - Implementar semántica HTML5 (`<header>`, `<nav>`).
  - Aplicar efecto Glassmorphism (`backdrop-blur-md bg-white/80`).
  - Diseño responsivo Mobile-First con menú tipo hamburguesa nativo (sin JS pesado).

- [x] **Task 4: Reusable Global Component `Footer.astro` (1h)**
  - Estructura de 4 columnas sobre fondo `#236c32` (verde-bosque).
  - Tipografías en contraste claro (`text-crema-calido`).
  - Incorporar validaciones semánticas y links legales.

- [x] **Task 5: Atomic Section Development `index.astro` Base (1.5h)**
  - Ensamblar `Layout.astro` con `<slot />` usando `Header` y `Footer`.
  - Crear estructura Hero Mobile-First (Curvas asimétricas, copys alineados a la izquierda).
  - Test de rendimiendo Lighthouse local (meta: <2s TTFB).
