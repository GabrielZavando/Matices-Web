# Plan de Trabajo (Checklist de Tareas): Validaciones y Modal de Feedback en Contacto

Este documento contiene la lista secuencial de tareas granulares necesarias para completar el desarrollo de los ajustes en el formulario de contacto de Matices. Ninguna tarea excede las 2 horas de esfuerzo estimado.

---

## 📋 Lista de Tareas Secuenciales

### 🟩 Fase 1: Marcado Estructural e Indicadores Visuales (HTML)
*   [x] **Tarea 1.1: Agregar indicadores de obligatoriedad en etiquetas del formulario**
    *   **Descripción:** Modificar el marcado HTML de las etiquetas `<label>` para *Nombres y Apellidos*, *Correo Electrónico*, *Teléfono / WhatsApp* y el área de texto *Mensaje* (`src/pages/contacto.astro`). Incorporar un asterisco rojo (`*`) continuo e inline con la clase de estilo adecuada (añadiendo `.text-error { color: #ba1a1a; }` a la etiqueta `<style>` y usándola en los labels).
    *   **Duración estimada:** 30 minutos.

*   [x] **Tarea 1.2: Ajustar campos opcionales y agregar leyenda aclaratoria**
    *   **Descripción:**
        *   Modificar la leyenda descriptiva del paso 1, inyectando un párrafo justo debajo de la línea 48 que indique de forma clara: `"Los campos señalados con un asterisco (*) rojo son obligatorios."`.
        *   Eliminar el asterisco actual de la etiqueta de *Servicios de Interés* (Paso 2, línea 123) y *Tamaño de la Organización* (Paso 3, línea 242) y *Preferencia de Contacto* (Paso 3, línea 294).
        *   Quitar el atributo `required` de todos los inputs de tipo radio asociados a *Tamaño de la Organización* y *Preferencia de Contacto* en sus respectivas líneas para asegurar que sean opcionales.
    *   **Duración estimada:** 45 minutos.

---

### 🟨 Fase 2: Componente de Retroalimentación (Modal de Alertas)
*   [x] **Tarea 2.1: Maquetar la estructura HTML del Modal en la base de la página**
    *   **Descripción:**
        *   Inyectar el contenedor del modal nativo (`#feedback-modal`) justo al final del contenedor principal `<main>` de `src/pages/contacto.astro`, antes del script de la página.
        *   Maquetar los tres estados del modal dentro del mismo contenedor (`#modal-warning`, `#modal-success`, `#modal-error`), cada uno con su correspondiente icono SVG inline, títulos jerárquicos y textos aclaratorios descriptivos.
        *   Añadir el botón de cierre común (`#modal-close-btn`) centrado en la base de la tarjeta.
        *   Asegurar que por defecto el modal esté completamente oculto usando las clases utilitarias de Tailwind `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300` y `aria-hidden="true"`.
    *   **Duración estimada:** 1 hora y 15 minutos.

---

### 🟦 Fase 3: Comportamiento, Lógica de Validación e Integración (JavaScript)
*   [x] **Tarea 3.1: Desarrollar la lógica de validación e interacción del modal en Vanilla JS**
    *   **Descripción:**
        *   Actualizar la etiqueta `<script>` en `src/pages/contacto.astro` para seleccionar los nuevos elementos del DOM del modal y los campos requeridos (*nombre*, *email*, *telefono*, *mensaje*).
        *   Implementar funciones auxiliares `openModal(state)` y `closeModal()` para abrir y cerrar el modal nativo alternando dinámicamente las clases de visibilidad y escala (`opacity-100 pointer-events-auto scale-100` para mostrar; `opacity-0 pointer-events-none scale-95` para ocultar) de forma animada.
        *   Agregar controladores de eventos (`click`) en el botón de cierre y al pulsar fuera de la tarjeta para cerrar el modal.
    *   **Duración estimada:** 1 hora y 30 minutos.

*   [x] **Tarea 3.2: Implementar la interceptación del Submit y el envío asíncrono**
    *   **Descripción:**
        *   Interceptar el evento `submit` del formulario.
        *   Validar que los 4 campos requeridos tengan contenido. Si falta alguno, prevenir la propagación y desplegar el modal en su **Estado de Advertencia** (`openModal('warning')`).
        *   Si están completos, realizar la petición asíncrona mediante `fetch` (POST) al endpoint provisional de Formbold (`https://formbold.com/s/provisional_matices`).
        *   Al recibir una respuesta exitosa (status 200/ok), resetear el formulario (incluyendo la remoción de clases de estado activo en los botones de radio) y desplegar el modal en su **Estado de Éxito** (`openModal('success')`).
        *   En caso de fallo de red o respuesta incorrecta, capturar la excepción y desplegar el modal en su **Estado de Error** (`openModal('error')`).
    *   **Duración estimada:** 1 hora y 45 minutos.

---

### 🟪 Fase 4: Control de Calidad y Pruebas
*   [x] **Tarea 4.1: Probar localmente los tres escenarios del modal**
    *   **Descripción:**
        *   Iniciar el servidor de desarrollo local de Astro si no está corriendo.
        *   Probar el **Escenario A (Incompleto)** haciendo submit sin llenar los campos obligatorios. Verificar que salte el modal de advertencia y se cierre correctamente.
        *   Probar el **Escenario B (Envío Exitoso)** y el **Escenario C (Error de Red)** para validar que el comportamiento asíncrono responda visualmente según lo esperado y que el formulario se limpie.
    *   **Duración estimada:** 45 minutos.
