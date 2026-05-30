# Design: EvidenceGallery — Masonry Grid + Lightbox

**Change ID:** `evidence-gallery-masonry-lightbox`  
**Sistema de Diseño:** Natural Vitality  
**Fuentes:** `docs/DESIGN.md`, `docs/frontend-standards.md`

---

## 1. Tokens de Color

| Rol en Componente | Token Sistema | Valor Hex | Clase Tailwind |
|---|---|---|---|
| Fondo overlay modal | `--color-on-background` al 80% | `#191c1c cc` | `bg-[#191c1c]/80` |
| Backdrop blur modal | N/A — efecto | — | `backdrop-blur-sm` |
| Borde de figura (grilla) | `surface-container-lowest` | `#ffffff` | `ring-1 ring-white/60` |
| Sombra de figura (grilla) | Shadow tinted teal (6% opacidad) | `#25667b 0f` | `shadow-md` (personalizado via `shadow-teal`) |
| Sombra hover | Ambient glow primario | — | `hover:shadow-xl` |
| Botones del modal (fondo) | `surface-container` | `#edeeed` | `bg-surface-container` |
| Botones del modal (texto) | `on-surface` | `#191c1c` | `text-on-surface` |
| Botón X (hover) | `error-container` | `#ffdad6` | `hover:bg-error-container` |
| Contador posición | `inverse-on-surface` | `#f0f1f0` | `text-inverse-on-surface` |
| Figura fondo (loading state) | `surface-container-high` | `#e7e8e7` | `bg-surface-container-high` |

> **Restricción activa:** No se usan valores hex directamente en el HTML.
> Todos los valores se expresan como clases Tailwind o variables CSS
> `--color-matices-*` ya registradas en el proyecto.

---

## 2. Tipografía

| Elemento | Rol tipográfico | Fuente | Clase Tailwind |
|---|---|---|---|
| Contador `N - Total` | `label-md` reducido | Plus Jakarta Sans | `font-sans text-[9px] tracking-widest` |
| Botones `<` / `>` | Label UI | Plus Jakarta Sans | `font-sans text-base font-semibold` |
| Botón `X` | Label UI | Plus Jakarta Sans | `font-sans text-sm font-semibold` |

> **Nota:** El tamaño de `9px` para el contador es una especificación fija del
> brief. Se expresa como clase arbitraria `text-[9px]` de Tailwind.

---

## 3. Formas y Radios

| Elemento | Radio Design System | Clase Tailwind |
|---|---|---|
| `<figure>` thumbnail | Containers/Cards → `1rem` (16px) | `rounded-2xl` |
| Imagen dentro de `<figure>` | Hereda del contenedor | `rounded-2xl` |
| Botones `<` / `>` del modal | Standard UI → `0.5rem` (8px) | `rounded-lg` |
| Botón `X` del modal | Standard UI → `0.5rem` (8px) | `rounded-full` |
| Imagen modal (contenedor) | Media/Imagery → `1.5rem` | `rounded-3xl` |

---

## 4. Espaciado y Layout

### 4.1 Grilla Masonry (Mobile-First)

```
Mobile  (<640px):  columns-1  |  column-gap: 5px  |  mb: 5px por figura
sm      (≥640px):  columns-2  |  column-gap: 5px  |  mb: 5px por figura
md      (≥768px):  columns-3  |  column-gap: 5px  |  mb: 5px por figura
lg      (≥1024px): columns-4  |  column-gap: 5px  |  mb: 5px por figura
```

**Implementación exacta del `gap` de 5px:**
```html
<div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4"
     style="column-gap: 5px;">
  <figure class="break-inside-avoid mb-[5px]">...</figure>
</div>
```

> El `gap` de `5px` no corresponde a ningún paso del espaciado de
> Tailwind (`gap-1` = 4px, `gap-2` = 8px), por lo que se usa la
> clase arbitraria `mb-[5px]` y el inline style `column-gap: 5px`
> exclusivamente para este valor fijo de especificación.

### 4.2 Tamaño de thumbnails

- `width={400}` en `<Image />` → procesado por Astro en build time a AVIF.
- `height` omitido → la imagen mantiene su ratio nativo.
- `class="w-full h-auto"` → ocupa el 100% del ancho de la columna.

### 4.3 Modal Lightbox

```
Overlay:       fixed inset-0  |  z-50  |  bg-[#191c1c]/80 backdrop-blur-sm
Contenedor:    flex flex-col items-center justify-center  |  p-4 sm:p-8
Imagen modal:  max-w-[90vw] max-h-[80dvh]  |  object-contain  |  rounded-3xl
Controles:     absolute, laterales  |  min-w-[44px] min-h-[44px] (WCAG táctil)
Botón X:       absolute top-4 right-4
Contador:      mt-3 text-center
```

---

## 5. Elevación y Sombras

| Elemento | Nivel Material | Implementación |
|---|---|---|
| `<figure>` reposo | Level 1 | `shadow-md` + `ring-1 ring-white/60` |
| `<figure>` hover | Ambient glow elevado | `hover:shadow-xl` + `hover:scale-[1.02]` |
| Modal overlay | Level 4 (Overlay) | `backdrop-blur-sm` + `bg-[#191c1c]/80` |

---

## 6. Transiciones y Micro-animaciones

| Elemento | Propiedad | Valor | Clase Tailwind |
|---|---|---|---|
| Thumbnail hover | scale + shadow | 300ms ease | `transition-all duration-300` |
| Modal apertura/cierre | opacity + scale | 200ms ease-out | `transition-[opacity,transform] duration-200` |
| Imagen modal cambio | opacity fade | 150ms ease | JS → `opacity-0` → swap → `opacity-100` |
| Botones nav hover | background-color | 150ms | `transition-colors duration-150` |

---

## 7. Accesibilidad (ARIA)

```html
<!-- Modal -->
<div
  id="lb-modal"
  role="dialog"
  aria-modal="true"
  aria-label="Galería de evidencia"
  aria-live="polite"
>
  <!-- Botón cierre -->
  <button id="lb-close" aria-label="Cerrar galería">X</button>

  <!-- Controles navegación -->
  <button id="lb-prev" aria-label="Imagen anterior">&lt;</button>
  <button id="lb-next" aria-label="Imagen siguiente">&gt;</button>

  <!-- Imagen activa -->
  <img id="lb-img" alt="" />  <!-- alt se inyecta vía JS desde el array -->

  <!-- Contador -->
  <p id="lb-counter" aria-live="polite"></p>
</div>
```
