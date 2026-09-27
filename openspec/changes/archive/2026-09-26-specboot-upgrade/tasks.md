# Tasks — Upgrade Specboot v0.1.2 → v0.11.1

> Tareas de implementación de `SPECBOOT-UPGRADE-0111` (OpenSpec change
> `specboot-upgrade`). Proyecto mono-repo raíz (`.specboot.json`
> `services: ["."]`, sin `layers` → capa por defecto: `Tooling (Framework)`).

## Change Summary

Actualizar `@gabrielzavando/specboot` de `^0.1.2` a `^0.11.1`: bump en
`package.json`, `pnpm install`, `specboot update --yes` desde el paquete
instalado, verificación de `.specboot.json`, validación `--init`, y
reconciliación de las adaptaciones locales documentadas (Makefile,
`eslintrc.astro.js`, API key por env var) más la entrada de CHANGELOG y el
gate final `check-refs.sh` + `specboot.sh --ci`.

---

### Task 1: Bump de la dependencia en package.json

- [x] Verificar que `devDependencies["@gabrielzavando/specboot"]` sea `"^0.1.2"` (nombre ya correcto; confirmar que no existe `spewboot`)
- [x] Cambiar `"@gabrielzavando/specboot": "^0.1.2"` → `"^0.11.1"` en `package.json`
- [x] No tocar otras dependencias ni `pnpm.overrides`
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `package.json`
- Test Path: `package.json` (grep `specboot`)

### Task 2: Instalar la nueva versión (pnpm install)

- [x] Verificar auth del registry: `NODE_AUTH_TOKEN` o `gh auth token` (scope `@gabrielzavando` → `npm.pkg.github.com`)
- [x] Ejecutar `pnpm install`
- [x] Confirmar en `pnpm-lock.yaml` la entrada `@gabrielzavando/specboot@0.11.1`
- [x] Confirmar `node_modules/@gabrielzavando/specboot/package.json` con `version: 0.11.1`
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `pnpm-lock.yaml`
- Test Path: `pnpm-lock.yaml` (grep `0.11.1`)

### Task 3: Ejecutar specboot update --yes

- [x] Ejecutar `bash node_modules/@gabrielzavando/specboot/specboot.sh update --yes`
- [x] Verificar que se crea el backup `.specboot-backup-<timestamp>/`
- [x] Verificar que `.github/workflows/ci.yml` se conserva (tri-state; warning esperado)
- [x] Verificar que `release-bump.sh`, `scripts/read-json-field.mjs`, `docs/openspec-tasks-mandatory-steps.md`, `docs/tdd-failure-protocol.md`, `templates/github/*` existen
- [x] Confirmar que el update termina con exit 0
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `specboot.sh`
- Test Path: `bash node_modules/@gabrielzavando/specboot/specboot.sh --version` → `0.11.1`

### Task 4: Verificar .specboot.json

- [x] Confirmar `frameworkVersion: "0.11.1"` en `.specboot.json`
- [x] Confirmar que `name`, `description`, `services: ["."]`, `stack: ["node"]` se conservan
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.1 hours
- Suggested Path: `.specboot.json`
- Test Path: `bash validate-specboot.sh` (comparación `declared == installed`)

### Task 5: Validar la estructura (specboot --init)

- [x] Ejecutar `bash node_modules/@gabrielzavando/specboot/specboot.sh --init`
- [x] Verificar `✅ Setup completo` (0 errores) contra los REQUIRED_FILES de v0.11.1
- [x] Si falla por archivos faltantes, corregir y re-ejecutar
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `specboot.sh` (raíz)
- Test Path: `bash node_modules/@gabrielzavando/specboot/specboot.sh --init`

### Task 6: Restaurar Makefile LOCAL ADAPTATIONS

- [x] Re-aplicar el bloque `LOCAL ADAPTATIONS` sobre el `Makefile` v0.11.1 (el update trae npm/eslint@8)
- [x] pnpm en `install`/`lint`/`test`/`build`/`audit` (audit estricto, sin `|| true`)
- [x] `solid-lint` solo-Astro con `npx eslint -c templates/ci/eslintrc.astro.js src/**/*.{ts,astro}`
- [x] Actualizar el help si los textos del target cambiaron
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `Makefile`
- Test Path: `make solid-lint` + `make audit --dry-run` (grep pnpm)

### Task 7: Restaurar templates/ci/eslintrc.astro.js (flat config)

- [x] Restaurar la flat config ESLint 9 del proyecto (el update trae formato legacy eslint@8)
- [x] Verificar que `make solid-lint` pasa contra `src/**`
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `templates/ci/eslintrc.astro.js`
- Test Path: `make solid-lint`

### Task 8: Migrar API key a variable de entorno

- [x] Confirmar que `opencode.json` usa `"apiKey": "{env:OMNIROUTE_API_KEY}"`
- [x] Añadir `OMNIROUTE_API_KEY=<valor>` a `.env` (gitignored) con el valor real actual
- [x] Añadir `OMNIROUTE_API_KEY=your-omniroute-api-key` a `.env.example`
- [x] Verificar que la key literal `sk-aad2…` ya no está en archivos tracked
- Priority: Medium
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `.env.example`, `.env`
- Test Path: `grep -r "sk-aad2" opencode.json .opencode ai-specs` (vacío)

### Task 9: Entrada CHANGELOG.md

- [x] Añadir entrada del upgrade 0.1.2 → 0.11.1 en `## [Unreleased]`
- [x] Documentar: hotfix 0.11.1, hardening 0.11.0, drift preservado (Makefile, eslintrc, ci.yml custom, env var), archivos nuevos
- Priority: Medium
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `CHANGELOG.md`
- Test Path: `grep "0.11.1" CHANGELOG.md`

### Task 10: Verificar drift .openspec/ vs openspec/ en ai-specs nuevos

- [x] Buscar referencias `.openspec/` en `ai-specs/**/*.md` y `.opencode/**/*.md` post-update
- [x] Si existen, normalizar a `openspec/` (convención local desde el upgrade 0.1.2)
- Priority: Medium
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `ai-specs/**`
- Test Path: `bash check-refs.sh`

### Task 11: Gate final de verificación

- [x] Ejecutar `bash check-refs.sh` → exit 0
- [x] Ejecutar `bash specboot.sh --ci` → `Errores: 0` (incluye contratos de permisos/comandos)
- [x] Ejecutar `openspec validate specboot-upgrade` (si aplica)
- [x] Reiniciar opencode para cargar AGENTS.md v0.11.1, skill `sync-specs`, agentes `commit`/`sdd-plan`/`sync-specs` y comando `sync-specs`
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `specboot.sh`, `check-refs.sh`
- Test Path: `bash check-refs.sh && bash specboot.sh --ci`

---

## Guidelines

1. **Orden:** Ejecutar las tareas en orden numérico; una a la vez.
2. **Gate de framework:** `check-refs.sh` y `specboot.sh --ci` deben reportar
   0 errores al terminar (regla de AGENTS.md §3).
3. **No código de aplicación:** ningún cambio toca `src/**`.
4. **Reconciliación obligatoria:** las tareas 6–8 restablecen el drift local
   documentado que el update sobreescribe; no son opcionales.

## Metadata

| Field | Value |
|-------|-------|
| Ticket | SPECBOOT-UPGRADE-0111 |
| Created | 2026-09-26 |
| Total Tasks | 11 |
| Completed | 0 |
| Remaining | 11 |
| Estimated Total | 3.85 hours |