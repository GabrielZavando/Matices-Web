# Plan de Tareas: Animación Ambiental / Decorativa (`anim-ambient`)

Aplica `animate-float` a orbes decorativos y acentos de hero. Reutiliza
`anim-foundation`.

---

## Fase 1: Guarda de accesibilidad

### [x] Tarea 1.1: Desactivar `animate-float` bajo `prefers-reduced-motion`
* **Descripción**: Añadir al final de `src/styles/global.css` el bloque `@media (prefers-reduced-motion: reduce) { .animate-float { animation: none !important; } }`.
* **Estimación**: 10 min.
* **Criterio de aceptación**: Bajo reduced-motion los elementos con `animate-float` permanecen estáticos; `astro check` pasa.

## Fase 2: Orbes de contacto

### [x] Tarea 2.1: Flotar los orbes de `contacto.astro`
* **Descripción**: Aplicar `animate-float` (con `[animation-delay:0ms|2s|4s]`) a los 3 orbes de fondo y al cluster ambiental inferior de `src/pages/contacto.astro`.
* **Estimación**: 20 min.
* **Criterio de aceptación**: Los orbes flotan con deriva escalonada; `astro check` pasa.

## Fase 3: Acentos en heroes

### [x] Tarea 3.1: Acentos flotantes en `index.astro`
* **Descripción**: Añadir un blob decorativo `animate-float` al hero y aplicar `animate-float` al badge "98% Match".
* **Estimación**: 15 min.
* **Criterio de aceptación**: Hero con movimiento ambiental sutil; `astro check` pasa.

### [x] Tarea 3.2: Acentos flotantes en `talento.astro`
* **Descripción**: Blob decorativo `animate-float` en el hero + `animate-float` al badge "98%".
* **Estimación**: 15 min.
* **Criterio de aceptación**: Hero animado ambientalmente; `astro check` pasa.

### [x] Tarea 3.3: Acentos flotantes en `psicologia.astro`
* **Descripción**: Blob decorativo `animate-float` en el hero + `animate-float` al badge "+15 Años".
* **Estimación**: 15 min.
* **Criterio de aceptación**: Hero animado ambientalmente; `astro check` pasa.

### [x] Tarea 3.4: Acentos flotantes en `testing.astro`, `id.astro`, `formacion.astro`
* **Descripción**: Añadir un blob decorativo `animate-float` al hero de cada una de estas 3 páginas (no tienen badge glassmorphism).
* **Estimación**: 20 min.
* **Criterio de aceptación**: Heroes con movimiento ambiental; `astro check` pasa.

## Fase 4: Verificación

### [x] Tarea 4.1: Build y chequeo de tipos
* **Descripción**: Ejecutar `astro check` y `pnpm build`; verificar que `animate-float` aparece en el CSS compilado y que no hay regresión visual ni scroll horizontal no deseado.
* **Estimación**: 15 min.
* **Criterio de aceptación**: Sin errores; `animate-float` presente; los heroes no generan scroll horizontal (blobs recortados por `overflow-hidden`).
