# Plan de Tareas: Imagen OG por Defecto

## Fase 1: Generación del Asset

- [x] **Generar `public/images/og-default.jpg`** (estimado: 10 min)
  - Script con `sharp`: lienzo 1200×630 fondo `#243B55` + logo centrado.
  - Confirmar que el archivo se crea en `public/images/`.

## Fase 2: Verificación

- [x] **`astro build` y comprobar el asset** (estimado: 5 min)
  - El build debe producir `dist/images/og-default.jpg`.
  - Grepear `dist/` para confirmar `og:image` apunta a `/images/og-default.jpg`.
- [x] **`openspec validate`** del cambio pasa.
- [x] **`bash check-refs.sh`** y **`bash specboot.sh --ci`** pasan.
