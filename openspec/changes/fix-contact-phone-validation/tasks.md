# Plan de Trabajo (Checklist de Tareas): Corrección de Formulario de Contacto

Este documento contiene la lista secuencial de tareas granulares necesarias para completar el desarrollo de la validación y el comportamiento del formulario en `src/pages/contacto.astro`.

---

## 📋 Lista de Tareas Secuenciales

### 🟩 Fase 1: Ajustes de Marcado HTML y Expresión Regular
*   [x] **Tarea 1.1: Corregir expresión regular del input de teléfono y su placeholder**
    *   **Descripción:** 
        *   Localizar el input de teléfono (`id="telefono"`) en `src/pages/contacto.astro` (aprox. línea 78-86).
        *   Reemplazar su atributo `pattern` actual por la expresión regular exacta: `^\+?[1-9]\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$`.
        *   Asegurar que su `placeholder` sea exactamente: `Ej. +56 9 1234 5678`.
    *   **Duración estimada:** 30 minutos.

---

### 🟨 Fase 2: Definición de Clases de Validación Visual (CSS)
*   [x] **Tarea 2.1: Agregar clases de error para inputs y textareas**
    *   **Descripción:** 
        *   Añadir estilos en la sección `<style>` de `src/pages/contacto.astro` para cambiar el borde del input a rojo cuando falle la validación.
        *   Implementar la clase `.border-error` y su variante `:focus`:
            ```css
            .border-error {
              border-color: #ba1a1a !important;
            }
            .border-error:focus {
              box-shadow: 0 0 0 4px rgba(186, 26, 26, 0.1) !important;
            }
            ```
    *   **Duración estimada:** 30 minutos.

---

### 🟦 Fase 3: Lógica de Validación Reactiva y Envío de Formulario (JavaScript)
*   [ ] **Tarea 3.1: Implementar control de interacción y validación dinámica (.touched)**
    *   **Descripción:**
        *   Modificar la etiqueta `<script>` en `src/pages/contacto.astro`.
        *   Seleccionar todos los campos obligatorios (`#nombre`, `#email`, `#telefono`, `#mensaje`).
        *   Agregar eventos `blur` a cada uno de ellos para aplicar la clase `.touched` y evaluar su validez mediante una función común `validateField(field)`.
        *   Agregar eventos `input` para limpiar dinámicamente el estado de error (revaluando `checkValidity()`) una vez que el usuario comience a escribir datos válidos si el campo ya fue tocado (`.touched`).
    *   **Duración estimada:** 1 hora.

*   [ ] **Tarea 3.2: Actualizar la intercepción del submit y activación de modal**
    *   **Descripción:**
        *   Actualizar el controlador del evento `submit` del formulario.
        *   En el submit, forzar la validación de todos los campos marcándolos como `.touched` y evaluándolos visualmente.
        *   Evaluar si el formulario es válido usando `form.checkValidity()`. Si no es válido, detener la transmisión y abrir inmediatamente el modal nativo en su **Estado de Advertencia** (`openModal('warning')`).
        *   Si es válido, realizar el envío Fetch al endpoint corporativo real `https://formbold.com/s/9BL2Q` (obtenido dinámicamente desde `form.action` o configurado explícitamente).
        *   En caso de éxito, resetear el formulario, limpiar las clases de error y `.touched`, y mostrar el modal de éxito. En caso de fallo de red, mostrar el modal de error técnico.
    *   **Duración estimada:** 1 hora y 15 minutos.

---

### 🟪 Fase 4: Verificación y Pruebas
*   [ ] **Tarea 4.1: Realizar pruebas unitarias e interactivas de flujo de error**
    *   **Descripción:**
        *   Probar de forma local la interacción del usuario: dejar un campo obligatorio vacío o escribir un teléfono con formato incorrecto, verificar que se aplique el borde rojo al salir del campo.
        *   Corregir el teléfono o completar el campo vacío y comprobar que el color rojo desaparezca al instante.
        *   Intentar enviar el formulario con errores y verificar que se abra el modal de advertencia indicando campos incompletos.
        *   Completar el formulario correctamente, realizar el submit y comprobar que se envíe con éxito a Formbold y muestre el modal de confirmación.
    *   **Duración estimada:** 45 minutos.
