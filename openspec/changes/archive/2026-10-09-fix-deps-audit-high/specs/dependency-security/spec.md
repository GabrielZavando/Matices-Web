# dependency-security Specification (delta)

## Purpose

Este delta cubre el caso que el contrato actual no contempla: un advisory
`high` que declara **Patched: None** (no existe versión alguna que lo
corrija), donde no hay upgrade posible. GHSA-ch52-4w7c-c8xp (CVE-2026-93748,
`http-cache-semantics <=4.2.0`) es el caso: la explotación requiere un shared
cache server en runtime y este proyecto es SSG 100% estático (dependencia
transitiva de Astro, build-time only) → explotabilidad nula. La única vía
sancionada es la aceptación explícita y grabada por el human owner, con el
umbral del gate intacto. Además, los floors de `pnpm.overrides` se elevan a
los parches publicados desde el change anterior (`upgrade-astro-7`).

## MODIFIED Requirements

### Requirement: Vulnerabilities with no patched line require a major upgrade

The project MUST NOT defer a `critical` or `high` dependency vulnerability whose
advisory declares no patched version in the current major line. When the
advisory's patched range lies entirely above the installed major, the only
sanctioned remedy is the major upgrade — the project MUST NOT resolve it by
relaxing the audit gate, excluding the package, or accepting the risk silently
without an explicit, recorded decision.

When the advisory declares **no patched version at all** (`Patched: None`, no
upgrade exists), no dependency change can remediate it. The sanctioned remedy
is then an explicit risk-acceptance decision recorded by a human owner in the
change proposal and `CHANGELOG.md`, and expressed in
`pnpm.auditConfig.ignoreGhsas` together with the exploitability analysis that
justifies it. The audit threshold (`--audit-level=high`), the `Makefile`
`audit` target, and the package registry MUST remain unmodified.

The project's `Makefile` `audit` target runs
`pnpm audit --audit-level=high` **without** `|| true` (a documented local
adaptation; upstream carries `|| true`). This strictness is intentional and MUST
be preserved: it is what surfaces advisories instead of hiding them.

#### Scenario: Advisory has no patch in the installed major line
- **Given** an advisory declaring `vulnerable: <7.2.8` and `patched: >=7.2.8`
- **And** the project is on `astro@6.4.6`, whose line contains no patched release
- **When** the remedy is determined
- **Then** the remedy is a major upgrade to `>=7.2.8`
- **And** the audit threshold, the `Makefile` `audit` target, and the package
  registry are all left unmodified

#### Scenario: Advisory declares no patched version at all
- **Given** an advisory declaring `Patched: None` (no version of the package
  fixes it)
- **And** the exploitability analysis in the project's context is null (the
  vulnerable code path never runs in production)
- **When** the remedy is determined
- **Then** the remedy is an explicit risk-acceptance decision recorded by a
  human owner in the change proposal and `CHANGELOG.md`
- **And** `pnpm.auditConfig.ignoreGhsas` lists the advisory with that
  justification
- **And** the audit threshold and the `Makefile` `audit` target are left
  unmodified

#### Scenario: Audit gate stays strict after a security change
- **Given** a change whose purpose is to remediate vulnerabilities
- **When** the change is reviewed
- **Then** the `Makefile` `audit` target is not modified to lower the threshold
- **And** no `|| true` is reintroduced
- **And** no `auditLevel` flag is loosened to make the gate pass

#### Scenario: Risk acceptance requires an explicit decision
- **Given** a vulnerability that cannot be remediated in the current scope
- **When** the team decides to defer it
- **Then** the decision is recorded explicitly by a human owner
- **And** it is not implied by leaving the gate red without comment

---

### Requirement: Transitive security pins live in `pnpm.overrides`

Every dependency that the project pins for **security** reasons MUST be pinned
in the `pnpm.overrides` block of the root `package.json`, regardless of whether
it is a direct or a transitive dependency. The pin MUST be set at or above the
patched floor declared by the advisory it mitigates.

Direct dependencies MUST be pinned in the dependency field that owns them
(`dependencies` for runtime, `devDependencies` for tooling) as well, so the pin
is visible where a reader looks for it. The `overrides` entry MUST NOT contradict
the direct declaration.

Pins that exist for reasons other than security MUST NOT be modified as a side
effect of a security change; the security diff stays scoped.

#### Scenario: Transitive vulnerability is pinned
- **Given** `devalue` is a transitive dependency of `astro` with advisories
  GHSA-j22f-vq7h-c4qm, GHSA-mcm9-63f2-9j32 and GHSA-x5rw-q4pp-hg5g
  (`vulnerable: <=5.9.2`, `patched: >=5.9.3`)
- **And** the project has no pin for it
- **When** the security change is applied
- **Then** `pnpm.overrides` contains a `devalue` entry at `>=5.9.3 <6`
- **And** the lockfile resolves a version `>=5.9.3`

#### Scenario: Pin floor is raised to the patched version
- **Given** an override pinned at a floor below the advisory's patched version
- **When** the security change is applied
- **Then** the override is raised to at least the patched version
- **And** the lockfile is regenerated so the resolved version meets the floor

#### Scenario: Direct and overridden versions agree
- **Given** `sharp` is both a direct dependency and an override entry
- **When** the security change is applied
- **Then** `dependencies["sharp"]` is `^0.35.5`
- **And** the `sharp` override is `^0.35.5`
- **And** the two declarations do not contradict each other

#### Scenario: Unrelated pins are untouched
- **Given** `js-yaml`, `svgo`, `fast-uri`, `postcss`, `nanoid` and `smol-toml`
  are pinned for reasons unrelated to this change's advisories
- **When** a security change is applied
- **Then** their pin values are unchanged

#### Scenario: Minor-version pin bump is validated by a build
- **Given** a pin on a transitive dependency that requires a minor-version bump
  (e.g. `brace-expansion` `>=5.0.9` → `>=5.0.12`)
- **When** the change is applied
- **Then** a full build runs and confirms the consuming toolchain still works
- **And** if the bump breaks the consuming toolchain, the pin is reverted to the
  last patchable version in the previous line and the remaining debt is recorded
