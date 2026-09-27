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

- [ ] Leer la sección *Breaking Changes* de
      https://docs.astro.build/en/guides/upgrade-to/v7/
- [ ] Contrastar contra el `astro.config.mjs` del proyecto: verificar el estado
      de `devToolbar`, `prefetch.prefetchAll`, el plugin `@tailwindcss/vite` de
      Vite y la integración `sitemap()`
- [ ] Confirmar que no hay breaking change aplicable a `astro:assets` /
      `<Image>` (40+ instancias en `src/**`) más allá del fix de seguridad
- [ ] Confirmar que no hay breaking change aplicable a la ausencia de content
      collections, features experimentales, `output` custom y adapter
- [ ] Registrar en el informe de la tarea qué opciones requieren cambio y
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

- [ ] Ejecutar `pnpm dlx @astrojs/upgrade` (mecanismo oficial que actualiza
      Astro y las integraciones oficiales en conjunto)
- [ ] Verificar que `dependencies["astro"]` queda en `^7.3.5`
- [ ] Verificar que `dependencies["sharp"]` queda en `^0.35.4`
- [ ] Confirmar que `@astrojs/sitemap` y `@astrojs/check` quedan en versiones
      compatibles y registrar cualquier diff que el motor introdujera
- [ ] Si el motor no existe o la guía indica otro procedimiento, usar el
      alternativo y **justificarlo** en `CHANGELOG.md`
- [ ] Ejecutar `pnpm install` y confirmar que el lockfile resuelve
      `astro@>=7.2.8` y `sharp@>=0.35.4`
- [ ] Verificar `engines.node >=22.12.0` satisface el requisito de Astro 7
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `package.json`, `pnpm-lock.yaml`
- Test Path: `package.json` (grep `astro`/`sharp`), `pnpm-lock.yaml` (grep de
  versiones resueltas)

---

### Task 3: Elevar los 5 `pnpm.overrides` a sus floors parcheados

- [ ] `js-yaml`: `^4.3.1` → `^4.3.2`
- [ ] `fast-uri`: `^3.1.5` → `^3.1.6`
- [ ] `svgo`: `>=4.0.2` → `>=4.1.0`
- [ ] `sharp`: `^0.35.0` → `^0.35.4` (alineado con la Task 2)
- [ ] **Agregar** `smol-toml: ">=1.7.1"` (no existía pin)
- [ ] **No tocar** `vite`, `postcss` ni `nanoid`
- [ ] Ejecutar `pnpm install` y confirmar que los floors realmente resueltos
      cumplen cada mínimo
- [ ] Ejecutar `make build` para validar el bump minor de `svgo`; si rompe,
      revertir ese pin al último 4.0.x parcheable y documentar la deuda
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `package.json`, `pnpm-lock.yaml`
- Test Path: `package.json` (bloque `pnpm.overrides`), `make build`

---

### Task 4: Migrar `astro.config.mjs` según la guía v7

- [ ] Aplicar **solo** los ajustes que la guía v6→v7 exija sobre las opciones
      que el proyecto usa (`devToolbar`, `prefetch`, plugin de Vite,
      `integrations`)
- [ ] **No** eliminar opciones en silencio: toda opción migrada debe quedar
      documentada en `CHANGELOG.md` con el motivo
- [ ] Conservar `site: 'https://maticesconsultora.cl'`
- [ ] Conservar la integración `sitemap()`
- [ ] Si la guía no exige cambios, **no tocar el archivo** y dejar constancia
      en el informe de la tarea
- [ ] Verificar que el build emite `sitemap-index.xml` o `sitemap.xml` en
      `dist/`
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `astro.config.mjs`
- Test Path: `make build` (carga de config + presencia del sitemap)

---

### Task 5: Verificar que `astro:assets` sigue renderizando

- [ ] Ejecutar `make build` y confirmar que las 40+ instancias de `<Image>` en
      `src/**` optimizan sin error
