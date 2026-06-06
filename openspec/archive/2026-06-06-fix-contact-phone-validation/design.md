# Especificación del Sistema de Diseño: Validación Reactiva y Feedback

Este documento define el mapeo detallado de tokens visuales y de interacción para las validaciones y estados de error interactivos del formulario de contacto.

---

## 1. Mapeo de Colores Corporativos

| Elemento / Estado | Token de Diseño (Tailwind / Custom CSS) | Color Hex | Propósito Visual |
| :--- | :--- | :--- | :--- |
| **Borde Normal (Input / Textarea)** | `border-surface-variant` | `#e1e3e4` | Estado por defecto del campo de texto. |
| **Borde con Foco Activo** | `focus:border-primary` + `focus:ring-primary/10` | `#003c56` (10% Opacidad) | Indicar que el campo está seleccionado por el usuario. |
| **Borde de Error (Inválido)** | `.border-error` | `#ba1a1a` | Indicar de manera reactiva que el valor ingresado es incorrecto. |
| **Anillo de Foco en Error** | `focus:ring-error/10` | `#ba1a1a` (10% Opacidad) | Enfoque interactivo visual para campos en estado de error. |
| **Asterisco Obligatorio** | `.text-error` | `#ba1a1a` | Resaltar visualmente que el campo es obligatorio. |

---

## 2. Tipografía y Estilo de Inputs
* **Marcador de Posición (Placeholder)**:
  * Campo Teléfono: `Ej. +56 9 1234 5678`.
  * Estilo visual: Tipografía `Plus Jakarta Sans` / `Manrope` con color gris de contraste bajo (`text-outline` / `#71787e`).
* **Estilo de Borde Redondeado**:
  * Inputs y Textarea mantienen el radio de esquina corporativo `rounded-xl` (`1.5rem` / `24px` según el archivo, aunque en los estándares es `0.5rem`). Mantendremos el estilo exacto existente en `contacto.astro` (`rounded-xl`).

---

## 3. Comportamiento y Feedback Interactivo
* **Clase Dinámica `.touched`**:
  * Solo se aplica tras el evento `blur` (pérdida de foco) o al intentar enviar el formulario.
  * Evita marcar de color rojo los campos requeridos vacíos antes de que el usuario haya interactuado con ellos, optimizando la experiencia de usuario (UX).
* **Evaluación Continua**:
  * Si un campo posee la clase `.touched`, cada pulsación de tecla (`input`) revaluará su validez reactivamente, removiendo el color rojo en el instante en que el valor cumpla las condiciones de formato.
