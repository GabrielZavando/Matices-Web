# Plan de Tareas: Contrato del Formulario de Contacto

Cumple SDD: specs antes de código, TDD (test fallido primero), sin `any`.

## Fase 1: Contrato y Documentación

- [x] **Actualizar `docs/api-spec.yml`** (estimado: 10 min)
  - Añadir campo `message` (string, required) a `B2BLeadPayload`.
  - Confirmar `contact_preference` como required.
  - El honeypot queda como `_honeypot` (required, empty).
- [x] **Actualizar `docs/data-model.md`** (estimado: 10 min)
  - Añadir fila `message | String | Required` y renombrar `_honeypot` como honeypot.
  - Mantener sincronía con api-spec.

## Fase 2: Módulo de Contrato (TDD)

- [x] **Escribir test fallido `src/lib/leadPayload.spec.ts`** (estimado: 10 min)
  - Test: `B2B_LEAD_FIELDS` contiene los nombres canónicos.
  - Test: `isHoneypotClean` es true cuando `_honeypot` está vacío y false si tiene valor.
  - Test: `getMissingRequired` lista los requeridos faltantes (`name`, `email`, `phone`,
    `contact_preference`, `message`).
  - Ejecutar `npm test` y confirmar que falla (módulo no existe aún).
- [x] **Implementar `src/lib/leadPayload.ts`** (estimado: 15 min)
  - Definir `B2B_LEAD_FIELDS`, `isHoneypotClean`, `getMissingRequired`.
  - Ejecutar `npm test` y confirmar que pasa.

## Fase 3: Aplicar en `contacto.astro`

- [x] **Mover access_key a env** (estimado: 10 min)
  - Crear `.env` con `PUBLIC_WEB3FORMS_ACCESS_KEY=...`.
  - Frontmatter: `const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;`
  - Hidden input: `value={accessKey}` (eliminar valor hardcodeado).
- [x] **Renombrar name de campos y honeypot** (estimado: 20 min)
  - Usar `{B2B_LEAD_FIELDS.x}` en name de inputs/radios/checkboxes.
  - `nombre`→name, `telefono`→phone, `empresa`→company, `cargo`→role,
    `servicios[]`→services_of_interest, `desafios[]`→organizational_challenges,
    `tamano_organizacion`→organization_size, `preferencia_contacto`→contact_preference,
    `mensaje`→message, `botcheck`→_honeypot.
  - Marcar grupo `contact_preference` como `required`.
- [x] **Integrar validación en submit handler** (estimado: 15 min)
  - Llamar `isHoneypotClean` y `getMissingRequired`; si honeypot sucio o faltan
    requeridos, abrir modal de advertencia.

## Fase 4: Verificación

- [x] **`npm test`** pasa.
- [x] **`astro check`** sin nuevos errores (los errores pre-existentes del GTM en
  Layout.astro son fuera de alcance).
- [x] **`openspec validate`** del cambio pasa.
- [x] **`bash check-refs.sh`** y **`bash specboot.sh --ci`** pasan.
