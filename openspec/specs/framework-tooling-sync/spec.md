# framework-tooling-sync Specification

## Purpose
TBD - created by archiving change upgrade-specboot-framework. Update Purpose after archive.
## Requirements
### Requirement: Project declares framework version via `.specboot.json`

The project MUST declare the required Specboot framework version in
`.specboot.json` under the `frameworkVersion` field, using SemVer. The
declared version MUST match the installed framework version reported by
`bash specboot.sh --version` (validated by `validate-specboot.sh`). A
declared version lower than the installed is a non-blocking warning
("framework desactualizado, corre 'specboot update'"); a declared version
greater than the installed is a hard error (the project requires a newer
framework that is not available).

#### Scenario: .specboot.json exists with valid frameworkVersion
- **Given** a freshly initialized or upgraded project
- **When** `cat .specboot.json` is executed
- **Then** the file contains a `frameworkVersion` field with a valid SemVer string (e.g. `"0.1.2"`)
- **And** the file is valid JSON (parses with `node -e "JSON.parse(...)"`)

#### Scenario: validate-specboot.sh passes with matching version
- **Given** `.specboot.json` declares `frameworkVersion: "0.1.2"` and the installed framework is `0.1.2`
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 0 and the output reports
  "frameworkVersion (0.1.2) coincide con la instalada (0.1.2)"

#### Scenario: declared version newer than installed is a hard error
- **Given** `.specboot.json` declares `frameworkVersion: "0.2.0"` but the installed framework is `0.1.2`
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 1
- **And** the output reports "frameworkVersion (0.2.0) es mayor que la versión instalada (0.1.2)"

### Requirement: Framework-owned files are intocable and updated via `specboot update`

The following files are framework-owned (intocable) and MUST be updated
only via `bash specboot.sh update` (or `specboot update` from the installed
package). Local edits to these files are a contract violation and MUST be
reverted before any sync:

- `AGENTS.md`
- `specboot.sh`, `check-refs.sh`, `validate-specboot.sh`
- `Makefile` (the parametrized core; local overrides are allowed in a
  `LOCAL ADAPTATIONS` block at the end with explicit documentation)
- `ai-specs/`
- `templates/ci/`
- `docs/base-standards.md`, `docs/framework-contract.md`, `docs/docs-standard.md`,
  `docs/specboot-json-standard.md`, `docs/versioning-standard.md`,
  `docs/git-workflow-standards.md`, `docs/ci-standards.md`
- `.opencode/agents/`, `.opencode/commands/`
- `.github/workflows/` (framework-owned workflows; project-owned workflows
  added by the project are never deleted by `specboot update`)

The project's own files (code under `src/`, `docs/frontend-standards.md`,
`docs/backend-standards.md`, `docs/deploy-standards.md`,
`docs/documentation-standards.md`, `docs/project/`, `openspec/`) are
never touched by `specboot update`.

#### Scenario: specboot update replaces only intocable files
- **Given** the project has local edits in `src/pages/index.astro` and the framework has a newer `specboot.sh`
- **When** `bash specboot.sh update` is run
- **Then** `specboot.sh` is replaced with the new version
- **And** `src/pages/index.astro` is unchanged (verified by `git diff`)

#### Scenario: local edits to AGENTS.md are reverted on update
- **Given** the project has a local modification to `AGENTS.md`
- **When** `bash specboot.sh update` is run
- **Then** `AGENTS.md` is replaced with the upstream version
- **And** the local modifications are not preserved (the file is intocable)

### Requirement: `bash specboot.sh --ci` is the authoritative project audit

The `bash specboot.sh --ci` command MUST pass with exit 0 on every
project state. It validates: referential integrity (`check-refs.sh`),
`.specboot.json` schema (`validate-specboot.sh`), file structure,
placeholders in `docs/`, `opencode.json` validity, skills completeness,
examples presence, husky hooks, CI/CD config, and the AGENTS.md bridge
registration of every skill folder.

The CI pipeline (`.github/workflows/ci.yml`) MUST include a job that
runs `bash specboot.sh --ci` and fails the build on non-zero exit.

#### Scenario: specboot --ci passes on a healthy project
- **Given** a project with all intocable files up-to-date and no placeholders in docs
- **When** `bash specboot.sh --ci` is run
- **Then** exit code is 0
- **And** the output reports 0 errors

#### Scenario: placeholder in docs/ triggers a warning
- **Given** `docs/backend-standards.md` contains the literal text `[Clean Architecture]`
- **When** `bash specboot.sh --ci` is run
- **Then** exit code is 0 (non-blocking warning)
- **And** the output includes "Placeholder '[Clean Architecture]' encontrado"

#### Scenario: broken {file:...} reference triggers a hard error
- **Given** `ai-specs/skills/plan-change/SKILL.md` contains `{file:docs/nonexistent.md}`
- **When** `bash specboot.sh --ci` is run
- **Then** exit code is 1
- **And** the output includes "Referencia rota: {file:docs/nonexistent.md}"

