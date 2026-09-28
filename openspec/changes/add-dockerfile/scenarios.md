# Escenarios: add-dockerfile

> Change: DEPLOY-DOCKERFILE-001 — Dockerfile multistage para despliegue en
> Coolify. Capability nueva: `deployment-config`. Cambio de infraestructura:
> no hay entidades de data model ni endpoints de API involucrados.

### SC-001: Construcción de la imagen Docker desde el repo (happy path)
- **Given** el repositorio contiene `Dockerfile`, `.dockerignore`, `.npmrc`,
  `package.json` y `pnpm-lock.yaml` en la raíz
- **And** el secret `NODE_AUTH_TOKEN` (PAT con `read:packages`) está disponible
  en el entorno de build
- **When** `docker build .` se ejecuta con el secret inyectado
- **Then** la etapa `builder` (`node:22-alpine`) instala `pnpm@10` global
- **And** `pnpm install --frozen-lockfile` completa sin errores, instalando la
  dependencia privada `@gabrielzavando/specboot` desde npm.pkg.github.com
- **And** `pnpm run build` se ejecuta sin errores dentro del contenedor y
  genera `dist/`
- **And** la etapa `runner` produce la imagen final

### SC-002: Autenticación contra GitHub Packages vía build secret
- **Given** `.npmrc` redirige el scope `@gabrielzavando` a
  `https://npm.pkg.github.com`
- **And** `NODE_AUTH_TOKEN` se recibe como build secret (`ARG`) en la etapa
  builder
- **When** pnpm resuelve `@gabrielzavando/specboot`
- **Then** la autenticación usa el token inyectado (sin token hardcodeado en
  `.npmrc` ni en el Dockerfile)
- **And** el token no queda persistido en capas intermedias ni en la imagen final

### SC-003: Build fallido sin NODE_AUTH_TOKEN (error case)
- **Given** el secret `NODE_AUTH_TOKEN` no está configurado en el entorno de
  build
- **When** `docker build .` se ejecuta sin el secret
- **Then** `pnpm install --frozen-lockfile` falla al autenticar contra
  npm.pkg.github.com por el paquete privado `@gabrielzavando/specboot`
- **And** el build termina con código distinto de 0 y un error visible en el log
- **And** no se produce imagen final

### SC-004: Imagen runner sirve el sitio estático en el puerto 80
- **Given** la imagen final fue construida desde `nginx:alpine`
- **And** `/usr/share/nginx/html` contiene el output de `dist/`
- **When** un contenedor de la imagen se levanta (`CMD ["nginx", "-g",
  "daemon off;"]`)
- **Then** el puerto 80 está expuesto (`EXPOSE 80`)
- **And** `curl -f http://localhost:80/` responde 200 con el HTML del sitio
- **And** nginx corre en primer plano (daemon off), apto para Coolify

### SC-005: .dockerignore minimiza el contexto de build
- **Given** el repositorio contiene `.git/`, `node_modules/`, `dist/`,
  `.specboot-backup-*/`, `openspec/`, `ai-specs/` y `docs/`
- **When** `docker build .` se ejecuta
- **Then** el contexto de build excluye `.git`, `node_modules`, `dist`, `.env`,
  `.env.*`, `.specboot-backup-*`, `openspec`, `ai-specs` y `docs`
- **And** el contexto incluye solo los archivos necesarios para el build
  (código `src/`, configuraciones, lockfile y `.npmrc`)

### SC-006: Build funciona sin archivo .env presente (edge case)
- **Given** el proyecto no tiene archivo `.env` ni `.env.*` en la raíz
- **When** `docker build .` se ejecuta con el secret `NODE_AUTH_TOKEN`
- **Then** el build completa exitosamente
- **And** ninguna variable de entorno de runtime es necesaria (sitio 100%
  estático)

### SC-007: Dockerfile y .dockerignore son archivos intocables del proyecto
- **Given** `Dockerfile` y `.dockerignore` están registrados como archivos
  intocables del proyecto en la capability `framework-tooling-sync`
- **When** un agente necesita modificarlos (p.ej. cambiar la base image)
- **Then** debe actualizar primero los artefactos OpenSpec (specs, tasks)
- **And** solo después implementar el cambio en los archivos
- **And** `specboot update` nunca los sobrescribe (no son framework-owned)
