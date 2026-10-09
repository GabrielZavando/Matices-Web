# Tasks — Fix de vulnerabilidades high en audit

> Tareas de implementación de `DEPS-AUDIT-001` (OpenSpec change
> `fix-deps-audit-high`). Cierra 7 de las 8 vulnerabilidades high del gate
> Security Audit vía bumps/overrides same-major, y la octava
> (`http-cache-semantics`, Patched: None) vía aceptación explícita del human
> owner.

## Change Summary

Elevar `sharp` a `^0.35.5` y `vitest` a `^4.1.11`, añadir/eleva los overrides
`brace-expansion >=5.0.12`, `devalue >=5.9.3 <6`, `source-map-js >=1.2.2`,
`yaml >=2.8.3`, `postcss-selector-parser >=7.1.6`, y registrar la aceptación de
`http-cache-semantics` (GHSA-ch52-4w7c-c8xp, Patched: None, explotabilidad
nula en SSG) en `pnpm.auditConfig.ignoreGhsas` con decisión del human owner.
Cierre: `pnpm audit --audit-level=high` exit 0, `pnpm build` y `pnpm test` en
verde.

**Riesgo principal:** bumps same-major sobre transitivas (`devalue`,
`brace-expansion`, `source-map-js`). Mitigación: build + suite de tests como
red de seguridad, con reversión al floor previo documentada si algo rompe.

---

### Task 1: Aplicar bumps y overrides al floor parcheado

- [x] `dependencies["sharp"]`: `^0.35.4` → `^0.35.5` (CVE-2026-96889,
      GHSA-wq5f-xc86-pv6w)
- [x] `devDependencies["vitest"]`: `^4.1.7` → `^4.1.11` (GHSA-82fw-gwwq-j7x9)
- [x] `pnpm.overrides`: `sharp` → `^0.35.5`; nuevos `brace-expansion >=5.0.12`
      (GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p, GHSA-q2hr-2g5m-vwhr),
      `devalue >=5.9.3 <6` (GHSA-j22f-vq7h-c4qm, GHSA-mcm9-63f2-9j32,
      GHSA-x5rw-q4pp-hg5g + moderates/low; cap `<6>` deliberado: sin él
      `>=5.9.3` resuelve `6.x`, fuera del rango `^5.8.1` de astro),
      `source-map-js >=1.2.2`
      (GHSA-68fv-2mgg-jv7q), `yaml >=2.8.3` (GHSA-48c2-rrv3-qjmp),
      `postcss-selector-parser >=7.1.6` (GHSA-rj75-hqrm-r3gf)
- [x] Pins no relacionados intactos (`js-yaml`, `svgo`, `fast-uri`, `postcss`,
      `nanoid`, `smol-toml`)
- [x] `pnpm install` y lockfile resuelve todos los floors
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `package.json`, `pnpm-lock.yaml`
- Test Path: `package.json` (bloque overrides), `pnpm audit`

---

### Task 2: Aceptación de http-cache-semantics con decisión del human owner

- [x] Verificar el advisory GHSA-ch52-4w7c-c8xp / CVE-2026-93748: Patched:
      None; la explotación requiere un shared cache server en runtime
- [x] Analizar explotabilidad en este proyecto: transitiva de Astro,
      build-time only, sitio SSG 100% estático sin servidor de caché →
      explotabilidad nula
- [x] Decisión de aceptación confirmada por el human owner
- [x] `pnpm.auditConfig.ignoreGhsas: ["GHSA-ch52-4w7c-c8xp"]` en package.json
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `package.json`
- Test Path: `pnpm audit` (el advisory deja de romper el gate)

---

### Task 3: Spec dependency-security actualizada (delta MODIFIED)

- [x] Delta MODIFIED del requirement de no-patched-line que cubre el caso
      `Patched: None` (aceptación explícita del human owner + auditConfig)
- [x] `openspec validate fix-deps-audit-high` → válido
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `openspec/changes/fix-deps-audit-high/specs/dependency-security/spec.md`
- Test Path: `openspec validate fix-deps-audit-high`

---

### Task 4: CHANGELOG documentado

