# Requirements — Upgrade Specboot v0.1.2 → v0.11.1

> Requisitos funcionales y técnicos de `SPECBOOT-UPGRADE-0111`, cada uno
> trazable a escenarios de `scenarios.md`.

## REQ-001: Dependencia pinneada a v0.11.1

### Description

El framework `@gabrielzavando/specboot` debe quedar fijado en `^0.11.1` como
dependencia de desarrollo, con el nombre correcto del paquete.

### Requirements

- **REQ-001.1:** `devDependencies["@gabrielzavando/specboot"]` = `"^0.11.1"` en `package.json`
- **REQ-001.2:** No debe existir la entrada `@gabrielzavando/spewboot` (typo)

### Acceptance Criteria

- [ ] `package.json` declara `@gabrielzavando/specboot: ^0.11.1`
- [ ] `grep spewboot` no devuelve resultados

**Traza:** Scenario 1, Scenario 2

---

## REQ-002: Lockfile actualizado

### Description

`pnpm-lock.yaml` debe resolver la nueva versión desde el registry de GitHub
Packages.

### Requirements

- **REQ-002.1:** `pnpm-lock.yaml` debe contener la entrada `@gabrielzavando/specboot@0.11.1`
- **REQ-002.2:** La resolución debe provenir de `npm.pkg.github.com` (scope `@gabrielzavando` vía `.npmrc`)

### Acceptance Criteria

- [ ] `pnpm-lock.yaml` ya no referencia `0.1.2` para `@gabrielzavando/specboot`
- [ ] La entrada `0.11.1` existe en importers y packages del lockfile

**Traza:** Scenario 1, Scenario 7

---

## REQ-003: frameworkVersion sincronizado

### Description

El manifiesto `.specboot.json` debe declarar la versión instalada del framework.

### Requirements

- **REQ-003.1:** `.specboot.json` debe tener `frameworkVersion: "0.11.1"`
- **REQ-003.2:** La escritura debe conservar los demás campos (`name`,
  `description`, `services`, `stack`)

### Acceptance Criteria

- [ ] `frameworkVersion` es `"0.11.1"` (escrito por el propio `specboot update`)
- [ ] `validate-specboot.sh` compara `declared == installed` → `eq` (sin warnings)

**Traza:** Scenario 1

---

## REQ-004: Archivos intocables sincronizados vía specboot update

### Description

`specboot update --yes` (desde `node_modules/@gabrielzavando/specboot`) debe
reemplazar los archivos intocables del framework por los de v0.11.1, con backup
automático y sin tocar el código del proyecto.

### Requirements

- **REQ-004.1:** El update debe crear un backup en `.specboot-backup-*` (ya
  ignorado por `.gitignore`)
- **REQ-004.2:** Deben reemplazarse `specboot.sh`, `AGENTS.md`, `opencode.json`,
  `Makefile`, `ai-specs/`, `.opencode/agents/`, `.opencode/commands/`,
  `templates/ci/`, `templates/github/`, `check-refs.sh`, `validate-specboot.sh`
  y los docs intocables
- **REQ-004.3:** Deben crearse `release-bump.sh`, `scripts/read-json-field.mjs`,
  `docs/openspec-tasks-mandatory-steps.md`, `docs/tdd-failure-protocol.md`
- **REQ-004.4:** `src/**`, `docs/project/*`, `docs/api/`, `docs/data-model/`,
  `openspec/**` y `.github/workflows/ci.yml` no deben modificarse

### Acceptance Criteria

- [ ] `specboot.sh` raíz es la versión v0.11.1 (1083+ líneas, `--version` → `0.11.1`)
- [ ] Existe `.specboot-backup-<timestamp>/` con los archivos previos
- [ ] Los archivos nuevos del REQ-004.3 existen

**Traza:** Scenario 1, Scenario 3, Scenario 8

---

## REQ-005: El ci.yml propio del proyecto se preserva

### Description

La política tri-estado de v0.11.x debe conservar el `ci.yml` custom del
proyecto (no es una variante distribuida por Specboot).

### Requirements

- **REQ-005.1:** `.github/workflows/ci.yml` debe permanecer byte-a-byte intacto
- **REQ-005.2:** El update puede emitir un warning de resolución explícita
  (no bloqueante)

### Acceptance Criteria

- [ ] El diff de `.github/workflows/ci.yml` tras el update es vacío
- [ ] El update completa con exit 0

