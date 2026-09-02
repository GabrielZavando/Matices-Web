# Propuesta de Cambio: Página legal de Política de Privacidad (`add-privacy-page`)

> Ticket ID: TICKET-003

## Why

El footer del sitio (`src/components/global/Footer.astro`, línea 16) ya enlaza a
"Políticas de Privacidad" apuntando a `/privacidad`, pero esa ruta **no existe**:
hoy devuelve el 404. El cliente (Matices Consultora) entregó el contenido legal
completo de la política (12 secciones, actualizado a Septiembre 2026) y pidió una
página sencilla que reutilice el sistema de diseño existente (header + footer).

## What Changes

- Nueva página estática **`src/pages/privacidad.astro`** (ruta `/privacidad`,
  incluida automáticamente en el sitemap por `@astrojs/sitemap`):
  - Estructura canónica del sitio: `<Layout>` (SEO/GTM/fonts) → `<Header>` →
    `<main>` con secciones semánticas → `<Footer>`.
  - Layout **artículo simple** (confirmado con el usuario): hero con título +
    badge "Última actualización: Septiembre 2026", seguido de una tarjeta blanca
    de lectura (`max-w-4xl`) con las 12 secciones del contenido legal.
  - Contenido del cliente transcrito **fielmente** (fuente de verdad), con
    cabeceras `<h2>` numeradas (`1. Introducción` … `12. Contacto`), listas para
    datos obligatorios/opcionales y Derechos ARCO, y enlaces funcionales
    (`mailto:contacto@maticesconsultora.cl` y `https://maticesconsultora.cl/`).
  - Tokens del sistema de diseño (`verde-bosque`, `verde-lima`, `crema-calido`,
    `font-heading`/`font-sans`), mobile-first, sin estilos inline, sin `<img>`.
- Nuevo test TDD **`src/pages/privacidad.spec.ts`** (patrón build-time de
  `contactFormA11y.spec.ts` / `heroCarousel.spec.ts`): aserciones sobre el HTML
  estático renderizado en `dist/privacidad/index.html`.

## Capabilities

### New Capabilities
- `privacy-policy-page`: la ruta `/privacidad` renderiza la Política de
  Privacidad y Protección de Datos Personales de Matices (12 secciones,
  actualizada Septiembre 2026) dentro del layout canónico del sitio (Header +
  main + Footer), con el contenido legal transcrito fielmente, los enlaces de
  contacto funcionales y la identidad visual del sistema de diseño.

### Modified Capabilities
<!-- Ninguna: el cambio no altera requisitos de specs existentes -->

## Impact

- Código nuevo: `src/pages/privacidad.astro` (página) y
  `src/pages/privacidad.spec.ts` (test TDD).
- `src/components/global/Footer.astro`: **sin cambios** (el enlace a
  `/privacidad` ya existe y ahora dejará de caer en 404).
- `Header`: **sin cambios** (la política de privacidad no entra al menú
  principal; su punto de entrada es el footer).
- Sin dependencias nuevas; sin cambios de API, datos, assets ni
  infraestructura. `@astrojs/sitemap` incluye `/privacidad` automáticamente en
  el build.
- Fuera de alcance: la página `/terminos` (también enlazada en el footer) se
  implementará en un cambio separado.