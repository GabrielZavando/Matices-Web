# Propuesta de Cambio: Correcciones de Correctitud Menores

## Why

Cuatro defectos de baja gravedad pero que violan estándares del proyecto:

1. `src/components/global/Footer.astro:76` usa `</br>` (cierre de un elemento void
   `br`), HTML inválido.
2. `package.json` tiene `name: "tmp-astro"`, un placeholder sin reemplazar, violando
   `base-standards.md` §8 ("no dejar placeholders sin reemplazar").
3. `src/components/ui/EvidenceGallery.spec.ts` redeclara localmente `interface ImageMetadata`
   en lugar de importar el tipo real de `astro`, debilitando el tipado.
4. `src/assets/` contiene archivos `.png` duplicados de sus versiones `.webp`
   (`collaborative-discussion`, `collaborative-workshop`, `hero-business`) que no se
   referencian en ningún lado (activos muertos).

## What Changes

- Corregir `</br>` en Footer.astro.
- Renombrar `package.json` `name` a `matices-web`.
- Importar `ImageMetadata` desde `astro` en el spec (eliminar redeclaración local).
- Eliminar los `.png` duplicados no referenciados.

## Impacto

Cambios locales y aislados; sin efecto en la paleta ni en el contrato del formulario.
