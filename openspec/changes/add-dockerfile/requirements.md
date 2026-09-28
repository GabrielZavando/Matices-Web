# Requisitos: add-dockerfile

> Change: DEPLOY-DOCKERFILE-001 — Trazabilidad REQ ↔ SC.

## REQ-001: Dockerfile multistage con etapas builder y runner

**Prioridad**: alta | **Escenarios**: SC-001, SC-004

El proyecto DEBE tener un `Dockerfile` en la raíz con dos etapas:

- `builder` (`node:22-alpine AS builder`)
- `runner` (`nginx:alpine AS runner`)

## REQ-002: Etapa builder instala pnpm@10 y restaura dependencias congeladas

**Prioridad**: alta | **Escenarios**: SC-001, SC-002

La etapa builder DEBE:

- ejecutar `npm install -g pnpm@10`
- copiar `.npmrc`, `package.json` y `pnpm-lock.yaml` antes de instalar
- ejecutar `pnpm install --frozen-lockfile`
- copiar el resto del contexto (`COPY . .`)
- ejecutar `pnpm run build`

## REQ-003: NODE_AUTH_TOKEN como build secret para GitHub Packages

**Prioridad**: alta | **Escenarios**: SC-002, SC-003

La etapa builder DEBE recibir `NODE_AUTH_TOKEN` como build secret (`ARG`) para
autenticar contra npm.pkg.github.com (dependencia privada
`@gabrielzavando/specboot`). El token NO DEBE hardcodearse en `.npmrc` ni en el
Dockerfile, y NO DEBE quedar persistido en la imagen final.

## REQ-004: Etapa runner sirve el sitio estático con nginx:alpine

**Prioridad**: alta | **Escenarios**: SC-004

La etapa runner DEBE:

- copiar `/app/dist` a `/usr/share/nginx/html`
- exponer el puerto 80 (`EXPOSE 80`)
- arrancar nginx en primer plano (`CMD ["nginx", "-g", "daemon off;"]`)

## REQ-005: .dockerignore excluye archivos no necesarios

**Prioridad**: alta | **Escenarios**: SC-005, SC-006

`.dockerignore` DEBE excluir del contexto de build: `.git`, `node_modules`,
`dist`, `.env`, `.env.*`, `.specboot-backup-*`, `openspec`, `ai-specs`, `docs`.

## REQ-006: NODE_AUTH_TOKEN documentado para Coolify

**Prioridad**: media | **Escenarios**: SC-002, SC-006

La configuración del build secret `NODE_AUTH_TOKEN` DEBE estar documentada
(comentario en el `Dockerfile` y requirement en la spec `deployment-config`)
para su configuración en Coolify: PAT con scope `read:packages` como secret de
build. No se automatiza la configuración del secret en Coolify.

## REQ-007: Dockerfile y .dockerignore son intocables del proyecto

**Prioridad**: media | **Escenarios**: SC-007

`Dockerfile` y `.dockerignore` DEBEN registrarse como archivos intocables del
proyecto en `framework-tooling-sync`. No son framework-owned: `specboot update`
nunca los sobrescribe. Todo cambio en ellos DEBE seguir el flujo OpenSpec
(actualizar artefactos primero, luego código).
