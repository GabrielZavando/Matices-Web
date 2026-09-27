# Scenarios — Upgrade Specboot v0.1.2 → v0.11.1

> Gherkin-format acceptance scenarios for `SPECBOOT-UPGRADE-0111`.
> Entidades reales referenciadas: `package.json`, `pnpm-lock.yaml`,
> `.specboot.json`, `.npmrc`, `node_modules/@gabrielzavando/specboot`,
> `.github/workflows/ci.yml`, `opencode.json`, `Makefile`,
> `templates/ci/eslintrc.astro.js`, `check-refs.sh`, `specboot.sh`.

## Feature: Actualizar el framework Specboot a v0.11.1

### Scenario 1: Upgrade completo con instalación y sync exitosos (happy path)

**Given** el proyecto declara `@gabrielzavando/specboot: ^0.1.2` en
`devDependencies` de `package.json`
**And** `.specboot.json` declara `frameworkVersion: "0.1.2"`
**And** `NODE_AUTH_TOKEN` tiene permisos `read:packages` sobre el scope
`@gabrielzavando` en `npm.pkg.github.com`
**When** el dev cambia la versión de `@gabrielzavando/specboot` a `^0.11.1` en
`package.json`
**And** ejecuta `pnpm install`
**And** ejecuta `bash node_modules/@gabrielzavando/specboot/specboot.sh update --yes`
**And** ejecuta `bash node_modules/@gabrielzavando/specboot/specboot.sh --init`

**Then** `pnpm-lock.yaml` resuelve `@gabrielzavando/specboot@0.11.1`
**And** `.specboot.json` declara `frameworkVersion: "0.11.1"`
**And** `specboot.sh`, `AGENTS.md`, `opencode.json`, `Makefile`, `ai-specs/`,
`.opencode/agents/`, `.opencode/commands/` y `templates/` son los de v0.11.1
**And** existe un backup en `.specboot-backup-*` con los archivos reemplazados
**And** `bash node_modules/@gabrielzavando/specboot/specboot.sh --init` termina
con `✅ Setup completo` (0 errores)

---

### Scenario 2: El nombre de la dependencia ya es correcto (sin typo)

**Given** el `package.json` del proyecto ya declara
`@gabrielzavando/specboot` (nombre correcto, sin `spewboot`)
**When** se revisa `devDependencies` de `package.json`
**Then** no existe la entrada `@gabrielzavando/spewboot`
**And** el único cambio de dependencia es el bump de versión a `^0.11.1`

---

### Scenario 3: El ci.yml custom del proyecto se preserva (política tri-estado)

**Given** `.github/workflows/ci.yml` es un workflow propio del proyecto
(custom, con 6 jobs incluyendo `specboot-ci`)
**And** su fingerprint NO coincide con la allowlist de variantes distribuidas
por Specboot (`KNOWN_CONSUMER_CI_FINGERPRINTS`)
**When** `specboot update --yes` ejecuta la política tri-estado sobre el ci.yml
**Then** el archivo se conserva byte-a-byte (no se sobrescribe)
**And** el update emite un warning de resolución explícita manual (no bloqueante)
**And** el update completa con exit 0

---

### Scenario 4: El opencode.json migra a clave por variable de entorno

**Given** el `opencode.json` actual contiene la key literal `sk-aad2…` en
`provider.omniroute.options.apiKey`
**When** `specboot update --yes` reemplaza `opencode.json` por la versión v0.11.1
**Then** `opencode.json` declara `"apiKey": "{env:OMNIROUTE_API_KEY}"`
**And** la key literal ya no está en `opencode.json`
**And** `OMNIROUTE_API_KEY` está definida en `.env` (gitignored) y documentada
en `.env.example`
**And** opencode resuelve la key por interpolación `{env:…}` al arrancar

---

### Scenario 5: Las adaptaciones locales del Makefile se restauran tras el update

