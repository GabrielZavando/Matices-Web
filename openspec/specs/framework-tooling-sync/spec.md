# framework-tooling-sync Specification

## Purpose
TBD - created by archiving change upgrade-specboot-framework. Update Purpose after archive.
## Requirements
### Requirement: Project declares framework version via `.specboot.json`

The project MUST declare the required Specboot framework version in
`.specboot.json` under the `frameworkVersion` field, using SemVer. The
declared version MUST match the installed framework version. Since 0.11.0
the installed version is resolved node_modules-first
(`node_modules/@gabrielzavando/specboot/package.json`), so the root
`package.json` of a consumer project no longer shadows the framework version
(previous debt documented in CHANGELOG). A declared version lower than the
installed is a non-blocking warning; greater than the installed is a hard
error.

This project declares `frameworkVersion: "0.11.1"`.

#### Scenario: .specboot.json exists with valid frameworkVersion
- **Given** the project upgraded to Specboot v0.11.1
- **When** `cat .specboot.json` is executed
- **Then** the file contains a `frameworkVersion` field with value `"0.11.1"`
- **And** the file is valid JSON

#### Scenario: validate-specboot.sh passes with matching version
- **Given** `.specboot.json` declares `frameworkVersion: "0.11.1"` and the installed package is `0.11.1`
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 0
- **And** the output reports "frameworkVersion (0.11.1) coincide con la instalada (0.11.1)"

#### Scenario: declared version newer than installed is a hard error
- **Given** `.specboot.json` declares `frameworkVersion: "0.12.0"` but the installed framework is `0.11.1`
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 1
- **And** the output reports "frameworkVersion (0.12.0) es mayor que la versión instalada (0.11.1)"

### Requirement: Framework-owned files are intocable and updated via `specboot update`

The framework-owned (intocable) files MUST be updated only via
`specboot update` from the installed package. Since v0.11.1 the update set
is:

- `AGENTS.md`
- `specboot.sh`, `check-refs.sh`, `validate-specboot.sh`, `release-bump.sh`
- `Makefile` (parametrized core; local overrides allowed only in a documented
  `LOCAL ADAPTATIONS` block)
- `ai-specs/`
- `templates/ci/`, `templates/github/`
- `docs/base-standards.md`, `docs/framework-contract.md`, `docs/docs-standard.md`,
  `docs/specboot-json-standard.md`, `docs/versioning-standard.md`,
  `docs/openspec-tasks-mandatory-steps.md`, `docs/tdd-failure-protocol.md`
- `.opencode/agents/`, `.opencode/commands/`
- `scripts/read-json-field.mjs`
- `.github/pull_request_template.md`

Since v0.11.0 the consumer `.github/workflows/ci.yml` follows a tri-state
safe policy: missing → install the template; exact template match →
idempotent no-op; known distributed variant → back up and repair; modified or
foreign content → **preserved byte-for-byte with a non-blocking warning**
(never overwritten automatically). The project's `ci.yml` is custom and is
preserved. The project's own files (`src/`, `docs/project/`, `docs/api/`,
`docs/data-model/`, `openspec/`) are never touched.

#### Scenario: specboot update replaces only intocable files
- **Given** the project has local edits in `src/pages/index.astro` and the framework is upgraded
- **When** `bash node_modules/@gabrielzavando/specboot/specboot.sh update --yes` is run
- **Then** the intocable files are replaced with the v0.11.1 versions
- **And** `src/pages/index.astro` is unchanged

#### Scenario: custom ci.yml is preserved by the tri-state policy
- **Given** `.github/workflows/ci.yml` is a project-owned workflow (custom, not a known distributed variant)
- **When** `specboot update --yes` runs
- **Then** `ci.yml` remains byte-for-byte intact
- **And** the update emits a non-blocking warning and exits 0

#### Scenario: new intocable files are created by update
- **Given** the project is upgraded from v0.1.2
- **When** `specboot update --yes` runs
- **Then** `release-bump.sh`, `scripts/read-json-field.mjs`,
  `docs/openspec-tasks-mandatory-steps.md` and `docs/tdd-failure-protocol.md` exist
- **And** a backup exists in `.specboot-backup-*/`

### Requirement: `bash specboot.sh --ci` is the authoritative project audit

`bash specboot.sh --ci` MUST pass with exit 0 on every project state. Since
v0.11.0 it validates the directory from which it was invoked (the consumer
project when run from `node_modules`), and adds two contract validators:
`validate-agent-permissions.mjs` (permission semantics of
`.opencode/agents/*.md` against `docs/agent-permission-contracts.yml`) and
`validate-command-contracts.mjs` (front-matter command→agent contracts).
Existing checks (referential integrity, `.specboot.json` schema, file
structure, placeholders, skills, examples, hooks, CI/CD) are unchanged.

#### Scenario: specboot --ci passes on a healthy upgraded project
- **Given** a project with all intocable files at v0.11.1 and no placeholders in docs
- **When** `bash specboot.sh --ci` is run
- **Then** exit code is 0
- **And** the output reports 0 errors, including the permission/command contract validators

#### Scenario: permission contract mismatch is a hard error
- **Given** `.opencode/agents/build.md` declares a permission not allowed by the agent contracts
- **When** `bash specboot.sh --ci` is run
- **Then** exit code is 1
- **And** the output reports "Descalce de contratos de permisos de agentes"

#### Scenario: --init validates the invocation directory (consumer mode)
- **Given** the project root is the current directory
- **When** `bash node_modules/@gabrielzavando/specboot/specboot.sh --init` is run
- **Then** the REQUIRED_FILES of v0.11.1 are checked against the project root
- **And** exit code is 0 when all required files exist

