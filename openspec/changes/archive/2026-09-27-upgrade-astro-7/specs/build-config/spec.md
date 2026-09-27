# build-config Specification (delta)

## Purpose

Este delta define el contrato de la configuración de build del sitio
(`astro.config.mjs`) frente a upgrades mayores del framework Astro. Nace del
upgrade `astro` 6 → 7, donde la guía de migración puede exigir ajustes sobre
las opciones declaradas por el proyecto. El principio que establece es que
toda opción de configuración se **migra de forma explícita o se deja intacta de
forma explícita**, nunca se elimina en silencio.

## ADDED Requirements

### Requirement: Major framework upgrades must be verified against the official migration guide

The breaking changes section of the **official** migration guide MUST be read and
contrasted against the project's actual configuration surface before upgrading a
major version of the build framework. The upgrade MUST NOT be applied blind.

The contrast MUST cover, for this project: `devToolbar`, `prefetch`, the Vite
plugin array, the `integrations` array, and the framework's own asset/image
pipeline. Options that the guide marks as deprecated or removed MUST be migrated
to their documented replacement.

The guide's own recommendation of an automated upgrade tool MUST be used when it
exists, so that the framework and its official integrations are upgraded
together rather than diverging.

#### Scenario: Migration guide is read before the upgrade
- **Given** a major version of the build framework is available
- **When** the upgrade is planned
- **Then** the breaking changes section of the official migration guide is read
- **And** its entries are contrasted against `astro.config.mjs` and the source
  tree before any dependency is changed

#### Scenario: Removed option is migrated to its replacement
- **Given** the migration guide marks a configuration option used by the project
  as removed
- **When** the upgrade is applied
- **Then** the option is replaced by its documented successor
- **And** the site retains the behaviour the option provided

#### Scenario: Automated upgrade tool is used when documented
- **Given** the official guide documents an upgrade tool that updates the
  framework and its official integrations together
- **When** dependencies are upgraded
- **Then** that tool is used
- **And** any change it makes beyond the intended scope is recorded and explained

---

### Requirement: Configuration options are never dropped silently

Any configuration option removed or replaced during a framework upgrade MUST be
recorded in `CHANGELOG.md` together with the reason. Silently dropping an option
is a defect, because the site loses the behaviour the option provided without
any trace in the project's history.

Configuration that the guide does not require to change MUST be left untouched,
so the diff of a security-driven upgrade stays scoped to what the guide actually
demands.

#### Scenario: Unchanged configuration produces no diff
- **Given** the migration guide requires no change to a configuration option
- **When** the upgrade is applied
- **Then** the configuration file is not modified
- **And** the absence of change is recorded in the task report

#### Scenario: Every removed option is explained
- **Given** one or more configuration options are removed or replaced
- **When** the change is committed
- **Then** `CHANGELOG.md` lists each one with the reason for the change
- **And** the removal is traceable to the migration guide

---

### Requirement: Upgrades must not degrade the rendered site

A framework major upgrade MUST leave the site's observable behaviour intact.
The build, the type check, and the test suite are the acceptance surface: all
three MUST pass after the upgrade.

Framework features that the site relies on — in this project the
`astro:assets` image pipeline used by 40+ `<Image>` instances across 7 pages
and 3 components — MUST continue to render, and MUST NOT silently degrade to a
raw `<img>` tag or a different rendering strategy.

The project's declared engine requirements MUST satisfy the framework's
requirements after the upgrade.

#### Scenario: Site renders identically after a major upgrade
- **Given** a major framework upgrade
- **When** lint, test and build are executed
- **Then** all three complete successfully
- **And** the test suite passes the same number of specs as before the upgrade
- **And** the build output is generated

#### Scenario: Image pipeline keeps rendering
- **Given** the site renders 40+ `<Image>` components from the framework's
  asset pipeline
- **When** the build runs after a major upgrade
- **Then** every image optimizes without error
- **And** no instance degrades to a raw `<img>` tag
- **And** the built output contains the optimized images

#### Scenario: Engine requirements are satisfied
- **Given** the framework declares a minimum Node version
- **And** the project declares `engines.node`
- **When** the upgrade is applied
- **Then** the project's declared engine satisfies the framework's requirement
