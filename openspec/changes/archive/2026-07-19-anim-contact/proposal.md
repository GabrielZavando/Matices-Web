# Propuesta de Cambio: Animaciones del Formulario de Contacto (`anim-contact`)

Añade animaciones sutiles al formulario de calificación de `contacto.astro`:
entrada escalonada de secciones, pulso al seleccionar `CheckboxCard`/`RadioCard`,
y un "pop" en el icono de éxito del modal. Reutiliza `anim-foundation`.

## Alcance

* **Entrada escalonada del formulario**: envolver las secciones del formulario
  (Identificación, Calificación de Requerimientos, Detalles de Contacto y acciones)
  en `<Reveal>` con `delay` por sección.
* **Pulso de selección**: al marcar un `CheckboxCard`/`RadioCard`, una animación
  de "pulso" de escala (one-shot) vía `:has(:checked)` + keyframe `pulse-select`.
* **Pop del icono de éxito**: el check del modal de éxito aparece con un
  `scale-in` cuando se abre en estado success.

## Justificación

El formulario es la pieza de conversión principal (venta consultiva B2B). Una
entrada escalonada y feedback táctil en la selección mejoran la claridad y el
sentimiento de respuesta, manteniendo la sutileza de la marca.

## Mapeo a RNF

* **RNF1**: solo `transform`/`opacity`; el reveal usa `IntersectionObserver`
  (sin scroll handlers); el pulso es `transform: scale` one-shot.
* **RNF2**: el formulario ya es responsive; la animación es independiente.
* **RNF3**: `prefers-reduced-motion` deja todo visible/estático (vía
  `anim-foundation` y guarda de `animate-*`).

## Dependencias

* Requiere `anim-foundation`.
* Independiente de `anim-hero`, `anim-sections`, `anim-components`, `anim-ambient`.
