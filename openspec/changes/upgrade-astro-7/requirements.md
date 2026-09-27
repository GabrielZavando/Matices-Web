# Requirements — Upgrade de Astro 7

Ticket `ASTRO-UPGRADE-001` · change `upgrade-astro-7`.

---

## REQ-001: Astro instalado en una versión parcheada

### Description

El paquete `astro` debe quedar instalado en una versión `>=7.2.8`, que es el
floor del patch de GHSA-26w7-cxv4-gfx2 (RCE en optimización AVIF). No existe
versión 6.x parcheada, por lo que el upgrade mayor es la única vía de cierre.

### Requirements

- `dependencies["astro"]` debe ser `^7.3.5` (última versión publicada al
  momento del cambio, satisface `>=7.2.8`).
- El lockfile debe resolver la dependencia efectivamente a una versión
  `>=7.2.8`.
- La actualización debe realizarse con el mecanismo oficial
  `pnpm dlx @astrojs/upgrade`, que actualiza Astro y las integraciones
  oficiales de forma conjunta, salvo que la guía de migración indique un
  procedimiento alternativo.

### Acceptance Criteria

- [ ] `package.json` declara `"astro": "^7.3.5"`
- [ ] `pnpm-lock.yaml` resuelve `astro@>=7.2.8`
- [ ] `npm ls astro` reporta una versión `>=7.2.8`
- [ ] `engines.node` del proyecto (`>=22.12.0`) satisface el requisito de
      Astro 7 (`>=22.12.0`)

---

## REQ-002: `sharp` en versión parcheada

### Description

`sharp` es dependencia directa y es el backend de la optimización de imágenes
que dispara la ruta vulnerable. GHSA-rgj7-g3m4-5g8c (libheif) está parcheada
en `>=0.35.4`.

### Requirements

- `dependencies["sharp"]` debe ser `^0.35.4`.
- El lockfile debe resolver `sharp@>=0.35.4`.

### Acceptance Criteria

- [ ] `package.json` declara `"sharp": "^0.35.4"`
- [ ] `pnpm-lock.yaml` resuelve `sharp@>=0.35.4`
- [ ] El build optimiza imágenes sin errores (ejercita la ruta del advisory)

---

## REQ-003: Overrides de seguridad al día

### Description

El proyecto ya usa `pnpm.overrides` como mecanismo para pins de seguridad
(heredado de fixes anteriores). Los floors quedaron desactualizados respecto a
advisories publicados posteriormente. `smol-toml` no tiene override y es
transitiva de Astro.

### Requirements

| Paquete | Floor actual | Floor requerido | Advisory |
|---|---|---|---|
| `js-yaml` | `^4.3.1` | `^4.3.2` | GHSA-2883-xcg3-v3hh |
| `fast-uri` | `^3.1.5` | `^3.1.6` | GHSA-5jgf-p345-68v8 / f65p-4m7j-42xc / fph4-wmhf-6fwf / jqff-g426-hqxp |
| `svgo` | `>=4.0.2` | `>=4.1.0` | GHSA-w27v-7q3p-w38r |
| `sharp` | `^0.35.0` | `^0.35.4` | GHSA-rgj7-g3m4-5g8c |
| `smol-toml` | *(ausente)* | `>=1.7.1` | GHSA-7w5x-hrqm-74c2 |

- `smol-toml` debe **agregarse** al bloque `overrides` (no solo subirse).
- El override de `sharp` debe alinearse con la dependencia directa de REQ-002.
- Ningún otro override (`vite`, `postcss`, `nanoid`) se modifica.

### Acceptance Criteria

- [ ] `pnpm.overrides` contiene los 5 paquetes con los floors de la tabla
- [ ] `vite`, `postcss` y `nanoid` conservan sus valores actuales
- [ ] Los floors realmente resueltos en el lockfile cumplen cada mínimo
- [ ] `svgo` resuelve `>=4.1.0` **y** el build de Astro sigue generando SVG
      correctamente (el bump minor es el de mayor riesgo)

