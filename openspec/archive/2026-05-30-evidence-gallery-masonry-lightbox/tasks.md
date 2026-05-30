# Tasks: EvidenceGallery — Masonry Grid + Lightbox Interactivo

**Change ID:** `evidence-gallery-masonry-lightbox`  
**Archivo único modificado:** `src/components/ui/EvidenceGallery.astro`  
**Estimado total:** ~3.5 horas

> Secuencia obligatoria: Global Components → (no hay cambios en routing ni
> páginas en este change) → Componente Atómico.

---

## Fase 1 — Refactor de la Grilla Masonry (≤ 1.5h)

### T-01: Ajustar el contenedor de columnas CSS (15 min)

- [x] Reemplazar `class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"`
      por el nuevo contenedor Masonry con `gap` de `5px` exacto:
  ```html
  <div
    class="columns-1 sm:columns-2 md:columns-3 lg:columns-4"
    style="column-gap: 5px;"
    id="gallery-grid"
  >
  ```
- [x] Eliminar la clase `gap-6` y `space-y-6` del contenedor (ya no aplican).

### T-02: Reemplazar `<div>` por `<figure>` semántico en cada tarjeta (15 min)

- [x] Envolver cada imagen en `<figure>` en lugar de `<div>`:
  ```html
  <figure
    class="break-inside-avoid mb-[5px] overflow-hidden rounded-2xl
           ring-1 ring-white/60 shadow-md cursor-pointer
           hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    data-index={index}
    tabindex="0"
    role="button"
    aria-label={`Abrir imagen ${index + 1} de ${galleryList.length}`}
  >
  ```
- [x] Asegurarse de que `</figure>` cierra correctamente tras `<Image />`.

### T-03: Actualizar atributos de `<Image />` para thumbnails optimizados (20 min)

- [x] Agregar `width={400}` a cada `<Image />` para forzar el resize en build.
- [x] Agregar `format="avif"` para compresión máxima.
- [x] Verificar que `height` NO esté definido (mantiene ratio nativo).
- [x] Mantener `loading="lazy"` y `decoding="async"`.
- [x] Resultado esperado:
  ```astro
  <Image
    src={image}
    width={400}
    format="avif"
    alt={`Registro de actividad ... - Imagen ${index + 1}`}
    class="w-full h-auto object-cover rounded-2xl"
    loading="lazy"
    decoding="async"
  />
  ```

### T-04: Agregar `data-*` attributes para el handshake con JS (10 min)

- [x] En el frontmatter Astro, generar un JSON serializable de las imágenes:
  ```astro
  ---
  const imageData = galleryList.map((img, i) => ({
    src: img.src,
    alt: `Registro de actividad y talleres profesionales en Matices - Imagen ${i + 1}`,
  }))
  ---
  ```
- [x] Inyectar en el DOM como `<script type="application/json">` para que el
      JS de cliente pueda leerlo sin re-importar módulos Astro:
  ```html
  <script type="application/json" id="gallery-data">
    {JSON.stringify(imageData)}
  </script>
  ```

---

## Fase 2 — Estructura HTML del Modal Lightbox (≤ 45 min)

### T-05: Crear la estructura base del modal (20 min)

