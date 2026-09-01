# Changelog

All notable changes to Specboot are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Specboot framework upgraded v0.1.0 → v0.1.2** (OpenSpec change
  `upgrade-specboot-framework`; upstream `GabrielZavando/Specboot` @ `d781fb6`).
  Summary of the sync:
  - **Replaced (framework-owned):** `specboot.sh` (309 → 1083 lines; new
    `init` / `update` / `--version` subcommands, integrates
    `validate-specboot.sh`), `check-refs.sh` (also scans `.opencode/**`),
    `AGENTS.md` (72 → 207 lines; bridge format with tag-based conditional
    context loading and `docs/project/*` conditional prose), `Makefile`
    (parametrized via `.specboot.json`), `opencode.json` (91 → 20 lines),
    `docs/base-standards.md` (upstream neutral version; Matices context moved
    to `docs/project/`), `ai-specs/` (4 new skills: `archive`, `verify`,
    `explain`, `show-spec-working`; 2 new agents: `archive-agent`,
    `verify-agent`; refreshed existing ones), selected `templates/ci/` files
    (`eslintrc.backend.js`, `eslintrc.frontend.js`, `.dependency-cruiser.js`,
    `.madge.config.json`, `package.ci.json`, `README.md`).
  - **Created:** `.opencode/agents/*.md` (7) and `.opencode/commands/*.md` (10)
    with YAML frontmatter (canonical OpenCode layout; `agent`/`command` inline
    keys removed from `opencode.json`), `.specboot.json` project manifest
    (`frameworkVersion: 0.1.2`, `services: ["."]`, `stack: ["node"]`),
    `validate-specboot.sh`, `scripts/dogfood-check.sh`, 6 framework docs
    (`docs/framework-contract.md`, `docs-standard.md`, `specboot-json-standard.md`,
    `versioning-standard.md`, `git-workflow-standards.md`, `ci-standards.md`),
    and `docs/project/{domain,stack,client}.md` (project-owned context migrated
    from the former `base-standards.md` §8/§9).
  - **Moved to canonical layout:** `docs/api-spec.yml` → `docs/api/api-spec.yml`
    and `docs/data-model.md` → `docs/data-model/data-model.md`. Path references
    updated in `docs/backend-standards.md`, `docs/documentation-standards.md`
    and the active spec `openspec/specs/contact-lead-contract/spec.md`.
  - **Removed:** `update.sh` (deprecated upstream in favor of `specboot update`;
    unused by this project — 0 references).
  - **CI:** new `specboot-ci` job in `.github/workflows/ci.yml` running
    `bash check-refs.sh` + `bash specboot.sh --ci`.
  - **package.json `version` 0.0.1 → 0.1.2:** acts as the framework version
    marker. `validate-specboot.sh` resolves the "installed" framework version
    via `specboot.sh --version`, which reads the root package.json (upstream
    dogfooding precedence; site releases use git tags and never read this
    field, so there is no functional impact). Upstream debt registered: the
    precedence (1) shadows `node_modules/@gabrielzavando/specboot` — to fix in
    the framework repo via its own SDD flow.
- **Local adaptations preserved (intentional drift, documented):**
  - `pnpm` everywhere in Makefile node targets (`# LOCAL` markers + `LOCAL
    ADAPTATIONS` header block); `audit` keeps the strict gate (no `|| true`).
  - `templates/ci/eslintrc.astro.js` stays as the project's ESLint 9 flat
    config (upstream ships legacy eslintrc format for ESLint 8); **do not
    overwrite on future `specboot update`**.
  - `solid-lint` runs only the Astro ESLint config (no NestJS/Angular/
    dependency-cruiser — stack has no such layers).
  - `commitlint.config.js` (JS, function-based `ignores`) untouched; upstream's
    `.commitlintrc.json` would reintroduce the cosmiconfig precedence bug.
  - Python-only templates (`.importlinter`, `ruff.toml`) not adopted.

### Added
- SOLID/POO mechanical checks (Specboot Ticket 4): synced `templates/ci/`; rewrote `templates/ci/eslintrc.astro.js` as an ESLint flat config (upstream ships legacy eslintrc format for ESLint 8); added devDependencies `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`; wired `make solid-lint` into the CI lint job.
- On-demand context artifacts from upstream: `ai-specs/reference/commits.md`, `ai-specs/examples/enrich-us-auth-reset.md`, skill `plan-change` and agent `plan-agent`.

