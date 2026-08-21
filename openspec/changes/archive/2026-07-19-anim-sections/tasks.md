# Plan de Tareas: Reveal al Scroll en Secciones y Tarjetas (`anim-sections`)

Aplica `<Reveal>` con stagger a secciones y tarjetas de todas las páginas.
Reutiliza `anim-foundation`.

---

## Fase 1: Página de inicio

### [x] Tarea 1.1: Reveal en secciones de `src/pages/index.astro`
* **Descripción**: Envolver en `<Reveal>`: el header "Nuestros Servicios" y sus 6 tarjetas (delay por índice), el header "Áreas de Especialización" + los 7 `<li>` (delay manual 0..480), el header "Nuestro Equipo" + 4 tarjetas de equipo (delay por índice en `.map`).
* **Estimación**: 45 min.
* **Criterio de aceptación**: Las secciones se revelan al hacer scroll con stagger; `astro check` pasa.

## Fase 2: Páginas de contenido

### [x] Tarea 2.1: Reveal en `src/pages/talento.astro`
* **Descripción**: `<Reveal>` en header "Asesoría", subbloque Scouthem, header "Servicios de Talento" + 5 tarjetas (delay por índice), y el header de `CompanyLogos`.
* **Estimación**: 30 min.
* **Criterio de aceptación**: Secciones animadas; `astro check` pasa.

### [x] Tarea 2.2: Reveal en `src/pages/psicologia.astro`
* **Descripción**: `<Reveal>` en las 3 tarjetas de servicios y en los bloques CTA/stats de la página (delay por índice donde aplique).
* **Estimación**: 30 min.
* **Criterio de aceptación**: Secciones animadas; `astro check` pasa.

### [x] Tarea 2.3: Reveal en `src/pages/testing.astro`
* **Descripción**: `<Reveal>` en encabezados de sección y tarjetas/bloques de la página.
* **Estimación**: 30 min.
* **Criterio de aceptación**: Secciones animadas; `astro check` pasa.

### [x] Tarea 2.4: Reveal en `src/pages/id.astro`
* **Descripción**: `<Reveal>` en encabezados de sección y tarjetas/bloques de la página.
* **Estimación**: 30 min.
* **Criterio de aceptación**: Secciones animadas; `astro check` pasa.

### [x] Tarea 2.5: Reveal en `src/pages/formacion.astro`
* **Descripción**: `<Reveal>` en encabezados de sección y tarjetas/bloques de la página.
* **Estimación**: 30 min.
* **Criterio de aceptación**: Secciones animadas; `astro check` pasa.

## Fase 3: Componentes reutilizables

### [x] Tarea 3.1: Reveal en `CompanyLogos.astro` y `EvidenceGallery.astro`
* **Descripción**: Envolver el encabezado (title + subtitle) de la sección de `CompanyLogos` y de la galería en `EvidenceGallery` en `<Reveal>`. Esto beneficia a todas las páginas que los usan.
* **Estimación**: 20 min.
* **Criterio de aceptación**: Los encabezados de ambos componentes se revelan al scroll; `astro check` pasa.

## Fase 4: Verificación

### [x] Tarea 4.1: Build y chequeo de tipos
* **Descripción**: Ejecutar `astro check` y `pnpm build`; verificar que el markup de las secciones contiene clases `reveal` y que no hay regresión visual en el layout.
* **Estimación**: 15 min.
* **Criterio de aceptación**: Sin errores de tipos ni de build; las secciones objetivo contienen `reveal--fade-up`.
