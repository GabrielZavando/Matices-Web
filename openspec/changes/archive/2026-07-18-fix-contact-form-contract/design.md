# Especificación de Diseño: Contrato Lead B2B (web3forms)

## 1. Tokens de Contrato (Fuente de Verdad)

El payload enviado a `https://api.web3forms.com/submit` debe usar exactamente estos
`name` (definidos como constantes en `src/lib/leadPayload.ts` y reflejados en
`docs/api-spec.yml` / `docs/data-model.md`):

| Campo (name) | Requerido | Origen en el formulario |
| :--- | :--- | :--- |
| `access_key` | sí (hidden) | `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY` |
| `name` | sí | input `id="nombre"` |
| `email` | sí | input `id="email"` |
| `phone` | sí | input `id="telefono"` |
| `company` | no | input `id="empresa"` |
| `role` | no | input `id="cargo"` |
| `services_of_interest` | no (array) | checkboxes `servicios[]` |
| `organizational_challenges` | no (array) | checkboxes `desafios[]` |
| `organization_size` | no | radios `tamano_organizacion` |
| `contact_preference` | sí | radios `preferencia_contacto` (nuevo `required`) |
| `message` | sí | textarea `id="mensaje"` |
| `_honeypot` | sí (vacío) | input oculto (antes `botcheck`) |

## 2. Módulo de Apoyo `src/lib/leadPayload.ts`

- Exporta `B2B_LEAD_FIELDS` (mapa de constantes de nombre de campo, tipado `as const`).
- Exporta `isHoneypotClean(formData: FormData): boolean` (true si `_honeypot` está vacío).
- Exporta `getMissingRequired(formData: FormData): string[]` (campos requeridos faltantes).
- Sin `any`; tipado estricto (`FormData` nativo).

## 3. Integración en `contacto.astro`

- Frontmatter: `const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;`
  y `import { B2B_LEAD_FIELDS } from '../lib/leadPayload';`
- Los `name` de los inputs/radios/checkboxes usan `{B2B_LEAD_FIELDS.x}` (Astro expression).
- El hidden `access_key` usa `value={accessKey}`.
- El handler de submit llama `isHoneypotClean` y `getMissingRequired` para decidir el
  modal de advertencia, además del `form.checkValidity()` existente.

## 4. Variables de Entorno

- Crear `.env` (gitignoreado) con `PUBLIC_WEB3FORMS_ACCESS_KEY=62969b86-dbb7-436a-8ad1-98f7e25bd86a`.
- No commitear el valor real; `api-spec.yml` ya documenta "never commit the real value".
