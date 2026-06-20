# Lista de Tareas: Secciones Desplegables en Formulario de Contacto

Este checklist detalla los pasos de desarrollo necesarios para implementar el comportamiento desplegable de las secciones opcionales y la reubicación del campo Mensaje.

---

## Fase 1: Modificaciones en el Marcado HTML (Astro)

### [ ] Tarea 1.1: Reubicar el campo Mensaje
* **Descripción**: Mover el contenedor del campo "Mensaje" (`<div class="space-y-2 w-full">` con el textarea id `mensaje`) de la Sección 3 y posicionarlo dentro del grid de la Sección 1 (Información de Identificación), justo debajo de "Cargo en la Organización" con la clase `md:col-span-2`.
* **Tiempo estimado**: 30 minutos.
* **Criterio de aceptación**: El campo "Mensaje" se muestra inmediatamente visible y funcional dentro de la primera sección y antes de cualquier sección desplegable.

### [ ] Tarea 1.2: Crear cabeceras interactivas para las secciones opcionales
* **Descripción**: 
  * Reemplazar las cabeceras estáticas de la Sección 2 ("Calificación de Requerimientos") y la Sección 3 ("Detalles de Contacto") por botones interactivos (`<button type="button">`).
  * Añadir el badge "(Opcional)" junto al título de cada sección.
  * Añadir el icono de flecha SVG alineado a la derecha, envuelto en un contenedor circular para su animación.
  * Configurar los atributos de accesibilidad iniciales (`aria-expanded="false"`, `aria-controls`, `id`, `role="button"`).
* **Tiempo estimado**: 1 hora.
* **Criterio de aceptación**: Los encabezados aparecen como botones interactivos elegantes y responsivos alineados con el sistema de diseño.

### [ ] Tarea 1.3: Envolver contenidos en envoltorios colapsables
* **Descripción**:
  * Envolver los grupos de campos de la Sección 2 y la Sección 3 dentro de un contenedor `.collapsible-wrapper` y un contenedor interno `.collapsible-content` para permitir la transición suave.
  * Añadir la estructura CSS necesaria en la sección `<style>` de `contacto.astro` utilizando la técnica de transición de CSS Grid `grid-template-rows`.
* **Tiempo estimado**: 45 minutos.
* **Criterio de aceptación**: El contenido opcional se oculta por defecto utilizando la transición de CSS y el formulario inicial se ve significativamente más corto.

---

## Fase 2: Lógica de Interacción y Accesibilidad (JavaScript)

### [ ] Tarea 2.1: Implementar la lógica Vanilla JS para alternar desplegables
* **Descripción**:
  * En la sección `<script>` de `contacto.astro`, obtener las referencias de los botones interactivos y sus contenedores colapsables.
  * Implementar eventos de click en los botones para alternar la clase `expanded` en el contenedor y rotar la flecha.
  * Actualizar dinámicamente el atributo `aria-expanded` entre `true` y `false`.
* **Tiempo estimado**: 1 hora.
* **Criterio de aceptación**: Al hacer click en las cabeceras, las secciones se expanden o colapsan de manera fluida y el icono de la flecha rota 180 grados sin provocar saltos bruscos en el diseño.

---

## Fase 3: Pruebas y Validación (Calidad)

### [ ] Tarea 3.1: Pruebas de usabilidad, validación y responsive
* **Descripción**:
  * Comprobar la experiencia móvil y de escritorio.
  * Validar que el envío del formulario funcione correctamente tanto si los desplegables están colapsados como expandidos.
  * Verificar que la validación de campos requeridos (Nombre, Email, Teléfono, Mensaje) funcione correctamente sin que el usuario sea bloqueado por campos ocultos que no son obligatorios.
* **Tiempo estimado**: 45 minutos.
* **Criterio de aceptación**: El formulario es completamente usable, responsivo, accesible y envía datos sin errores.
