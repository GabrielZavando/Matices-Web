# Proposal: refactor-contact-tokenization

## Why

1. El bloque `<style>` de `src/pages/contacto.astro` (líns. 455-659) contiene CSS
   hardcodeado con una paleta navy/olive que viola `base-standards.md` §8.1 (CSS inline
   o global hardcodeado está prohibido). Estaba documentado como deuda diferida en la
   spec `brand-design-system`.
2. La sección "Detalles de Contacto" es opcional y colapsable por defecto, pero contiene
   el campo `contact_preference` marcado como `required`. Un usuario puede enviar y recibir
   el modal genérico "Campos Incompletos" sin saber qué falta. Decisión de producto:
   una sección opcional no debe tener campos obligatorios.

## What Changes

- Hacer `contact_preference` opcional en el formulario, `leadPayload.ts`, `api-spec.yml`,
  `data-model.md` y la spec `contact-lead-contract`.
- Promover los hex reales del componente a tokens `--color-contact-*` dedicados en
  `src/styles/global.css` (paleta navy/olive), eliminando el `<style>` hardcodeado.
- Sustituir las clases del `<style>` por utilidades Tailwind que referencian esos tokens
  (colores, foco, tipografía, espaciado y decoración), preservando el aspecto idéntico.
- Permitir la sub-paleta de contacto en la spec `brand-design-system`.
- Verificar con diff de screenshots (mobile + desktop) que el look es idéntico.

## Impacto

Solo afecta `contacto.astro`, `global.css`, `leadPayload.ts` y la documentación de
contrato/diseño. No cambia el aspecto visual ni el payload enviado, salvo que
`contact_preference` deja de ser requerido (coherente con la sección opcional).