- [ ] Confirmar que ninguna instancia degrada a `<img>` crudo
- [ ] Confirmar que el output de `dist/` contiene las imágenes optimizadas
- [ ] Confirmar que `sharp` resuelve `>=0.35.4` (cierra GHSA-rgj7-g3m4-5g8c en
      la misma ruta que dispara el advisory crítico)
- [ ] Ejecutar la suite de specs que cubren páginas con `<Image>` (p.ej.
      `_privacidad.spec.ts`)
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `src/**/*.astro`
- Test Path: `make build`, `make test`

---

### Task 6: Gates de aplicación (lint, test, build)

- [ ] `make lint` (`astro check`) exit 0
- [ ] `make test` (`vitest run`) exit 0, con la **misma cantidad** de specs
      pasando que antes del upgrade
- [ ] `make build` (`astro build`) exit 0 con `dist/` generado
- [ ] Registrar el conteo de specs pre-upgrade vs post-upgrade
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.5 hours
- Suggested Path: `Makefile`
- Test Path: `make lint`, `make test`, `make build`

---

### Task 7: Gate de seguridad en verde

- [ ] Ejecutar `make audit` y confirmar exit 0
- [ ] Confirmar que `pnpm audit --audit-level=high` reporta 0 vulnerabilidades
      `high`/`critical`
- [ ] **No** modificar el target `audit` del `Makefile` (ni bajar el umbral ni
      reintroducir `|| true`) para hacer pasar el change
- Priority: High
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `Makefile` (solo verificación, sin edición)
- Test Path: `make audit`

---

### Task 8: Entrada de CHANGELOG

- [ ] Documentar el upgrade: `astro` `^6.4.6` → `^7.3.5` con el advisory que
      cierra (GHSA-26w7-cxv4-gfx2)
- [ ] Documentar `sharp` `^0.35.0` → `^0.35.4` (GHSA-rgj7-g3m4-5g8c)
- [ ] Documentar los 5 overrides elevados y el advisory que cierra cada uno
- [ ] Documentar cualquier ajuste de `astro.config.mjs` aplicado, con motivo
- [ ] Documentar cualquier diff que `@astrojs/upgrade` haya introducido más allá
      de lo previsto
- [ ] Si el pin de `svgo` se revirtió, documentar la deuda
- Priority: Medium
- Layer: Tooling (Framework)
- Estimated: 0.25 hours
- Suggested Path: `CHANGELOG.md`
- Test Path: `CHANGELOG.md` (grep de la sección del change)

---

### Task 9: Gates finales del framework y validación del change

- [ ] `bash check-refs.sh` exit 0
- [ ] `bash specboot.sh --ci` reporta `Errores: 0`
- [ ] `openspec validate upgrade-astro-7` es válido
- [ ] `git diff --name-only` no lista archivos intocables del framework
      (`AGENTS.md`, `opencode.json`, `ai-specs/**`, `.opencode/**`,
      `specboot.sh`, `docs/base-standards.md`)
- [ ] `bash validate-specboot.sh` exit 0
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

- [ ] La **rama activa** sigue la convención vigente del proyecto (ej.
  `feature/*`, `fix/*`); trabajar sobre ella, nunca directamente sobre la rama
  principal.
- [ ] Estado **git limpio**: sin cambios sin commitear (ni staged) antes de
  empezar; si hay trabajo en curso, resolverlo primero.

### Durante la implementación

- [ ] **Test nuevo que falla antes de implementar (RED)**: escribir el test del
  escenario (`SC-NNN`) y verificar que falla antes de escribir código de
  producción.
- [ ] Ejecutar los **tests unitarios del módulo** tocado mientras se itera
  (ciclo RED-GREEN-REFACTOR), no solo al final.

### Post-implementación

Antes de dar la tarea por cerrada:

- [ ] **Ejecutar `verify`**: la verificación del change corre y produce
  evidencia persistente (`openspec/state/verify-results.json`).
- [ ] **Ejecutar `adversarial-review`**: la auditoría adversarial corre y
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
