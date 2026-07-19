# Plan de Tareas: Sistema Base de Animación CSS (`anim-foundation`)

Este plan define las tareas secuenciales y granulares para instalar la fundación
de animación reutilizable. Todas las tareas siguen TDD donde aplique y mantienen
el sitio tipado y libre de `any`.

---

## Fase 1: Utilidades CSS de animación (`global.css`)

### [x] Tarea 1.1: Registrar tokens `--animate-*` y `@keyframes` en `global.css`
* **Descripción**: Dentro del bloque `@theme` existente de `src/styles/global.css`, añadir los tokens `--animate-fade-up`, `--animate-fade-in`, `--animate-scale-in`, `--animate-slide-l`, `--animate-slide-r` y `--animate-float`. Al final del archivo, añadir los `@keyframes` correspondientes (`fade-up`, `fade-in`, `scale-in`, `slide-l`, `slide-r`, `float`).
* **Estimación**: 30 minutos.
* **Criterio de aceptación**: `astro check` y `npm run build` pasan; las utilidades `animate-*` quedan disponibles y Tailwind v4 las genera sin errores.

### [x] Tarea 1.2: Añadir el sistema de revelado `.reveal` con guardas de accesibilidad
* **Descripción**: Añadir al final de `src/styles/global.css` las reglas del sistema progresivo: estado oculto inicial solo bajo `@media (prefers-reduced-motion: no-preference)` y `html.js`, variantes `.reveal--fade-up|slide-l|slide-r|scale-in|fade-in`, transición en `.reveal.is-visible` respetando `var(--reveal-delay, 0ms)`, y bloque `@media (prefers-reduced-motion: reduce)` que fuerza `.reveal` visible.
* **Estimación**: 30 minutos.
* **Criterio de aceptación**: Con JS y motion permitido, `.reveal` arranca oculto y `.is-visible` lo revela. Con `prefers-reduced-motion: reduce`, `.reveal` es siempre visible. Sin `html.js`, `.reveal` es visible (no queda invisible).

---

## Fase 2: Helper de revelado con TDD

### [x] Tarea 2.1: Escribir el test fallido `src/lib/animations.spec.ts`
* **Descripción**: Crear `src/lib/animations.spec.ts` con entorno jsdom (`// @vitest-environment jsdom`). Implementar los 5 casos del diseño: (1) añade `is-visible` al intersectar; (2) con `once` llama `unobserve`; (3) bajo `prefers-reduced-motion` revela todo sin crear observer; (4) en SSR (`window` indefinido) no lanza; (5) respeta `rootMargin`/`threshold`. El test debe fallar porque `animations.ts` aún no existe.
* **Estimación**: 45 minutos.
* **Criterio de aceptación**: `npm test` falla por módulo/implementación ausente (estado "rojo" verificable).

### [x] Tarea 2.2: Implementar `src/lib/animations.ts`
* **Descripción**: Crear `src/lib/animations.ts` exportando `initReveal(options?: RevealOptions)` e `interface RevealOptions` según el diseño: guarda SSR (`typeof window === 'undefined'`), guarda `prefers-reduced-motion` y ausencia de `IntersectionObserver` (revela todo), y observer con `rootMargin`/`threshold`/`once` que añade `is-visible` y desobserva. Tipado completo, sin `any`.
* **Estimación**: 45 minutos.
* **Criterio de aceptación**: `npm test` pasa los 5 casos; `astro check` no reporta errores de tipo.

---

## Fase 3: Componente `Reveal` e integración en `Layout`

### [x] Tarea 3.1: Crear `src/components/ui/Reveal.astro`
* **Descripción**: Crear el componente con props tipadas `as`, `variant`, `delay`, `class` y resto de atributos. Construir `revealClass` (`reveal reveal--{variant}` + `[--reveal-delay:{n}ms]` cuando `delay>0` + `class`). Renderizar `<Tag>` con `<slot />`. Sin uso de `style=""` inline.
* **Estimación**: 30 minutos.
* **Criterio de aceptación**: El componente compila; el HTML resultante usa clases utilitarias/Tailwind (incluida la clase arbitraria de delay) y no atributos `style` inline.

### [x] Tarea 3.2: Integrar la fundación en `src/layouts/Layout.astro`
* **Descripción**: Añadir en `<head>` el script `is:inline` que agrega `html.js` al `<html>`, y al final de `<body>` un `<script>` cliente que importa `initReveal` y lo invoca.
* **Estimación**: 20 minutos.
* **Criterio de aceptación**: En navegador, los elementos con `.reveal` se revelan al entrar en viewport; sin JS (o con JS deshabilitado) el contenido permanece visible. `astro check` pasa.

---

## Fase 4: Documentación

### [x] Tarea 4.1: Añadir sección "Motion" a `docs/DESIGN.md`
* **Descripción**: Documentar en `docs/DESIGN.md` los principios de animación (sutil/breathable, solo `transform`/`opacity`, `prefers-reduced-motion`), los tokens `--animate-*` y keyframes, el uso del componente `<Reveal>` y la clase `.reveal` con `--reveal-delay`, y la garantía de enhancement progresivo.
* **Estimación**: 30 minutos.
* **Criterio de aceptación**: `docs/DESIGN.md` describe el sistema de animación de forma coherente con `src/styles/global.css` y el componente `Reveal.astro`.

---

## Fase 5: Verificación

### [x] Tarea 5.1: Ejecutar suite de tests y chequeo de tipos
* **Descripción**: Ejecutar `npm test` y `astro check`; corregir cualquier fallo de tipos o tests.
* **Estimación**: 20 minutos.
* **Criterio de aceptación**: Sin errores de TypeScript/Astro ni tests fallidos. La fundación queda lista para ser consumida por `anim-hero`, `anim-sections`, `anim-components`, `anim-ambient` y `anim-contact`.
