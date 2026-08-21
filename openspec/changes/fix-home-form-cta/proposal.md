# Propuesta de Cambio: Ajustes de Copy, Legibilidad y CTA en Home/Formulario/Footer

## Why

Feedback del cliente (Matices) tras revisar el sitio publicado:

1. **Legibilidad**: el texto descriptivo de los badges flotantes de estadística
   (glassmorphism) es difícil de leer (`text-xs`, sin peso tipográfico). El
   ajuste aplica a TODOS los badges del sitio: `index.astro` ("Precisión en
   selección..."), `formacion.astro` (+150), `psicologia.astro` (+15 Años,
   7 Áreas), `testing.astro` (100%), `talento.astro` (98%) e `id.astro` (I+D).
2. **Formulario**: el campo `message` es obligatorio, pero comercialmente el
   lead es válido con solo nombre/email/teléfono; exigir mensaje genera fricción
   y abandono. La spec vigente (`contact-lead-contract`) lo declara requerido y
   debe actualizarse primero (docs = fuente de verdad).
3. **Conversión**: la sección del footer "Alianzas Estratégicas" con botón
   "Iniciar Diagnóstico" (que apunta a `/contacto`) no comunica la oferta actual
   ("cotiza tu diagnóstico organizacional") ni aprovecha el canal directo de
   WhatsApp (+56 9 8266 6745).
4. **Consistencia visual**: los botones CTA sólidos (SCOUTHEM en home y el del
   footer) usan la utilidad `link-underline` (línea animada tipo link de menú),
   un patrón reservado para links terciarios; se percibe como un bug visual.

## What Changes

- `index.astro` + páginas de servicios: los párrafos descriptivos de TODOS los
  badges flotantes pasan a `text-sm font-semibold`; el botón SCOUTHEM pierde
  la clase `link-underline`.
- `contacto.astro` + `leadPayload.ts`: `message` deja de ser obligatorio
  (label sin asterisco, sin atributo `required`, fuera del validador reactivo y
  de `REQUIRED_FIELDS`). TDD: tests primero.
- `Footer.astro`: título → "Cotiza tu diagnóstico organizacional"; botón →
  "Solicita una propuesta personalizada" con enlace directo a WhatsApp
  (`wa.me/56982666745` con texto prellenado) y sin `link-underline`.
- Deltas OpenSpec: MODIFIED `contact-lead-contract`; ADDED `floating-badges`;
  ADDED `home-hero`; ADDED `footer-cta`.
- Docs: `api-spec.yml` y `data-model.md` reflejan `message` opcional.

## Impacto

- Archivos: `src/pages/index.astro`, `src/pages/contacto.astro`,
  `src/components/global/Footer.astro`, `src/lib/leadPayload.ts`,
  `src/lib/leadPayload.spec.ts`, docs de contrato.
- El footer es global: los cambios 3-5 se aplican en todas las páginas
  (decisión confirmada con el cliente).
- La utilidad `.link-underline` permanece en `global.css` (links del footer la
  siguen usando); no hay cambios en `global.css` ni riesgo para
  `componentAnimations.spec.ts`.
