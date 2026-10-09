# Propuesta de Cambio: Fix de vulnerabilidades high en audit

## Ticket

- **Ticket ID**: DEPS-AUDIT-001
- **Título**: Cerrar las 8 vulnerabilidades high que rompen el gate Security Audit en CI
- **Tag**: `[frontend]`

## Why

El gate `Security Audit` de CI (`make audit` → `pnpm audit --audit-level=high`)
falla en el PR #14 con 17 vulnerabilidades (1 low | 8 moderate | 8 high). Las
8 high según `pnpm audit` sobre el lockfile:

| Advisory | Sev | Paquete | Vulnerable | Patched | Ruta |
|---|---|---|---|---|---|
| GHSA-qhr7-859c-m2p7 | high | `brace-expansion` | `>=4.0.0 <5.0.11` | `>=5.0.11` | `.>eslint>minimatch` |
| GHSA-6j4f-fj2g-mc7p | high | `brace-expansion` | `>=4.0.0 <5.0.10` | `>=5.0.10` | `.>eslint>minimatch` |
| GHSA-j22f-vq7h-c4qm | high | `devalue` | `>=5.1.0 <=5.9.2` | `>=5.9.3` | `.>astro` |
| GHSA-mcm9-63f2-9j32 | high | `devalue` | `<=5.9.2` | `>=5.9.3` | `.>astro` |
| GHSA-x5rw-q4pp-hg5g | high | `devalue` | `>=5.8.0 <=5.9.2` | `>=5.9.3` | `.>astro` |
| GHSA-ch52-4w7c-c8xp | high | `http-cache-semantics` | `<=4.2.0` | **None** | `.>astro` |
| GHSA-68fv-2mgg-jv7q | high | `source-map-js` | `>=1.0.0 <1.2.2` | `>=1.2.2` | `.>eslint-plugin-astro>postcss` |
| GHSA-wq5f-xc86-pv6w | high | `sharp` | `<0.35.5` | `>=0.35.5` | `.` (directa) |

7 de 8 son remediables con el mecanismo `pnpm.overrides` (pins same-major: el
lockfile ya resuelve `brace-expansion@5.0.9`, `devalue@5.8.1`,
`source-map-js@1.2.1`, `yaml@2.7.1/2.9.0` y `postcss-selector-parser@7.1.5`,
todos dentro de la misma major que su floor parcheado).

`http-cache-semantics` (GHSA-ch52-4w7c-c8xp / CVE-2026-93748) declara
**Patched: None**: no existe versión alguna que lo corrija. Su explotación
requiere un *shared cache server* que procese `max-stale` en runtime; en este
proyecto es transitiva de Astro y solo participa en build (el sitio es SSG 100%
estático, sin servidor de caché) → **explotabilidad nula**. La spec
`dependency-security` exige que la aceptación de riesgo sea **recorded
explicitly by a human owner** → decisión registrada en este change, CHANGELOG y
`pnpm.auditConfig.ignoreGhsas`.

Además se corrigen 3 moderates baratos (same-major) para reducir ruido:
`vitest` `^4.1.7` → `^4.1.11` (GHSA-82fw-gwwq-j7x9, dev-only),
`yaml` `>=2.8.3` (GHSA-48c2-rrv3-qjmp) y
`postcss-selector-parser` `>=7.1.6` (GHSA-rj75-hqrm-r3gf).

## What Changes

- **`sharp`: `^0.35.4` → `^0.35.5`** (directa; parcheada y última publicada).
- **`vitest`: `^4.1.7` → `^4.1.11`** (devDep; parcheada y última publicada).
- **`pnpm.overrides` actualizados/añadidos** al floor parcheado:
  `sharp ^0.35.5`, `brace-expansion >=5.0.12`, `devalue >=5.9.3 <6`,
  `source-map-js >=1.2.2`, `yaml >=2.8.3`, `postcss-selector-parser >=7.1.6`.
  El cap `<6>` de `devalue` es deliberado: sin él `>=5.9.3` resuelve `6.x`,
  fuera del rango `^5.8.1` que astro declara (el floor de seguridad se
  mantiene dentro del major esperado).
- **`pnpm.auditConfig.ignoreGhsas: ["GHSA-ch52-4w7c-c8xp"]`** con la decisión
  de aceptación del human owner registrada.
- **Spec `dependency-security` (delta MODIFIED)**: el requirement de
  no-patched-line se amplía para cubrir el caso `Patched: None`.
- **Entrada en `CHANGELOG.md`** (Keep a Changelog) con cada advisory que cierra.

## Impact

- **Riesgo: bajo.** Todos los bumps son same-major (v5→v5, v1→v1, v2→v2);
  verificación con `pnpm build` + `pnpm test` en la implementación.
- **CI:** el gate `Security Audit` vuelve a verde (única excepción documentada:
  `http-cache-semantics`, aceptada por el human owner).
- **Commitlint:** se resuelve aparte (reescribir los 2 bodies >100 chars vía
  rebase con exec amend + `--force-with-lease`, sin cambio de contenido); no es
  parte de este change.
- **Fuera de alcance:** el umbral del audit gate (`--audit-level=high`), el
  target `audit` del `Makefile` (intocable) y cualquier otro pin no security.
