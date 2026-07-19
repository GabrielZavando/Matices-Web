# Plan de Tareas: Entrada Animada del Hero (`anim-hero`)

Aplica `<Reveal>` con stagger a los heroes de las 6 páginas. Reutiliza
`anim-foundation` (componente `Reveal.astro` + `initReveal`).

---

## Fase 1: Hero de la página de inicio

### [x] Tarea 1.1: Animar el hero de `src/pages/index.astro`
* **Descripción**: Envolver badge, `h1`, los dos `p`, el bloque CTA y la imagen `hero-business` (+ badge "98% Match") en `<Reveal>` con el esquema de delays (badge 0, h1 80, p 160, CTA 240, imagen `scale-in` 120, badge flotante 320). Mantener `loading="eager"` en la imagen.
* **Estimación**: 30 min.
* **Criterio de aceptación**: `astro check` pasa; el hero entra escalonado en navegador; bajo `prefers-reduced-motion` todo es visible y estático.

## Fase 2: Hero de páginas de contenido

### [x] Tarea 2.1: Animar el hero de `src/pages/talento.astro`
* **Descripción**: Aplicar el mismo esquema de `<Reveal>` (badge 0, h1 80, p 160, CTA 240, imagen `scale-in` 120, badge "98%" 320).
* **Estimación**: 20 min.
* **Criterio de aceptación**: Hero animado; `astro check` pasa.

### [x] Tarea 2.2: Animar el hero de `src/pages/psicologia.astro`
* **Descripción**: Aplicar `<Reveal>` con el esquema de delays (badge "Bienestar & Salud Mental" 0, h1 80, p 160, CTA 240, imagen `scale-in` 120, badge "+15 Años" 320).
* **Estimación**: 20 min.
* **Criterio de aceptación**: Hero animado; `astro check` pasa.

### [x] Tarea 2.3: Animar el hero de `src/pages/testing.astro`
* **Descripción**: Aplicar `<Reveal>` al hero (badge, h1, p, CTA, imagen) con el esquema de delays.
* **Estimación**: 20 min.
* **Criterio de aceptación**: Hero animado; `astro check` pasa.

### [x] Tarea 2.4: Animar el hero de `src/pages/id.astro`
* **Descripción**: Aplicar `<Reveal>` al hero (badge, h1, p, CTA, imagen) con el esquema de delays.
* **Estimación**: 20 min.
* **Criterio de aceptación**: Hero animado; `astro check` pasa.

### [x] Tarea 2.5: Animar el hero de `src/pages/formacion.astro`
* **Descripción**: Aplicar `<Reveal>` al hero (badge, h1, p, CTA, imagen) con el esquema de delays.
* **Estimación**: 20 min.
* **Criterio de aceptación**: Hero animado; `astro check` pasa.

## Fase 3: Verificación

### [x] Tarea 3.1: Build y chequeo de tipos
* **Descripción**: Ejecutar `astro check` y `pnpm build`; verificar que las 6 páginas compilan y que el bundle incluye las clases `reveal` en el markup del hero.
* **Estimación**: 15 min.
* **Criterio de aceptación**: Sin errores de tipos ni de build; el hero de cada página contiene elementos con clase `reveal`/`reveal--fade-up`/`reveal--scale-in`.
