# Especificación de Diseño: Correcciones Menores

## 1. HTML válido (Footer)

En `Footer.astro` la línea:
```html
<span>Reñaca Norte 25 Of 1207 <br>Viña del Mar - Chile</br></span>
```
debe quedar como:
```html
<span>Reñaca Norte 25 Of 1207 <br />Viña del Mar - Chile</span>
```
(`br` es void; se usa `<br />` auto-cerrado, sin `</br>`).

## 2. Nombre del paquete

`package.json`: `"name": "tmp-astro"` → `"name": "matices-web"`.

## 3. Tipado del spec

`EvidenceGallery.spec.ts`: reemplazar la interfaz local por
`import type { ImageMetadata } from 'astro';`.

## 4. Limpieza de activos

Eliminar (no referenciados en `src/`):
- `src/assets/collaborative-discussion.png`
- `src/assets/collaborative-workshop.png`
- `src/assets/hero-business.png`

Sus homólogos `.webp` se conservan y son los usados por `<Image />`.
