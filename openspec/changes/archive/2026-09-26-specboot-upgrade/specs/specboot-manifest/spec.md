# specboot-manifest Specification (delta)

## Purpose

Este delta actualiza el manifiesto `.specboot.json` del proyecto para la
versión `0.11.1` del framework: el valor de `frameworkVersion` cambia de
`0.1.2` a `0.11.1`, y la resolución de la "versión instalada" pasa a ser
node_modules-first (el `specboot.sh --version` del consumidor lee
`node_modules/@gabrielzavando/specboot/package.json` antes que el
`package.json` raíz).

## MODIFIED Requirements

### Requirement: Required fields in `.specboot.json`

The `.specboot.json` file MUST contain the following required fields:
`frameworkVersion` (SemVer string), `services` (array of strings, each
pointing to an existing path), and `stack` (string or array of strings,
each value from the set `{node, python, framework}`).

This project declares `frameworkVersion: "0.11.1"`, `services: ["."]` and
`stack: ["node"]`.

#### Scenario: minimum valid .specboot.json
- **Given** a project that declares framework integration
- **When** `.specboot.json` declares
  ```json
  {
    "frameworkVersion": "0.11.1",
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

#### Scenario: frameworkVersion matches the node_modules package
- **Given** `.specboot.json` declares `frameworkVersion: "0.11.1"` and `node_modules/@gabrielzavando/specboot/package.json` has `version: "0.11.1"`
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 0
- **And** the version comparison reports equality (no shadowing by the root `package.json`)

### Requirement: `services` paths must exist on the filesystem

Every entry in the `services` array MUST be a path that exists relative to
the project root. The string `"."` denotes the project root itself (valid
for single-service projects like Matices Web). Any other path that does not
exist triggers a hard error.

#### Scenario: services = ["."] is valid for a single-service project
- **Given** a project where all code lives at the root
- **When** `.specboot.json` declares `"services": ["."]`
- **Then** `bash validate-specboot.sh` exits 0
- **And** the output reports "Todas las rutas de services existen."

#### Scenario: services with non-existent path is a hard error
- **Given** `.specboot.json` declares `"services": ["backend", "frontend"]`
- **And** only `src/` exists at the project root
- **When** `bash validate-specboot.sh` is run
- **Then** exit code is 1
- **And** the output reports "services contiene rutas inexistentes: backend, frontend"