---

## REQ-004: Configuración migrada a Astro 7

### Description

`astro.config.mjs` declara `devToolbar`, `prefetch.prefetchAll` y un plugin de
Vite (`@tailwindcss/vite`), además de la integración `sitemap()`. La guía de
migración v6→v7 puede exigir ajustes en cualquiera de estas opciones.

### Requirements

- `astro.config.mjs` debe seguir siendo válido y equivalente en
  comportamiento a como estaba en v6, ajustándose solo donde la guía de
  migración lo exija.
- `site: 'https://maticesconsultora.cl'` debe conservarse.
- La integración `@astrojs/sitemap` debe seguir activa.
- Las opciones que la guía de v7 marque como deprecadas o eliminadas deben
  migrarse a su reemplazo, no eliminarse silenciosamente (el sitio debe
  mantener su SEO y su comportamiento de `prefetch`).
- Si el motor oficial `@astrojs/upgrade` actualiza integraciones, el commit
  debe registrar qué cambió.

### Acceptance Criteria

- [ ] `astro.config.mjs` compila sin errores bajo Astro 7
- [ ] `site` conservado
- [ ] `sitemap()` sigue en `integrations`
- [ ] `devToolbar` y `prefetch` resueltos según la guía v7 (ajustado o
      documentado por qué no requiere ajuste)
- [ ] `dist/sitemap-index.xml` (o `sitemap.xml`) existe tras el build
- [ ] Si `@astrojs/upgrade` tocó `package.json`, el diff está justificado en
      el CHANGELOG

---

## REQ-005: Gate de seguridad en verde

### Description

El objetivo observable del change: `make audit` (que corre
`pnpm audit --audit-level=high` **sin** `|| true`, por adaptación local) debe
terminar con exit 0.

### Requirements

- `pnpm audit --audit-level=high` no debe reportar vulnerabilidades `high` ni
  `critical`.
- No se modifica el target `audit` del `Makefile` para ablandar el umbral ni
  para reintroducir `|| true`.

### Acceptance Criteria

- [ ] `pnpm audit --audit-level=high` reporta 0 vulnerabilidades high/critical
- [ ] `make audit` exit 0
- [ ] `Makefile` sin cambios en el target `audit`

---

## REQ-006: Build, lint y tests en verde

### Description

El upgrade mayor no puede degradar el sitio. La suite de 13 specs
(`src/**/*.spec.ts`) y el build son la red de seguridad de la migración.

### Requirements

- `make lint` (`astro check`) exit 0.
- `make test` (`vitest run`) exit 0.
- `make build` (`astro build`) exit 0.
- Las 40+ instancias de `<Image>` de `astro:assets` deben seguir renderizando
  (ninguna debe degradar a `<img>` crudo ni fallar en build).

### Acceptance Criteria

- [ ] `make lint` exit 0
- [ ] `make test` exit 0, misma cantidad de specs pasando que antes del cambio
- [ ] `make build` exit 0 y `dist/` generado
- [ ] Build sin warnings ni errores de `astro:assets`

---

## REQ-007: Gates del framework intactos

### Description

El change no debe afectar los gates del framework Specboot ni la
trazabilidad OpenSpec.

### Requirements

- `bash check-refs.sh` exit 0.
- `bash specboot.sh --ci` reporta `Errores: 0`.
- `openspec validate upgrade-astro-7` es válido.
- Ningún archivo intocable del framework se modifica
  (`AGENTS.md`, `opencode.json`, `ai-specs/**`, `.opencode/**`, `specboot.sh`,
  `Makefile` salvo el target `audit` que no se toca, `docs/base-standards.md`).

### Acceptance Criteria

- [ ] `bash check-refs.sh` exit 0
- [ ] `bash specboot.sh --ci` → `Errores: 0`
- [ ] `openspec validate upgrade-astro-7` → válido
- [ ] `git diff --name-only` no lista archivos intocables del framework
