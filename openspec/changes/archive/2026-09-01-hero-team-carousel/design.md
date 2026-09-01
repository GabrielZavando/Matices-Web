# Diseño: Carrusel de fotos del equipo en el hero (`hero-team-carousel`)

## Context

El hero de `src/pages/index.astro` (líneas 134-161) envuelve un único
`<Image src={heroBusiness}>` dentro de un contenedor con máscara
`aspect-[4/5] rounded-[3rem] overflow-hidden border-4`. El proyecto ya
implementa un carrusel marquee de logotipos en
`src/components/global/CompanyLogos.astro` (CSS puro, keyframes, track
duplicado con `-50%`, sin JS). La política global de animación vive en
`src/styles/global.css` (`prefers-reduced-motion` desactiva `animate-float`,
`animate-blob`, etc.).

## Goals / Non-Goals

**Goals:**
- Reemplazar la imagen estática del hero de la home por un carrusel infinito de
  dos fotos del equipo (`team.jpeg`, `team-one.jpg`).
- Cada foto visible 5 s, transición horizontal ~1 s, una foto a la vez.
- Reutilizar el patrón marquee/loop existente del proyecto, sin JS.
- Respetar `prefers-reduced-motion: reduce` (primera foto estática).
- Mantener el aspecto, la máscara, el `Reveal scale-in delay={120}` y el badge
  "98% Match" intactos.

**Non-Goals:**
- NO tocar el hero de `testing.astro` (usa la misma imagen pero queda fuera de
  alcance).
- NO modificar `global.css`, `CompanyLogos.astro` ni componentes compartidos.
- NO borrar `hero-business.webp` (sigue en uso por `testing.astro`).
- NO añadir controles manuales (prev/next), pausa al hover ni dots.

## Decisions

### D1: CSS puro con keyframes y track A-B-A (en vez de JS con setInterval)
- **Decisión**: franja horizontal `display:flex; width:300%` con 3 imágenes:
  **A (team.jpeg), B (team-one.jpg), A (copia de team.jpeg)**. El keyframe
  anima `transform: translateX` de `0` a `-66.666%` en un ciclo `11s`:
  5 s A → 0.5 s slide a B → 5 s B → 0.5 s slide a la copia A → reinicio.
- **Por qué**: es una variante del patrón marquee de `CompanyLogos.astro` con
  clonación explícita: la última imágen es una copia de la primera, de modo que
  el reinicio del `@keyframes` (de vuelta a `translateX(0)`) ocurre en la misma
  posición visual → **sin salto abrupto**. La transición usa el tramo central
  del 11 s: `45.45%→50%` y `95.45%→100%` (~0.5 s cada una), e interpolación
  `cubic-bezier(0.4, 0, 0.2, 1)` suave (nunca abrupta). No requiere `<script>`
  y es barato en rendimiento (solo `transform`).
- **Alternativas descartadas**:
  - JS `setInterval` + `translateX` por paso: requiere hidratación/script y
    lógica extra; el proyecto prefiere CSS cuando es posible.
  - `scroll-snap` infinito sin clonación: no permite loop infinito fluido sin
    JS.
  - Track A-B-A-B (doble duplicación, 400%): innecesario y con más peso.

### D2: Timing exacto por keyframes (en vez de % sobre 60 s)
- **Decisión**: duración total `11s`, desglose exacto:
  - `0% → 45.45%` (5.0 s): `translateX(0)` — **foto A visible exactamente 5 s**.
  - `45.45% → 50%` (0.5 s): transición suave a `translateX(-33.333%)` — **slide
    a B en 0.5 s**.
  - `50% → 95.45%` (5.0 s): `translateX(-33.333%)` — **foto B visible
    exactamente 5 s**.
  - `95.45% → 100%` (0.5 s): transición a `translateX(-66.666%)` — **slide a la
    copia A en 0.5 s** (misma posición visual que el inicio → loop perfecto).
  - Al reiniciar, `translateX` vuelve a `0` sin salto porque la copia final A
    ocupa exactamente la misma posición que la A inicial.
- **Por qué**: los % sobre una duración total fija dan tiempos **exactos** (5 s /
  0.5 s), a diferencia del esquema anterior de ~0.93 s de slide. El easing
  `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out estándar) evita que el movimiento
  se perciba brusco.
- **Alternativa**: animación de 2 steps con `animation-delay` negativo — más
  frágil; los keyframes con % son más legibles y mantenibles.

### D3: Tipos de imagen y atributos
- Ambas imágenes se importan en el frontmatter y se renderizan con el
  componente `<Image />` de `astro:assets` (nunca `<img>`), con
  `width={640} height={800} format="avif" loading="eager"` y el `sizes`
  existente. Si las proporciones reales de los JPG difieren de 4/5,
  `astro:assets` redimensiona y `object-cover` recorta sin deformar.
- `loading="eager"` se conserva: la primera imagen del carrusel es el LCP del
  hero (política de `anim-hero`).

### D4: Scope del CSS
- Bloque `<style>` scoped NUEVO al final de `src/pages/index.astro` (el archivo
  no tiene `<style>` hoy). No se toca `global.css` para no afectar otras
  páginas ni los tests de CSS globales (`ambientAnimations.spec.ts`).

## Risks / Trade-offs

- **[Ratio de aspecto real de los JPG desconocido]** → `astro:assets` +
  `object-cover` recortan sin deformar; se verifica visualmente en build.
- **[Timing exacto del slide]** → El keyframe define slides de exactamente
  0.5 s (45.45%→50% y 95.45%→100% sobre 11 s), con easing `ease-in-out` que
  suaviza la aceleración y deceleración para que nunca se perciba como brusco.
  La reelipsis por clonación (copa A al final = misma imagen que A al inicio)
  garantiza un reinicio invisible sin saltos abruptos.
- **[Duplicar imágenes duplica el peso del LCP]** → Las imágenes son
  importadas por `astro:assets` (se sirven AVIF optimizado). La duplicación es
  solo en DOM/CSS (mismas URLs), no re-descarga de archivos; el impacto es
  mínimo.
- **[Reduced motion]** → Se añade regla `@media (prefers-reduced-motion:
  reduce) { .hero-carousel-track { animation: none; } }` y la primera foto
  queda visible por defecto (posición inicial `translateX(0)`).

## Migration Plan

1. Añadir imports en el frontmatter de `index.astro`.
2. Reemplazar el `<Image heroBusiness>` por el track duplicado con las 4
   imágenes (2 únicas + 2 duplicadas).
3. Añadir el `<style>` scoped con el keyframe.
4. Test nuevo (`src/lib/heroCarousel.spec.ts`) que valida el build
   (`dist/index.html` y `dist/_astro/*.css`).
5. Rollback: revertir el commit; el hero vuelve a `hero-business.webp`.

## Open Questions

- Ninguna pendiente: el alcance (solo `index.astro`), las imágenes
  (`team.jpeg` + `team-one.jpg`) y el enfoque (CSS puro) fueron confirmados con
  el usuario.