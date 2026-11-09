# Plan de Tareas: Reestructuración de contenido entre Inicio, Testing e I+D

> Change: TICKET-007 (provisional) | TDD: specs antes de código, test fallido
> primero. Layer frontend: `smart | dumb`. Suggested Path raíz
> (`.specboot.json` `services: ["."]`).
>
> **Restricción de working tree**: `src/assets/hero-business.webp` queda
> huérfano por la eliminación del hero de `/testing`, pero **no se borra** en
> este change (queda listado en `proposal.md` para aprobación del human owner).
> El agente no modifica, borra, restaura ni hace checkout de ningún binario de
> `src/assets/`.

## Fase 1: RED — Tests de contrato

- [x] **T-001: Escribir el contrato del showcase Scouthem en Testing**
  - Crear `src/lib/testingScouthemSection.spec.ts` (Vitest + happy-dom, lectura
    de `dist/testing/index.html`, patrón de `src/lib/homeScouthemSection.spec.ts`)
    que valide ANTES de implementar:
    - El showcase Scouthem es la PRIMERA `<section>` de `<main>` en
      `/testing`, y la siguiente es "Psicometría Científica de Vanguardia…"
      (REQ-001, SC-002).
    - La home (`dist/index.html`) no contiene ninguna sección con el badge
      "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN" ni enlaces "Conoce la
      plataforma SCOUTHEM" (REQ-001, SC-001).
    - Existe exactamente UN CTA "Conoce la plataforma SCOUTHEM" en el sitio,
      dentro del showcase de `/testing`, con `href`
      `https://scouthem.com/es/pagina-de-inicio/`, `target="_blank"`, `rel`
      con `noopener`, sin `link-underline`, con `hover:bg-verde-bosque/5` y
      `transition-all` (REQ-003, SC-005).
    - El hero eliminado ya no está: sin "Rigor Técnico & Diagnóstico", sin
      "Garantizamos la precisión y el encaje en la selección", sin CTA
      "Solicita tu Demo" y sin imagen derivada de `hero-business.webp`
      (REQ-001, SC-003).
    - `/testing` expone exactamente un `<h1>` con el texto "Pruebas y Testing
      Organizacional" y con clase `sr-only`; el showcase conserva un único
      `<h2>` (REQ-002, SC-004).
    - El showcase mantiene el copy literal del mock, el layout mobile-first
      (`lg:grid-cols-2`), el panel `bg-verde-bosque` con `aspect-*`, la imagen
      servida por `<Image>` de `astro:assets` con `width`/`height`/`loading`/
      `sizes`/`alt`, y el contenido envuelto en `reveal--fade-up`
      (spec `home-scouthem-section`).
  - Ejecutar `npm run build && npm test` y confirmar que el test falla (rojo).
  - **Prioridad**: alta
  - **Estimate**: 60m
  - **Layer**: dumb
  - **Suggested Path**: `src/lib/testingScouthemSection.spec.ts`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

