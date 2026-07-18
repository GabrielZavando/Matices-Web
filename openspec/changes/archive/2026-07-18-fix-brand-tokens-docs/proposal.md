# Propuesta de Cambio: Alineación de la Paleta de Marca Documentada al Código (Azul Primario)

Esta propuesta resuelve la inconsistencia de tres paletas en conflicto en el proyecto Matices,
alineando la documentación de diseño (`docs/DESIGN.md` y `docs/frontend-standards.md`) a la
paleta corporativa **ya implementada** en `src/styles/global.css` (azul primario `#243B55`).

## 1. Justificación

Existen tres fuentes de verdad contradictorias para el color de marca:

1. `src/styles/global.css` (código real, en producción): `--color-matices-primary:#243B55`
   (azul), con acento verde lima `#98C245`, azul celeste `#5A7FA3`, naranja `#F09E46`,
   fondo `#F4F7F9`. Además conserva aliases de compatibilidad
   (`--color-verde-bosque`, `--color-crema-calido`, `--color-verde-lima`, `--color-azul-celeste`).
2. `docs/DESIGN.md`: `primary:#236c32` (verde), `secondary:#25667b` (teal), `tertiary:#835400` (oro).
3. `docs/frontend-standards.md` §3: documenta **ambas** paletas a la vez (la verde `#236c32` y
   los tokens matices azules), generando ambigüedad.

El sitio se renderiza actualmente en **azul** (decisión de producto: azul = primario).
La documentación es la fuente de verdad *normativa* (`base-standards.md` §6, `documentation-standards.md`
§1), pero aquí la documentación quedó desactualizada tras el cambio archivado
`2026-05-29-traditional-brand-colors`, que fijó el azul en `global.css` sin actualizar los docs.

## 2. Alcance

- Actualizar `docs/DESIGN.md` para que su paleta refleje el azul primario implementado.
- Actualizar `docs/frontend-standards.md` §3 para eliminar el párrafo contradictorio que cita
  el verde `#236c32` como primario, dejando como única paleta canónica los tokens `matices`.
- Documentar explícitamente que el bloque `<style>` inline de `src/pages/contacto.astro`
  (paleta navy/oliva hardcodeada) es un ítem **diferido** (fuera de alcance de este cambio).

## 3. Fuera de Alcance (este cambio)

- No se modifica `src/styles/global.css` ni ningún componente (se mantiene el código actual azul).
- No se renombran los aliases de compatibilidad (`verde-bosque`, etc.).
- No se purgan los bloques `<style>`/atributos `style=""` (ticket posterior).

## 4. Alineación con RNF

- **RNF3 (Accesibilidad/SEO)**: el azul `#243B55` cumple contraste WCAG AA sobre fondos claros,
  coherente con lo documentado en el cambio archivado `traditional-brand-colors`.
- **Mantenibilidad**: una sola paleta documentada elimina la ambigüedad para futuros agentes IA
  y desarrolladores (cumple `base-standards.md` §1 "cuestionar supuestos" y §6).
