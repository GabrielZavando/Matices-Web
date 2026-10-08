# Plan de Tareas: Nueva sección Scouthem en la home y CTA movido desde el hero

> Change: TICKET-005 | TDD: specs antes de código, test fallido primero.
> Layer frontend: `smart | dumb`. Suggested Path raíz (`.specboot.json`
> `services: ["."]`). Diseño obligatorio: `ScouthemShowcase` (dumb) +
> composición en `index.astro` (smart), según
> `openspec/tickets/TICKET-005-enriched.md`.

## Fase 1: RED — Test de contrato de la sección (TDD)

- [x] **T-001: Escribir el test de contrato de la sección Scouthem**
  - Crear `src/lib/homeScouthemSection.spec.ts` (convención co-locada del
    proyecto, Vitest + lectura de `dist/index.html`, patrón de
    `src/lib/sections.spec.ts`) que valide ANTES de implementar:
    - Orden: la sección Scouthem es la 2ª `<section>` de `<main>`, entre el
      hero y "Nuestros Servicios" (REQ-001, SC-001).
    - El hero no contiene el enlace SCOUTHEM y sí conserva "Comenzar Proceso"
      (REQ-002, SC-002).
    - Exactamente 1 enlace "Conoce nuestra plataforma SCOUTHEM" en la home,
      con `href="https://scouthem.com/es/pagina-de-inicio/"`, `target="_blank"`
      y `rel="noopener"` (REQ-003, SC-003).
    - El CTA no tiene `link-underline` y sí `hover:bg-verde-bosque/5
      transition-all` (REQ-003, SC-004).
    - Copy literal: badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN", "Revoluciona
      tu", span "Selección de Talento" con `text-verde-lima italic`, y el
      párrafo inicial del mock (REQ-004, SC-005).
    - Marcado mobile-first: estructura de una columna con texto antes que el
      panel, escalando a 2 columnas en `lg:` (REQ-005, SC-006).
    - Panel con `bg-verde-bosque` y relación de aspecto reservada, sin hex
      hardcodeados (REQ-006, SC-007).
    - `<section>` con un único H2 y contenido envuelto en `reveal--fade-up`
      (REQ-008, SC-009).
  - Ejecutar `npm run build && npm test` y confirmar que el test falla (rojo):
    la sección aún no existe.
  - **Prioridad**: alta
  - **Estimate**: 45m
  - **Layer**: dumb
  - **Suggested Path**: `src/lib/homeScouthemSection.spec.ts` (entregable de la tarea RED)
  - **Test Path**: `src/lib/homeScouthemSection.spec.ts`

## Fase 2: GREEN — Componente y composición

- [x] **T-002: Crear `src/components/ui/ScouthemShowcase.astro`**
  - Componente presentacional puro con `interface Props` en el frontmatter
    (sin lógica de estado ni `<script>`).
  - Bloque de texto: badge pill "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN";
    H2 `font-heading` "Revoluciona tu" + `<span class="text-verde-lima
    font-normal italic">Selección de Talento</span>` (Antic, nunca Playfair);
    párrafo literal del mock (REQ-004, SC-005).
  - CTA: mover tal cual el `<a>` del hero —
    `https://scouthem.com/es/pagina-de-inicio/`, `target="_blank"`,
    `rel="noopener"`, `border` verde, sin `link-underline`, conservando
    `hover:bg-verde-bosque/5 transition-all` (REQ-003, SC-003, SC-004).
  - Panel visual: `bg-verde-bosque` con radio de contenedor (`rounded-[2rem]`)
    y relación de aspecto reservada; imagen resuelta con
    `import.meta.glob('../../assets/scouthem-section.*', { eager: true })`
    (resuelve a `src/assets/scouthem-section.*` desde `src/components/ui/`) →
    `<Image>` de `astro:assets` si hay match, panel vacío si no (REQ-006,
    SC-007; REQ-007, SC-008).
  - Envolver el contenido en `Reveal` con `variant="fade-up"` (REQ-008,
    SC-009).
  - Mobile-first: por defecto columna con texto arriba y panel abajo; `lg:grid
    lg:grid-cols-2` con el panel a la izquierda vía `order` (REQ-005,
    SC-006 — patrón de la sección "Áreas de Especialización").
  - Ejecutar `npm test`: el bloque de la sección sigue en rojo (falta montarla
    en la home).
  - **Prioridad**: alta
  - **Estimate**: 60m
  - **Layer**: dumb
  - **Suggested Path**: `src/components/ui/ScouthemShowcase.astro`
  - **Test Path**: `src/lib/homeScouthemSection.spec.ts`

- [x] **T-003: Montar la sección en la home y limpiar el hero**
  - En `src/pages/index.astro`: importar el componente y renderizar
    `<ScouthemShowcase />` inmediatamente después de la `</section>` del hero
    y antes de la sección `#servicios` (REQ-001, SC-001).
  - Eliminar del hero el `<a href="https://scouthem.com/...">Conoce nuestra
    plataforma SCOUTHEM</a>`, dejando el grupo de CTAs solo con "Comenzar
    Proceso" (REQ-002, SC-002).
  - Ejecutar `npm run build && npm test`: verificar en verde SC-001…SC-007 y
    SC-009, y que `sections.spec.ts` sigue en verde (≥7 `reveal--fade-up`)
    (REQ-009, SC-010).
  - **Prioridad**: alta
  - **Estimate**: 30m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/homeScouthemSection.spec.ts`

## Fase 3: Verificación

- [x] **T-004: Verificación completa y smoke responsive**
  - `npm run build`, `npm run lint` y `npm test` sin errores (REQ-009,
    SC-010).
  - `bash check-refs.sh` y `bash specboot.sh --ci` en 0 errores.
  - Smoke en `npm run preview`: <1024px una columna con texto arriba y panel
    abajo; ≥1024px dos columnas con panel a la izquierda; sin desbordamiento
    horizontal (REQ-005, SC-006); CTA externo abre en pestaña nueva (SC-003).
  - Verificar que ningún archivo fuera del alcance cambió
    (`git status` delta-incremental).
  - **Prioridad**: alta
  - **Estimate**: 30m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/homeScouthemSection.spec.ts`

## Fase 4: Asset del diseñador (completada en T-005)

- [x] **T-005: Cargar `src/assets/scouthem-section.*` cuando el diseñador lo entregue**
  - Sustituir el panel vacío subiendo el asset con el nombre exacto
    `src/assets/scouthem-section.<ext>`: el `import.meta.glob` lo detecta sin
    tocar el componente.
  - Verificar SC-008: `<Image>` con `width`/`height`/`format`/`loading="lazy"`/
    `sizes` + `alt` descriptivo, sin layout shift (REQ-007) — hecho en T-005.
  - SC-011 (asset corrupto → build falla): **no automatizado** por decisión
    (sin fixtures corruptas en el repo); el camino positivo (build con el asset
    real pasa limpio) sí se verificó. Cobertura ejecutable → ticket follow-up;
    en `openspec/state/verify-results.json` figura como `UNTESTED`.
  - **Prioridad**: media (bloqueada por dependencia externa)
  - **Estimate**: 15m
  - **Layer**: dumb
  - **Suggested Path**: `src/assets/scouthem-section.png`
  - **Test Path**: `src/lib/homeScouthemSection.spec.ts`

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
