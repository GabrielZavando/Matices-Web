# Breaking Changes Analisis — Astro 6 → 7

> Change: `upgrade-astro-7` (ASTRO-UPGRADE-001)
> Generado: 2026-09-26
> Fuente: https://docs.astro.build/en/guides/upgrade-to/v7/ (extraída completa)

## Resumen

La guía oficial v6 → v7 lista **6 breaking changes** (sección *Breaking
Changes*), **1 deprecated** y **2 removed**. Analizados contra este proyecto:

- **2 breaking changes potencialmente aplicables**: el compilador Rust (HTML
  inválido tolerado puede fallar) y el nuevo default `compressHTML: 'jsx'`
  (cambio de manejo de whitespace en HTML inline).
- **1 breaking change indirecto a verificar en build**: Vite 8, vía el plugin
  `@tailwindcss/vite`.
- **6 cambios no aplicables** (content collections, features experimentales,
  adapters, `@astrojs/db`, `astro:transitions` internals, Markdown remark/rehype,
  Container API): el proyecto no usa ninguno.

No hay breaking change declarado en la guía sobre `astro:assets` / `<Image>`
(18 instancias en 10 archivos: 7 páginas + 3 componentes). La remediación de
seguridad (GHSA-26w7-cxv4-gfx2 en optimización AVIF) es un *fix* incluido en
v7, no un breaking change.

## Breaking changes aplicables a este proyecto

### Vite 8 (dependency upgrade)
- **Afecta a:** sí
- **Archivos afectados:** `pnpm.overrides` — el pin `vite: ^7.3.5` fue
  **eliminado** en la Task 3, porque Astro 7 exige Vite 8 internamente
  (`vite@^8.0`). El pin a Vite 7 rompía el build con
  `rollupOptions.input should not be an html file when building for SSR`.
  `astro.config.mjs` (bloque `vite.plugins` con `@tailwindcss/vite`) no cambió.
- **Acción requerida:** la guía dice que la mayoría de los usuarios no necesita
  cambios; el riesgo concreto es la compatibilidad de `@tailwindcss/vite`
  instalado con Vite 8. Verificado: `pnpm install` resuelve `vite@8.3.1` y
  `make build` pasa con `@tailwindcss/vite@4.3.0` (Task 3/5). **Sin evidencia**
  de que la guía exija cambios de config de Vite para este proyecto más allá
  de quitar el pin que anclaba a Vite 7.

### Rust compiler (compilador Rust como único compilador)
- **Afecta a:** potencialmente sí
- **Archivos afectados:** todos los `src/**/*.astro` (7 páginas, 3 componentes
  con `<Image>`, layouts) — **si contienen HTML inválido** (tags sin cerrar,
  `<div>` dentro de `<p>`, etc.)
- **Acción requerida:** ejecutar `make build` post-upgrade; si aparecen errores
  de tokens/tags sin cerrar, corregir el markup. Si el HTML renderizado cambia
  visualmente, revisar nesting inválido que el compilador Go reordenaba. Los
  diffs cosméticos de CSS (colores serializados, comillas en `url()`) no
  requieren acción.

### Nombre reservado `src/fetch.ts`
- **Afecta a:** no
- **Archivos afectados:** ninguno (verificado: no existe `src/fetch.ts` ni
  `src/fetch.js`)
- **Acción requerida:** ninguna. No crear un archivo con ese nombre sin
  configurar `fetchFile`.

### Nuevo procesador Markdown por defecto: Sätteri
- **Afecta a:** no
- **Archivos afectados:** ninguno (verificado: 0 archivos `.md`/`.mdx` en
  `src/`; no hay `src/content/`; no hay plugins remark/rehype; `@mdx` no está
  instalado)
- **Acción requerida:** ninguna.

### Experimental flags promovidos/estables (`logger`, `queuedRendering`,
### `rustCompiler`, `advancedRouting`, `cache`, `routeRules`)
- **Afecta a:** no
- **Archivos afectados:** ninguno (verificado: 0 coincidencias de
  `experimental` en `astro.config.mjs` ni en `src/**`)
- **Acción requerida:** ninguna.

### Nuevo default de whitespace: `compressHTML: 'jsx'`
- **Afecta a:** potencialmente sí (cambio de comportamiento por defecto)
- **Archivos afectados:** `src/**/*.astro` que concatenen elementos inline
  (`<span>`, `<em>`, etc.) en líneas separadas
- **Acción requerida:** inspección visual post-build (Task 5). Si faltan
  espacios entre inline elements, usar `{" "}` o fijar `compressHTML: true`
  en `astro.config.mjs` para preservar el comportamiento de v6. Decisión
  diferida a Task 4: **por defecto no tocar la config** salvo evidencia visual.

## Deprecated / Removed (referencia completa)

### Deprecated: `getContainerRenderer()` desde raíces de integraciones
- **Afecta a:** no (no hay integraciones de UI framework ni uso de la
  Container API)

### Removed: `@astrojs/db`
- **Afecta a:** no (no está en `package.json`)

### Removed: internals de `astro:transitions`
(`TRANSITION_*`, `isTransition*`, `createAnimationScope`)
- **Afecta a:** no (0 coincidencias de `astro:transitions` en `src/**`)

## Config del proyecto — Decisiones

### `astro.config.mjs`
| Opción | ¿Cambia en 7? | Buena práctica final |
|--------|---------------|----------------------|
| `site` | No (sin evidencia en la guía) | Conservar `https://maticesconsultora.cl` |
| `devToolbar.enabled: false` | No (sin evidencia en la guía de v7) | Conservar |
| `prefetch.prefetchAll: true` | No (sin evidencia en la guía de v7) | Conservar |
| `vite.plugins: [@tailwindcss/vite]` | Indirecto (Vite 8) | Conservar; verificar compat de versión del plugin en Task 2 |
| `integrations: [sitemap()]` | No (sin evidencia en la guía de v7) | Conservar; validar `sitemap-index.xml` en Task 4 |

**Conclusión de config:** la guía v7 **no exige ningún cambio obligatorio**
sobre las opciones que este proyecto usa. El único opt-in posible es
`compressHTML: true` si el build revela pérdida de espacios inline; se decide
con evidencia en Task 4/5.

## Otros puntos verificados (ausencias confirmadas en `src/` y `package.json`)

- Sin `src/content/` ni `content.config.*` → no aplica nada de content
  collections.
- Sin features experimentales (`experimental` ausente).
- Sin `output:` custom ni adapter → sitio estático, nada que migrar.
- Sin `Astro.glob`.
- Sin Markdown (`.md`/`.mdx`) → Sätteri es un no-evento.

## Conclusión

Se analizaron **9 cambios** de la guía oficial (6 breaking, 1 deprecated,
2 removed). **2 aplican con carácter condicional** (Rust compiler,
`compressHTML: 'jsx'`), verificables con `make build` + inspección visual en
las tasks 3–5; **1 aplica indirectamente** (Vite 8 vía `@tailwindcss/vite`),
verificable en Task 2; **6 no aplican**. **No hay ningún cambio obligatorio en
`astro.config.mjs`**: el archivo puede quedar intacto (consistente con la Task
4, que permite no tocarlo si la guía no lo exige). Las opciones
`devToolbar`, `prefetch.prefetchAll`, el plugin de Tailwind y `sitemap()`
carecen de breaking change documentado en la guía — marcadas como *sin
evidencia de cambio*, no como supuestos.
