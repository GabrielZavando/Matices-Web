# Propuesta de Cambio: Upgrade del Framework Specboot v0.1.2 → v0.11.1

## Ticket

- **Ticket ID**: SPECBOOT-UPGRADE-0111
- **Título**: Actualizar el framework `@gabrielzavando/specboot` a la versión 0.11.1
- **Tag**: ninguno (cambio de tooling/framework; no toca código de aplicación ni carga estándares de área)

## Why

El proyecto declara `@gabrielzavando/specboot` en `devDependencies` y su
`.specboot.json` fija `frameworkVersion: "0.1.2"` (sync manual del 2026-09-01,
commit `d781fb6`). Desde entonces el upstream ha publicado 9 minors con dos
bloques de valor directo para este proyecto:

1. **Hardening del update (0.11.0, `SPECBOOT-HARDEN-02/04`)**: `specboot update`
   adopta una política tri-estado para el `ci.yml` del consumidor — instala si
   falta, respalda y repara solo variantes históricas distribuidas por Specboot
   (allowlist de fingerprints inmutables), y **preserva byte-a-byte** cualquier
   `ci.yml` modificado o ajeno. Además `specboot.sh --ci`/`--init` validan el
   directorio desde el que se invocan (el proyecto consumidor al correr desde
   `node_modules`), y la resolución de versión pasa a ser node_modules-first,
   eliminando el debt documentado en CHANGELOG: "la precedencia (1) shadows
   `node_modules/@gabrielzavando/specboot`".

2. **Hotfix del CI distribuible (0.11.1)**: `templates/github/workflows/
   consumer-ci.yml` distribuía un `name` con `:` sin comillas que GitHub
   Actions rechaza. Es un fix del template; nuestro `ci.yml` propio es custom
   y no se ve afectado (la política tri-estado lo preserva).

3. **Nuevos checkers y artefactos (0.11.0)**: validadores de contratos de
   permisos de agentes y de comandos (`check_permission_contracts` /
   `check_command_contracts` en `--ci`), manifiesto
   `docs/agent-permission-contracts.yml`, configuración de proveedores de
   OpenCode vía `{env:VAR}` (FW-ENV) — que elimina la key hardcodeada de
   `opencode.json` —, pre-flight reanudable de `/apply`, y la skill/agente
   `sync-specs`.

El upgrade **no afecta el desarrollo del proyecto**: toca exclusivamente
archivos del framework (`specboot.sh`, `AGENTS.md`, `ai-specs/`, `.opencode/`,
`opencode.json`, `Makefile`, `templates/`, docs intocables) y tooling
(`package.json`, `pnpm-lock.yaml`, `CHANGELOG.md`, `.env.example`). El código
de aplicación (`src/**`), `docs/project/*`, `docs/api/`, `docs/data-model/`,
los `openspec/specs/**` activos y los cambios archivados permanecen intactos.

## What Changes

**Actualizar la dependencia `@gabrielzavando/specboot` de `^0.1.2` a `^0.11.1`**
(devDependencies; el nombre ya es `specboot`, no existe typo `spewboot`),
instalar el paquete y ejecutar `specboot update --yes` desde
`node_modules/@gabrielzavando/specboot` para sincronizar los archivos
intocables del framework.

### Archivos modificados por el dev

- `package.json` — devDependency `@gabrielzavando/specboot`: `^0.1.2` → `^0.11.1`.
- `pnpm-lock.yaml` — regenerado por `pnpm install` (entrada `0.1.2` → `0.11.1`).
- `Makefile` — tras el `specboot update` (que trae la versión npm/eslint@8
  upstream), **restaurar el bloque `LOCAL ADAPTATIONS`** (pnpm en
  install/lint/test/build/audit estricto; solid-lint solo-Astro con flat config).
- `templates/ci/eslintrc.astro.js` — tras el update (que trae formato legacy
  eslint@8), **restaurar la flat config ESLint 9 del proyecto** (drift
  documentado).
- `.env` / `.env.example` — definir `OMNIROUTE_API_KEY` (el `opencode.json`
  upstream usa `{env:OMNIROUTE_API_KEY}`; la key hardcodeada `sk-aad2…` se
  elimina del repo).
- `CHANGELOG.md` — entrada del upgrade 0.1.2 → 0.11.1.

### Archivos reemplazados por `specboot update --yes` (intocables del framework)

- `specboot.sh`, `check-refs.sh`, `validate-specboot.sh` (nuevo set de
  REQUIRED_FILES y checkers de contratos).
- `AGENTS.md`, `opencode.json` (providers vía env var + permisos ampliados),
  `Makefile`, `templates/ci/`, `templates/github/`.
- `ai-specs/` (sync completo: skill `sync-specs`, agentes `commit`/`sdd-plan`/
  `sync-specs`, `plan.md` → `sdd-plan.md`, refinamientos).
- `.opencode/agents/` y `.opencode/commands/` (agregados `commit.md`,
  `sdd-plan.md`, `sync-specs.md` y comando `sync-specs.md`).
- `docs/base-standards.md`, `docs/framework-contract.md`, `docs/docs-standard.md`,
  `docs/specboot-json-standard.md`, `docs/versioning-standard.md`,
  `docs/openspec-tasks-mandatory-steps.md` (nuevo), `docs/tdd-failure-protocol.md`
  (nuevo).
- `.github/pull_request_template.md` (reemplazado por la plantilla del framework).

### Archivos creados por `specboot update --yes`

- `release-bump.sh`, `scripts/read-json-field.mjs`, `templates/github/*`.

### Archivos NO tocados (intocables del proyecto)

- `src/**`, `astro.config.mjs`, `tsconfig.json`, `.npmrc`, `.env`,
  `docs/project/*`, `docs/backend-standards.md`, `docs/frontend-standards.md`,
  `docs/deploy-standards.md`, `docs/documentation-standards.md`,
  `docs/api/api-spec.yml`, `docs/data-model/data-model.md`,
  `openspec/**` (specs activas, cambios, archive), `.gitignore`,
  `.github/workflows/ci.yml` (custom, preservado por la política tri-estado).

## Impacto

**Archivos tocados (≈30):** los listados arriba. Ninguno es código de
aplicación (`src/**`).

**Salto de versión:** minor en semver 0.x (0.1.2 → 0.11.1; `semver_jump` lo
clasifica `minor`, sin prompt de breaking change; `--yes` lo confirma de todos
modos).

**Riesgos operativos y mitigaciones:** ver tabla en `scenarios.md` (casos de
error) y el checklist de verificación en `requirements.md`.