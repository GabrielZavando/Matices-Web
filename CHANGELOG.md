# Changelog

All notable changes to Specboot are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
