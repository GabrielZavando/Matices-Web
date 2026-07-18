# Design: improve-contact-a11y-dry

## 1. Eliminar JS muerto de radios
- Borrar `updateRadioState` y el `querySelectorAll('input[type="radio"]').forEach(...)`
  (setup inicial + cleanup en submit). El resaltado lo provee `has-[:checked]`
  (`bg-contact-secondary-container`, `bg-contact-primary-container`).
- El handler de submit ya no necesita limpiar `.active`/`.active-primary`.

## 2. Radios accesibles
- `class="hidden"` -> `class="sr-only"` en los 8 inputs radio. El `<label>`
  envuelve el input y sigue dando el UI visible; `sr-only` lo mantiene en el
  árbol de accesibilidad.

## 3. Modal accesible
- Añadir `keydown` (Escape) en `modal` -> `closeModal()`.
- Al abrir: guardar el elemento activo (`document.activeElement`) y mover el foco al
  primer elemento focuseable del diálogo (botón de cierre).
- Al cerrar: restaurar el foco al elemento guardado (el botón submit).
- Atrapar foco: en `keydown` Tab, ciclar dentro del diálogo.

## 4. Componentes data‑driven
- `src/components/ui/RadioCard.astro`: props `name`, `value`, `label`,
  `checked?`, grupo de tamaño o preferencia; renderiza el `<label>` + `<input
  type="radio" class="sr-only">` con las clases `has-[:checked]` existentes.
- `src/components/ui/CheckboxCard.astro`: props `name`, `value`, `label`;
  renderiza `<label>` + `<input type="checkbox" class="...">` con las clases actuales.
- `contacto.astro` define arrays (`organizationSizes`, `contactPreferences`,
  `servicesOfInterest`, `organizationalChallenges`) y los itera.

## 5. Colapsable robusto
- Contenedor: `grid transition-[grid-template-rows] duration-300` con
  `grid-rows-[0fr]` (colapsado) / `grid-rows-[1fr]` (abierto). Hijo
  `overflow-hidden min-h-0`. Reemplaza `max-h-0`/`max-h-[1000px]`.

## 6. Submit con un solo FormData
- Construir `const formData = new FormData(form)` una sola vez y reusarlo para
  `isHoneypotClean`/`getMissingRequired` y el `fetch`.

## 7. Tests Vitest
- Extraer el formateador de teléfono y `validateField` a `src/lib/formValidation.ts`
  (tipado, sin `any`). Tests: formateador (`+56 9 1234 5678` -> `+56 9 1234 5678`,
  sin `+`, etc.) y `validateField` (teléfono inválido vs válido).
