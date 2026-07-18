---
description: Estándares de backend para Matices. Sitio estático serverless, sin backend propio.
alwaysApply: false
---

# Backend Standards — Matices Consultoría Integral

> Aplica a tareas de API, integración de formularios y despliegue. El proyecto
> es un **sitio estático (SSG)**; no hay backend ni base de datos propia.

## 1. Arquitectura serverless

- **Sin servidor ni DB**: Astro se compila a HTML estático (SSG) y se sirve desde
  Hostinger. No hay runtime de aplicación ni persistencia local.
- **TCO $0**: se elimina la base de datos para mantener costo operativo en $0 USD.
- **Flujo de datos**: el formulario de contacto (`src/pages/contacto.astro`) envía
  un payload de calificación B2B a un handler serverless externo.

## 2. Integración de formulario (web3forms)

- Endpoint: `https://api.web3forms.com/submit` (POST, `application/x-www-form-urlencoded`
  o `multipart/form-data`).
- Autenticación vía campo oculto `access_key` (secret de web3forms). Nunca hardcodear
  la clave en el repo: leerla de variables de entorno / configuración del formulario.
- Validación en cliente (TypeScript tipado) + honeypot `_honeypot` (trampa anti-spam,
  debe quedar vacío).
- El modelo de payload está definido en `docs/api-spec.yml` y `docs/data-model.md`.

## 3. Tipado y contratos

- El payload del lead se modela como `B2BLead` (ver `docs/data-model.md`).
- `docs/api-spec.yml` es el contrato OpenAPI 3.0.3 de salida (frontend → serverless).
  Mantenerlo sincronizado con el formulario real.

## 4. Testing

- Tests unitarios con **Vitest** (helpers de validación, formato de teléfono, etc.).
- No hay tests de integración contra el endpoint externo (depende de credenciales).

## 5. Seguridad

- Nunca exponer `access_key` en el cliente de forma legible en el repo.
- Honeypot + validación de campos requeridos (`name`, `email`, `phone`,
  `contact_preference`) antes del envío.
- Sin secrets en el control de versiones.
