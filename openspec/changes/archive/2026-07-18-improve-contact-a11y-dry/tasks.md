# Plan de Tareas: improve-contact-a11y-dry

Cumple SDD: specs antes de código, TDD (test fallido primero), sin `any`.
Spec delta: `openspec/changes/improve-contact-a11y-dry/specs/contact-form-a11y/spec.md`.

## Fase 1: JS muerto + radios accesibles
- [x] Borrar `updateRadioState` y el `querySelectorAll('input[type="radio"]')` (setup + cleanup submit)
- [x] Radios `class="hidden"` -> `class="sr-only"` vía `RadioCard.astro`
- [x] **Scenario:** Radios remain in the accessibility tree

## Fase 2: Modal accesible
- [x] `keydown` Escape en `modal` -> `closeModal()`
- [x] Guardar foco activo al abrir; mover foco al diálogo; restaurar al cerrar (`lastFocused`)
- [x] Atrapar foco (Tab) dentro del diálogo (`trapFocus`)
- [x] **Scenario:** Modal closes on Escape
- [x] **Scenario:** Focus is trapped and restored

## Fase 3: Colapsable + submit
- [x] `max-h-[1000px]` -> `grid-rows-[0fr]/[1fr]` (hijo `overflow-hidden min-h-0`); toggle en `setupCollapsible`
- [x] Reusar un único `FormData` en el submit handler
- [x] **Scenario:** Collapsible uses grid-rows instead of max-h

## Fase 4: Componentes data‑driven (DRY)
- [x] `src/components/ui/RadioCard.astro` (props name/value/label/checked/variant)
- [x] `src/components/ui/CheckboxCard.astro` (props name/value/label/extraClass)
- [x] Arrays en `contacto.astro` + iteración (radios tamaño/preferencia, checkboxes servicios/desafíos)
- [x] Checkbox inputs include `shrink-0` to avoid horizontal flex-shrink in long-label / full-width rows (fixes smaller checkbox on "Cumplimiento")
- [x] **Scenario:** Checkbox keeps consistent size in long-label rows
- [x] **Scenario:** Option groups render from arrays via components

## Fase 5: Tests + verificación
- [x] Extraer formateador teléfono + `validateField` a `src/lib/formValidation.ts`
- [x] Vitest: `formValidation.spec.ts` (formateador + `isPhoneNumberFormatValid`)
- [x] `npm test`, `astro check`, `openspec validate --changes`, `npm run build` pasan
- [x] Rendering tests (no real DOM) for scenarios 1/4/5/6 in `src/components/ui/contactFormA11y.spec.ts` (asserts built `dist/contacto/index.html`: 8 radios sr-only, 9 checkboxes shrink-0, md:col-span-2 on Cumplimiento, array counts 4/4/4/5, 2x grid-rows-[0fr] + inner overflow-hidden min-h-0)
