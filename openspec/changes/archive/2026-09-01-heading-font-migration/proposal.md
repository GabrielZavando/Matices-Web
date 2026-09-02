## Why

La identidad tipográfica actual depende de **Playfair Display** para cabeceras
(`font-heading`), una serif de alto contraste cargada como fuente webfont con
rango variable de pesos e itálicas. El cliente solicita reemplazar esta fuente
por **Antic** (Google Fonts), una tipografía de un único peso con una
apariencia más limpia y moderna, manteniendo el carácter distintivo de los
titulares del sitio. El cambio debe reflejarse de forma consistente en el
código (tokens + carga de fuente) y en la documentación de identidad de marca
(`docs/DESIGN.md`, `docs/frontend-standards.md` y assets de diseño).

## What Changes

- **BREAKING (visual)**: Sustituir la fuente de cabeceras `--font-heading` de
  `"Playfair Display"` a `"Antic"` en `src/styles/global.css` (token de
  tipografía de Tailwind v4 `@theme`).
- Sustituir la carga webfont en `src/layouts/Layout.astro`: eliminar
  `family=Playfair+Display:ital,wght@...` y añadir `family=Antic` a la URL de
  Google Fonts (Antic solo expone el peso 400 regular).
- Actualizar la definición de tokens de tipografía en
  `docs/assets/design/code.html` (`fontFamily.headline-*` y `display-lg`:
  `"Playfair Display"` → `"Antic"`).
- Actualizar la documentación de identidad:
  - `docs/DESIGN.md`: sección `typography` (display-lg, headline-lg,
    headline-lg-mobile, headline-md) y sección narrativa "Typography"
    (punto 1: Playfair Display → Antic).
  - `docs/frontend-standards.md` §3 Tipografía (cabeceras: Playfair Display →
    Antic).
- Actualizar los specs activos que referencian la tipografía de cabeceras:
  - `openspec/changes/heading-font-migration/specs/brand-design-system/spec.md`
    (delta: requisito de token tipográfico canónico).
  - `openspec/changes/heading-font-migration/specs/error-page-404/spec.md`
    (delta: el "404" usa `font-heading` → ahora Antic).
- Los archivos de `openspec/archive/` son históricos e **intocables**: no se
  modifican.

## Capabilities

### New Capabilities

- `heading-font-migration`: Contrato del cambio de tipografía de cabeceras de
  Playfair Display a Antic. Define cómo el token `font-heading`, la carga de
  webfont y los artefactos de documentación convergen a la nueva fuente, y
  cómo las páginas afectadas (p.ej. 404) siguen usando `font-heading` sin
  referencias obsoletas a Playfair Display en el contexto activo.

### Modified Capabilities

- `brand-design-system`: El requisito de token tipográfico canónico se
  extiende para especificar que `--font-heading` es **Antic** (fuente de
  cabeceras) y que la documentación de identidad debe coincidir con el token
  implementado.
- `error-page-404`: El requisito "Hero Section" cambia su definición de la
  tipografía del número "404" de "Playfair Display" a **Antic**
  (`font-heading`), manteniendo tamaño, peso y color.

## Impact

- **Código**: `src/styles/global.css` (token `--font-heading`);
  `src/layouts/Layout.astro` (URL de Google Fonts).
- **Documentación**: `docs/DESIGN.md`, `docs/frontend-standards.md`,
  `docs/assets/design/code.html`.
- **Specs**: delta specs para `brand-design-system` y `error-page-404`.
- **Sin impacto**: `--font-sans` (Plus Jakarta Sans) se mantiene intacto; la
  sub-paleta y tipografía de la página de contacto (`Manrope` inline, ya
  documentada como ítem diferido) queda fuera de alcance; los archivos
  `openspec/archive/` no se tocan.