**Traza:** Scenario 3

---

## REQ-006: Proveedor de OpenCode por variable de entorno

### Description

`opencode.json` v0.11.1 usa `{env:OMNIROUTE_API_KEY}`; la key literal debe
desaparecer del repositorio y la variable debe quedar definida localmente.

### Requirements

- **REQ-006.1:** `opencode.json` debe declarar `"apiKey": "{env:OMNIROUTE_API_KEY}"`
- **REQ-006.2:** `OMNIROUTE_API_KEY` debe estar en `.env` (gitignored)
- **REQ-006.3:** `.env.example` debe documentar la variable con placeholder

### Acceptance Criteria

- [ ] `grep -r "sk-aad2" opencode.json .opencode/ ai-specs/` sin resultados
- [ ] `grep OMNIROUTE_API_KEY .env.example` devuelve la variable

**Traza:** Scenario 4

---

## REQ-007: Adaptaciones locales del tooling restauradas

### Description

Tras el update (que trae Makefile npm/eslint@8 y `eslintrc.astro.js` legacy),
las adaptaciones locales documentadas deben restaurarse para que `make ci`
siga funcionando con pnpm y ESLint 9.

### Requirements

- **REQ-007.1:** `Makefile` debe restaurar el bloque `LOCAL ADAPTATIONS`
  (pnpm en install/lint/test/build/audit estricto; solid-lint solo-Astro flat)
- **REQ-007.2:** `templates/ci/eslintrc.astro.js` debe ser la flat config
  ESLint 9 del proyecto
- **REQ-007.3:** `make solid-lint` debe pasar contra `src/**` con el ESLint 9
  instalado

### Acceptance Criteria

- [ ] `make solid-lint` exit 0
- [ ] `make audit` usa `pnpm audit --audit-level=high` sin `|| true`
- [ ] `templates/ci/eslintrc.astro.js` empieza por el comentario
  `// ESLint flat config — Astro sites / landing`

**Traza:** Scenario 5, Scenario 6

---

## REQ-008: Validación del framework con 0 errores

### Description

Los dos gates del framework (`check-refs.sh` y `specboot.sh --ci`) deben pasar
con 0 errores tras el cambio.

### Requirements

- **REQ-008.1:** `bash check-refs.sh` → exit 0 (tokens `{file:...}` y registro
  de skills en `AGENTS.md`)
- **REQ-008.2:** `bash specboot.sh --ci` → 0 errores (estructura, `.specboot.json`,
  placeholders, skills, contratos de permisos y comandos)
- **REQ-008.3:** Si los ai-specs nuevos referencian `.openspec/`, corregir a
  `openspec/` (convención local documentada desde el upgrade 0.1.2)

### Acceptance Criteria

- [ ] `bash check-refs.sh` exit 0
- [ ] `bash specboot.sh --ci` reporta `Errores: 0`
- [ ] Los validadores de contratos (`validate-agent-permissions.mjs`,
  `validate-command-contracts.mjs`) pasan contra `.opencode/**/*.md`

**Traza:** Scenario 8

---

## Technical Constraints

| Constraint | Description |
|------------|-------------|
| Gestor de paquetes | pnpm (lockfile `pnpm-lock.yaml`; `.npmrc` con scope `@gabrielzavando` → `npm.pkg.github.com`) |
| Autenticación registry | `NODE_AUTH_TOKEN` (PAT `read:packages` o `gh auth token`) |
| Runtime | Node ≥ 22.12.0 (`engines` de `package.json`) |
| ESLint | 9+ flat config (drift documentado del proyecto) |
| CLI OpenSpec | v1.3.1 (`/usr/bin/openspec`) |

## Dependencies

- Registro GitHub Packages (`npm.pkg.github.com`) con el paquete `@gabrielzavando/specboot@0.11.1` publicado
- Release v0.11.1 del repo `GabrielZavando/Specboot` (tag `v0.11.1`, commit `b252a63`, 2026-09-26)

## Out of Scope

- Adopción del `consumer-ci.yml` upstream (el `ci.yml` custom del proyecto se conserva)
- Rotación de la key `sk-aad2…` expuesta en historial git (solo se elimina del working tree)
- Migración de `.github/workflows/*` internos del framework (nunca se distribuyen a consumidores)
- Cambios en código de aplicación (`src/**`)