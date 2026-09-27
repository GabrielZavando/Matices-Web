# Propuesta de Cambio: Upgrade de Astro 7

## Ticket

- **Ticket ID**: ASTRO-UPGRADE-001
- **Título**: Upgrade de Astro a v7 para cerrar RCE crítica de optimización de imágenes
- **Tag**: `[frontend]`

## Why

`pnpm audit` reporta una vulnerabilidad **crítica** que no tiene parche disponible
en la rama 6.x, por lo que el gate `Security Audit` de CI falla y bloquea el
merge:

| Advisory | Sev | Paquete | Vulnerable | Patched |
|---|---|---|---|---|
| GHSA-26w7-cxv4-gfx2 | **critical** | `astro` | `<7.2.8` | `>=7.2.8` |

**Astro no publicó fix en 6.x**: el advisory declara `patched: >=7.2.8` con
vulnerable `<7.2.8`, sin línea 6.x parcheada. La única vía de cierre es el
upgrade mayor.

La vulnerabilidad es **remote code execution a través de la optimización de
imágenes AVIF**, y es alcanzable en este proyecto: hay **40+ usos de
`astro:assets` (`<Image>`) repartidos en 7 páginas y 3 componentes**, por lo que
la optimización de imágenes se ejecuta en **cada build** (Astro usa `sharp`
como servicio de imágenes por defecto y el proyecto no define `image` en
`astro.config.mjs`).

Además, el mismo audit reporta 5 vulnerabilidades `high` de dependencias
transitivas, 4 de ellas ya cubiertas por el mecanismo `pnpm.overrides` que este
proyecto usa desde fixes anteriores, con floors desactualizados:

| Advisory | Sev | Override actual | Floor requerido |
|---|---|---|---|
| GHSA-2883-xcg3-v3hh | high | `js-yaml: ^4.3.1` | `>=4.3.2` |
| GHSA-5jgf-p345-68v8, GHSA-f65p-4m7j-42xc, GHSA-fph4-wmhf-6fwf, GHSA-jqff-g426-hqxp | high | `fast-uri: ^3.1.5` | `>=3.1.6` |
| GHSA-w27v-7q3p-w38r | high | `svgo: >=4.0.2` | `>=4.1.0` |
| GHSA-rgj7-g3m4-5g8c | high | `sharp: ^0.35.0` | `>=0.35.4` |
| GHSA-7w5x-hrqm-74c2 | high | *(ausente)* | `smol-toml: >=1.7.1` |

## What Changes

- **`astro`: `^6.4.6` → `^7.3.5`** (la 7.3.5 es la última publicada; satisface
  el floor `>=7.2.8` del advisory).
- **`sharp`: `^0.35.0` → `^0.35.4`** (dependencia directa; 0.35.4 es la
  versión parcheada y la última publicada).
- **5 `pnpm.overrides` actualizados** al floor parcheado de cada advisory.
- **Migración de configuración** a partir de la
  [guía oficial v6→v7](https://docs.astro.build/en/guides/upgrade-to/v7/),
  usando el mecanismo oficial `pnpm dlx @astrojs/upgrade` que actualiza Astro
  y las integraciones oficiales en un solo paso.

### Superficie de migración (verificada sobre el repo)

El proyecto tiene una **superficie de migración baja**, confirmado por
inspección del código:

- `astro.config.mjs` es mínimo (18 líneas): `site`, `devToolbar`, `prefetch`,
  un plugin de Vite (`@tailwindcss/vite`) y la integración `sitemap()`.
- **No hay `src/content/`** → sin content collections (se descarta toda la
  clase de breaking changes de `astro:content`, `defineCollection`,
  `getCollection` y loaders).
- **Sin features experimentales** (cero coincidencias de `experimental_`).
- **Sin `output` custom ni adapter** → salida estática por defecto.
- **Sin `Astro.glob`** en el código de aplicación.
- 13 test specs (`src/**/*.spec.ts`) cubren el sitio y funcionan como red de
  seguridad para la migración.

Los puntos de configuración a verificar durante la migración son
`devToolbar`, `prefetch.prefetchAll` y el plugin `tailwindcss()` de Vite, que
son las opciones del `astro.config.mjs` con mayor probabilidad de cambio entre
majores.

### Compatibilidad de integraciones

`@astrojs/sitemap` (3.7.4) y `@astrojs/check` (0.9.10) **no declaran
`peerDependencies` sobre `astro`**, por lo que el registro no expresa
constraint de compatibilidad. LaLast versión de cada una es posterior a la
actualmente fijada (`^3.7.3` y `^0.9.9`), y el motor oficial
`@astrojs/upgrade` las actualiza junto con Astro. La verificación real de
compatibilidad se hace en la fase de implementación, vía `make lint` y
`make build`.

### Requisito de motor

Astro 7.3.5 requiere `node >=22.12.0`. El proyecto ya declara
`engines.node: ">=22.12.0"` y CI corre `NODE_VERSION: '22'` → sin impacto.

## Impact

- **Riesgo de migración: bajo** (sin content collections, sin features
  experimentales, sin adapter, config minimalista).
- **Riesgo de los overrides: medio y acotado.** El bump de `svgo`
  (`>=4.0.2` → `>=4.1.0`) es un salto **minor** sobre una dependencia
  transitiva de Astro, y es el que más puede romper. Se mitiga con build +
  tests en la propia implementación.
- **CI:** el gate `Security Audit` vuelve a verde, lo que desbloquea el merge
  del PR #10.
- **Fuera de alcance:** el cambio de `devToolbar`/`prefetch` más allá de lo
  que la guía de migración exija, y cualquier rediseño visual. Este change es
  de dependencias y configuración de build.
