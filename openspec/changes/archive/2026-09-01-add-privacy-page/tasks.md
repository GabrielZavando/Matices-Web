# Plan de Tareas: Página legal de Política de Privacidad (`add-privacy-page`)

Cumple SDD: specs antes de código, TDD (test fallido primero), sin `any`, sin
estilos inline, mobile-first. Ruta sugerida: `src/pages/privacidad.astro`;
test: `src/pages/privacidad.spec.ts` (patrón build-time de
`contactFormA11y.spec.ts` / `heroCarousel.spec.ts`).

## 1. Test TDD (fallido primero)

- [x] 1.1 Crear el test de la página (capa `dumb`, prioridad alta,
      ~1.0 h) siguiendo el patrón de `contactFormA11y.spec.ts`:
      build `npx astro build` si falta `dist/privacidad/index.html` (timeout
      120 s) y asertar sobre el HTML estático. **Incidencia**: Astro 6 trata
      cualquier `.ts` de `src/pages/` como endpoint; el test se creó como
      `src/pages/_privacidad.spec.ts` (prefijo `_` = convención Astro para
      ignorar el archivo en el router; Vitest lo sigue ejecutando).
      - [x] 1.1.1 `dist/privacidad/index.html` existe.
      - [x] 1.1.2 `<h1>` contiene "Política de Privacidad y Protección de
        Datos Personales"; presencia de "Última actualización: Septiembre 2026"
        y "Ley N° 19.628".
      - [x] 1.1.3 Las 12 cabeceras de sección en orden ("1. Introducción" …
        "12. Contacto").
      - [x] 1.1.4 Sección 2: lista "Obligatorios" (Nombres y Apellidos, Correo
        electrónico, Teléfono) y "Opcionales" (Nombre de la empresa, Cargo
        dentro de la organización, Tamaño de la empresa).
      - [x] 1.1.5 Sección 9: Derechos ARCO con "Acceso", "Rectificación",
        "Cancelación" y "Oposición".
      - [x] 1.1.6 Sección 12: `<a href="mailto:contacto@maticesconsultora.cl">`
        y enlace a `https://maticesconsultora.cl/`.
      - [x] 1.1.7 Tokens del sistema de diseño en el markup
        (`bg-crema-calido`, `text-verde-bosque`, `font-heading`,
        `px-4 md:px-16`) y ausencia de `<img` y de `style=` (scope `<main>`).
- [x] 1.2 Ejecutar `pnpm test src/pages/_privacidad.spec.ts` y confirmar que
      FALLA (rojo) porque la ruta `/privacidad` aún no existe en el build
      (`ENOENT: dist/privacidad/index.html`).

## 2. Implementación

- [x] 2.1 Crear `src/pages/privacidad.astro` (capa `dumb`, prioridad alta,
      ~2.0 h) con frontmatter:
      - [x] 2.1.1 Imports: `Layout`, `Header`, `Footer`, `Reveal`.
      - [x] 2.1.2 Props SEO del `<Layout>`: `title="Política de Privacidad"` y
        `description` orientada a privacidad/datos personales (ES).
      - [x] 2.1.3 `<Header activePath="/privacidad" />` (sin ítem activo en el
        nav, patrón de páginas fuera del menú).
- [x] 2.2 Markup del hero (una columna, mobile-first):
      - [x] 2.2.1 `<section>` con badge pill `bg-verde-lima/10
        text-verde-bosque` ("Privacidad & Protección de Datos"), `<h1>` en
        `font-heading` con el título completo de la política.
      - [x] 2.2.2 Badge/nota "Última actualización: Septiembre 2026".
      - [x] 2.2.3 `Reveal` sutil (`fade-up`) solo en el bloque del hero.
- [x] 2.3 Tarjeta blanca con el documento legal (contenido del cliente
      transcrito fielmente):
      - [x] 2.3.1 Contenedor `bg-white rounded-[2.5rem] border
        border-verde-bosque/5 max-w-4xl mx-auto` con `px-4 md:px-16` y
        `py-12 md:py-16`.
      - [x] 2.3.2 12 `<section>` con `<h2>` numerados y `<p>` (secciones 1, 3-8,
        10-12 tal cual el texto del cliente).
      - [x] 2.3.3 Sección 2 con dos `<ul>`: "Obligatorios" y "Opcionales".
      - [x] 2.3.4 Sección 5: `<ul>`/texto de cookies (GTM/GA) sin
        reinterpretación.
      - [x] 2.3.5 Sección 9: `<ul>` con los 4 derechos ARCO.
      - [x] 2.3.6 Sección 12: `<a href="mailto:contacto@maticesconsultora.cl">`
        y `<a href="https://maticesconsultora.cl/" ...>` con
        `rel="noopener noreferrer"` si es externo.
- [x] 2.4 Reglas de calidad:
      - [x] 2.4.1 Solo clases utilitarias Tailwind con tokens del sistema; sin
        estilos inline ni `<style>` scoped.
      - [x] 2.4.2 Sin `<img>` (la página no requiere imágenes), HTML semántico
        (`main`, `section`, `h1`, `h2`, `p`, `ul`/`li`), tipado completo (no
        hay TS de página; solo imports tipados por Astro).
      - [x] 2.4.3 `</Layout>` correctamente cerrado con `<Footer />` antes.

## 3. Verificación

- [x] 3.1 `pnpm test src/pages/_privacidad.spec.ts` pasa (verde, 15/15), y
      `pnpm test` completo (nuevos + existentes) sin regresiones (13 archivos /
      69 tests, ~0.3 h).
- [x] 3.2 `pnpm build` exitoso: 9 páginas; `dist/privacidad/index.html`
      generado y `/privacidad` incluido en el sitemap.
- [x] 3.3 `pnpm lint` (`astro check`) sin nuevos errores (0 errors, 0 warnings;
      se corrigió ts(2532) en el spec con `?? ''`).
- [x] 3.4 `bash check-refs.sh` (0 errores) y `bash specboot.sh --ci`
      (0 errores/warnings) pasan.
- [x] 3.5 `openspec validate add-privacy-page` pasa ("Change is valid").
- [x] 3.6 Inspección de `/privacidad` sobre el HTML estático de `dist/`
      (proxy de preview; sin navegador en este entorno): header/footer
      presentes, hero con badge y título, documento con las 12 secciones,
      enlaces de contacto funcionales, sin ítem activo en el nav
      (`aria-current` ausente).