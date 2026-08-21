# Plan de Tareas: Micro-interacciones de Componentes Globales (`anim-components`)

Añade utilidades de micro-interacción a `global.css` y las aplica en Header,
Footer e Index. Reutiliza las guardas de `anim-foundation`.

---

## Fase 1: Utilidades de animación

### [x] Tarea 1.1: Añadir `.link-underline`, `.nav-link` y `.card-lift` a `global.css`
* **Descripción**: Agregar las tres utilidades (y sus `::after`/hover + guarda `@media (prefers-reduced-motion: reduce)`) al final de `src/styles/global.css`, junto al bloque de animación de `anim-foundation`.
* **Estimación**: 30 min.
* **Criterio de aceptación**: `astro check` pasa; las clases existen y respetan `prefers-reduced-motion`.

## Fase 2: Aplicación en Footer e Index

### [x] Tarea 2.1: Aplicar `.link-underline` en `Footer.astro`
* **Descripción**: Añadir `link-underline` a los enlaces de `quickLinks`, `legalLinks`, la CTA "Iniciar Diagnóstico" y el link mailto de la barra de crédito.
* **Estimación**: 20 min.
* **Criterio de aceptación**: Los enlaces muestran subrayado animado en hover/foco; `astro check` pasa.

### [x] Tarea 2.2: Aplicar `.link-underline` al link SCOUTHEM de `index.astro`
* **Descripción**: Añadir `link-underline` al `<a>` "Conoce nuestra plataforma SCOUTHEM".
* **Estimación**: 10 min.
* **Criterio de aceptación**: Subrayado animado presente; `astro check` pasa.

### [x] Tarea 2.3: Aplicar `.card-lift` a las tarjetas de servicios de `index.astro`
* **Descripción**: Reemplazar `hover:shadow-lg transition-shadow` por `card-lift` en las 6 tarjetas "Nuestros Servicios", conservando `group` para los iconos internos.
* **Estimación**: 20 min.
* **Criterio de aceptación**: Las tarjetas se elevan suavemente en hover; `astro check` pasa.

## Fase 3: Header (indicador activo)

### [x] Tarea 3.1: Indicador de enlace activo animado en `Header.astro`
* **Descripción**: Añadir la clase `nav-link` a los links de navegación (desktop y móvil). Para el link activo, reemplazar `border-b-2 border-verde-bosque` por `aria-current="page"` (el CSS `::after` dibuja el subrayado activo). Mantener la distinción visual de activo.
* **Estimación**: 30 min.
* **Criterio de aceptación**: Hover y link activo muestran subrayado que crece; el link activo usa `aria-current="page"` (mejor a11y); `astro check` pasa.

## Fase 4: Verificación

### [x] Tarea 4.1: Build y chequeo de tipos
* **Descripción**: Ejecutar `astro check` y `pnpm build`; verificar que las utilidades se aplican y no hay regresión visual.
* **Estimación**: 15 min.
* **Criterio de aceptación**: Sin errores de tipos ni de build; `link-underline`, `nav-link` y `card-lift` presentes en el CSS compilado.
