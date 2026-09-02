## Context

El proyecto Matices Web (Astro 6 SSG + Tailwind CSS v4) utiliza dos familias
tipográficas: **Plus Jakarta Sans** (`--font-sans`, cuerpo/UI) y
**Playfair Display** (`--font-heading`, cabeceras/display). La fuente de
cabeceras se carga vía Google Fonts desde `src/layouts/Layout.astro` con rango
variable de pesos (`0,400..900`) e itálicas, y se referencia en la
documentación de identidad (`docs/DESIGN.md`,
`docs/frontend-standards.md`, `docs/assets/design/code.html`) y en specs
activos (`openspec/specs/brand-design-system/spec.md`,
`openspec/specs/error-page-404/spec.md`).

El cliente solicita sustituir Playfair Display por **Antic**, una tipografía
de Google Fonts de estética limpia y moderna.

## Goals / Non-Goals

**Goals:**
- Migrar el token `--font-heading` a **Antic** en `src/styles/global.css`.
- Sustituir la carga webfont de Playfair Display por Antic en `Layout.astro`.
- Mantener la coherencia en documentación de identidad y specs activos.
- Preservar el uso de `font-heading` en los componentes/páginas actuales (sin
  renombrar clases ni reestructurar componentes).

**Non-Goals:**
- No cambiar `--font-sans` (Plus Jakarta Sans sigue siendo la fuente de cuerpo).
- No reconciliar la tipografía inline `Manrope` de `src/pages/contacto.astro`
  (ítem diferido documentado, fuera de alcance).
- No modificar archivos históricos en `openspec/archive/`.
- No introducir una nueva fuente webfont adicional ni auto-hospedada.

## Decisions

### Decisión 1: Sustituir el valor del token `--font-heading` por Antic

**Decisión:** Cambiar
`--font-heading: "Playfair Display", ui-serif, Georgia, serif;` a
`--font-heading: "Antic", ui-sans-serif, system-ui, sans-serif;` en
`src/styles/global.css` dentro de `@theme`.

**Racional:** Antic es una sans-serif, por lo que el stack de fallback debe ser
`ui-sans-serif, system-ui, sans-serif` (no `ui-serif`). El token `font-heading`
se mantiene como nombre de contrato: todos los `h1..h4` y elementos con clase
`font-heading` heredan la nueva fuente sin tocar componentes.

**Alternativas consideradas:**
- Crear un token nuevo (`--font-display`) y re-mapear componentes: mayor
  superficie de cambio, innecesario para una sustitución 1:1 de fuente.
- Auto-hospedar Antic con `@fontsource`: evita dependencia de Google Fonts,
  pero el proyecto ya usa Google Fonts para Plus Jakarta Sans y Material
  Symbols; añadir auto-hosting es un cambio mayor fuera del alcance.

### Decisión 2: Antic solo tiene peso 400 — no hay variantes bold/italic

**Decisión:** Cargar `family=Antic` (peso único 400) y aceptar el fallback del
navegador para pesos `600/700/800` (synthetic bold) en cabeceras. Documentar
esta limitación en `docs/DESIGN.md` y `docs/frontend-standards.md`.

**Racional:** La API de Google Fonts devuelve únicamente `font-weight: 400`
para Antic (verificado vía CSS2). Los headings que usan `font-bold`/
`font-extrabold` (p.ej. el "404" con `font-extrabold`) seguirán renderizando
con Antic y el navegador aplicará síntesis de negrita. Esto es un trade-off
visual aceptado por el cliente al elegir la fuente.

**Alternativas consideradas:**
- Mantener Playfair Display para pesos bold y usar Antic solo en algunos
  niveles: contradice la petición de sustituir la fuente por completo.
- Emparejar Antic con otra fuente bold: fuera de alcance (no solicitado).

### Decisión 3: Carga webfont en `Layout.astro` sin Playfair Display

**Decisión:** En `src/layouts/Layout.astro`, reemplazar la URL de Google Fonts:

```html
<!-- antes -->
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap
<!-- después -->
https://fonts.googleapis.com/css2?family=Antic&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap
```

**Racional:** Eliminar la petición de Playfair Display evita descargar una
webfont no utilizada (mejora de rendimiento RNF1). Los preconnects existentes
se mantienen.

### Decisión 4: Documentación y assets de diseño alineados con el token

**Decisión:** Actualizar `docs/DESIGN.md` (sección `typography` → `fontFamily`
de display-lg/headline-* → `Antic`; narrativa "Typography" punto 1),
`docs/frontend-standards.md` §3 Tipografía, y `docs/assets/design/code.html`
(`fontFamily` → `["Antic"]`).

**Racional:** La spec `brand-design-system` exige que la documentación
canónica coincida con los tokens implementados (evita divergencia
documentada↔código).

## Risks / Trade-offs

- **Pérdida de pesos bold/itálicas en cabeceras** → Mitigación: Antic solo
  tiene peso 400; los pesos `600/700/800` usan synthetic bold. Se documenta la
  limitación en `docs/DESIGN.md` para que sea una decisión consciente de
  producto. Riesgo aceptado.
- **Cambio de carácter visual (serif → sans) en titulares** → Mitigación:
  cambio solicitado explícitamente por el cliente; el mensaje de marca pasa de
  "Sophisticated Elegance" (serif) a un estilo más limpio/moderno. Se refleja
  en la narrativa de `docs/DESIGN.md`.
- **Referencias residuales a Playfair Display** → Mitigación: barrido
  `grep -ri "playfair"` sobre contexto activo (excluyendo `openspec/archive/`)
  como criterio de aceptación en tareas.
- **Render de `font-extrabold` en el "404"** → Mitigación: synthetic bold;
  verificación visual en `/verify` y en el flujo de diseño.

## Migration Plan

1. Actualizar token `--font-heading` en `src/styles/global.css`.
2. Actualizar URL de Google Fonts en `src/layouts/Layout.astro`.
3. Actualizar `docs/assets/design/code.html`.
4. Actualizar `docs/DESIGN.md` y `docs/frontend-standards.md`.
5. Barrido de referencias residuales en contexto activo.

**Rollback:** revertir el valor de `--font-heading` y la URL de Google Fonts
solo requiere dos cambios puntuales (token + link); el resto de artefactos son
documentales y no bloquean el deploy.

## Open Questions

- ¿Se desea mantener `font-heading` como nombre del token o renombrarlo a
  `font-display`? (Se asume mantener `font-heading` para minimizar el cambio;
  confirmar en revisión.)
- ¿El cliente acepta explícitamente la pérdida de variantes bold/itálica de
  Antic en cabeceras? (Asumido como aceptado por la selección de la fuente;
  documentado como riesgo.)