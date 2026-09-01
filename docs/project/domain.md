# Dominio

> Plantilla del proyecto (propiedad del dev). Contexto migrado desde la antigua
> §8 de `docs/base-standards.md` durante el upgrade de Specboot v0.1.0 → v0.1.2.

- **Contexto**: sitio corporativo de generación de prospectos (landing B2B).
  El objetivo comercial es la venta consultiva: captar leads cualificados vía
  formulario de contacto (serverless) y canales directos (WhatsApp).
- **Entidades centrales**:
  - **Lead** (`B2BLeadPayload`): contacto potencial con datos de persona y
    organización; contrato documentado en `docs/api/api-spec.yml` y
    `docs/data-model/data-model.md`.
  - **Servicio**: oferta consultiva (reclutamiento y selección, evaluación
    psicológica, formación, gestión de talento, I+D, testing psicométrico);
    cada una con página propia bajo `src/pages/`.
- **Reglas de negocio clave**:
  - Campos requeridos del lead: `name`, `email`, `phone` (enforcement en
    `src/lib/leadPayload.ts` y en la UI); `message` y `contact_preference`
    son opcionales.
  - Honeypot `_honeypot` debe llegar vacío en envíos humanos.
  - `access_key` de web3forms se inyecta desde entorno, nunca en el repo.
  - Consistencia de marca: tokens de diseño en `src/styles/global.css`
    (`@theme`); spec `brand-design-system` en OpenSpec.
