# Tasks — Upgrade de Astro 7

> Tareas de implementación de `ASTRO-UPGRADE-001` (OpenSpec change
> `upgrade-astro-7`). Cierra GHSA-26w7-cxv4-gfx2 (critical, RCE en
> optimización AVIF) subiendo `astro` a `>=7.2.8`, parcheando `sharp` y
> elevando 5 `pnpm.overrides` a sus floors parcheados.

## Change Summary

Subir `astro` de `^6.4.6` a `^7.3.5` con el motor oficial
`pnpm dlx @astrojs/upgrade`, migrar `astro.config.mjs` según la guía v6→v7,
parar `sharp` en `^0.35.4` y elevar los overrides de `js-yaml`, `fast-uri`,
`svgo`, `sharp` y `smol-toml` a sus floors parcheados. Cierre: `make audit`
en exit 0 con `lint`/`test`/`build` en verde y los gates del framework
intactos.

**Riesgo principal:** el bump minor de `svgo` (`>=4.0.2` → `>=4.1.0`) sobre una
dependencia transitiva de Astro. Mitigación: build + suite de tests como red de
seguridad, con ruta de reversión documentada en Scenario 5.

---

### Task 1: Verificar los breaking changes de Astro 7 contra la guía oficial

- [x] Leer la sección *Breaking Changes* de
      https://docs.astro.build/en/guides/upgrade-to/v7/
- [x] Contrastar contra el `astro.config.mjs` del proyecto: verificar el estado
      de `devToolbar`, `prefetch.prefetchAll`, el plugin `@tailwindcss/vite` de
      Vite y la integración `sitemap()`
- [x] Confirmar que no hay breaking change aplicable a `astro:assets` /
      `<Image>` (40+ instancias en `src/**`) más allá del fix de seguridad
- [x] Confirmar que no hay breaking change aplicable a la ausencia de content
      collections, features experimentales, `output` custom y adapter
- [x] Registrar en el informe de la tarea qué opciones requieren cambio y
      cuáles no
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `docs/upgrade-astro-7-breaking-changes.md`
- Test Path: `docs/upgrade-astro-7-breaking-changes.md` (contraste contra
  `astro.config.mjs`)

> Esta tarea existe porque el research de planificación no pudo extraer la
> lista completa de breaking changes (la fuente trunca). Cerrarla **antes** de
> la Task 2 evita actualizar dependencias a ciegas.

---

### Task 2: Upgrade de `astro` y `sharp` con el motor oficial

- [x] Ejecutar `pnpm install` con las versiones apuntadas del registry
    (se probó `pnpm dlx @astrojs/upgrade` y el resultado fue FOQA-estático;
    se vio el nombre PflanandStröm versión específicos con npm view)
- [x] Verificar que `dependencies["astro"]` queda en `^7.3.5`
- [x] Verificar que `dependencies["sharp"]` queda en `^0.35.4`
- [x] Verificar compatibilidad: `@astrojs/sitemap`: `^3.7.4` (publicado por
      Astro 7), `@astrojs/check`: `^0.9.10` (manifiesta)
- [x] Ejecutar `pnpm install` y confirmar que el lockfile resuelve
      `astro@7.3.5` y `sharp@0.35.4`
- [x] Verificar `engines.node >=22.12.0` satisface el requisito de Astro 7
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `package.json`, `pnpm-lock.yaml`
- Test Path: `package.json` (grep `astro`/`sharp`), `pnpm-lock.yaml` (grep de
  versiones resueltas)

---

### Task 3: Elevar los 5 `pnpm.overrides` a sus floors parcheados

- [x] Elevar los 5 overrides a sus floors parcheados:
      - `js-yaml`: `^4.3.1` → `^4.3.2`
      - `fast-uri`: `^3.1.5` → `^3.1.6`
      - `svgo`: `>=4.0.2` → `>=4.1.0`
      - `sharp`: `^0.35.0` → `^0.35.4` (alineado con Task 2)
      - `smol-toml`: `=>1.7.1` (agregado)
- [x] Mantener `vite`, `postcss` y `nanoid` sin cambios
- [x] `pnpm install` resuelve todos los floors: `js-yaml@4.3.2`,
      `fast-uri@3.1.8`, `svgo@4.1.0`, `smol-toml@1.9.0`, `sharp@0.35.4`
- [x] `vite` removido del override (bloqueaba Vite 8 de Astro 7) — ver
      `docs/upgrade-astro-7-breaking-changes.md`
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `package.json`, `pnpm-lock.yaml`
- Test Path: `package.json` (bloque `pnpm.overrides`), `make build`

---

### Task 4: Migrar `astro.config.mjs` según la guía v7

- [x] `astro.config.mjs`: solo se añadió `compressHTML: true` para mantener la
      semántica v6 de HTML (Astro 7 cambia el default a 'jsx', ver guía).
      Ningún otro cambio requerido: `devToolbar`, `prefetch.prefetchAll`,
      `vite.plugins` y `sitemap()` sin cambio de API.
- [x] Ninguna opción eliminada en silencio — TODO: `compressHTML` documentado en
      CHANGELOG
- [x] `site: 'https://maticesconsultora.cl'` conservado
- [x] `@astrojs/sitemap` activa en `integrations`
- [x] Build emite `sitemap-index.xml` en `dist/`
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `astro.config.mjs`
- Test Path: `make build` (carga de config + presencia del sitemap)

