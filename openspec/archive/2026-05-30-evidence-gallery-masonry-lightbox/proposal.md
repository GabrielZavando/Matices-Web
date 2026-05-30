# Proposal: EvidenceGallery — Masonry Grid + Lightbox Interactivo

**Change ID:** `evidence-gallery-masonry-lightbox`  
**Fecha:** 2026-05-30  
**Agente:** Analyst Agent (OpenSpec)  
**Alcance:** Modificación exclusiva de `src/components/ui/EvidenceGallery.astro`

---

## 1. Resumen Ejecutivo

El componente `<EvidenceGallery />` actualmente renderiza las 15 imágenes de
`src/assets/gallery/` como una grilla de columnas CSS de altura variable, pero
carece de interactividad. Este cambio lo transforma en una galería profesional
con dos capas claramente separadas:

1. **Grilla Masonry**: disposición de columnas fluidas CSS con `gap` de `5px`
   fijo entre elementos, imágenes reescaladas a tamaño reducido mediante `<Image
   />` nativo de Astro (formato AVIF/WebP).
2. **Lightbox Modal**: overlay nativo con Vanilla JS — sin librerías externas —
   que expone la imagen activa a tamaño completo con controles de navegación
   (`<` / `>`), contador de posición (`N - Total`), cierre por tecla `Esc`,
   clic en zona exterior o botón `X`.

Ambas capas se implementan **dentro del mismo archivo `.astro`** (frontmatter
Astro + `<script>` Vanilla JS), sin tocar ninguna página ni Layout.

---

## 2. Justificación Técnica por RNF

### RNF1 — Rendimiento de Carga (Speed)

| Elemento | Estrategia |
|---|---|
| Imágenes grilla | `<Image />` de `astro:assets` con `width={400}` y `format="avif"`, generando variantes optimizadas en build time. Eliminan el JPEG original de entre 73 KB y 251 KB, reduciéndolos a ~15–40 KB por thumbnail. |
| Imágenes modal | Las mismas rutas de imagen ya procesadas por Astro. No se carga una versión HD adicional innecesaria. |
| JavaScript del modal | Vanilla JS encapsulado en `<script>` de Astro. Se emite como módulo de isla estática — 0 dependencias externas — y pesa menos de 2 KB minificado. |
| CSS del modal | Clases Tailwind compiladas en build time. No hay CSS en línea de runtime extra. |

### RNF2 — Responsividad (Responsive / Mobile-First)

La grilla usa `columns-1 sm:columns-2 md:columns-3 lg:columns-4` como
baseline mobile-first. El espaciado entre columnas es el `gap` nativo de CSS
multi-column (`column-gap: 5px`) con `gap-y` equivalente controlado via
`margin-bottom` de cada tarjeta. En pantallas `< sm` (< 640 px), la galería
colapsa a una columna única para máxima legibilidad táctil.

El modal es `fixed inset-0` con `100dvh` para cobertura correcta en iOS Safari.
Los controles de navegación tienen área táctil mínima de `44×44 px` (WCAG 2.5.5).

### RNF3 — SEO y Accesibilidad Semántica

| Elemento | Implementación |
|---|---|
| `alt` descriptivos | Cada `<Image />` en la grilla mantiene el texto `alt` enumerado existente. El `<img>` del modal hereda el mismo `alt` dinámicamente vía JS. |
| Rol ARIA del modal | `role="dialog"` + `aria-modal="true"` + `aria-label="Galería de evidencia"`. |
| Foco del teclado | Al abrir el modal, el foco se mueve al botón de cierre. Al cerrar, regresa al thumbnail activador. |
| `<figure>` semántico | Cada tarjeta de la grilla se envuelve en `<figure>` en lugar de `<div>` genérico. |

---

## 3. Decisiones de Diseño Clave

### 3.1 Masonry con CSS `columns` nativo

Se elige `columns` CSS (no CSS Grid Masonry experimental) por compatibilidad
total con los browsers objetivo del proyecto (Hostinger shared — sin bundling
WASM). `break-inside-avoid` garantiza que ninguna imagen se parta entre columnas.
El `gap` de `5px` se aplica combinando `column-gap: 5px` en el contenedor y
`margin-bottom: 5px` en cada `<figure>`.

### 3.2 Tamaño reducido de thumbnails

Se fija `width={400}` como ancho de renderizado en grilla, lo que da un
thumbnail de calidad suficiente para pantallas HiDPI en la columna más ancha
(~300 px reales), con espacio de head room del 33%. El atributo `height` se
omite para preservar el ratio natural y lograr el efecto Masonry de alturas
variables.

### 3.3 Modal sin librerías externas

El modal se estructura como un elemento `<div id="lb-modal">` oculto
(`hidden` / `opacity-0 pointer-events-none`) que cambia su estado vía
classList de Tailwind. El script gestiona:
- Array `images[]` con `src` y `alt` de cada imagen.
- Variable `currentIndex` mutable.
- Funciones `openModal(index)`, `closeModal()`, `navigate(dir)`.
- Event listeners: `click` en thumbnails, botones `X`/`<`/`>`, backdrop;
  `keydown` global para `Esc`, `ArrowLeft`, `ArrowRight`.

---

## 4. Fuera de Alcance (Explícito)

- ❌ No se modifican `index.astro`, `testing.astro`, `formacion.astro`.
- ❌ No se alteran las rutas ni nombres de los 15 archivos `.jpeg` en
  `src/assets/gallery/`.
- ❌ No se toca `Layout.astro` ni archivos de configuración global.
- ❌ No se instalan librerías npm adicionales.
- ❌ No se definen colores hex manuales fuera del sistema de tokens.