- [x] Añadir el modal **después** del contenedor de la grilla, **dentro** del
      `<div class="w-full">` raíz del componente:
  ```html
  <!-- MODAL LIGHTBOX -->
  <div
    id="lb-modal"
    role="dialog"
    aria-modal="true"
    aria-label="Galería de evidencia"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center
           bg-[#191c1c]/80 backdrop-blur-sm
           opacity-0 pointer-events-none
           transition-[opacity] duration-200"
  >
    <!-- Capa de cierre por clic exterior -->
    <div id="lb-backdrop" class="absolute inset-0 cursor-pointer"></div>

    <!-- Contenedor imagen + controles (z elevado para no capturar backdrop) -->
    <div class="relative z-10 flex flex-col items-center
                max-w-[90vw] max-h-[90dvh]">

      <!-- Botón X (cierre) -->
      <button
        id="lb-close"
        aria-label="Cerrar galería"
        class="absolute -top-10 right-0 w-9 h-9 flex items-center justify-center
               font-sans text-sm font-semibold rounded-full
               bg-surface-container text-on-surface
               hover:bg-error-container transition-colors duration-150"
      >✕</button>

      <!-- Botón anterior -->
      <button
        id="lb-prev"
        aria-label="Imagen anterior"
        class="absolute left-[-3rem] top-1/2 -translate-y-1/2
               w-11 h-11 flex items-center justify-center
               font-sans text-base font-semibold rounded-lg
               bg-surface-container/90 text-on-surface
               hover:bg-surface-container-high transition-colors duration-150"
      >&lt;</button>

      <!-- Imagen activa -->
      <img
        id="lb-img"
        src=""
        alt=""
        class="max-w-[90vw] max-h-[80dvh] object-contain rounded-3xl
               shadow-2xl transition-opacity duration-150"
      />

      <!-- Botón siguiente -->
      <button
        id="lb-next"
        aria-label="Imagen siguiente"
        class="absolute right-[-3rem] top-1/2 -translate-y-1/2
               w-11 h-11 flex items-center justify-center
               font-sans text-base font-semibold rounded-lg
               bg-surface-container/90 text-on-surface
               hover:bg-surface-container-high transition-colors duration-150"
      >&gt;</button>

      <!-- Contador de posición -->
      <p
        id="lb-counter"
        aria-live="polite"
        class="mt-3 font-sans text-[9px] tracking-widest
               text-inverse-on-surface select-none"
      ></p>
    </div>
  </div>
  ```

### T-06: Validar estructura semántica del modal (10 min)

- [x] Confirmar que `role="dialog"` y `aria-modal="true"` están presentes.
- [x] Confirmar que `aria-live="polite"` está en `#lb-counter`.
- [x] Confirmar que todos los botones tienen `aria-label` descriptivos.
- [x] Confirmar que `id="lb-backdrop"` es hija directa del modal pero está
      bajo `z-index` inferior al contenedor de imagen.

### T-07: Verificar rendering estático (sin JS) (15 min)

- [x] El modal debe ser invisible por defecto (`opacity-0 pointer-events-none`).
- [x] Abrir el dev server (`npm run dev`) y verificar que la grilla se renderiza
      correctamente con columnas `1 / 2 / 3 / 4` al redimensionar.
- [x] Verificar que `#lb-modal` está presente en el DOM pero oculto.

---

## Fase 3 — Lógica Vanilla JS del Lightbox (≤ 1.5h)

### T-08: Inicializar el array de imágenes y el estado del modal (20 min)

- [x] En la etiqueta `<script>` de Astro, leer el JSON del DOM:
  ```js
  const images = JSON.parse(
    document.getElementById('gallery-data').textContent
  )
  let currentIndex = 0
  let lastFocusedThumbnail = null
  ```
- [x] Capturar referencias a todos los elementos del modal:
  ```js
  const modal   = document.getElementById('lb-modal')
  const lbImg   = document.getElementById('lb-img')
  const counter = document.getElementById('lb-counter')
  const btnClose = document.getElementById('lb-close')
  const btnPrev  = document.getElementById('lb-prev')
  const btnNext  = document.getElementById('lb-next')
  const backdrop = document.getElementById('lb-backdrop')
  ```

### T-09: Implementar `openModal(index)` y `closeModal()` (25 min)

- [x] `openModal`:
  ```js
  function openModal(index) {
    currentIndex = index
    updateModalContent()
    modal.classList.remove('opacity-0', 'pointer-events-none')
    modal.classList.add('opacity-100')
    lastFocusedThumbnail = document.activeElement
    btnClose.focus()
  }
  ```
- [x] `closeModal`:
  ```js
  function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none')
    modal.classList.remove('opacity-100')
    if (lastFocusedThumbnail) lastFocusedThumbnail.focus()
  }
  ```
