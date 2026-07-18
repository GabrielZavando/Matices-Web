# Plan de Tareas: Alineación de Paleta Documentada (Azul Primario)

Pasos secuenciales para alinear la documentación de diseño al código implementado.
Cumple reglas SDD: specs antes de código, un task a la vez.

## Fase 1: Documentación de Diseño (DESIGN.md)

- [x] **Actualizar la paleta en `docs/DESIGN.md`** (estimado: 15 min)
  - En la sección `colors:` (frontmatter), reemplazar los valores por la paleta azul primario:
    - `primary: '#243B55'`
    - `secondary: '#5A7FA3'`
    - `tertiary: '#98C245'`
    - `surface-tint: '#243B55'`
    - `primary-container` / `on-primary-container` y `secondary`/`tertiary` coherentes con la tabla del design.md de este cambio.
  - En "## Colors", reescribir la descripción: Primary = Azul corporativo profundo (no verde),
    Secondary = Azul celeste, Tertiary = Verde lima acento. Eliminar referencias a "Lively Green".
  - Mantener `background: '#f9f9f8'` o alinear a `#F4F7F9` según `matices-bg`.

## Fase 2: Estándares Frontend (frontend-standards.md)

- [x] **Corregir `docs/frontend-standards.md` §3** (estimado: 10 min)
  - Eliminar el párrafo que documenta `primary: #236c32` (verde) y `secondary: #25667b` (teal)
    como paleta corporativa, pues contradice el código.
  - Dejar única paleta canónica: los tokens `matices` de `global.css`
    (`--color-matices-primary:#243B55`, `--color-matices-blue:#5A7FA3`,
    `--color-matices-green:#98C245`, `--color-matices-orange:#F09E46`, `--color-matices-bg:#F4F7F9`)
    y sus aliases de compatibilidad.
  - Añadir nota de que `contacto.astro` tiene un `<style>` inline diferido.

## Fase 3: Verificación

- [x] **Ejecutar `bash check-refs.sh`** (estimado: 5 min)
  - Confirmar que no hay referencias `{file:...}` rotas tras los cambios.
- [x] **Ejecutar `bash specboot.sh --ci`** (estimado: 5 min)
  - Validar estructura y ausencia de placeholders sin reemplazar.
- [x] **Verificación cruzada manual**: confirmar que los valores hex en DESIGN.md,
  frontend-standards.md y global.css coinciden (sin tres paletas divergentes).
