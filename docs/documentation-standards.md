---
description: Estándares de documentación para Matices (OpenAPI, data model, mantenimiento).
alwaysApply: false
---

# Documentation Standards — Matices Consultoría Integral

> Aplica a cambios en docs/, `api-spec.yml`, `data-model.md` y metadatos SEO.

## 1. Fuente de verdad

- **Documentación = fuente de verdad**: specs antes de código (SDD).
- Los estándares viven en `docs/` y se cargan vía `opencode.json` (instructions).
- `docs/base-standards.md` es alwaysApply; el resto se carga por área.

## 2. Contrato API (`docs/api-spec.yml`)

- Formato **OpenAPI 3.0.3**.
- Debe reflejar el endpoint serverless real. Para Matices: `web3forms.com/submit`.
- Mantener `B2BLeadPayload` sincronizado con `docs/data-model.md`.
- Al cambiar el formulario, actualizar el spec **antes** de implementar.

## 3. Modelo de datos (`docs/data-model.md`)

- Entidades del dominio en tablas (campo técnico, tipo, regla frontend, propósito).
- Para Matices: entidad `B2BLead` (lead B2B serverless, sin DB).
- Nombres en inglés; copy de negocio en español.

## 4. Estándares de escritura

- **Código/comentarios/logs**: inglés.
- **Docs de cliente y copy de UI**: español.
- Commits: inglés, Conventional Commits (formato, tipos permitidos y semver en [`ai-specs/reference/commits.md`](../ai-specs/reference/commits.md)).
- Markdown con encabezados semánticos; mantener `docs/DESIGN.md` como sistema de tokens.

## 5. Mantenimiento

- Ante cualquier cambio de arquitectura/stack, actualizar `docs/base-standards.md` §8.
- `bash check-refs.sh` valida integridad de referencias `{file:...}`.
- `bash specboot.sh --ci` valida estructura y placeholders antes de CI.