- [x] **T-002: Retirar el contrato obsoleto de la home**
  - Eliminar `src/lib/homeScouthemSection.spec.ts`: su aserción central ("el
    showcase es la 2ª sección de la home") es falsa tras este change y su
    reemplazo es T-001 (REQ-001, SC-001, SC-013).
  - Ejecutar `npm test` y confirmar que la suite ya no falla por este archivo.
  - **Prioridad**: alta
  - **Estimate**: 15m
  - **Layer**: dumb
  - **Suggested Path**: `src/lib/homeScouthemSection.spec.ts`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

- [x] **T-003: Escribir el contrato del orden de secciones de Inicio**
  - Crear `src/lib/homeSectionOrder.spec.ts` (Vitest + happy-dom, lectura de
    `dist/index.html`) que valide:
    - La 2ª `<section>` de `<main>` es la de logos ("Empresas que han confiado
      en nosotros"), precedida por el hero "Reclutamiento y Selección
      Estratégica" y seguida de "Nuestros Servicios" (REQ-004, SC-006).
    - La sección de logos aparece ANTES de "Nuestro Equipo" y la galería sigue
      siendo la última (REQ-004, SC-006).
    - El orden completo es hero → logos → "Nuestros Servicios" → banner de
      empatía → especialistas → "Nuestro Equipo" → "Galeria de imágenes"
      (REQ-004, SC-007).
  - Ejecutar `npm run build && npm test` y confirmar que el test falla (rojo).
  - **Prioridad**: alta
  - **Estimate**: 30m
  - **Layer**: dumb
  - **Suggested Path**: `src/lib/homeSectionOrder.spec.ts`
  - **Test Path**: `src/lib/homeSectionOrder.spec.ts`

- [x] **T-004: Escribir el contrato de la sección de I+D**
  - Crear `src/lib/idPageSections.spec.ts` (Vitest + happy-dom, lectura de
    `dist/id/index.html`) que valide:
    - El contenedor de la imagen del hero "Innovación Científica & Futuro"
      declara `aspect-[3/2]`, no declara `aspect-[4/5]` ni `max-w-md`, y la
      imagen conserva `width`/`height`/`sizes`/`loading="eager"` con ratio 3:2
      (REQ-005, SC-008).
    - La caja flotante del hero muestra el título "Proyecto FONDEF" y el
      párrafo "Innova I+D", y ya no contiene "Diseño de metodologías de
      vanguardia."; conserva `animate-float`, `max-w-[200px]` y
      `text-sm font-semibold text-verde-bosque/70` (REQ-006, SC-009).
    - El párrafo de "Plataforma de Talento Inteligente" es exactamente el texto
      aprobado por el ticket y el anterior no aparece (REQ-007, SC-010).
    - El enlace "CONOCER SCOUTHEM" tiene `href="/testing"` y NO declara
      `target` ni `rel` (REQ-007, SC-011).
  - Ejecutar `npm run build && npm test` y confirmar que el test falla (rojo).
  - **Prioridad**: alta
  - **Estimate**: 45m
  - **Layer**: dumb
  - **Suggested Path**: `src/lib/idPageSections.spec.ts`
  - **Test Path**: `src/lib/idPageSections.spec.ts`

## Fase 2: GREEN — Intercambio de secciones Inicio ↔ Testing

- [x] **T-005: Mover el showcase Scouthem a Testing y eliminar el hero**
  - En `src/pages/testing.astro`: agregar el import
    `import ScouthemShowcase from '../components/ui/ScouthemShowcase.astro'` y
    renderizar `<ScouthemShowcase />` como PRIMERA etiqueta dentro de `<main>`,
    antes de la sección "Evaluación Psicométrica y Tipos de Test"
    (REQ-001, SC-002).
  - En `src/pages/testing.astro`: eliminar por completo el `<section>` hero
    "Rigor Técnico & Diagnóstico" completo: badge, `<h1>`, párrafo
    introductorio, CTA "Solicita tu Demo" y el bloque de imagen con
    `heroBusiness`; eliminar el `import { Image } from 'astro:assets'` y el
    `import heroBusiness from '../assets/hero-business.webp'` si quedan sin
    uso (REQ-001, SC-003).
  - En `src/pages/testing.astro`: añadir el `<h1>` visualmente oculto con
    `class="sr-only"` y el texto "Pruebas y Testing Organizacional" como primer
    elemento de contenido de `<main>` (REQ-002, SC-004).
  - NO borrar `src/assets/hero-business.webp` (REQ-008, SC-012).
  - Ejecutar `npm run build && npm test`: T-001 debe pasar.
  - **Prioridad**: alta
  - **Estimate**: 45m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/testing.astro`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

- [x] **T-006: Quitar el showcase Scouthem de Inicio**
  - En `src/pages/index.astro`: eliminar la etiqueta `<ScouthemShowcase />` y su
    `import` correspondiente; la home queda con hero → servicios → banner →
    especialistas → equipo → galería (REQ-001, SC-001).
  - Verificar que no queda ningún enlace "Conoce la plataforma SCOUTHEM" en la
    home (REQ-003, SC-005).
  - Ejecutar `npm run build && npm test`: T-001 y T-003 deben pasar.
  - **Prioridad**: alta
  - **Estimate**: 20m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

## Fase 3: GREEN — Orden de secciones de Inicio

- [x] **T-007: Reubicar `CompanyLogos` bajo el hero de Inicio**
  - En `src/pages/index.astro`: mover la etiqueta `<CompanyLogos />` desde su
    posición actual (entre "Nuestro Equipo" y la galería) hasta inmediatamente
    después del `</section>` del hero, de modo que sea la 2ª `<section>` de
    `<main>` (REQ-004, SC-006, SC-007).
  - No modificar `src/components/global/CompanyLogos.astro` ni su copy.
  - Ejecutar `npm run build && npm test`: T-003 debe pasar.
  - **Prioridad**: alta
  - **Estimate**: 20m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/homeSectionOrder.spec.ts`

## Fase 4: GREEN — Ajustes de I+D

- [x] **T-008: Cambiar la proporción de la imagen del hero de I+D**
  - En `src/pages/id.astro`: cambiar el contenedor de la imagen del hero a
    `class="w-full aspect-[3/2] rounded-[3rem] overflow-hidden shadow-2xl
    relative border-4 border-white/40"` (sin `max-w-md`) y actualizar los
    atributos `width`/`height` de `<Image>` a la proporción 3:2 (p. ej.
    `width={768} height={512}`), ajustando `sizes` al ancho de la columna
    (REQ-005, SC-008).
  - Mantener `format="avif"`, `loading="eager"`, `alt` descriptivo y
    `object-cover`.
  - Ejecutar `npm run build && npm test`: T-004 debe pasar.
  - **Prioridad**: media
  - **Estimate**: 25m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/id.astro`
  - **Test Path**: `src/lib/idPageSections.spec.ts`

- [x] **T-009: Actualizar el copy de la caja flotante del hero de I+D**
  - En `src/pages/id.astro`: sustituir el título "I+D" por "Proyecto FONDEF" y
    el párrafo "Diseño de metodologías de vanguardia." por "Innova I+D",
    conservando `animate-float`, `max-w-[200px]` y las clases
    `text-sm font-semibold text-verde-bosque/70` del párrafo (REQ-006, SC-009).
  - Ejecutar `npm run build && npm test`: T-004 debe pasar.
  - **Prioridad**: media
  - **Estimate**: 15m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/id.astro`
  - **Test Path**: `src/lib/idPageSections.spec.ts`

- [x] **T-010: Sustituir el párrafo y el CTA de "Plataforma de Talento Inteligente"**
  - En `src/pages/id.astro`: reemplazar el párrafo por el texto EXACTO
    aprobado en el ticket (REQ-007, SC-010).
  - Cambiar el CTA "CONOCER SCOUTHEM" a `href="/testing"` y eliminar
    `target="_blank"` y `rel` (enlace interno); conservar sus clases visuales
    (REQ-007, SC-011).
  - Ejecutar `npm run build && npm test`: T-004 debe pasar.
  - **Prioridad**: alta
  - **Estimate**: 25m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/id.astro`
  - **Test Path**: `src/lib/idPageSections.spec.ts`

## Fase 5: Limpieza y verificación

- [x] **T-011: Actualizar el comentario obsoleto del componente**
  - En `src/components/ui/ScouthemShowcase.astro`: actualizar el comentario del
    bloque visual que justifica `format="webp"` por el test de carrusel de la
    home (la sección ya no vive en la home) y el docblock que la referencia como
    "sección de la home". NO modificar markup, props, estilos ni el formato de
    la imagen en este change (REQ-001, SC-007).
  - **Prioridad**: baja
  - **Estimate**: 10m
  - **Layer**: dumb
  - **Suggested Path**: `src/components/ui/ScouthemShowcase.astro`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

- [x] **T-012: Ajustar la cobertura de badges flotantes**
  - Regresión colateral detectada al ejecutar T-005: el hero eliminado de
    `/testing` contenía su única stat badge (`max-w-[200px]`), por lo que
    `src/lib/ambientAnimations.spec.ts` falla con "testing should render at
    least one stat badge".
  - En `src/lib/ambientAnimations.spec.ts`: eliminar la aserción de EXISTENCIA
    por página (`expect(badges.length).toBeGreaterThan(0)`) y conservar la
    aserción de CONTRATO por badge renderizada (toda stat badge debe llevar
    `animate-float`). La cobertura puede apoyarse en un conjunto de páginas
    que sí renderizan badges, sin exigir presencia en todas (REQ-010, SC-014).
  - NO añadir un badge artificial a `/testing` para "arreglar" el test: la
    página queda sin badges por diseño tras este change (REQ-001, SC-003).
  - Ejecutar `npm run build && npm test`: el archivo `ambientAnimations.spec.ts`
    debe quedar en verde y los demás archivos sin regresiones (REQ-010, SC-014).
  - **Prioridad**: alta
  - **Estimate**: 20m
  - **Layer**: dumb
  - **Suggested Path**: `src/lib/ambientAnimations.spec.ts`
  - **Test Path**: `src/lib/ambientAnimations.spec.ts`

- [x] **T-013: Acotar el test del carrusel al hero real**
  - Regresión colateral detectada al ejecutar T-007: al mover los logos de
    clientes bajo el hero, el proxy `html.slice(0, html.indexOf('Nuestros
    Servicios'))` de `src/lib/heroCarousel.spec.ts` ya no delimita solo el hero
    e incluye los ~19 `.avif` de los logos (21 fuentes únicas en vez de 2).
  - En `src/lib/heroCarousel.spec.ts`: delimitar el rango al HERO real (p. ej.
    cortar en el cierre de la primera `<section>` de `<main>`) en lugar de usar
    "Nuestros Servicios" como delimitador. El carrusel NO cambia: sigue con
    3 slides A-B-A y 2 fuentes únicas.
  - El spec `hero-team-carousel` NO cambia: ya exige "it contains two distinct
    image sources" en el markup del contenedor del hero; el fallo era del
    proxy de alcance del test, no del comportamiento.
  - Ejecutar `npm run build && npm test`: `src/lib/heroCarousel.spec.ts` debe
    quedar en verde y ningún otro archivo debe regresar (REQ-009, SC-013,
    REQ-011, SC-015).
  - **Prioridad**: alta
  - **Estimate**: 20m
  - **Layer**: dumb
  - **Suggested Path**: `src/lib/heroCarousel.spec.ts`
  - **Test Path**: `src/lib/heroCarousel.spec.ts`

- [x] **T-014: Verificación completa y delta acotado**
  - Ejecutar `npm run build`, `npm run lint` y `npm test` sin errores
    (REQ-009, SC-013).
  - Confirmar que `src/lib/sections.spec.ts` sigue en verde (≥7 `reveal--fade-up`
    en `dist/index.html`, ≥6 en `dist/testing/index.html`) y que
    `src/lib/heroCarousel.spec.ts` quedó acotado al hero real (T-013)
    (REQ-009, SC-013).
  - Ejecutar `bash check-refs.sh` y `bash specboot.sh --ci` en 0 errores.
  - Confirmar con `git status` que el delta de producción es solo
    `src/pages/index.astro`, `src/pages/testing.astro`, `src/pages/id.astro`,
    el comentario de `src/components/ui/ScouthemShowcase.astro`, los ajustes de
    `src/lib/ambientAnimations.spec.ts` y `src/lib/heroCarousel.spec.ts` y los
    tests nuevos; `src/assets/hero-business.webp` sigue en disco y sin cambios
    (REQ-008, SC-012).
  - Smoke en `npm run preview`: `/` abre con hero → logos → servicios;
    `/testing` abre con el showcase Scouthem; `/id` muestra la imagen 3:2 a
    ancho completo, la caja "Proyecto FONDEF / Innova I+D" y el CTA que navega
    a `/testing` (SC-002, SC-006, SC-008, SC-009, SC-011).
  - **Prioridad**: alta
  - **Estimate**: 40m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

## Fase 6: Resoluciones finales (post adversarial-review)

> Resoluciones acordadas con el owner tras la auditoría adversarial
> (`openspec/state/adversarial-result.json`, veredicto `SHIP` con warnings).
> Los artefactos OpenSpec se actualizan **antes** del código
> (`docs/base-standards.md` §7).

- [x] **T-015: Rebalancear el grid del hero de I+D a 40/60**
  - En `src/pages/id.astro` (hero "Innovación Científica & Futuro"): la columna
    de texto pasa de `lg:col-span-7` a `lg:col-span-5` y la columna de la
    imagen de `lg:col-span-5` a `lg:col-span-7` sobre el `lg:grid-cols-12`
    existente; actualizar `sizes` de `<Image>` al nuevo ancho de columna
    (≈60 % del viewport en `lg`). La proporción 3:2 y el resto del markup no
    cambian; por debajo de `lg` el grid sigue en una sola columna (REQ-005,
    SC-008).
  - Extender el test de contrato de `src/lib/idPageSections.spec.ts`
    (SC-008) para exigir el reparto 40/60: RED antes de tocar `id.astro`,
    GREEN después.
  - **Prioridad**: alta
  - **Estimate**: 25m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/id.astro`
  - **Test Path**: `src/lib/idPageSections.spec.ts`

- [x] **T-016: Exponer el ancla `id="scouthem"` del showcase**
  - En `src/components/ui/ScouthemShowcase.astro`: añadir `id="scouthem"` al
    `<section>` raíz para que el enlace `/testing#scouthem` de
    `src/pages/talento.astro` tenga destino. Sin props nuevas, sin cambios de
    copy, estilos ni semántica de encabezados (REQ-001, SC-016).
  - Añadir el test de contrato en `src/lib/testingScouthemSection.spec.ts`
    (`[SC-016]`): RED antes de tocar el componente, GREEN después.
  - **Prioridad**: alta
  - **Estimate**: 20m
  - **Layer**: dumb
  - **Suggested Path**: `src/components/ui/ScouthemShowcase.astro`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

- [x] **T-017: Registrar la retirada definitiva del formulario de Google Forms**
  - El human owner confirma que el formulario "Solicita tu Demo" se retira
    definitivamente del sitio y **no** se reubica. No hay cambio de código: el
    CTA ya no existe tras T-005.
  - Registrar la decisión en `design.md` (D-9 + riesgo actualizado) y en
    `proposal.md` (Impact). El requirement `floating-badges` y el scenario
    SC-003 no cambian: ya exigían la ausencia del CTA.
  - **Prioridad**: media
  - **Estimate**: 10m
  - **Layer**: dumb
  - **Suggested Path**: `openspec/changes/restructure-page-content/design.md`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

## Fase 7: Fix de LCP en `/testing` (warning de la auditoría adversarial)

> Warning detectado en `openspec/state/adversarial-result.json` (SHIP, 2026-11-09):
> la imagen del showcase se servía con `loading="lazy"` siendo la primera
> sección de `/testing` (candidato a LCP). Acordado con el owner. Los artefactos
> OpenSpec se actualizan **antes** del código (`docs/base-standards.md` §7).

- [x] **T-018: Cargar de forma eagerly la imagen del showcase**
  - Artefactos primero: delta MODIFIED de `specs/home-scouthem-section/spec.md`
    (requirement "Navy visual panel reserves space regardless of asset
    presence": `loading="lazy"` → `loading="eager"`), REQ-001 y SC-002 de este
    change, `design.md` (D-10) y `proposal.md` (sección 6).
  - En `src/lib/testingScouthemSection.spec.ts`: actualizar el contrato del test
    "the panel hosts exactly one optimized, accessible <Image>" para exigir
    `loading="eager"`; RED antes de tocar el componente.
  - En `src/components/ui/ScouthemShowcase.astro`: cambiar `loading="lazy"` por
    `loading="eager"` en la etiqueta `<Image>` del panel. El resto de
    atributos (`width`, `height`, `format="webp"`, `sizes`, `alt`), el copy, los
    props y los estilos NO cambian (REQ-001, SC-002).
  - Ejecutar `npm run build && npm test`: el contrato debe quedar en verde y
    ningún otro archivo debe regresar.
  - **Prioridad**: alta
  - **Estimate**: 15m
  - **Layer**: dumb
  - **Suggested Path**: `src/components/ui/ScouthemShowcase.astro`
  - **Test Path**: `src/lib/testingScouthemSection.spec.ts`

## Mandatory Steps

> **Rol de este documento**: es la **fuente única de verdad** del checklist
> obligatorio de implementación del ciclo SDD. El skill `plan-change` **inyecta
> su contenido** como sección `## Mandatory Steps` en todo `tasks.md` generado,
> leyéndolo en el momento de generación, de modo que la checklist viaja dentro
> del artefacto que el agente `build` ejecuta. Editar aquí actualiza todo
> `tasks.md` generado después; no duplicar esta lista dentro de skills ni
> agentes.

Esta checklist es **obligatoria, no sugerida**. Aplica a toda tarea de
implementación ejecutada vía `/apply`, tanto en el propio framework Specboot
(dogfooding) como en cualquier proyecto consumidor.

### Pre-implementación

Antes de escribir la primera línea de la tarea actual:

- [x] La **rama activa** sigue la convención vigente del proyecto (ej.
  `feature/*`, `fix/*`); trabajar sobre ella, nunca directamente sobre la rama
  principal.
- [x] Estado **git limpio**: sin cambios sin commitear (ni staged) antes de
  empezar; si hay trabajo en curso, resolverlo primero.

### Durante la implementación

- [x] **Test nuevo que falla antes de implementar (RED)**: escribir el test del
  escenario (`SC-NNN`) y verificar que falla antes de escribir código de
  producción.
- [x] Ejecutar los **tests unitarios del módulo** tocado mientras se itera
  (ciclo RED-GREEN-REFACTOR), no solo al final.

### Post-implementación

Antes de dar la tarea por cerrada:

- [x] **Ejecutar `verify`**: la verificación del change corre y produce
  evidencia persistente (`openspec/state/verify-results.json`).
- [x] **Ejecutar `adversarial-review`**: la auditoría adversarial corre y
  produce veredicto persistente (`openspec/state/adversarial-result.json`).

> Ambos pasos post alimentan los gates duros de `/commit` (M-901): sin
> `PASS` + `SHIP` vigentes para el change activo, el commit bloquea.
