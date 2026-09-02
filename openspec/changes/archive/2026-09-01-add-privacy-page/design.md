# Diseño: Página legal de Política de Privacidad (`add-privacy-page`)

## Context

El footer del sitio (`src/components/global/Footer.astro`) ya enlaza a
"Políticas de Privacidad" (`/privacidad`) y a "Términos y Condiciones"
(`/terminos`), pero ninguna de las dos rutas existe → ambas caen en el 404
(`src/pages/404.astro`). El cliente entregó el contenido legal completo de la
política de privacidad (12 secciones, "Última actualización: Septiembre 2026") y
solicitó una **página sencilla** que reutilice el sistema de diseño existente
(header + footer).

El proyecto es Astro 6 (SSG) + Tailwind v4. Las páginas siguen la estructura
`<Layout>` → `<Header activePath>` → `<main>` (secciones semánticas) →
`<Footer>`. Los tokens viven en `src/styles/global.css` (`@theme`):
`verde-bosque` (#243B55), `verde-lima` (#98C245), `azul-celeste` (#5A7FA3),
`crema-calido` (#F4F7F9), `font-heading` (Antic), `font-sans` (Plus Jakarta
Sans). El testing de páginas se hace contra el HTML estático del build
(`dist/`), ver `contactFormA11y.spec.ts` y `heroCarousel.spec.ts`.

## Goals / Non-Goals

**Goals:**
- Crear la ruta `/privacidad` (`src/pages/privacidad.astro`) con el contenido
  legal del cliente transcrito fielmente (12 secciones numeradas).
- Reutilizar el layout canónico del sitio: `Layout` + `Header` + `Footer`, sin
  tocar componentes compartidos.
- Layout **artículo simple** (decision de usuario): hero + tarjeta blanca de
  lectura a una columna (`max-w-4xl`), mobile-first.
- Enlaces de contacto funcionales (`mailto:` y URL del sitio) y cero JS
  obligatorio para leer el documento (SSG puro).
- Test TDD build-time (`src/pages/privacidad.spec.ts`) que valida contenido,
  estructura y tokens sobre `dist/privacidad/index.html`.

**Non-Goals:**
- NO crear la página `/terminos` (enlazada en el footer; cambio separado).
- NO añadir la política al menú principal del `Header` (el punto de entrada es
  el footer, que ya la enlaza).
- NO modificar `Header.astro`, `Footer.astro`, `Layout.astro` ni `global.css`.
- NO añadir imágenes, iconos complejos, TOC lateral ni tarjetas por sección
  (se descartaron con el usuario: "página sencilla").
- NO introducir `<script>` de página: el contenido es 100% estático.

## Decisions

### D1: Layout artículo simple (una columna, tarjeta blanca)
- **Decisión**: `main` sobre `bg-crema-calido`; hero con badge pill
  (`bg-verde-lima/10 text-verde-bosque`), `<h1>` en `font-heading` y badge
  "Última actualización: Septiembre 2026"; luego una tarjeta blanca
  (`rounded-[2.5rem] border border-verde-bosque/5`, `max-w-4xl mx-auto`) que
  contiene las 12 secciones con `<h2>` numerados y cuerpo en `font-sans`.
- **Por qué**: coincide con "página sencilla" del cliente, mantiene la
  legibilidad legal (medida de línea cómoda) y replica las tarjetas
  `rounded-[2.5rem]` ya usadas en `formacion.astro`/`talento.astro`.
- **Alternativas descartadas**: TOC lateral sticky (complejidad innecesaria para
  12 secciones cortas) y tarjetas por sección (estilo "marketing", no documento
  legal).

### D2: Contenido = fuente de verdad del cliente, transcripción fiel
- **Decisión**: el contenido entregado (12 secciones) se transcribe verbatim,
  con numeración literal en los `<h2>` (`1. Introducción` … `12. Contacto`),
  listas `<ul>` para los datos obligatorios/opcionales (sección 2) y los
  Derechos ARCO (sección 9), y los enlaces de contacto (sección 12) como
  `<a href="mailto:contacto@maticesconsultora.cl">` y
  `<a href="https://maticesconsultora.cl/" rel="noopener noreferrer" ...>`.
- **Por qué**: el texto legal es el entregable del cliente; cualquier reforma
  debe pasar por él. Los encabezados numerados preservan la referencia legal
  exacta.
- **Nota**: el texto del cliente alude a "Chile"/"Ley N° 19.628" y a
  proveedores (GTM/GA/CRM) — se transcribe tal cual, sin reinterpretación.

### D3: Sin animaciones en el cuerpo del documento; solo `Reveal` en el hero
- **Decisión**: el hero usa `Reveal variant="fade-up"` (consistente con otras
  páginas), pero las secciones del documento no se envuelven en `Reveal`.
- **Por qué**: un documento legal de lectura continua no debe depender de
  animaciones scroll-driven; `prefers-reduced-motion` queda respetado por el
  sistema existente sin añadir nada.

### D4: `activePath` del Header se deja sin coincidencia
- **Decisión**: `<Header activePath="/privacidad" />`. `/privacidad` no está en
  `navItems`, por lo que ningún ítem queda activo (el nav se renderiza igual).
- **Por qué**: es el patrón usado por páginas fuera del menú (e.g. contacto) y
  no requiere tocar el Header. El enlace del footer ya comunica la ubicación.

### D5: Estrategia de test build-time (sin DOM de JS)
- **Decisión**: `src/pages/privacidad.spec.ts` sigue el patrón de
  `contactFormA11y.spec.ts` / `heroCarousel.spec.ts`: si falta
  `dist/privacidad/index.html`, ejecuta `npx astro build` (timeout 120 s) y
  aserta con regex/contenido sobre el HTML estático final.
- **Qué aserta** (trazable 1:1 con los scenarios del spec):
  1. Existe `dist/privacidad/index.html`.
  2. `<h1>` con el título completo; presencia de "Última actualización:
     Septiembre 2026" y "Ley N° 19.628".
  3. Las 12 cabeceras de sección en orden.
  4. Listas Obligatorios/Opcionales (sección 2) con sus ítems.
  5. Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición).
  6. `mailto:contacto@maticesconsultora.cl` y link `https://maticesconsultora.cl/`.
  7. Tokens del sistema (`bg-crema-calido`, `text-verde-bosque`,
     `font-heading`, `px-4 md:px-16`) y ausencia de `<img`/`style="`.
