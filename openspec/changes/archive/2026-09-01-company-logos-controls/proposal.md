# Propuesta de Cambio: Controles de navegación y estilo de logos en `CompanyLogos` (`company-logos-controls`)

## Why

El componente `src/components/global/CompanyLogos.astro` (sección de prueba
social / clientes) mostraba los logos en un marquee CSS continuo en escala
de grises con opacidad reducida. El cliente quiere:

1. Los logos más altos (+10px → 68px) y siempre en sus colores originales
   (sin filtro de escala de grises).
2. Controles manuales `<` y `>` flanqueando el conjunto de logos:
   - Pausa del marquee al hacer hover sobre cualquier flecha.
   - Cada click en `<` / `>` desplaza el carrusel un logo en la dirección
     correspondiente.
   - Al soltar el hover / foco, el marquee debe reanudarse automáticamente
     desde la posición actual sin saltos visuales.

## What Changes

- `src/components/global/CompanyLogos.astro` (único archivo modificado):
  - **Estructura HTML**: nuevo `wrapper` flex con un botón `<` a la
    izquierda, el viewport con el track en el centro y un botón `>` a la
    derecha. Ambos botones son `<button type="button">` con `aria-label`
    descriptivo.
  - **Estilos CSS**:
    - `.carousel-logo`: `height: 4.25rem` (68px), `filter: none`,
      `opacity: 1`. Eliminados `grayscale(100%)` y `opacity: 0.7`.
    - `.carousel-arrow`: botones circulares (2.75rem) con fondo
      `verde-bosque/6`, hover `verde-lima` + texto blanco + `scale(1.06)`,
      active `scale(0.96)`, `prefers-reduced-motion` respetado.
    - `@keyframes marquee`: arranca desde `translate3d(var(--marquee-start), 0, 0)`
      y termina en `calc(var(--marquee-start) - 50% - var(--carousel-gap) / 2)`.
      Permite reanudar la animación sin saltos desde cualquier posición.
    - `.carousel-wrapper:has(.carousel-arrow:hover) .carousel-track` y
      `.carousel-wrapper.is-paused .carousel-track`: pausa la animación.
      Doble estrategia (CSS `:has()` + clase JS) para robustez.
    - `.carousel-track[data-manual="true"] { animation: none; }`:
      congelación de la animación durante el modo manual.
  - **Script TS inline**:
    - `getItemStep()`: calcula el ancho de un item + gap.
    - `applyShift(next)`: aplica el desplazamiento manual con `--shift` y
      `data-manual="true"`.
    - `resumeAuto()`: transfiere el valor de `--shift` a `--marquee-start`,
      elimina `data-manual` y resetea `--shift` para reanudar sin saltos.
    - Listeners de click en `prev` / `next` con wrap contra
      `track.scrollWidth / 2` (preserva el loop infinito).
    - Listeners `mouseenter` / `mouseleave` y `focus` / `blur` por flecha
      que añaden/quitan `.is-paused` y llaman a `resumeAuto()`.
    - Listener `resize` que resetea el estado manual en cambios de
      breakpoint para evitar desalineación del wrap.

## Capabilities

### New Capabilities
<!-- Ninguna: el cambio no introduce un nuevo spec; es una mejora
     visual y de UX sobre un componente existente. -->

### Modified Capabilities
<!-- Ninguna: ningún spec existente se ve alterado. -->

## Impact

- Código: `src/components/global/CompanyLogos.astro` (único archivo,
  +234 / -28 líneas).
- Tests: validación E2E con Chrome headless (10/10 PASS) mediante
  `tmp/test-carousel2.mjs` que cubre: estructura, estilos, marquee en
  movimiento, pausa por hover, click desplaza, mouseleave reanuda, marquee
  reanudado, click en sentido contrario, múltiples clicks acumulados.
- Sin dependencias nuevas; sin cambios de API, datos o infraestructura.
- El componente se usa en 6 páginas: `/`, `/testing`, `/id`, `/formacion`,
  `/talento`, `/psicologia`. Todas verificadas con HTTP 200 tras el
  cambio.
