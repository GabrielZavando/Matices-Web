# Propuesta de Cambio: Imagen Open Graph por Defecto (OG Image)

## Why

`src/layouts/Layout.astro` define `ogImage = "/images/og-default.jpg"` como imagen por
defecto para las meta etiquetas `og:image` / `twitter:image`. Sin embargo, el directorio
`public/` está vacío, por lo que la URL resuelve en **404** al compartir el sitio en redes
sociales. Esto viola las buenas prácticas de SEO/RNF3 (`frontend-standards.md`) y degrada
la presencia social de la marca.

## What Changes

- Generar un asset OG real en `public/images/og-default.jpg` (1200×630, fondo azul corporativo
  `#243B55` con el logo de Matices centrado), usando `sharp` (ya disponible como dependencia).
- Verificar que la ruta `/images/og-default.jpg` resuelve 200 tras el build.
- No se modifica `Layout.astro` (la ruta por defecto ya es correcta; solo faltaba el archivo).

## Impacto

Solo añade un asset estático en `public/`. Sin cambios de código ni de paleta.
