# Requisitos: fix-deps-audit-high

> Change: DEPS-AUDIT-001 — Trazabilidad REQ ↔ SC.

## REQ-001: Vulnerabilidades high remediables cerradas vía overrides

**Prioridad**: alta | **Escenarios**: SC-001, SC-002, SC-003

Las vulnerabilidades high con versión parcheada (`sharp`, `devalue`,
`brace-expansion`, `source-map-js`) DEBEN cerrarse con pins en
`pnpm.overrides` al floor parcheado de su advisory; las directas DEBEN
actualizarse además en su campo dueño (`dependencies`/`devDependencies`) sin
contradicción entre declaración directa y override.

## REQ-002: Moderates baratos cerrados

**Prioridad**: media | **Escenarios**: SC-004

`vitest` (directa) y `yaml` / `postcss-selector-parser` (transitivas) DEBEN
actualizarse a sus floors parcheados.

## REQ-003: Aceptación de riesgo con decisión explícita del human owner

**Prioridad**: alta | **Escenarios**: SC-005, SC-006

Para `http-cache-semantics` (GHSA-ch52-4w7c-c8xp, Patched: None) la única vía
DEBE ser una decisión de aceptación registrada explícitamente por el human
owner (proposal + CHANGELOG + `pnpm.auditConfig.ignoreGhsas` con el análisis de
explotabilidad). El umbral del audit (`--audit-level=high`) y el target `audit`
del `Makefile` DEBEN permanecer intactos.

## REQ-004: Gates de aplicación en verde

**Prioridad**: alta | **Escenarios**: SC-007, SC-008, SC-009

Tras aplicar los bumps: `pnpm audit --audit-level=high` exit 0 (0 high
remediables; única excepción la aceptada), `pnpm build` exit 0 y `pnpm test`
exit 0 con la suite completa en verde.

## REQ-005: CHANGELOG documentado

**Prioridad**: media | **Escenarios**: SC-010

El fix DEBE documentarse en `CHANGELOG.md` (Keep a Changelog) con cada advisory
que cierra y la aceptación de riesgo con su justificación.

## REQ-006: Archivos intocables intactos

**Prioridad**: media | **Escenarios**: SC-011

`AGENTS.md`, `opencode.json`, `ai-specs/**`, `.opencode/**`, `specboot.sh`,
`docs/base-standards.md` y `Makefile` DEBEN permanecer sin cambios.
