# Diseño: Dockerfile multistage para despliegue en Coolify

> Change: `add-dockerfile` | Ticket DEPLOY-DOCKERFILE-001 | Tag `[deploy]`.
> Decisión técnica documentada **antes** de implementar (docs = fuente de
> verdad). SSG puro: sin runtime de Node ni variables de entorno en runtime.

## 1. Decisión: Dockerfile multistage (2 etapas exactas)

- **`builder`** (`node:22-alpine`): cumple `engines.node >=22.12.0` y minimiza
  tamaño del build vs. imagen `node:22` full. Instala `pnpm@10` global
  (versionado pinnado, no `corepack`), restaura deps con
  `pnpm install --frozen-lockfile` (reproducibilidad exacta de `pnpm-lock.yaml`)
  y corre `pnpm run build` (`astro build` → `dist/`).
- **`runner`** (`nginx:alpine`): la imagen final sirve `dist/` con nginx
  en primer plano (`daemon off;`, requisito de Coolify como proceso PID 1),
  `EXPOSE 80`. No hereda Node, pnpm, deps ni el token → imagen final
  ~50-100 MB vs. >1 GB en single-stage.

**Orden de capas en `builder`**: `COPY .npmrc package.json pnpm-lock.yaml` →
`pnpm install` → `COPY . .` → `pnpm run build`. Así la capa de dependencias se
cachea mientras no cambien lockfile/manifest, aunque cambie el código.

## 2. Decisión: autenticación GitHub Packages vía `ARG NODE_AUTH_TOKEN`

- `.npmrc` redirige `@gabrielzavando` → `npm.pkg.github.com` y npm/pnpm leen
  `NODE_AUTH_TOKEN` del entorno automáticamente: basta `ARG NODE_AUTH_TOKEN`
  en el builder (BuildKit expone los ARG como env vars dentro de los `RUN`).
- Alternativa considerada: `--mount=type=secret` de BuildKit borraría el token
  incluso del historial del builder; se descarta por el ticket (prescribe ARG)
  y porque el builder se descarta entero: nada cruza al runner salvo `dist/`.
- El token no se hardcodea jamás en `.npmrc`/Dockerfile (test REQ-003 lo
  garantiza) y Coolify lo recibe como variable de build (documentado en el
  header del Dockerfile y en REQ-006 de `deployment-config`).

## 3. Decisión: `.dockerignore` con 9 exclusiones

`.git`, `node_modules`, `dist`, `.env`, `.env.*`, `.specboot-backup-*`,
`openspec`, `ai-specs`, `docs`. Reduce el contexto (veces menos MB a
enviar al demonio) y garantiza que secretos locales (`.env*`) nunca entren
en capas. **`.npmrc` queda incluido a propósito**: el Dockerfile lo copia
explícitamente antes de instalar (si estuviera ignorado, el build fallaría).

## 4. Decisión: TDD con tests de contrato

Sin framework de test de Docker en el repo, el contrato del Dockerfile y
`.dockerignore` se expresa en `src/lib/dockerfile.spec.ts` (convención
co-locada del proyecto, Vitest, TS strictest, sin `any`): stagess en orden,
base images, instrucciones por etapa, ausencia de tokens hardcodeados,
exclusiones y documentación del secret. RED → GREEN demostrado en el ciclo.

## 5. Decisión: intocables del proyecto (no del framework)

`Dockerfile`/`.dockerignore` se registran como intocables **del proyecto** en
`framework-tooling-sync` (nuevo requirement ADDED): cualquier cambio pasa
primero por artefactos OpenSpec. NO son framework-owned: `specboot update`
nunca los toca (no viajan en `@gabrielzavando/specboot`).

## Limitaciones conocidas

- `docs/deploy-standards.md` sigue describiendo el flujo Hostinger FTP como
  único canal y declara "sin Docker" — queda *stale*: follow-up documental
  fuera del scope del ticket.
- La configuración del secret en Coolify se documenta, no se automatiza
  (no hay IaC del VPS en este repo).