**Given** `specboot update --yes` reemplaza `Makefile` por la versión upstream
v0.11.1 (usa `npm`, `npx eslint@8` y `audit` con `|| true`)
**When** el dev restaura el bloque `LOCAL ADAPTATIONS` del proyecto
**Then** `make install`, `make lint`, `make test`, `make build` y `make audit`
usan `pnpm`
**And** `make solid-lint` ejecuta solo la flat config Astro
(`npx eslint -c templates/ci/eslintrc.astro.js src/**`)
**And** `make audit` mantiene el gate estricto (`pnpm audit --audit-level=high`
sin `|| true`)

---

### Scenario 6: La flat config de ESLint Astro se restaura tras el update

**Given** `specboot update --yes` reemplaza `templates/ci/` por la versión
upstream v0.11.1 (incluye un `eslintrc.astro.js` en formato legacy para
`eslint@8`)
**When** el dev restaura `templates/ci/eslintrc.astro.js`
**Then** el archivo es la flat config ESLint 9 del proyecto (con el header de
`LOCAL ADAPTATION`)
**And** `make solid-lint` vuelve a pasar con el ESLint 9 instalado en el
proyecto

---

### Scenario 7: Fallo de autenticación contra GitHub Packages

**Given** `NODE_AUTH_TOKEN` no está definido ni autenticado (`gh auth token`
no disponible)
**When** se ejecuta `pnpm install` con la dependencia `^0.11.1`
**Then** pnpm no puede resolver `@gabrielzavando/specboot@0.11.1` desde
`npm.pkg.github.com` (401/authentication required)
**And** el flujo se detiene antes de tocar `.specboot.json` ni los archivos
intocables
**And** el dev configura `NODE_AUTH_TOKEN` (PAT con `read:packages` o
`export NODE_AUTH_TOKEN=$(gh auth token)`) y reintenta

---

### Scenario 8: Validación final con 0 errores (gate del framework)

**Given** el update y las restauraciones locales están completos
**When** se ejecuta `bash check-refs.sh`
**And** se ejecuta `bash specboot.sh --ci`
**Then** `check-refs.sh` termina con exit 0 (integridad referencial
`{file:...}` en `opencode.json`, `ai-specs/**/*.md`, `.opencode/**/*.md`)
**And** `specboot.sh --ci` reporta 0 errores (estructura, `.specboot.json`,
placeholders, skills, contratos de permisos y comandos)
**And** los nuevos validadores (`validate-agent-permissions.mjs`,
`validate-command-contracts.mjs`) pasan contra los `.opencode/*.md` de v0.11.1

---

## Edge Cases Summary

| Edge Case | Expected Behavior |
|-----------|------------------|
| Typo `spewboot` inexistente | No hay nada que corregir; solo bump de versión |
| `ci.yml` custom del proyecto | Preservado byte-a-byte + warning (tri-state) |
| Makefile/eslintrc clobbered por el update | Restauración de adaptaciones locales post-update |
| `opencode.json` sin key tras el update | `OMNIROUTE_API_KEY` en `.env` + `.env.example` |
| `NODE_AUTH_TOKEN` ausente | `pnpm install` 401; abortar con mensaje claro |
| Drift `.openspec/` vs `openspec/` en ai-specs nuevos | Corregir referencias para que `check-refs.sh` pase |
| Nuevos REQUIRED_FILES (0.11.1) ausentes | El update los trae; si falta algo, corregir y re-ejecutar `--init` |
| `plan.md` renombrado a `sdd-plan.md` | Aceptar el rename del agente; reiniciar opencode |

## Definition of Done

- [ ] `package.json` con `@gabrielzavando/specboot: ^0.11.1`
- [ ] `pnpm-lock.yaml` con `@gabrielzavando/specboot@0.11.1`
- [ ] `.specboot.json` con `frameworkVersion: "0.11.1"`
- [ ] `specboot.sh --init` (desde node_modules) con 0 errores
- [ ] `ci.yml` del proyecto preservado
- [ ] `Makefile` y `eslintrc.astro.js` con adaptaciones locales restauradas
- [ ] `opencode.json` sin key hardcodeada; `OMNIROUTE_API_KEY` en `.env`/`.env.example`
- [ ] `bash check-refs.sh` exit 0
- [ ] `bash specboot.sh --ci` 0 errores
- [ ] `CHANGELOG.md` con la entrada del upgrade