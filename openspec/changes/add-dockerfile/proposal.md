# Propuesta de Cambio: Dockerfile multistage para despliegue en Coolify

> **Ticket**: DEPLOY-DOCKERFILE-001 | **Tag**: deployment (deploy) | **Change**: `add-dockerfile`

## Why

El proyecto Matices Web (Astro 7 SSG, Node >=22.12.0, pnpm) se desplegará en un
VPS gestionado con Coolify. El flujo vigente (`docs/deploy-standards.md`) asume
publicación estática por FTP/SSH a Hostinger y declara "no se usan imágenes
Docker", por lo que hoy no existe forma de contenerizar el sitio.

Contenerizar el build aporta reproducibilidad (dependencias congeladas con
pnpm-lock.yaml), resuelve la instalación de la dependencia privada
`@gabrielzavando/specboot` (GitHub Packages, autenticada vía build secret
`NODE_AUTH_TOKEN`) y minimiza el consumo de recursos del VPS: la imagen final
nginx:alpine sirve el sitio 100% estático sin runtime de Node.

## What Changes

- Nuevo `Dockerfile` multistage en la raíz del repo:
  - **Etapa 1 `builder`** (`node:22-alpine AS builder`): `npm install -g pnpm@10`;
    `ARG NODE_AUTH_TOKEN` (build secret para GitHub Packages); `COPY` de
    `.npmrc`, `package.json` y `pnpm-lock.yaml`; `pnpm install --frozen-lockfile`;
    `COPY . .`; `pnpm run build`.
  - **Etapa 2 `runner`** (`nginx:alpine AS runner`): `COPY --from=builder
    /app/dist /usr/share/nginx/html`; `EXPOSE 80`; `CMD ["nginx", "-g",
    "daemon off;"]`.
- Nuevo `.dockerignore` en la raíz: `.git`, `node_modules`, `dist`, `.env`,
  `.env.*`, `.specboot-backup-*`, `openspec`, `ai-specs`, `docs`.
- Specs OpenSpec: **ADDED** capability `deployment-config` (contenedorización y
  despliegue); **ADDED** requirement en `framework-tooling-sync` que declara
  `Dockerfile` y `.dockerignore` como archivos intocables del proyecto.
- Fuera de alcance: actualización de `docs/deploy-standards.md` (el flujo
  Hostinger FTP queda como canal alternativo; follow-up documental), CI/CD y la
  configuración del secret en Coolify (se documenta, no se automatiza).

## Impacto

- Archivos nuevos en raíz: `Dockerfile`, `.dockerignore`. Ningún archivo
  existente se modifica.
- TDD: tests de contrato de ambos archivos en `src/lib/dockerfile.spec.ts`
  (convención co-locada del proyecto) escritos antes que los archivos.
- La imagen final no contiene secretos: `.env`/`.env.*` quedan fuera del
  contexto de build; el token viaja solo como build secret en la etapa builder.
- Imagen final esperada ~50-100 MB (nginx:alpine + `dist/` estático) frente a
  >1 GB en una imagen single-stage de Node.
- En Coolify: build con secret `NODE_AUTH_TOKEN` (PAT con `read:packages`),
  puerto 80 expuesto, sin variables de entorno en runtime (sitio 100% estático).
