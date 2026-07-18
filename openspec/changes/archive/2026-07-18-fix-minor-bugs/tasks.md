# Plan de Tareas: Correcciones Menores

## Fase 1: Correcciones de Código

- [x] **Corregir `</br>` en Footer.astro** (estimado: 2 min)
- [x] **Renombrar `name` en package.json** a `matices-web` (estimado: 1 min)
- [x] **Importar `ImageMetadata` en EvidenceGallery.spec.ts** (estimado: 3 min)
- [x] **Eliminar `.png` duplicados no referenciados** (estimado: 2 min)

## Fase 2: Verificación

- [x] **`npm test`** pasa.
- [x] **`astro check`** sin nuevos errores (los del GTM en Layout.astro son previos).
- [x] **`openspec validate`** del cambio pasa.
- [x] **`bash check-refs.sh`** y **`bash specboot.sh --ci`** pasan.