- [x] `updateModalContent`:
  ```js
  function updateModalContent() {
    const { src, alt } = images[currentIndex]
    lbImg.classList.add('opacity-0')
    setTimeout(() => {
      lbImg.src = src
      lbImg.alt = alt
      counter.textContent =
        `${currentIndex + 1} - ${images.length}`
      lbImg.classList.remove('opacity-0')
    }, 150)
  }
  ```

### T-10: Implementar navegación circular `navigate(dir)` (15 min)

- [x] Función de navegación con wrapping circular:
  ```js
  function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length
    updateModalContent()
  }
  ```
- [x] Conectar a botones:
  ```js
  btnPrev.addEventListener('click', () => navigate(-1))
  btnNext.addEventListener('click', () => navigate(1))
  ```

### T-11: Implementar apertura desde thumbnails de la grilla (15 min)

- [x] Delegar evento en el contenedor `#gallery-grid`:
  ```js
  document.getElementById('gallery-grid')
    .addEventListener('click', (e) => {
      const fig = e.target.closest('[data-index]')
      if (fig) openModal(Number(fig.dataset.index))
    })
  ```
- [x] Agregar soporte de teclado para `Enter` / `Space` en `<figure>`:
  ```js
  document.getElementById('gallery-grid')
    .addEventListener('keydown', (e) => {
      const fig = e.target.closest('[data-index]')
      if (fig && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        openModal(Number(fig.dataset.index))
      }
    })
  ```

### T-12: Implementar cierre por backdrop (10 min)

- [x] El backdrop closes the modal pero la propagación al contenedor de imagen
      debe estar detenida:
  ```js
  backdrop.addEventListener('click', closeModal)
  document.querySelector('#lb-modal .relative')
    .addEventListener('click', (e) => e.stopPropagation())
  ```

### T-13: Implementar listeners de teclado globales (15 min)

- [x] Registrar un único listener `keydown` en `document`:
  ```js
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('opacity-0')) return
    if (e.key === 'Escape')      closeModal()
    if (e.key === 'ArrowLeft')   navigate(-1)
    if (e.key === 'ArrowRight')  navigate(1)
  })
  ```
- [x] Conectar botón `X`:
  ```js
  btnClose.addEventListener('click', closeModal)
  ```

---

## Fase 4 — Verificación Final (≤ 30 min)

### T-14: Test de regresión visual en dev server (15 min)

- [x] Abrir `http://localhost:4321` y navegar a cualquier página que use
      `<EvidenceGallery />` (index, testing, formacion).
- [x] Confirmar que la grilla Masonry muestra columnas correctas por breakpoint.
- [x] Confirmar que el `gap` entre imágenes es visualmente `5px`.
- [x] Confirmar que los thumbnails son visiblemente más pequeños que antes.
- [x] Confirmar que no hay errores en consola.

### T-15: Test funcional del lightbox (15 min)

- [x] Hacer clic en la primera imagen → modal debe abrirse mostrando esa imagen.
- [x] Verificar que el contador dice `1 - 15`.
- [x] Navegar con `>` y `ArrowRight` → ir a imagen 2, verificar `2 - 15`.
- [x] Navegar con `<` desde imagen 1 → debe hacer wrapping a imagen 15.
- [x] Cerrar con `X` → modal debe desaparecer, foco debe volver al thumbnail.
- [x] Cerrar con `Esc` → ídem.
- [x] Hacer clic en backdrop (fuera de imagen) → ídem.
- [x] Hacer clic en `<` o `>` → NO debe cerrar el modal.

---

## Checklist de Restricciones Activas

- [x] ✅ Solo se modifica `src/components/ui/EvidenceGallery.astro`
- [x] ✅ No se toca ninguna página (`index.astro`, `testing.astro`, `formacion.astro`)
- [x] ✅ No se toca `Layout.astro` ni componentes de navegación
- [x] ✅ No se instalan dependencias npm nuevas
- [x] ✅ No hay colores hex hardcodeados en el HTML (solo tokens Tailwind)
- [x] ✅ Todas las imágenes usan `<Image />` de `astro:assets`
- [x] ✅ Las rutas de imágenes en `src/assets/gallery/` no se modifican
- [x] ✅ El JS está encapsulado en `<script>` de Astro (Vanilla, sin frameworks)