- [x] Entrada con los 7 advisories cerrados (paquete, floor, GHSA)
- [x] Aceptación de GHSA-ch52-4w7c-c8xp documentada con el análisis de
      explotabilidad y la decisión del human owner
- Priority: Medium
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `CHANGELOG.md`
- Test Path: `CHANGELOG.md` (grep de la sección)

---

### Task 5: Gates de aplicación en verde

- [x] `pnpm audit --audit-level=high` exit 0 (0 high; única excepción ignorada)
- [x] `pnpm build` exit 0
- [x] `pnpm test` exit 0 — suite completa en verde (15 files / 103 tests)
- [x] Archivos intocables intactos (`Makefile`, `AGENTS.md`, `opencode.json`,
      `ai-specs/**`, `.opencode/**`, `specboot.sh`, `docs/base-standards.md`)
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `Makefile` (solo verificación, sin edición)
- Test Path: `pnpm audit`, `pnpm build`, `pnpm test`

---

## Mandatory Steps

> **Rol de este documento**: es la **fuente única de verdad** del checklist
> obligatorio de implementación del ciclo SDD. El skill `plan-change` **inyecta
> su contenido** como sección `## Mandatory Steps` en todo `tasks.md` generado,
> leyéndolo en el momento de generación, de modo que la checklist viaja dentro
> del artefacto que el agente `build` ejecuta. Editar aquí actualiza todo
> `tasks.md` generado después; no duplicar esta lista dentro de skills ni
> agentes.

Esta checklist es **obligatoria, no sugerida**. Aplica a toda tarea de
implementación ejecutada vía `/apply`, tanto en el propio framework Specboot
(dogfooding) como en cualquier proyecto consumidor.

### Pre-implementación

Antes de escribir la primera línea de la tarea actual:

- [x] La **rama activa** sigue la convención vigente del proyecto (ej.
  `feature/*`, `fix/*`); trabajar sobre ella, nunca directamente sobre la rama
  principal.
- [x] Estado **git limpio**: sin cambios sin commitear (ni staged) antes de
  empezar; si hay trabajo en curso, resolverlo primero.

### Durante la implementación

- [x] **Test nuevo que falla antes de implementar (RED)**: el equivalente RED
  de este change es el audit rojo (CI falló y `pnpm audit` local reporta las
  8 high) — evidencia existente antes de tocar código.
- [x] Ejecutar los **tests unitarios del módulo** tocado mientras se itera
  (ciclo RED-GREEN-REFACTOR), no solo al final.

### Post-implementación

Antes de dar la tarea por cerrada:

- [x] **Ejecutar `verify`**: la verificación del change corre y produce
  evidencia persistente (`openspec/state/verify-results.json`).
- [x] **Ejecutar `adversarial-review`**: la auditoría adversarial corre y
  produce veredicto persistente (`openspec/state/adversarial-result.json`).

> Ambos pasos post alimentan los gates duros de `/commit` (M-901): sin
> `PASS` + `SHIP` vigentes para el change activo, el commit bloquea.

---

## Guidelines

- **TDD:** el change es de dependencias y config; la verificación ejecutable es
  `pnpm audit` / `pnpm build` / `pnpm test`. El RED es el audit rojo previo al
  fix.
- **Un paso a la vez:** aplicar los bumps y validar el build intermedio antes
  de la aceptación del advisory sin patch.
- **No ablandar el gate:** el umbral `--audit-level=high` y el target `audit`
  del `Makefile` no se tocan; la única excepción permitida es el
  `ignoreGhsas` con decisión del human owner grabada.
- **Documentar antes de codear:** la decisión de aceptación se registra en
  proposal y CHANGELOG.

## Metadata

- **Change type**: dependency security remediation (patch/minor bumps + risk acceptance)
- **Tag**: `[frontend]`
- **Capabilities affected**: `dependency-security` (MODIFIED)
- **Specs affected**: `dependency-security` (MODIFIED)
- **Breaking**: no (bumps same-major)
- **Rollback**: revertir el commit del fix restaura los floors previos; el
  gate audit vuelve a rojo con las 8 high.