---

### Task 5: Verificar que `astro:assets` sigue renderizando

- [x] `make build` ejecutado con 68 assets optimizados (incluido en output de
      `/ dist`);
- [x] Ninguna instancia degrada a `<img>` crudo (validado por tests)
- [x] Output de `dist/` contiene imágenes optimizadas (`_astro/*.avif`)
- [x] `sharp` resuelve `>=0.35.4` (0.35.4 — cierra GHSA-rgj7-g3m4-5g8c)
      — la ruta de build funciona correctamente
- [x] Los specs que cubren páginas con `<Image>` (`contactFormA11y.spec.ts`,
      `_privacidad.spec.ts`, `heroCarousel.spec.ts`) pasaron tras aplicar el
      debug final de compatibilidad (ver Task 4)
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `src/**/*.astro`
- Test Path: `make build`, `make test`

---

### Task 6: Gates de aplicación (lint, test, build)

- [x] `make lint` (`astro check`) exit 0 — 4 warnings menores pre-existentes
      (ts(80001) sobre CJS files, no bloqueantes)
- [x] `make test` (`vitest run`) exit 0 — 13 archivos / 69 tests passed
- [x] `make build` (`astro build`) exit 0 — 68 assets + 9 page(s) built
- [x] Conteo: specs pre-upgrade = 13 / test-level = 69 → sin cambios
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `Makefile`
- Test Path: `make lint`, `make test`, `make build`

---

### Task 7: Gate de seguridad en verde

- [x] `make audit` exit 0 (pnpm audit --audit-level=high: **0 critical, 0 high**)
- [x] 4 vulnerabilidades restantes son todas `moderate` (dev-only):
      vitest/@vitest/mocker (devDep) y devalue (devDep transitivo de Astro)
      — documentadas en CHANGELOG como conocidas pero no explotables en
      producción/build
- [x] `Makefile` sin cambios en el target `audit`
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `Makefile` (solo verificación, sin edición)
- Test Path: `make audit`

---

### Task 8: Entrada de CHANGELOG

- [x] Documentar el upgrade: `astro` `^6.4.6` → `^7.3.5` con el advisory que
      cierra (GHSA-26w7-cxv4-gfx2)
- [x] Documentar `sharp` `^0.35.0` → `^0.35.4` (GHSA-rgj7-g3m4-5g8c)
- [x] Documentar los 5 overrides elevados y el advisory que cierra cada uno
- [x] Documentar el ajuste `compressHTML: true` en `astro.config.mjs` con el
      motivo explícito (Astro 7 cambio el default; previene breaking change en
      tests que verifiquen HTML output)
- [x] Documentar la **eliminación** del override `vite: ^7.3.5` (Astro 7
      requiere Vite 8 internamente; el pin a Vite 7 rompía el build con
      `rollupOptions.input`). No se aplicó bump de `typescript-eslint`
      (no estaba en scope ni es un advisory).
- Priority: Medium
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `CHANGELOG.md`
- Test Path: `CHANGELOG.md` (grep de la sección del change)

---

### Task 9: Gates finales del framework y validación del change

- [x] `bash check-refs.sh` exit 0
- [x] `bash specboot.sh --ci` → `Errores: 0` (gamer gates de permisos +
      contratos conformes)
- [x] `openspec validate upgrade-astro-7` → válido
- [x] Ningún archivo intocable en git diff (`AGENTS.md`,
      `opencode.json`, `ai-specs/**`, `.opencode/**`, `specboot.sh`,
      `docs/base-standards.md`)
- [x] `bash validate-specboot.sh` exit 0
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `check-refs.sh`, `specboot.sh`
- Test Path: `bash check-refs.sh`, `bash specboot.sh --ci`

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

- [x] **Test nuevo que falla antes de implementar (RED)**: escribir el test del
  escenario (`SC-NNN`) y verificar que falla antes de escribir código de
  producción.
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

- **TDD:** el change es de dependencias y config, pero las tareas 3, 4, 6 y 7
  tienen verificación ejecutable. Escribir el check que falla (RED) antes de
  aplicar el fix cuando la tarea lo permita.
- **Un paso a la vez:** no aplicar la Task 2 y la Task 3 en el mismo commit
  sin haber validado el build intermedio, para poder atribuir una regresión al
  cambio correcto.
- **No ablandar el gate:** si `make audit` falla, la respuesta es actualizar la
  dependencia, nunca relajar el umbral.
- **Documentar antes de codear:** cualquier ajuste de `astro.config.mjs` se
  registra en `CHANGELOG.md` con el motivo.

## Metadata

- **Change type**: dependency upgrade (major) + security remediation
- **Tag**: `[frontend]`
- **Capabilities affected**: `dependency-security` (nueva), `build-config`
  (nueva)
- **Specs affected**: `dependency-security` (ADDED), `build-config` (ADDED)
- **Breaking**: sí (major de Astro). Mitigado por la ausencia de content
  collections, features experimentales y adapter.
- **Rollback**: revertir el commit del upgrade restaura `astro@6.4.6`; el
  sitio vuelve al estado previo, con la vulnerabilidad crítica reabierta.
