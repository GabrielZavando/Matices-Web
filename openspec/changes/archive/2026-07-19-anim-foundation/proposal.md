# Propuesta de Cambio: Sistema Base de Animación CSS (`anim-foundation`)

Esta propuesta crea la **fundación de animación reutilizable** sobre la cual se
construirán los tickets posteriores de animación del sitio (hero, secciones,
componentes globales, ambiente y formulario de contacto). El sitio actual cuenta
con micro-interacciones de hover/estado (`group-hover:scale`, drawer, lightbox,
marquee), pero **carece por completo de animaciones de entrada y de revelado al
scroll**. Este ticket instala la infraestructura compartida para evitar
duplicación y garantizar coherencia con la identidad "Natural Vitality"
(documentada en `docs/DESIGN.md`).

## Alcance

1. **Tokens y keyframes de animación** en `src/styles/global.css` (Tailwind CSS v4
   `@theme`), de modo que las animaciones se exponen como utilidades Tailwind
   (`animate-fade-up`, `animate-float`, etc.) y respetan el paradigma de clases
   utilitarias del proyecto.
2. **Sistema de revelado progresivo** (`.reveal` / `.reveal.is-visible`) con
   guarda de `prefers-reduced-motion` y patrón `html.js` para evitar contenido
   invisible si el JavaScript falla.
3. **Helper `initReveal()`** tipado en TypeScript (`src/lib/animations.ts`) basado
   en `IntersectionObserver` nativo (cero dependencias, SSR-safe).
4. **Componente `Reveal.astro`** como único punto de integración para marcar
   elementos animables (DRY).
5. **Integración en `Layout.astro`**: script `is:inline` que marca `html.js` antes
   del primer paint y script de cliente que invoca `initReveal()`.
6. **Sección "Motion" en `docs/DESIGN.md`** documentando los principios y tokens.

## Justificación Arquitectónica

- El sitio es **SSG (Astro)** con TCO $0 y sin backend; por tanto toda animación
  debe ser **CSS puro + JavaScript nativo mínimo**, sin librerías (RNF1).
- La técnica de revelado elegida es `IntersectionObserver` (decidida con el
  cliente) por máxima compatibilidad, incluido Safari, y porque ya existe el
  patrón de scripts vanilla TS tipados en el proyecto (`ScrollToTop`, `Header`,
  `EvidenceGallery`).
- La intensidad es **sutil/breathable** (decidida con el cliente): `translateY`
  ≤24px, duraciones ≤600ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`, coherente con
  el carácter "Sophisticated Elegance" de la marca.

## Mapeo a Requisitos No Funcionales (RNF)

### RNF1: Rendimiento y Velocidad (Speed)
* **Solo propiedades compositoras**: las animaciones de revelado usan
  exclusivamente `opacity` y `transform` (sin `layout`/`paint`), protegiendo el
  LCP y el CLS.
* **Cero dependencias**: `IntersectionObserver` es nativo del navegador; no se
  añade ningún paquete al bundle.
* **Tokens en `@theme`**: las animaciones se registran como `--animate-*` en
  `global.css`, generando utilidades Tailwind sin CSS global ad-hoc.

### RNF2: Diseño Responsivo y Adaptabilidad (Responsive)
* Las animaciones son **independientes de la resolución**; el revelado funciona en
  todos los breakpoints (mobile-first) sin alterar el layout existente.

### RNF3: Accesibilidad Semántica y SEO (Accessibility)
* **`prefers-reduced-motion`**: todo el movimiento se envuelve en
  `@media (prefers-reduced-motion: no-preference)`; bajo `reduce` los elementos
  quedan visibles y estáticos.
* **Enhancement progresivo**: el estado oculto inicial solo se aplica cuando
  `html.js` está presente y el usuario permite motion. Si el JS no carga o el
  `IntersectionObserver` no existe, el contenido se revela de inmediato (nunca
  queda invisible).
* El DOM semántico y los estados de foco existentes no se modifican.

## Dependencias

* Es **prerrequisito** de los tickets `anim-hero`, `anim-sections`,
  `anim-components`, `anim-ambient` y `anim-contact`.
* No depende de ningún otro cambio activo.
