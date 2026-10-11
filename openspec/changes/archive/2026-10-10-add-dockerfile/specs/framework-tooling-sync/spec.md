# framework-tooling-sync Specification

## Purpose

Define el contrato entre el framework Specboot (intocable, distribuido por
`@gabrielzavando/specboot`) y el proyecto Matices Web, incluyendo los archivos
de infraestructura del proyecto que se declaran intocables a nivel de proyecto.

## ADDED Requirements

### Requirement: Project infrastructure files are intocable

The root-level `Dockerfile` and `.dockerignore` MUST be treated as
**project-owned intocable** infrastructure files (capability
`deployment-config`): they define how the project is containerized and
deployed, so ad-hoc local edits are a contract violation. Any change to them
MUST follow the OpenSpec SDD flow — update the OpenSpec artifacts first
(specs, tasks), then the code.

They are **NOT framework-owned**: `specboot update` never creates, replaces or
deletes them (they are not part of the distributed `@gabrielzavando/specboot`
package). This distinguishes them from the framework-owned intocable files
listed in the requirement "Framework-owned files are intocable and updated via
`specboot update`".

#### Scenario: Dockerfile y .dockerignore registrados como intocables del proyecto
- **Given** la capability `framework-tooling-sync` está sincronizada con el
  change `add-dockerfile`
- **When** se revisa `openspec/specs/framework-tooling-sync/spec.md`
- **Then** declara `Dockerfile` y `.dockerignore` como archivos intocables del
  proyecto
- **And** los cambios en ellos exigen actualizar los artefactos OpenSpec primero

#### Scenario: specboot update never touches project infrastructure files
- **Given** el proyecto tiene `Dockerfile` y `.dockerignore` en la raíz con
  contenido local del proyecto
- **When** `specboot update --yes` se ejecuta
- **Then** `Dockerfile` y `.dockerignore` permanecen intactos
- **And** solo los archivos framework-owned intocables se reemplazan
