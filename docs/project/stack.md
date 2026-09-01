# Stack técnico

> Plantilla del proyecto (propiedad del dev). Contexto migrado desde la antigua
> §8 de `docs/base-standards.md` durante el upgrade de Specboot v0.1.0 → v0.1.2
> (change `upgrade-specboot-framework`). El framework referencia este archivo
> como *conditional prose* desde `AGENTS.md` §2.2.

- **Lenguajes**: TypeScript (config `astro/tsconfigs/strictest`).
- **Framework**: Astro 6 (Static Site Generation, sin SPA).
- **Estilos**: Tailwind CSS v4 (plugin `@tailwindcss/vite`). Sin CSS global ni
  estilos inline: todo el diseño se resuelve con clases utilitarias.
- **Testing**: Vitest + happy-dom.
- **Backend**: ninguno propio. Formulario serverless vía web3forms
  (`PUBLIC_WEB3FORMS_ACCESS_KEY` desde `.env`, nunca hardcodeado).
- **Infraestructura**: hosting estático en Hostinger (deploy FTP por tags
  `v*.*.*`, `$0 TCO`). Build en GitHub Actions.
- **Convenciones de commits**: Conventional Commits (`feat/ui`, `fix/form`,
  `docs/seo`, `refactor/style`, ...). Config en `commitlint.config.js`
  (no `.commitlintrc.json`: cosmiconfig le da precedencia al JSON y desactiva
  el config JS — ver CHANGELOG).
- **Lenguaje del código**: English.
- **Lenguaje de documentación cliente**: Español.

## Reglas de prohibición (no negociables, del proyecto)

- El tipo `any` o directivas de supresión de compilador (`@ts-ignore`,
  `@ts-nocheck`) están estrictamente prohibidos.
- Estilos inline (`style=""`) o archivos `.css` globales están prohibidos.
- Frameworks SPA pesados (React, Vue, Svelte) están prohibidos para proteger
  el tamaño del bundle (RNF1).
- Imágenes: usar siempre el componente `<Image />` de `astro:assets`
  (WebP/AVIF); el tag `<img />` tradicional está prohibido.

## Principios de diseño (rector del proyecto)

Todo el código generado para este proyecto debe respetar **SOLID** y priorizar
**encapsulamiento y composición sobre herencia** como regla general rectora.
La herencia solo se admite con justificación explícita en el código; por
defecto se compone comportamiento inyectando abstracciones (funciones puras,
props tipadas, módulos con una única responsabilidad).

Las reglas **concretas y verificables** —umbrales de tamaño, convenciones de
componentes, patrones de composición para Astro/TypeScript— viven en
[Frontend Standards](../frontend-standards.md). No duplicar aquí contenido
técnico.

## Adaptaciones locales del tooling del framework (drift intencional documentado)

- **pnpm** en lugar de npm (lockfile `pnpm-lock.yaml`): los targets node del
  `Makefile` usan `pnpm` (bloque `LOCAL ADAPTATIONS`).
- **`templates/ci/eslintrc.astro.js`**: ESLint 9 flat config (el upstream
  distribuye formato legacy para ESLint 8). No sobrescribir con la versión
  upstream en futuros `specboot update`.
- **`solid-lint`** solo ejecuta el config de Astro (sin NestJS/Angular/
  dependency-cruiser, que no aplican a este stack).
- **`commitlint.config.js`** con `ignores` function-based (no expresable en
  JSON).
