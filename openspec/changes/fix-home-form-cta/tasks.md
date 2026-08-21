# Plan de Tareas: Ajustes de Copy, Legibilidad y CTA en Home/Formulario/Footer

Cumple SDD: specs antes de código, TDD (test fallido primero), sin `any`.

## Fase 1: Contrato y Documentación

- [x] **Actualizar `docs/api-spec.yml`** (estimado: 5 min)
  - `message` pasa de required a optional en `B2BLeadPayload`.
- [x] **Actualizar `docs/data-model.md`** (estimado: 5 min)
  - Fila `message`: Required → Optional. Mantener sincronía con api-spec.

## Fase 2: Mensaje Opcional (TDD)

- [x] **Escribir tests fallidos en `src/lib/leadPayload.spec.ts`** (estimado: 10 min)
  - Quitar `message` del array local `REQUIRED`.
  - Nuevo test: con `name`/`email`/`phone` válidos y `message` ausente o vacío,
    `getMissingRequired` retorna `[]`.
  - Ejecutar Vitest y confirmar que falla (rojo).
- [x] **Implementar en `src/lib/leadPayload.ts`** (estimado: 5 min)
  - Quitar `B2B_LEAD_FIELDS.message` de `REQUIRED_FIELDS`.
  - Ejecutar Vitest y confirmar que pasa (verde).
- [x] **Ajustar UI en `src/pages/contacto.astro`** (estimado: 10 min)
  - Label MENSAJE: quitar `<span>*</span>` de error.
  - Textarea: quitar atributo `required`.
  - Selector del validador reactivo: quitar `#mensaje`.

## Fase 3: Home y Footer (UI)

- [x] **Badge hero legible en `src/pages/index.astro`** (estimado: 5 min)
  - `text-xs` → `text-sm font-semibold` (conservar color y leading).
- [x] **Botón SCOUTHEM sin subrayado en `src/pages/index.astro`** (estimado: 5 min)
  - Quitar clase `link-underline`; conservar hover bg/transition.
- [x] **CTA del footer en `src/components/global/Footer.astro`** (estimado: 10 min)
  - h3 → "Cotiza tu diagnóstico organizacional".
  - Botón → "Solicita una propuesta personalizada".
  - href → `https://wa.me/56982666745?text=Hola%2C%20me%20interesa%20un%20diagn%C3%B3stico%20organizacional`
    + `target="_blank" rel="noopener noreferrer"`.
  - Quitar clase `link-underline`.

## Fase 4: Verificación

- [x] **Vitest** pasa (`pnpm test`).
- [x] **`pnpm lint`** (`astro check`) sin nuevos errores.
- [x] **`pnpm build`** exitoso; inspección visual de badge hero, botones sin
      línea animada y footer en `/` y `/contacto`.
- [x] **`openspec validate fix-home-form-cta`** pasa.
