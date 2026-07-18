---
description: Estándares de frontend para el proyecto Matices (Astro + Tailwind). Aplica a tareas de UI/UX.
alwaysApply: false
---

# Frontend Standards — Matices Consultoría Integral (Astro & Tailwind CSS)

> Aplica a toda tarea de UI/UX, componentes y páginas. La fuente de verdad de
> tokens vive en `src/styles/global.css` (directiva `@theme` de Tailwind v4) y
> `docs/DESIGN.md`.

## 1. Stack frontend

- **Framework**: Astro 6 (SSG, componentes `.astro`, sin hidratación SPA).
- **Estilos**: Tailwind CSS v4 vía `@tailwindcss/vite` (no PostCSS). Tokens en `@theme`.
- **Tipos**: TypeScript en modo `strictest` (`astro/tsconfigs/strictest`).
- **Tests**: Vitest (unitarios de componentes/helpers).
- **Imágenes**: `<Image />` de `astro:assets` (AVIF/WebP), nunca `<img />`.

## 2. Enfoque Mobile-First obligatorio (RNF2)

- Toda grilla, alineación, espaciado o componente interactivo se estructura con
  resoluciones móviles como base (p.ej. `class="w-full flex flex-col p-4"`).
- Los modificadores `md:`, `lg:`, `xl:` solo escalan hacia escritorio.
- Composiciones asimétricas complejas deben colapsar verticalmente en smartphones,
  priorizando texto y CTAs arriba.

## 3. Sistema de diseño y tokens de identidad

- **Paleta corporativa documentada** (fuente de verdad: `docs/DESIGN.md` y
  `src/styles/global.css`, directiva `@theme` de Tailwind v4). Azul primario:
  - `--color-matices-primary:#243B55` (Azul corporativo profundo) — primario, texto de marca, CTAs, header/footer.
  - `--color-matices-blue:#5A7FA3` (Azul celeste) — secundario, detalles, iconos.
  - `--color-matices-green:#98C245` (Verde lima) — acento de éxito, hover, highlights.
  - `--color-matices-orange:#F09E46` (Naranja cálido) — alertas y destacados.
  - `--color-matices-bg:#F4F7F9` (Fondo gris-azulado muy claro).
  - **Aliases de compatibilidad** (no cambiar, mapean a los tokens anteriores):
    `--color-crema-calido`, `--color-verde-bosque`, `--color-verde-lima`,
    `--color-azul-celeste`. Nota: `verde-bosque` es un alias heredado cuyo valor es
    azul por decisión de marca.
- **Estilos inline diferidos**: `src/pages/contacto.astro` contiene un bloque `<style>`
  con una paleta navy/oliva hardcodeada y tipografía `Manrope`, que diverge de estos
  tokens. Está documentado como ítem diferido y se reconciliará en un cambio posterior
  de purga de estilos inline (fuera de alcance aquí).
- **Tipografía**:
  - Cabeceras: **Playfair Display** (`font-heading`).
  - Cuerpo, labels, formularios: **Plus Jakarta Sans** (`font-sans`).
- **Formas y elevaciones**:
  - Radios base de inputs/botones: `0.5rem` (`8px`).
  - Contenedores/máscaras: curvas asimétricas de `1.5rem` a `3rem`.

## 4. Optimización y islas estáticas (RNF1 / RNF3)

- **Rendimiento extremo de carga (RNF1)**: El tag HTML `<img />` tradicional está
  estrictamente prohibido. Toda imagen se procesa con `<Image />` (`astro:assets`)
  con `width`/`height`/`format`/`loading`/`sizes` explícitos.
- **Accesibilidad semántica (RNF3)**: El DOM usa markup HTML5 semántico
  (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Sin frameworks SPA pesados (React/Vue/Svelte) para proteger el bundle.

## 5. Convenciones de componentes

- Componentes en `src/components/{global,ui}/` como `.astro` PascalCase.
- Props tipadas vía `interface Props` en el frontmatter.
- Interactividad (drawer, scroll-to-top, lightbox, validación de formulario) con
  `<script>` scoped vanilla TS, tipado, sin `any`.
- Imágenes dinámicas (logos, galería) vía `import.meta.glob(...)` eager.
