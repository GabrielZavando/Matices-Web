# Plan de Tareas: refactor-contact-tokenization

Cumple SDD: specs antes de código, TDD (test fallido primero), sin `any`.

## Fase 1: Relajar contrato (contact_preference opcional)

- [x] Quitar `required` de los 4 radios `contact_preference` en `contacto.astro` (líns. 312, 322, 332, 342)
- [x] Sacar `contactPreference` de `REQUIRED_FIELDS` en `src/lib/leadPayload.ts`
- [x] Quitar `contact_preference` del array `required` en `docs/api-spec.yml`
- [x] Cambiar `contact_preference` a "Optional" en `docs/data-model.md`
- [x] Reflejado en `openspec/changes/refactor-contact-tokenization/specs/contact-lead-contract/spec.md` (MODIFIED: Requirement #1 + escenario "Missing required fields block submission")

## Fase 2: Tokens dedicados

- [x] Añadir los 18 `--color-contact-*` + escala tipográfica (`--text-*`) en `src/styles/global.css`
- [x] Eliminar la línea `@import` de fuentes del `<style>` (borra Manrope); Plus Jakarta Sans ya está cargada en `Layout.astro`, no se modifica nada global

## Fase 3: Eliminar `<style>` y rewire del markup

- [x] Sustituir clases del `<style>` por utilidades Tailwind (color/foco/espaciado/decoración)
- [x] Borrar el bloque `<style>` (líns. 455-659) y reglas muertas `.active`/`.active-primary`

## Fase 4: Spec brand-design-system

- [x] Reflejado en `openspec/changes/refactor-contact-tokenization/specs/brand-design-system/spec.md` (MODIFIED: permite sub-paleta `--color-contact-*` exclusiva de `contacto.astro`)

## Fase 6: Fix overflow móvil en headers de sección
- [x] Card (lín. 39): eliminar padding izquierdo/derecho (`px-5 py-8 md:p-12` -> `py-8 md:py-12`); se mantiene solo el vertical
- [x] Headers Sección 2 y 3: `min-w-0 flex-1` en contenedor, `flex-wrap` en h2, `flex-wrap min-w-0` en título, `shrink-0` en botón toggle
- [x] Blob decorativo (lín. 387): tokenizar `#f4a261` -> `--color-contact-accent-orange` (cerrar GAP A del scenario 7)

## Fase 5: Tests + verificación visual

- [x] Vitest: `leadPayload` (`getMissingRequired` sin `contact_preference`; `isHoneypotClean`)
- [x] Screenshots before/after (mobile + desktop) y confirmar look idéntico — revisión visual manual acordada (usuario, sobre el output servido)
- [x] `npm test`, `astro check`, `openspec validate --changes` pasan (9/9 tests; openspec OK; astro check sin errores nuevos — solo GTM pre‑existente en Layout.astro)