- **Por qué**: valida exactamente lo que se sirve en producción sin añadir un
  DOM JS, y es el patrón ya consolidado en el repo.

## Risks / Trade-offs

- **[Texto legal extenso → legibilidad]** → Mitigado con ancho de lectura
  (`max-w-4xl`), `leading-relaxed` y separación vertical generosa entre
  secciones; mobile-first con `px-4 md:px-16`.
- **[Duplicación de contenido legal entre página y test]** → El test aserta
  fragmentos estables (títulos, términos legales), no el texto completo; un
  cambio editorial futuro solo requerirá actualizar escenarios si toca esos
  fragmentos.
- **[Tiempo de build en el test]** → Mismo patrón de los tests existentes
  (build solo si falta `dist/`), con timeout de 120 s.
- **[SEO/canonical]** → `Layout` ya emite `title`, `description`, canonical y
  OG para `/privacidad`; `@astrojs/sitemap` incluye la ruta automáticamente.
  Sin riesgo adicional.

## Migration Plan

1. Crear el test `src/pages/privacidad.spec.ts` (TDD) y verificar que FALLA
   (la ruta aún no existe → build sin `dist/privacidad/index.html`).
2. Crear `src/pages/privacidad.astro` con frontmatter (imports + SEO), hero y
   tarjeta con las 12 secciones.
3. Ejecutar el test → verde; luego `pnpm build`, `pnpm lint`, `pnpm test`,
   `bash check-refs.sh`, `bash specboot.sh --ci`.
4. `openspec validate add-privacy-page`.
5. Rollback: eliminar los dos archivos nuevos; el footer vuelve a enlazar a una
   ruta 404 (estado actual).

## Open Questions

- Ninguna pendiente: layout ("artículo simple"), alcance (solo `/privacidad`,
  no `/terminos`) y flujo (ciclo SDD completo) fueron confirmados con el
  usuario.