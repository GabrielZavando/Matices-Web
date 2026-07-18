# Proposal: improve-contact-a11y-dry

## Why

Análisis de `src/pages/contacto.astro` tras el Cambio 1 (tokenización) reveló
mejoras de accesibilidad y mantenibilidad, todas **neutras al diseño** (no cambian
el aspecto visual):

1. **JS muerto de resaltado de radios**: el bloque `updateRadioState` + el
   `querySelectorAll('input[type="radio"]')` añaden clases `.active`/`.active-primary`
   que ya no existen (se borraron en el Cambio 1). El resaltado real lo hace
   Tailwind vía `has-[:checked]`. Código muerto + bug latente.
2. **Radios con `class="hidden"`**: `display:none` los saca del árbol de
   accesibilidad. Deben ser `sr-only` (visibles para lectores de pantalla).
3. **Modal sin Escape ni gestión de foco**: tiene `role="dialog" aria-modal`
   pero no se cierra con Esc ni atrapa el foco.
4. **Markup repetido**: ~17 bloques casi idénticos de radios/checkboxes.
5. **Colapsable frágil**: usa `max-h-[1000px]` mágico (se corta si crece).
6. **`FormData` construido dos veces** en el submit.

## What Changes

- Eliminar el JS muerto de radios (resaltado ya cubierto por `has-[:checked]`).
- Radios: `hidden` -> `sr-only`.
- Modal: listener `keydown` Escape -> `closeModal()` + restaurar foco al submit y
  atrapar foco dentro del diálogo.
- Extraer `RadioCard.astro` / `CheckboxCard.astro` data‑driven (radios de
  tamaño/preferencia y checkboxes de servicios/desafíos) -> ~120 líneas a ~30.
- Colapsable: `max-h-[1000px]` -> `grid-rows-[0fr]/[1fr]` (altura automática).
- Reusar un único `FormData` en el handler de submit.
- Tests Vitest para el formateador de teléfono y `validateField` (extraídos a módulo).

## Impacto

Solo `contacto.astro` + nuevos componentes `RadioCard`/`CheckboxCard` + módulo
de validación. Sin cambios de contrato ni de paleta.
