# Scenarios — Upgrade de Astro 7

Ticket `ASTRO-UPGRADE-001` · change `upgrade-astro-7`.

Los escenarios se escriben desde la perspectiva de quien opera el sitio
(build y CI), no de la implementación.

---

## Scenario 1: El gate de seguridad deja de bloquear el CI

**Dado** un proyecto con `astro@6.4.6` y un `Makefile` cuyo target `audit`
corre `pnpm audit --audit-level=high` sin `|| true`
**Y** el registry reporta GHSA-26w7-cxv4-gfx2 (critical) con `vulnerable:
<7.2.8` y `patched: >=7.2.8`
**Cuando** se ejecuta `make audit`
**Entonces** el comando falla con exit ≠ 0 y el job `Security Audit` de CI
queda en `FAILURE`

**Y al completar el upgrade:**

**Dado** `astro` instalado en `>=7.2.8`, `sharp` en `>=0.35.4` y los 5
`pnpm.overrides` elevados a su floor parcheado
**Cuando** se ejecuta `make audit`
**Entonces** `pnpm audit --audit-level=high` reporta 0 vulnerabilidades
`high`/`critical` y el job `Security Audit` de CI queda en `SUCCESS`

---

## Scenario 2: La versión de Astro instalada es parcheada

**Dado** el proyecto con `package.json` declarando
`devDependencies`/`dependencies` de `astro` en `^7.3.5`
**Y** el lockfile regenerado
**Cuando** se consulta la versión efectivamente instalada
**Entonces** la versión resuelta es `>=7.2.8`
**Y** `npm ls astro` no reporta vulnerabilidades conocidas para ese paquete
**Y** el motor Node del proyecto (`>=22.12.0`) satisface el `engines` de Astro 7
(`>=22.12.0`)

---

## Scenario 3: La ruta de imágenes vulnerable deja de ejercitarse

**Dado** el sitio con 40+ instancias de `<Image>` de `astro:assets` en 7
páginas y 3 componentes, y sin `image` custom en `astro.config.mjs` (por lo
que el servicio por defecto con `sharp` está activo)
**Y** una versión de Astro `>=7.2.8` instalada
**Cuando** se ejecuta `make build`
**Entonces** todas las imágenes optimizan sin error
**Y** ninguna instancia degrada a `<img>` crudo
**Y** `sharp` resuelve `>=0.35.4`, cerrando GHSA-rgj7-g3m4-5g8c en la misma
ruta

---

## Scenario 4: Los overrides resuelven por encima de cada floor

**Dado** el bloque `pnpm.overrides` con los 7 pins del proyecto
**Y** los 5 pins de seguridad elevados a su floor parcheado
**Cuando** se regenera el lockfile y se inspeccionan las versiones resueltas
**Entonces** `js-yaml >=4.3.2`, `fast-uri >=3.1.6`, `svgo >=4.1.0`,
`sharp >=0.35.4` y `smol-toml >=1.7.1`
**Y** los pins no relacionados (`vite`, `postcss`, `nanoid`) conservan sus
versiones actuales
**Y** `smol-toml`, que antes no tenía pin, ahora sí lo tiene

---

## Scenario 5: El bump minor de `svgo` no rompe la optimización de SVG

**Dado** que `svgo` es dependencia transitiva de Astro y el pin sube de
`>=4.0.2` a `>=4.1.0` (salto minor, el de mayor riesgo del change)
**Cuando** se ejecuta `make build`
**Entonces** el build completa exit 0
**Y** los SVG del proyecto se siguen optimizando (el output de `dist/` contiene
los `.svg` y no hay error del plugin de Vite)
**Si** el build fallara por una API removida en `svgo` 4.1
**Entonces** se revierte ese pin al último 4.0.x parcheable y se documenta la
deuda en vez de dejar el build roto

---

## Scenario 6: La configuración sobrevive al major

**Dado** un `astro.config.mjs` con `site`, `devToolbar`, `prefetch.prefetchAll`,
el plugin `@tailwindcss/vite` y la integración `sitemap()`
**Y** Astro 7 instalado
**Cuando** se ejecuta `make build`
**Entonces** `astro.config.mjs` se carga sin errores
**Y** `site` sigue siendo `https://maticesconsultora.cl`
**Y** `sitemap()` sigue activa y se emite `sitemap-index.xml` o `sitemap.xml`
en `dist/`
**Y** cualquier opción que la guía v7 marque como eliminada se migró a su
reemplazo en lugar de dropearse en silencio

---

## Scenario 7: El sitio no se degrada (lint, tests, build)

**Dado** el proyecto con 13 specs en `src/**/*.spec.ts` y targets `lint`
(`astro check`), `test` (`vitest run`) y `build` (`astro build`)
**Cuando** se ejecutan los tres targets tras el upgrade
**Entonces** `make lint` exit 0
**Y** `make test` exit 0 con la misma cantidad de specs pasando que antes del
upgrade
**Y** `make build` exit 0 con `dist/` generado

---

## Scenario 8: Los gates del framework no se ven afectados

**Dado** un proyecto que valida su propio framework en CI con
`bash check-refs.sh` y `bash specboot.sh --ci`
**Cuando** el upgrade de Astro se aplica
**Entonces** `bash check-refs.sh` exit 0
**Y** `bash specboot.sh --ci` reporta `Errores: 0`
**Y** `openspec validate upgrade-astro-7` es válido
**Y** ningún archivo intocable del framework aparece en el diff
**Y** el target `audit` del `Makefile` sigue sin `|| true` (no se ablanda el
gate para hacer pasar el change)

---

## Scenario 9: La actualización usa el mecanismo oficial

**Dado** la guía oficial v6→v7 de Astro
**Y** el motor `pnpm dlx @astrojs/upgrade` que actualiza Astro y las
integraciones oficiales en conjunto
**Cuando** se ejecuta la actualización de dependencias
**Entonces** se usa el motor oficial salvo que la guía indique un procedimiento
alternativo, y esa decisión queda justificada en el `CHANGELOG.md`
**Y** si el motor modificó `package.json` más allá de lo previsto, el diff está
explicado y no introduce pins silenciosos
