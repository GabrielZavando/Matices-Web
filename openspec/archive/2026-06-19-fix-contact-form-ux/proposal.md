# Proposal: Mejoras de UX y Funcionalidad en Formulario de Contacto

## Objetivo
Resolver problemas de usabilidad y funcionalidad reportados en el formulario de contacto (`contacto.astro`), específicamente:
1. **Espaciado y jerarquía visual:** Ajustar el espaciado entre los elementos del título de las secciones colapsables a un mínimo de `1rem`.
2. **Claridad de interacción (UX):** Modificar el cursor a `pointer` (mano) en los botones de expansión de secciones para indicar explícitamente su naturaleza interactiva.
3. **Control de envío (Bug Fix):** Evitar que los botones del acordeón disparen el evento de envío del formulario de manera accidental, garantizando que el `submit` solo ocurra al presionar el botón principal.

## Contexto Operacional
* **Componente Afectado:** `src/pages/contacto.astro`
* **Impacto:** Se previenen envíos prematuros o accidentales por parte de los usuarios al navegar por los acordeones, mejorando la completitud de datos y la experiencia visual.

## Mapeo a Requerimientos No Funcionales
* **RNF2 (Responsive & UX):** El espaciado armónico y los cursores correctos mejoran el "feedback" interactivo de la interfaz web, alineándose a estándares de accesibilidad visual.
