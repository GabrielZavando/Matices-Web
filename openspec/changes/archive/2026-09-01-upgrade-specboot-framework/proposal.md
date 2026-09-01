# Propuesta de Cambio: Upgrade del Framework Specboot v0.1.0 → v0.1.2

## Why

El proyecto Matices Web trabaja con una **versión antigua** del framework Specboot
(la instantánea que se sincronizó en `v0.1.0`, commit `ca0dd66` del 2026-07-18,
documentado en `CHANGELOG.md`). Desde entonces el upstream de
[`GabrielZavando/Specboot`](https://github.com/GabrielZavando/Specboot) ha publicado
dos releases minors: **`v0.1.1`** (2026-08-29, refactor de gobernanza del template:
`AGENTS.md` con carga condicional, `opencode.json` reducido, agents slimmed) y
**`v0.1.2`** (2026-08-31, fix de npm publish que desbloquea la distribución como
paquete `@gabrielzavando/specboot`).

Quedarse en `v0.1.0` tiene tres costes concretos que el cliente (Matices) ha
empezado a notar:

1. **Drift de tooling**: el proyecto declara en `AGENTS.md` reglas que el upstream
   ya no mantiene (carga "always read", tabla única de skills). El
   `opencode.json` del proyecto (91 líneas con `agent`/`command` inline) no es el
   layout canónico del framework (`opencode.json` upstream v0.1.2 tiene 20 líneas;
   la configuración vive en `.opencode/agents/*.md` y `.opencode/commands/*.md`
   con frontmatter YAML). Si en el futuro se adopta `specboot update` o
   `npm install --save-dev @gabrielzavando/specboot`, el contrato entre
   framework y proyecto ha cambiado.

2. **Funcionalidades faltantes**: cuatro skills canónicas del framework no están
   en el proyecto: `archive`, `verify`, `explain`, `show-spec-working`. Dos
   agentes tampoco: `archive-agent`, `verify-agent`. La nueva skill
   `enrich-us` (v0.1.1) ahora persiste artefactos en
   `openspec/tickets/{TICKET-ID}-enriched.md` con un contrato explícito con
   `plan-change` (no presente en el proyecto).

3. **Validación insuficiente**: el `specboot.sh --ci` upstream v0.1.2 añade
   `validate-specboot.sh` (validador del manifiesto `.specboot.json`) y nuevos
   chequeos. El proyecto no tiene ninguno de los dos, por lo que la auditoría
   del framework es menos estricta que la del upstream.

El upgrade **no afecta el desarrollo del proyecto** porque toca exclusivamente
archivos del framework (`specboot.sh`, `AGENTS.md`, `ai-specs/`, `.opencode/`,
`docs/framework-contract.md` etc.) y archivos de tooling (`Makefile`,
`update.sh`, `templates/ci/`, `docs/base-standards.md`). El código de
aplicación (`src/**`), los `openspec/specs/**` (10 specs activos), los cambios
archivados y los `package.json`/`pnpm-lock.yaml` del proyecto permanecen
intactos.

## What Changes

**Sincronizar el framework Specboot del proyecto de v0.1.0 a v0.1.2 (último
upstream)**, preservando todas las adaptaciones intencionales documentadas
previamente en `CHANGELOG.md` y en los propios archivos del proyecto.

### Archivos a reemplazar (del framework, intocables salvo adaptaciones documentadas)

- `specboot.sh` (309 → 1083 líneas): nuevos subcomandos `init`, `update`,
  `--version`; integra `validate-specboot.sh`; maneja semver jump con backup
  automático.
- `check-refs.sh`: ajustes menores de formato y exit codes.
- `AGENTS.md` (72 → 207 líneas): reformulado como **puente** entre framework y
  proyecto; carga condicional de contexto con matriz tag-based; registro de
  skills y comandos en layout canónico.
- `docs/base-standards.md`: revertido a la versión upstream (neutra). El
  contexto de Matices (§8) y las reglas SOLID adaptadas a Astro (§9) migran a
  `docs/project/{stack,client}.md` (que el upstream v0.1.2 introduce
  precisamente para esto).
- `Makefile`: reemplazado por el parametrizado por `.specboot.json`. Se
  restauran los overrides locales (`pnpm`, `solid-lint` solo-Astro) como
  bloque `LOCAL ADAPTATIONS` documentado, igual que el `eslintrc.astro.js`
  flat-config ya documenta su drift.
- `templates/ci/`: se traen `eslintrc.backend.js`, `eslintrc.frontend.js`,
  `.dependency-cruiser.js`, `.madge.config.json`, `package.ci.json`,
  `README.md` desde el upstream. **NO** se copia `eslintrc.astro.js` (la
  versión flat-config del proyecto es drift documentado). **NO** se copian
  `.importlinter` ni `ruff.toml` (Python-specific, no aplica).
- `ai-specs/`: sync completo. Trae las 4 skills nuevas (`archive`, `verify`,
  `explain`, `show-spec-working`), los 2 agentes nuevos (`archive-agent`,
  `verify-agent`) y los refinamientos de los 7 existentes.

### Archivos a crear (nuevos en el proyecto)

- `.opencode/agents/*.md` (7 archivos): `plan.md`, `build.md`, `backend.md`,
  `frontend.md`, `reviewer.md`, `verify.md`, `archive.md` con frontmatter YAML.
- `.opencode/commands/*.md` (10 archivos): `plan-change.md`, `apply.md`,
  `verify.md`, `archive.md`, `commit.md`, `deploy.md`, `enrich-us.md`,
  `adversarial-review.md`, `explain.md`, `show-spec-working.md`.
- `.specboot.json`: manifiesto del proyecto con `frameworkVersion: "0.1.2"`,
  `services: ["."]`, `stack: ["node"]`.
- `validate-specboot.sh`: validador del manifiesto (invocado por
  `specboot.sh --ci`).
- `scripts/dogfood-check.sh`: self-check opcional (corre `check-refs.sh` +
  `specboot.sh --ci`).
- `docs/framework-contract.md`, `docs/docs-standard.md`,
  `docs/specboot-json-standard.md`, `docs/versioning-standard.md`,
  `docs/git-workflow-standards.md`, `docs/ci-standards.md`: 6 documentos
  intocables del framework.
- `docs/project/domain.md`, `docs/project/stack.md`, `docs/project/client.md`:
  contexto del proyecto (migración desde §8/§9 del `base-standards.md` actual).
- `docs/api/api-spec.yml` (movido desde `docs/api-spec.yml`).
- `docs/data-model/data-model.md` (movido desde `docs/data-model.md`).

### Archivos a eliminar

- `update.sh` (deprecado upstream en favor de `specboot update`; solo conserva
  `--bump` para maintainers del framework, no aplica al proyecto).

### Archivos a modificar manualmente (no se sobreescriben a ciegas)

- `opencode.json`: se simplifica drásticamente (de 91 a ~20 líneas),
  eliminando las claves `agent` y `command` (migradas a `.opencode/`). Solo
  conserva `autoupdate`, `instructions[]` y `permission`.
- `templates/ci/eslintrc.astro.js`: **NO se toca** (drift intencional
  documentado; el upstream v0.1.2 vuelve al formato legacy incompatible con
  ESLint 9 flat-config que el proyecto usa).
- `commitlint.config.js`: **NO se toca** (solución documentada a un problema
  de precedence cosmiconfig; reemplazar por `.commitlintrc.json` reintroduce
  el bug).
- `Makefile` (después del `cp` upstream): restaurar bloque `LOCAL ADAPTATIONS`
  con overrides `pnpm` y `solid-lint` solo-Astro.

### Deltas OpenSpec (consolidación post-archive)

Tres specs nuevos derivados de este change (se crean en `openspec/specs/` cuando
se archive el change):

- **ADDED `framework-tooling-sync`**: invariantes del contrato framework ↔
  proyecto. El proyecto declara `frameworkVersion: "0.1.2"`; los archivos
  intocables se reemplazan vía `specboot update`; los archivos del proyecto
  (docs/, código, .specboot.json) son responsabilidad del dev.
- **ADDED `opencode-layout`**: invariantes de la nueva estructura
  `.opencode/{agents,commands}/*.md` con frontmatter YAML; `opencode.json`
  reducido a `instructions[]` + `permission`; `{file:...}` referencias
  resuelven.
- **ADDED `specboot-manifest`**: invariantes de `.specboot.json` (campos
  requeridos, `frameworkVersion` SemVer coincide con la instalada,
  `services` apunta a rutas existentes, `stack` declarado).

## Impacto

**Archivos tocados (≈30):** los listados arriba. Ninguno es código de
aplicación (`src/**`).

**Archivos NO tocados (intocables del proyecto):**
- `src/**` (componentes Astro, páginas, layouts, lib)
- `astro.config.mjs`, `tsconfig.json`, `pnpm-lock.yaml`
- `package.json` del proyecto (Astro 6 + Vitest + ESLint flat)
- `openspec/specs/**` (10 specs activos: `brand-design-system`,
  `code-correctness`, `contact-form-a11y`, `contact-lead-contract`,
  `error-page-404`, `floating-badges`, `footer-cta`, `home-hero`,
  `seo-metadata`, y sus archivos `spec.md`)
- `openspec/changes/**` (historial de cambios)
- `openspec/archive/**` (cambios ya archivados)
- `docs/frontend-standards.md`, `docs/backend-standards.md`,
  `docs/deploy-standards.md`, `docs/documentation-standards.md` (del proyecto)
- `.env`, `.env.example`, `public/`

**Riesgos operativos y mitigaciones (resumen):**

| Riesgo | Mitigación |
|---|---|
| El nuevo `specboot.sh --ci` falla por paths requeridos que el proyecto aún no tiene | Validar después de cada sync; iterar hasta que pase. |
| Las `{file:...}` en los nuevos `.opencode/**/*.md` rompen `check-refs.sh` | Validar inmediatamente tras crear `.opencode/`; ajustar si fallan. |
| `AGENTS.md` v0.1.2 entra en conflicto con reglas locales de Astro | Mover §8/§9 a `docs/project/*.md` (recomendado) o restaurar como patch local. |
| Mover `docs/api-spec.yml` y `docs/data-model.md` rompe referencias | `grep -rl` antes y después del move; actualizar referencias en agents/skills. |
| Eliminar `update.sh` rompe aliases del dev | Documentar en CHANGELOG; el proyecto no lo usa activamente (no hay tags). |
| `Makefile` upstream usa `npm` y rompe `pnpm-lock.yaml` | Restaurar overrides `pnpm` como bloque `LOCAL ADAPTATIONS` en commit aparte. |
| Reemplazar `templates/ci/eslintrc.astro.js` con legacy rompe solid-lint | NO copiar; conservar flat-config del proyecto. |
| `base-standards.md` upstream es neutro (no menciona Astro) | Mover contexto a `docs/project/*.md`. |

**Adaptaciones locales que se preservan explícitamente:**
- `pnpm` en lugar de `npm` (lockfile del proyecto es `pnpm-lock.yaml`).
- `eslint-plugin-astro` con ESLint 9 flat config en `templates/ci/eslintrc.astro.js`.
- `solid-lint` solo para Astro (sin dependency-cruiser, NestJS ni Angular).
- `commitlint.config.js` con ignores function-based (no convertible a JSON).
- Contexto del proyecto Matices (consultoría B2B, Viña del Mar) que migra a
  `docs/project/{domain,stack,client}.md`.

**Salto de versión:** minor (0.1.0 → 0.1.2) según el versionado del framework
upstream (el proyecto no usa SemVer propio; se documenta en CHANGELOG).
