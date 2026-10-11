# deployment-config Specification

## Purpose

Define la configuración de contenedorización y despliegue de Matices Web
(Astro 7 SSG, Node >=22.12.0, pnpm) en un VPS gestionado con Coolify: el
Dockerfile multistage, el `.dockerignore` y el build secret requerido para
GitHub Packages. El sitio es 100% estático: la imagen final sirve `dist/` con
nginx, sin runtime de Node ni variables de entorno en runtime.

## ADDED Requirements

### Requirement: Multistage Dockerfile builds a static image served by nginx

The project MUST provide a root-level `Dockerfile` with exactly two stages:

- **`builder`** (`node:22-alpine AS builder`): installs `pnpm@10` globally
  (`npm install -g pnpm@10`), receives `NODE_AUTH_TOKEN` as a build secret
  (`ARG`), copies `.npmrc`, `package.json` and `pnpm-lock.yaml`, restores
  dependencies with `pnpm install --frozen-lockfile`, copies the rest of the
  build context (`COPY . .`) and runs `pnpm run build`.
- **`runner`** (`nginx:alpine AS runner`): copies `/app/dist` to
  `/usr/share/nginx/html`, exposes port 80 (`EXPOSE 80`) and runs nginx in the
  foreground (`CMD ["nginx", "-g", "daemon off;"]`), suitable for Coolify.

#### Scenario: imagen funcional desde el repo (happy path)
- **Given** el repositorio contiene `Dockerfile`, `.dockerignore`, `.npmrc`,
  `package.json` y `pnpm-lock.yaml` en la raíz y el secret `NODE_AUTH_TOKEN`
  está disponible
- **When** `docker build .` se ejecuta con el secret inyectado
- **Then** `pnpm install --frozen-lockfile` y `pnpm run build` completan sin
  errores dentro del contenedor
- **And** la etapa `runner` produce la imagen final basada en `nginx:alpine`

#### Scenario: runner sirve el sitio en el puerto 80
- **Given** la imagen final contiene el output de `dist/` en
  `/usr/share/nginx/html`
- **When** un contenedor de la imagen se levanta
- **Then** el puerto 80 está expuesto y `curl -f http://localhost:80/`
  responde 200 con el HTML del sitio
- **And** nginx corre en primer plano (`daemon off;`)

#### Scenario: build falla sin NODE_AUTH_TOKEN
- **Given** el secret `NODE_AUTH_TOKEN` no está configurado en el entorno de build
- **When** `docker build .` se ejecuta sin el secret
- **Then** `pnpm install --frozen-lockfile` falla al autenticar contra
  npm.pkg.github.com por `@gabrielzavando/specboot`
- **And** el build termina con código distinto de 0 y no se produce imagen final

### Requirement: GitHub Packages auth via NODE_AUTH_TOKEN build secret

The `builder` stage MUST receive `NODE_AUTH_TOKEN` as a build secret (`ARG`)
to authenticate against npm.pkg.github.com for the private dependency
`@gabrielzavando/specboot`. The token MUST NOT be hardcoded in `.npmrc` or in
the Dockerfile, and MUST NOT be persisted in intermediate layers or in the
final image. The configuration MUST be documented for Coolify: a GitHub PAT
with `read:packages` scope configured as a build secret.

#### Scenario: autenticación usa el token inyectado
- **Given** `.npmrc` redirige el scope `@gabrielzavando` a npm.pkg.github.com
  y `NODE_AUTH_TOKEN` se inyecta como build secret
- **When** pnpm resuelve `@gabrielzavando/specboot`
- **Then** la autenticación usa el token inyectado
- **And** no hay token hardcodeado en `.npmrc` ni en el Dockerfile

#### Scenario: el token no queda en la imagen final
- **Given** el build completó con el secret `NODE_AUTH_TOKEN` inyectado
- **When** se inspecciona la imagen final (`.env`, capas, configuración)
- **Then** el token no aparece en ninguna capa de la imagen final
- **And** la documentación del Dockerfile describe cómo configurar
  `NODE_AUTH_TOKEN` como build secret en Coolify

### Requirement: .dockerignore minimizes the build context

The project MUST provide a root-level `.dockerignore` that excludes from the
build context: `.git`, `node_modules`, `dist`, `.env`, `.env.*`,
`.specboot-backup-*`, `openspec`, `ai-specs`, `docs`. The `.npmrc` file MUST
NOT be excluded (the Dockerfile copies it explicitly before installing).

#### Scenario: contexto de build minimizado
- **Given** el repositorio contiene `.git/`, `node_modules/`, `dist/`,
  `.specboot-backup-*/`, `openspec/`, `ai-specs/` y `docs/`
- **When** `docker build .` se ejecuta
- **Then** el contexto de build excluye `.git`, `node_modules`, `dist`,
  `.env`, `.env.*`, `.specboot-backup-*`, `openspec`, `ai-specs` y `docs`
- **And** incluye solo los archivos necesarios para el build (`src/`, configs,
  lockfile, `.npmrc`)

#### Scenario: build funciona sin .env presente
- **Given** el proyecto no tiene archivo `.env` ni `.env.*` en la raíz
- **When** `docker build .` se ejecuta con el secret `NODE_AUTH_TOKEN`
- **Then** el build completa exitosamente sin variables de entorno de runtime
