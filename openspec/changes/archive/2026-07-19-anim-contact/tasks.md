# Plan de Tareas: Animaciones del Formulario de Contacto (`anim-contact`)

Aplica `<Reveal>`, pulso de selección y pop de éxito en `contacto.astro`.
Reutiliza `anim-foundation`.

---

## Fase 1: Entrada escalonada del formulario

### [x] Tarea 1.1: Envolver secciones del formulario en `<Reveal>`
* **Descripción**: En `src/pages/contacto.astro`, envolver las 3 secciones del `<form>` (Identificación, Requerimientos, Detalles) y el bloque de acciones en `<Reveal as="div" variant="fade-up">` con `delay` 0/120/240/360.
* **Estimación**: 30 min.
* **Criterio de aceptación**: El formulario entra escalonado al hacer scroll; la validación y el envío siguen funcionando; `astro check` pasa.

## Fase 2: Pulso de selección

### [x] Tarea 2.1: Añadir keyframe `pulse-select` a `global.css`
* **Descripción**: Agregar `@keyframes pulse-select` (scale 1 → 1.02 → 1) a `src/styles/global.css` y asegurar que esté desactivado bajo `prefers-reduced-motion: reduce`.
* **Estimación**: 15 min.
* **Criterio de aceptación**: Keyframe presente; `astro check` pasa.

### [x] Tarea 2.2: Aplicar pulso a `CheckboxCard.astro` y `RadioCard.astro`
* **Descripción**: Añadir `has-[:checked]:animate-[pulse-select_0.3s_ease]` a `labelClass` de ambos componentes.
* **Estimación**: 15 min.
* **Criterio de aceptación**: Al marcar una opción, la tarjeta pulsa una vez; `astro check` pasa.

## Fase 3: Pop de éxito en el modal

### [x] Tarea 3.1: Animar el icono de éxito en `contacto.astro`
* **Descripción**: En `openModal(state)`, cuando `state === 'success'`, añadir `animate-scale-in` al contenedor del icono de `#modal-success`.
* **Estimación**: 15 min.
* **Criterio de aceptación**: El icono de éxito hace "pop" al abrir el modal en estado success; `astro check` pasa.

## Fase 4: Verificación

### [x] Tarea 4.1: Build y chequeo de tipos
* **Descripción**: Ejecutar `astro check` y `pnpm build`; verificar que el formulario y los componentes de selección animan correctamente y que el bundle incluye `pulse-select`.
* **Estimación**: 15 min.
* **Criterio de aceptación**: Sin errores de tipos ni de build; `pulse-select` presente en el CSS compilado.
