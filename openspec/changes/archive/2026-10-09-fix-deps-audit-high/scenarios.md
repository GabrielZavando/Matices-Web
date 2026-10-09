# Escenarios: fix-deps-audit-high

> Change: DEPS-AUDIT-001 — 11 escenarios (SC-001…SC-011).

## SC-001: Override al floor parcheado (devalue)

- **Given** `devalue@5.8.1` instalado (vulnerable `<=5.9.2`, parcheada `>=5.9.3`)
- **When** el fix se aplica
- **Then** `pnpm.overrides` contiene `devalue: >=5.9.3 <6` (cap deliberado:
  sin él `>=5.9.3` resuelve `6.x`, fuera del rango `^5.8.1` de astro)
- **And** el lockfile resuelve `devalue >=5.9.3`

## SC-002: Override al floor parcheado (brace-expansion y source-map-js)

- **Given** `brace-expansion@5.0.9` (vulnerable `<5.0.12`) y
  `source-map-js@1.2.1` (vulnerable `<1.2.2`) instalados
- **When** el fix se aplica
- **Then** `pnpm.overrides` contiene `brace-expansion: >=5.0.12` y
  `source-map-js: >=1.2.2`
- **And** el lockfile resuelve versiones que cumplen ambos floors

## SC-003: Directa y override sin contradicción (sharp)

- **Given** `sharp` es dependencia directa y override
- **When** el fix se aplica
- **Then** `dependencies["sharp"]` es `^0.35.5` y el override `sharp` es
  `^0.35.5`
- **And** el lockfile resuelve `sharp >=0.35.5`

## SC-004: Moderates cerrados

- **Given** moderates en `vitest` (`<4.1.11`), `yaml` (`<2.8.3`) y
  `postcss-selector-parser` (`<7.1.6`)
- **When** el fix se aplica
- **Then** el lockfile resuelve `vitest >=4.1.11`, `yaml >=2.8.3` y
  `postcss-selector-parser >=7.1.6`

## SC-005: Aceptación con decisión explícita del human owner

- **Given** `http-cache-semantics` con `Patched: None` y explotabilidad nula en
  este proyecto (transitiva de Astro, build-time only, SSG sin servidor de
  caché)
- **When** el human owner decide aceptar
- **Then** la decisión queda registrada en proposal, CHANGELOG y
  `pnpm.auditConfig.ignoreGhsas`
- **And** `--audit-level=high` y el target `audit` del `Makefile` siguen intactos

## SC-006: Umbral del gate sin modificar

- **Given** el fix aplicado
- **When** se revisan `Makefile` y `package.json`
- **Then** el target `audit` sigue ejecutando `pnpm audit --audit-level=high`
  sin `|| true`
- **And** no se introduce ningún `auditLevel` más laxo

## SC-007: Gate sin high remediables

- **Given** el fix aplicado
- **When** se ejecuta `pnpm audit --audit-level=high`
- **Then** exit 0 con la única excepción `GHSA-ch52-4w7c-c8xp` ignorada y
  documentada

## SC-008: Build en verde

- **Given** los bumps same-major aplicados
- **When** se ejecuta `pnpm build`
- **Then** exit 0 con `dist/` generado

## SC-009: Tests en verde

- **Given** los bumps aplicados y `dist/` fresco del build
- **When** se ejecuta `pnpm test`
- **Then** la suite completa pasa (15 files / 103 tests en la rama TICKET-005)

## SC-010: CHANGELOG actualizado

- **Given** el fix aplicado
- **When** se revisa `CHANGELOG.md`
- **Then** hay entrada con los advisories cerrados y la aceptación documentada

## SC-011: Intocables intactos

- **Given** el fix aplicado
- **When** se revisa `git status`
- **Then** ningún archivo intocable modificado
