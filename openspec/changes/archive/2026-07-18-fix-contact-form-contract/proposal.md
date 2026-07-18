# Propuesta de Cambio: Contrato del Formulario de Contacto y Seguridad del Access Key

## Why

El formulario de `src/pages/contacto.astro` presenta dos problemas graves de conformidad:

1. **Seguridad**: el `access_key` de web3forms está **hardcodeado en el repo**
   (`contacto.astro:39`), violando `backend-standards.md` §2 y §5 ("nunca hardcodear
   la clave en el repo; leerla de variables de entorno").
2. **Contrato divergiente**: los `name` de los campos del formulario
   (`nombre`, `telefono`, `servicios[]`, `desafios[]`, `tamano_organizacion`,
   `preferencia_contacto`, `mensaje`, `botcheck`) no coinciden con
   `docs/api-spec.yml` / `docs/data-model.md` (`B2BLeadPayload`: `name`, `phone`,
   `services_of_interest`, `organizational_challenges`, `organization_size`,
   `contact_preference`, `message`, `_honeypot`). El honeypot se llama `botcheck` en
   el form pero `_honeypot` en la spec. Viola `documentation-standards.md` §2
   (la spec debe reflejar el formulario real) y el principio "docs = fuente de verdad".

## What Changes

- Mover `access_key` a `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY` (`.env` gitignoreado).
- Renombrar los `name` de los campos del formulario para que coincidan exactamente con
  `B2BLeadPayload`, mediante constantes tipadas compartidas (`src/lib/leadPayload.ts`)
  que además son la base de los tests.
- Renombrar el honeypot `botcheck` → `_honeypot` y marcar `contact_preference` como
  requerido en el formulario.
- Actualizar `docs/api-spec.yml` y `docs/data-model.md` para incluir el campo `message`
  y reflejar el contrato final (fuente de verdad sincronizada).
- Añadir `src/lib/leadPayload.spec.ts` (Vitest, TDD) que valida el mapeo de campos y el
  honeypot.

## Impacto

Solo afecta `contacto.astro`, los docs de contrato y un nuevo módulo/lib de apoyo.
No cambia la paleta ni los estilos (fuera de alcance).
