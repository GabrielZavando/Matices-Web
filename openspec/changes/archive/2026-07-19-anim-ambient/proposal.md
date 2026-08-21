# Propuesta de Cambio: Animación Ambiental / Decorativa (`anim-ambient`)

Añade movimiento ambiental sutil (flotación) a los elementos decorativos del
sitio: los orbes desenfocados de `contacto.astro` y acentos flotantes en los
heroes de las 6 páginas. Reutiliza el token `--animate-float` de
`anim-foundation`.

## Alcance

* Aplicar `animate-float` a los 3 orbes de fondo de `contacto.astro` (y al
  cluster ambiental inferior) con delays escalonados para un efecto orgánico.
* Añadir un acento decorativo flotante (blob borroso) detrás del contenido de
  cada hero, y aplicar `animate-float` a los badges glassmorphism existentes
  (p. ej. "98% Match", "+15 Años").
* Añadir la guarda `prefers-reduced-motion` para desactivar la animación
  ambiental (no cubierta por la guarda de `.reveal` de `anim-foundation`).

## Justificación

El sitio es estático y plano fuera del primer viewport. Un movimiento ambiental
muy sutil aporta "vitalidad" (Natural Vitality) sin distraer, usando solo
`transform` (compositor) y respetando la accesibilidad.

## Mapeo a RNF

* **RNF1**: solo `transform: translateY` (keyframe `float`); `will-change` no
  necesario por ser pocos elementos. Los blobs son `pointer-events-none` y
  `absolute`, sin impacto en layout.
* **RNF2**: independiente del breakpoint.
* **RNF3**: bajo `prefers-reduced-motion: reduce` la animación se desactiva.

## Dependencias

* Requiere `anim-foundation` (token `--animate-float`).
* Independiente de `anim-hero`, `anim-sections`, `anim-components`, `anim-contact`.
