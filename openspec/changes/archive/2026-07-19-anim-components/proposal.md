# Propuesta de Cambio: Micro-interacciones de Componentes Globales (`anim-components`)

Añade micro-interacciones de hover/foco coherentes con la identidad "Natural
Vitality" y documentadas en `docs/DESIGN.md` (botón terciario con subrayado
animado, indicador de enlace activo). Reutiliza la fundación de
`anim-foundation` para las guardas de accesibilidad.

## Alcance

1. **Subrayado animado (crecimiento izquierda→derecha)** `.link-underline`:
   utilidad reutilizable para enlaces/links terciarios y del footer.
2. **Indicador de enlace activo animado** en `Header.astro` (desktop + móvil):
   subrayado que crece en hover y permanece en el link activo, vía
   `aria-current="page"`.
3. **Elevación de tarjeta estandarizada** `.card-lift`: utilidad para el
   efecto hover "levantar + sombra" aplicada a las tarjetas de servicios de
   `index.astro` (que hoy solo hacen `hover:shadow-lg`).

## Justificación

`DESIGN.md` describe un "tertiary button with an animated underline that mimics
growth" que aún no está implementado. Unificar estos micro-estados mejora la
consistencia y la retórica visual sin afectar el rendimiento (solo
`transform`/`opacity` y `scaleX`).

## Mapeo a RNF

* **RNF1**: solo `transform: scaleX` / `transform: translateY` (compositor).
* **RNF2**: se aplican a nav desktop y móvil; el subrayado es independiente del breakpoint.
* **RNF3**: las animaciones se anulan bajo `prefers-reduced-motion: reduce`; el
  `aria-current="page"` mejora la semántica de navegación activa.

## Dependencias

* Requiere `anim-foundation` (guardas de `prefers-reduced-motion` en `global.css`).
* Independiente de `anim-hero`, `anim-sections`, `anim-ambient`, `anim-contact`.
