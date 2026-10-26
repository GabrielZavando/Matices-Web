# Plan de Tareas: Orden, LinkedIn y biografías del equipo

> Change: TICKET-006 (provisional) | TDD: specs antes de código, test fallido
> primero. Layer frontend: `smart | dumb`. Suggested Path raíz
> (`.specboot.json` `services: ["."]`).
>
> **Restricción de working tree**: el humano actualizó manualmente los retratos
> en `src/assets/team/` (`catalina.jpeg`, `cristian.jpeg`, `lorenzo.jpeg`;
> bajas de `cata.jpg`, `cristian.jpg`, `lorenzo.traverso.jpg`) y
> `src/pages/index.astro` ya referencia los nuevos archivos. Esos cambios no se
> commitean, revierten, restauran ni hacen checkout en este change. El agente
> solo escribe `src/pages/index.astro` (código), el test nuevo y artefactos
> OpenSpec.

## Fase 1: RED — Test de contrato de la sección

- [x] **T-001: Escribir el test de contrato de "Nuestro Equipo"**
  - Crear `src/lib/homeTeamSection.spec.ts` (Vitest + happy-dom, lectura de
    `dist/index.html`, patrón de `src/lib/homeScouthemSection.spec.ts`) que
    valide ANTES de implementar:
    - Orden del DOM de las tarjetas de `#equipo`: María José → Cristian →
      Catalina → Lorenzo (REQ-001, SC-001).
    - Exactamente un enlace de LinkedIn por tarjeta, junto al nombre, con el
      `href` exacto de cada perfil (REQ-002, SC-002).
    - `target="_blank"` y `rel` con `noopener` + `noreferrer` (REQ-002,
      SC-003).
    - Ícono `<svg aria-hidden="true">` inline, sin `<img>`, sin `pngtree` y sin
      URLs externas de imagen dentro del enlace (REQ-003, SC-004).
    - Nombre accesible del enlace incluye el nombre de la persona (REQ-003,
      SC-005).
    - Biografías exactas (texto normalizado) y ausencia de las descripciones
      anteriores (REQ-004, SC-006).
    - Cada tarjeta conserva una imagen con `width`, `height`,
      `loading="lazy"`, `sizes` y `alt` con el nombre (REQ-005, SC-007).
  - Ejecutar `npm run build && npm test` y confirmar que el test falla (rojo):
    el orden, los enlaces y las biografías aún son los antiguos.
  - **Prioridad**: alta
  - **Estimate**: 45m
  - **Layer**: dumb
  - **Suggested Path**: `src/lib/homeTeamSection.spec.ts` (entregable de la tarea RED)
  - **Test Path**: `src/lib/homeTeamSection.spec.ts`

## Fase 2: GREEN — Datos, enlaces y biografías

- [x] **T-002: Reordenar el arreglo `team` y actualizar datos**
  - En el frontmatter de `src/pages/index.astro`, reordenar las entradas del
    arreglo `team` a María José Jimenez, Cristian Nova, Catalina Aguilera,
    Lorenzo Traverso (REQ-001, SC-001).
  - Añadir a cada entrada una propiedad `linkedin: string` con la URL exacta
    entregada (REQ-002, SC-002).
  - Reemplazar `description` por el texto literal entregado, preservando
    tildes, paréntesis, mayúsculas y puntuación; mantener los `role` actuales
    (REQ-004, SC-006).
  - No modificar los imports de imágenes ni los binarios de
    `src/assets/team/` (REQ-005, SC-008).
  - Ejecutar `npm run build && npm test`: el test sigue en rojo hasta completar
    T-003 (falta el enlace visible junto al nombre).
  - **Prioridad**: alta
  - **Estimate**: 30m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/homeTeamSection.spec.ts`

- [x] **T-003: Renderizar el enlace de LinkedIn junto al nombre**
  - Envolver el `<h3>` del nombre y el enlace en un contenedor flex
    (`flex items-center gap-2`) sin romper el layout de la tarjeta
    (REQ-002, SC-002).
  - Renderizar `<a href={member.linkedin} target="_blank"
    rel="noopener noreferrer" aria-label={`Perfil de LinkedIn de ${member.name}`}>`
    con un `<svg aria-hidden="true">` inline (reutilizar el trazo de LinkedIn de
    `src/components/global/Footer.astro`, `h-5 w-5` o similar) y clases de
    color/hover coherentes con la tarjeta (REQ-003, SC-003, SC-004, SC-005).
  - Prohibido el PNG de pngtree, `<img>` para el ícono y URLs externas de
    imagen; no agregar dependencias de íconos (REQ-003, SC-004).
  - Ejecutar `npm run build && npm test`: deben pasar SC-001…SC-007 y SC-009.
  - **Prioridad**: alta
  - **Estimate**: 30m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/homeTeamSection.spec.ts`

- [x] **T-004: Confirmar el contrato de retratos sin tocar binarios**
  - Verificar que cada tarjeta conserva exactamente un `<Image>` de
    `astro:assets` con `width={400}`, `height={300}`, `format="avif"`,
    `loading="lazy"`, `sizes` y `alt` con el nombre (REQ-005, SC-007).
  - Ejecutar `git status` y confirmar que no hay cambios en
    `src/assets/team/*` atribuibles al agente: los cambios existentes son los
    del humano y permanecen intactos (REQ-005, SC-008).
  - No ejecutar `git add`, `git restore`, `git checkout -- <imagen>` ni
    cualquier operación que altere esos binarios.
  - **Prioridad**: alta
  - **Estimate**: 15m
  - **Layer**: dumb
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/homeTeamSection.spec.ts`

## Fase 3: Verificación

- [x] **T-005: Verificación completa y delta acotado**
  - Ejecutar `npm run build`, `npm run lint` y `npm test` sin errores
    (REQ-006, SC-009).
  - Ejecutar `bash check-refs.sh` y `bash specboot.sh --ci` en 0 errores.
  - Confirmar con `git status` que el delta de producción es solo
    `src/pages/index.astro` + `src/lib/homeTeamSection.spec.ts`; los binarios de
    `src/assets/team/` y el resto de la home no cambian (SC-008, SC-009).
  - Smoke en `npm run preview`: en móvil una columna en el orden acordado; en
    ≥1024px cuatro columnas en el mismo orden; los cuatro enlaces de LinkedIn
    abren en pestaña nueva (SC-001, SC-003).
  - **Prioridad**: alta
  - **Estimate**: 30m
  - **Layer**: smart
  - **Suggested Path**: `src/pages/index.astro`
  - **Test Path**: `src/lib/homeTeamSection.spec.ts`

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
