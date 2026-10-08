# Propuesta de Cambio: Nueva sección Scouthem en la home y CTA movido desde el hero

> **Ticket**: TICKET-005 | **Tag**: frontend | **Change**: `add-scouthem-section`

## Why

La home de Matices muestra en el hero dos CTAs compitiendo por atención:
"Comenzar Proceso" y "Conoce nuestra plataforma SCOUTHEM". El diseño aprobado
(`docs/assets/design/nueva-seccion.jpeg`) reserva una sección propia para la
plataforma Scouthem justo debajo del hero: panel visual navy a la izquierda,
badge, titular a dos tintas, párrafo y el CTA. Para evitar duplicidad, el CTA
SCOUTHEM se elimina del hero y queda como único enlace a la plataforma dentro
de la sección nueva. El visual lo entregó diseño como
`src/assets/scouthem-section.png` (694×693) y se sirve con `<Image>` dentro
del panel navy, que reserva el espacio con `bg-verde-bosque` aunque falte el
asset, sin romper el build.

## What Changes

- Nuevo componente presentacional `src/components/ui/ScouthemShowcase.astro`:
  badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN", H2 "Revoluciona tu" +
  span "Selección de Talento" (`text-verde-lima italic`, tipografía Antic),
  párrafo literal del mock, CTA SCOUTHEM movido desde el hero (href
  `https://scouthem.com/es/pagina-de-inicio/`, `target="_blank"`, sin
  `link-underline`) y panel visual `bg-verde-bosque` con slot de imagen
  resuelto por `import.meta.glob('../../assets/scouthem-section.*', {eager:true})`
  (resuelve a `src/assets/scouthem-section.*` desde `src/components/ui/`).
- `src/pages/index.astro`: eliminar el `<a>` SCOUTHEM del hero (queda solo
  "Comenzar Proceso") y montar `<ScouthemShowcase />` entre el hero y
  "Nuestros Servicios".
- Specs OpenSpec: **ADDED** capability `home-scouthem-section` (sección nueva);
  **MODIFIED** requirement "SCOUTHEM CTA Without Link Underline" en `home-hero`
  (el CTA pasa a la sección Scouthem conservando label, destino, hover y
  ausencia de `link-underline`).
- Tests: `src/lib/homeScouthemSection.spec.ts` (Vitest sobre `dist/index.html`,
  convención co-locada del proyecto).
- Asset entregado en T-005: `src/assets/scouthem-section.png` (694×693), servido
  vía `<Image>` con srcset responsive (`widths` 347/694) y `format="webp"`
  (AVIF descartado por el contrato de `src/lib/heroCarousel.spec.ts`, que
  cuenta las variantes AVIF en el corte previo a "Nuestros Servicios"; el
  estándar permite AVIF/WebP).
- Fuera de alcance: API/datos, SEO/`<Layout title>`, header/footer y textos de
  otras secciones.

## Impacto

- Archivos: 1 componente nuevo, 1 asset nuevo, 1 edición puntual en
  `src/pages/index.astro`, 1 test nuevo; sin dependencias nuevas ni cambios de
  infraestructura.
- Spec `home-hero`: delta MODIFIED (solo reubicación del CTA; el comportamiento
  exigido se preserva tal cual).
- Riesgo bajo: cambio estático, sin lógica de estado ni hidratación de islas.
