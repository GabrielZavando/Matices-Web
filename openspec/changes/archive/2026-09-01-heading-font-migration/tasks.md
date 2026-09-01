# Tasks — heading-font-migration

## 1. Tokens de tipografía (código)

- [x] 1.1 Cambiar `--font-heading: "Playfair Display", ui-serif, Georgia, serif;` a `--font-heading: "Antic", ui-sans-serif, system-ui, sans-serif;` en `src/styles/global.css` (bloque `@theme`).
- [x] 1.2 Verificar que `--font-sans` (Plus Jakarta Sans) permanece intacto en `src/styles/global.css`.

## 2. Carga de fuente (Layout)

- [x] 2.1 En `src/layouts/Layout.astro`, reemplazar `family=Playfair+Display:ital,wght@0,400..900;1,400..900` por `family=Antic` en la URL de Google Fonts del `<head>`.
- [x] 2.2 Confirmar que la URL final contiene `Antic` y `Plus+Jakarta+Sans`, y no contiene `Playfair+Display`.
- [x] 2.3 Verificar que los preconnects de `fonts.googleapis.com` / `fonts.gstatic.com` se mantienen sin cambios.

## 3. Assets de diseño (code.html)

- [x] 3.1 En `docs/assets/design/code.html`, sustituir `"Playfair Display"` por `"Antic"` en `tailwind.config.theme.extend.fontFamily` para `headline-md`, `headline-lg`, `display-lg` y `headline-lg-mobile`.
- [x] 3.2 Sustituir la URL de Google Fonts en `docs/assets/design/code.html` (`family=Playfair+Display:wght@600;700` → `family=Antic`).

## 4. Documentación de identidad

- [x] 4.1 En `docs/DESIGN.md` sección `typography` frontmatter, cambiar `fontFamily: Playfair Display` → `fontFamily: Antic` en `display-lg`, `headline-lg`, `headline-lg-mobile` y `headline-md`.
- [x] 4.2 En `docs/DESIGN.md` sección narrativa "Typography", sustituir el punto 1 (Playfair Display serif) por la descripción de Antic (sans serif, peso único 400, synthetic bold para pesos mayores).
- [x] 4.3 En `docs/frontend-standards.md` §3 Tipografía, cambiar "Cabeceras: **Playfair Display**" por "Cabeceras: **Antic**" y documentar la limitación de peso único.

## 5. Specs (deltas de capabilities)

- [x] 5.1 Crear `openspec/changes/heading-font-migration/specs/brand-design-system/spec.md` (ADDED Requirement: Canonical Brand Typography → Antic, con scenarios).
- [x] 5.2 Crear `openspec/changes/heading-font-migration/specs/error-page-404/spec.md` (MODIFIED Requirement: Hero Section → `font-heading` (Antic)).
- [x] 5.3 Confirmar que los specs canónicos (`openspec/specs/`) NO se modifican en `/apply`: los deltas se fusionan en `/archive` vía `openspec archive`.

## 6. Verificación y barrido

- [x] 6.1 Ejecutar `grep -ri "playfair" src/ docs/ openspec/specs/` y confirmar que no hay coincidencias en contexto activo (permitido solo en `openspec/archive/` y `openspec/changes/archive/`).
- [x] 6.2 Ejecutar `npx openspec validate heading-font-migration` y corregir cualquier error hasta que pase.
- [x] 6.3 Ejecutar `bash specboot.sh --ci` y confirmar 0 errores.
- [x] 6.4 Ejecutar `npm test` y `astro check` (pipelines `pre_verify` del `openspec/config.yaml`) y confirmar que no hay regresiones.