### Changed
- **Template is OpenCode-only** (inherited with the project scaffold): no Claude Code or Cursor configuration is generated. Agent/skill artifacts live in `ai-specs/` and are consumed by OpenCode via `{file:...}` references in `opencode.json`.
- Synced Specboot tooling to upstream `main` (context-optimization batch): `AGENTS.md` now loads context conditionally instead of "always read"; skills/commands tables split into standard cycle vs optional tools; `enrich-us` documented as optional (poorly formed tickets only) and `/adversarial-review` as a rescue tool.
- Agents slimmed by upstream: full TDD cycle consolidated in `build-agent.md`; `backend-developer.md`/`frontend-developer.md` keep only their stack-specific design-declaration step.
- `opencode.json`: `instructions[]` reduced to `docs/base-standards.md` + `AGENTS.md` (area standards load conditionally per task); plan agent prompt moved to `{file:ai-specs/agents/plan-agent.md}`; `/plan-change` delegates to its skill; `/apply` detects the domain (backend/frontend/full-stack) dynamically; `/adversarial-review` no longer hardcodes "7-phase".
- `docs/base-standards.md`: removed §4–§6 (governance now lives in `AGENTS.md`); added §9 SOLID non-negotiables adapted to Astro/TypeScript without upstream's NestJS/Angular references.
- `Makefile`: node targets keep **pnpm** (intentional drift from upstream's npm switch; lockfile is `pnpm-lock.yaml`); `solid-lint` runs only the Astro ESLint config (no NestJS/Angular/dependency-cruiser).
- `docs/documentation-standards.md`: commit-format details now point to `ai-specs/reference/commits.md`.

### Fixed
- CI `make audit` red: raised pnpm override floors for the two high-severity transitive advisories — `js-yaml` `^4.3.1` (GHSA-5p4m-2wfm-xmqj, quadratic CPU via `!!omap`, direct dep of astro) and `fast-uri` `^3.1.5` (GHSA-7p8r-x3mc-p8w7, host confusion via backslash authority, via `@astrojs/check`). Remaining 5 advisories (2 low, 3 moderate) are below the `--audit-level=high` gate; the three astro ones require a major upgrade to astro 7.x (stack is astro 6) and are tracked separately.
- CI `make commitlint` red on the tooling branch: the hand-written merge commit used a lowercase `merge:` prefix, which is not a Conventional Commit type. Consolidated `.commitlintrc.json` into a single `commitlint.config.js` (JSON cannot express function-based `ignores`, and cosmiconfig gave the JSON precedence, silently disabling any JS config) with an ignore for manual merge messages — mirroring commitlint's default exemption of GitHub-generated merge commits. Updated `specboot.sh` check and `ai-specs/reference/commits.md` accordingly.
- Balanced unclosed `<div>` tags in `talento.astro`, `psicologia.astro` and `testing.astro` surfaced by the new Astro ESLint parsing (behavior-preserving: Astro auto-closed them at build time). Re-applied on top of `main`'s scroll-animation refactor (`<Reveal>` wrappers) during the merge.
- Fixed unbalanced `<Reveal>`/`</div>` pair in `id.astro` inherited from `main`'s animation feature merge: a video-column `<Reveal>` was closed with `</div>`, leaving ESLint parsing broken upstream.
- Normalized `.openspec/` path references to `openspec/` across synced `ai-specs/` artifacts to match this repository's OpenSpec directory.

## [0.1.0] - 2026-07-16

### Added
- SDD template: `AGENTS.md`, `opencode.json` y agentes (`plan`, `build`, `reviewer`).
- Estándares base y por área: `docs/base-standards.md`, `backend-`, `frontend-`, `documentation-`.
- Skills reutilizables en `ai-specs/skills/` (enrich-us, commit, code-auditing, using-git-worktrees, deploy, onboarding).
- `specboot.sh`: setup (`--init`) y validación (`--ci`) con lista única de archivos requeridos y symlinks.
- `check-refs.sh`: validación de integridad referencial de tokens `{file:...}` en `opencode.json` y `SKILL.md`.
- `Makefile` stack-agnostic que expone `install/lint/test/build/audit/commitlint/refs`.
- `update.sh`: sincroniza el tooling del template a proyectos existentes sin tocar `docs/`, y `--bump` para releases semver.
- `CHANGELOG.md` y versionado por git tags (`vX.Y.Z`).
