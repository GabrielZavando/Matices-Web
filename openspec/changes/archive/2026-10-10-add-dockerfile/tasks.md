# Plan de Tareas: Dockerfile multistage para despliegue en Coolify

> Change: DEPLOY-DOCKERFILE-001 | TDD: specs antes de código, test fallido
> primero. Layer: `infrastructure`. Suggested Path raíz (`.specboot.json`
> `services: ["."]`).

## Fase 1: RED — Tests de contrato (TDD)

- [x] **T-001: Escribir tests de contrato del Dockerfile y .dockerignore**
  - Crear `src/lib/dockerfile.spec.ts` (convención co-locada del proyecto,
    Vitest) que valide el contrato de ambos archivos ANTES de que existan:
    - `Dockerfile` declara dos etapas: `FROM node:22-alpine AS builder` y
      `FROM nginx:alpine AS runner` (REQ-001, SC-001, SC-004).
    - Etapa builder: `npm install -g pnpm@10`, `COPY` de `.npmrc` +
      `package.json` + `pnpm-lock.yaml`, `pnpm install --frozen-lockfile`,
      `COPY . .`, `pnpm run build` (REQ-002, SC-001).
    - Etapa builder recibe `NODE_AUTH_TOKEN` como build secret (`ARG`) y no
      hardcodea tokens (REQ-003, SC-002, SC-003).
    - Etapa runner: `COPY --from=builder /app/dist /usr/share/nginx/html`,
      `EXPOSE 80`, `CMD ["nginx", "-g", "daemon off;"]` (REQ-004, SC-004).
    - `.dockerignore` contiene las 9 exclusiones del ticket (REQ-005, SC-005;
      la exclusión de `.env`/`.env.*` cubre SC-006: build sin `.env` presente).
    - Comentario del Dockerfile documenta `NODE_AUTH_TOKEN` para Coolify
      (REQ-006, SC-002).
    - La spec delta `openspec/changes/add-dockerfile/specs/framework-tooling-sync/spec.md`
      declara `Dockerfile` y `.dockerignore` como archivos intocables del
      proyecto (REQ-007, SC-007).
  - Ejecutar `npm test` y confirmar que falla (rojo).
  - **Prioridad**: alta
  - **Estimate**: 30m
  - **Layer**: infrastructure
  - **Suggested Path**: `src/lib/dockerfile.spec.ts` (entregable de la tarea RED)
  - **Test Path**: `src/lib/dockerfile.spec.ts`

## Fase 2: GREEN — Archivos de contenedorización

- [x] **T-002: Crear `.dockerignore`**
  - Exclusiones: `.git`, `node_modules`, `dist`, `.env`, `.env.*`,
    `.specboot-backup-*`, `openspec`, `ai-specs`, `docs` (REQ-005).
  - No excluir `.npmrc` (necesario en el contexto: el Dockerfile lo copia
    explícitamente antes de instalar).
  - Ejecutar `npm test` y confirmar el bloque de `.dockerignore` pasa (verde).
  - **Prioridad**: alta
  - **Estimate**: 15m
  - **Layer**: infrastructure
  - **Suggested Path**: `.dockerignore`
  - **Test Path**: `src/lib/dockerfile.spec.ts`

- [x] **T-003: Crear `Dockerfile` multistage**
  - Etapa 1 `builder` (`node:22-alpine AS builder`): workdir `/app`;
    `npm install -g pnpm@10`; `ARG NODE_AUTH_TOKEN` como build secret para
    GitHub Packages (sin hardcodear); `COPY .npmrc package.json pnpm-lock.yaml`;
    `pnpm install --frozen-lockfile`; `COPY . .`; `pnpm run build` (REQ-001,
    REQ-002, REQ-003).
  - Etapa 2 `runner` (`nginx:alpine AS runner`): `COPY --from=builder /app/dist
    /usr/share/nginx/html`; `EXPOSE 80`; `CMD ["nginx", "-g", "daemon off;"]`
    (REQ-001, REQ-004).
  - Comentario de cabecera documentando el build secret `NODE_AUTH_TOKEN` para
    configurar en Coolify: PAT con scope `read:packages` (REQ-006).
  - Ejecutar `npm test` y confirmar que todos los tests pasan (verde).
  - **Prioridad**: alta
  - **Estimate**: 45m
  - **Layer**: infrastructure
  - **Suggested Path**: `Dockerfile`
  - **Test Path**: `src/lib/dockerfile.spec.ts`

## Fase 3: Verificación local de imagen

- [x] **T-004: Build local + smoke de nginx***(validada manualmente: `docker build` OK, nginx respondió HTTP 200 en :8080)*
  - Exportar `NODE_AUTH_TOKEN` (p.ej. `gh auth token` o PAT con
    `read:packages`) y ejecutar `docker build .` con el secret inyectado:
    verificar `pnpm install --frozen-lockfile` y `pnpm run build` sin errores
    dentro del contenedor (criterio 1 y 2, SC-001).
  - Levantar un contenedor de la imagen y verificar: `EXPOSE 80`,
    `curl -f http://localhost:80/` responde 200, nginx en primer plano
    (criterio 3, SC-004).
  - Verificar que el contexto de build excluye los archivos del ticket
    (`docker build` no envía `.git`, `node_modules`, `dist`, `.env*`,
    `openspec`, `ai-specs`, `docs`) (criterio 4, SC-005).
  - **Prioridad**: alta
  - **Estimate**: 30m
  - **Layer**: infrastructure
  - **Suggested Path**: `Dockerfile`
  - **Test Path**: no aplica (smoke de Docker/HTTP, no Vitest)

## Fase 4: Documentación para Coolify

- [x] **T-005: Documentar el build secret NODE_AUTH_TOKEN para Coolify**
  - Confirmar que el comentario del `Dockerfile` y el requirement REQ-006 de
    `deployment-config` documentan: secret `NODE_AUTH_TOKEN` = PAT de GitHub
    con scope `read:packages`, configurado como build secret/variable de build
    en Coolify (criterio 5, SC-002).
  - Sin automatización de Coolify en este change (fuera de alcance).
  - **Prioridad**: media
  - **Estimate**: 15m
  - **Layer**: infrastructure
  - **Suggested Path**: `Dockerfile`
  - **Test Path**: `src/lib/dockerfile.spec.ts`

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

- [ ] La **rama activa** sigue la convención vigente del proyecto (ej.
  `feature/*`, `fix/*`); trabajar sobre ella, nunca directamente sobre la rama
  principal.
- [ ] Estado **git limpio**: sin cambios sin commitear (ni staged) antes de
  empezar; si hay trabajo en curso, resolverlo primero.

### Durante la implementación

- [ ] **Test nuevo que falla antes de implementar (RED)**: escribir el test del
  escenario (`SC-NNN`) y verificar que falla antes de escribir código de
  producción.
- [ ] Ejecutar los **tests unitarios del módulo** tocado mientras se itera
  (ciclo RED-GREEN-REFACTOR), no solo al final.

### Post-implementación

Antes de dar la tarea por cerrada:

- [ ] **Ejecutar `verify`**: la verificación del change corre y produce
  evidencia persistente (`openspec/state/verify-results.json`).
- [ ] **Ejecutar `adversarial-review`**: la auditoría adversarial corre y
  produce veredicto persistente (`openspec/state/adversarial-result.json`).

> Ambos pasos post alimentan los gates duros de `/commit` (M-901): sin
> `PASS` + `SHIP` vigentes para el change activo, el commit bloquea.
