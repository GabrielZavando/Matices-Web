# specboot-manifest Specification

## Purpose
TBD - created by archiving change upgrade-specboot-framework. Update Purpose after archive.
## Requirements
### Requirement: Required fields in `.specboot.json`

The `.specboot.json` file MUST contain the following required fields:
`frameworkVersion` (SemVer string), `services` (array of strings, each
pointing to an existing path), and `stack` (string or array of strings,
each value from the set `{node, python, framework}`).

#### Scenario: minimum valid .specboot.json
- **Given** a project that wants to declare framework integration
- **When** `.specboot.json` is created with the content
  ```json
  {
    "frameworkVersion": "0.1.2",
    "name": "matices-web",
    "services": ["."],
    "stack": ["node"]
  }
  ```
- **Then** `bash validate-specboot.sh` exits 0
- **And** the required fields are all present and non-empty

#### Scenario: missing frameworkVersion is a hard error
- **Given** `.specboot.json` without `frameworkVersion`
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 1
- **And** the output reports "Faltan campos requeridos: frameworkVersion"

#### Scenario: missing services is a hard error
- **Given** `.specboot.json` without `services`
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 1
- **And** the output reports "Faltan campos requeridos: services"

#### Scenario: missing stack is a hard error
- **Given** `.specboot.json` without `stack`
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 1
- **And** the output reports "Faltan campos requeridos: stack"

### Requirement: `services` paths must exist on the filesystem

Every entry in the `services` array MUST be a path that exists
relative to the project root. The string `"."` denotes the project
root itself (valid for single-service projects like Matices Web). Any
other path that does not exist triggers a hard error.

#### Scenario: services = ["."] is valid for a single-service project
- **Given** a project where all code lives at the root (no subdirectories for services)
- **When** `.specboot.json` declares `"services": ["."]`
- **Then** `bash validate-specboot.sh` exits 0
- **And** the output reports "Todas las rutas de services existen."

#### Scenario: services with non-existent path is a hard error
- **Given** `.specboot.json` declares `"services": ["backend", "frontend"]`
- **And** only `src/` exists at the project root
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 1
- **And** the output reports "services contiene rutas inexistentes: backend, frontend"

### Requirement: `stack` value determines Make targets and linter selection

The `stack` field (string or array) MUST contain values from the
allowed set. Each value drives a different set of Make targets and
linter configurations:
- `"node"` enables ESLint (`.astro`, backend, frontend), dependency-cruiser,
  madge, and pnpm/npm install/test/build/audit.
- `"python"` enables ruff and import-linter.
- `"framework"` enables only the framework self-check (no application linting).

The Matices Web project declares `["node"]` (Astro 6, TypeScript).

#### Scenario: stack = ["node"] enables Astro ESLint
- **Given** `.specboot.json` declares `"stack": ["node"]`
- **When** `make solid-lint` is run
- **Then** ESLint runs with the Astro config (`templates/ci/eslintrc.astro.js`)
- **And** dependency-cruiser runs (if a config exists)

#### Scenario: stack = "framework" skips application linting
- **Given** `.specboot.json` declares `"stack": "framework"`
- **When** `make solid-lint` is run
- **Then** the Make target exits 0 with a message "stack 'framework' no incluye node/python — saltando análisis de app"

### Requirement: Optional fields `name`, `description`, `extraStandards`, `layers`

The `.specboot.json` file MUST accept the following optional fields and
each MUST conform to its declared type when present. `name` MUST be a
string (project name, metadata only). `description` MUST be a string
(free-text, metadata only). `extraStandards` MUST be an array of paths
that live under `docs/`. `layers` MUST be an object mapping service
name to array of layer labels (used by the `plan-change` skill to tag
tasks and not validated deeply by `validate-specboot.sh` beyond being
an object).

The Matices Web project does not declare `extraStandards` (the default
`AGENTS.md` bridge already covers the context) or `layers` (single-layer
Astro project, layers are managed by folder convention).

#### Scenario: extraStandards with non-docs path is silently ignored
- **Given** `.specboot.json` declares `"extraStandards": ["README.md"]` (not under `docs/`)
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 0 (extraStandards paths are not validated by the current version of the script)
- **And** AGENTS.md does NOT load `README.md` as a standard (only `docs/*` paths are routed via the bridge)

#### Scenario: layers is an object (not array) when present
- **Given** `.specboot.json` declares
  ```json
  "layers": { "backend": ["domain", "application", "infrastructure"] }
  ```
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 0
- **And** the output reports "layers es un objeto válido."

