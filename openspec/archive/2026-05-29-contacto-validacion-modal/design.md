# Mapeo del Sistema de Diseño: Validación y Modal de Feedback

Este documento establece la especificación detallada de los tokens visuales y de interacción del nuevo sistema de validación y modal de feedback en `src/pages/contacto.astro`, siguiendo la identidad "Natural Vitality" de Matices.

---

## 1. Mapeo de Colores Corporativos

| Elemento / Estado | Token de Diseño (Tailwind / Custom CSS) | Color Hex | Propósito Visual |
| :--- | :--- | :--- | :--- |
| **Asterisco Obligatorio** | `.text-error` / `text-[#ba1a1a]` | `#ba1a1a` | Indicar obligatoriedad del campo en el label. |
| **Fondo Envoltura Modal** | `bg-black/50 backdrop-blur-sm` | `#000000` (50% Opacidad) | Enfoque visual atenuando el fondo. |
| **Fondo Tarjeta Modal** | `bg-surface-container-lowest` | `#ffffff` | Color del contenedor principal. |
| **Borde Tarjeta Modal** | `border-surface-variant` | `#e1e3e4` | Delimitación sutil de la tarjeta. |
| **Texto de Encabezados** | `text-primary` | `#003c56` | Jerarquía visual tipográfica. |
| **Texto Secundario/Cuerpo**| `text-outline` | `#71787e` | Texto descriptivo de soporte. |
| **Fondo Icono Advertencia**| `bg-amber-100` | `#fef3c7` | Contenedor circular del icono. |
| **Icono Advertencia** | `text-amber-600` | `#d97706` | Símbolo de alerta para campos incompletos. |
| **Fondo Icono Éxito** | `bg-emerald-100` | `#d1fae5` | Contenedor circular del icono. |
| **Icono Éxito** | `text-emerald-600` | `#059669` | Símbolo de confirmación de envío. |
| **Fondo Icono Error** | `bg-red-100` | `#fee2e2` | Contenedor circular del icono. |
| **Icono Error** | `text-red-600` | `#dc2626` | Símbolo de fallo en la red o servidor. |
| **Botón de Cierre** | `bg-primary` | `#003c56` | Color del botón principal del modal. |

---

## 2. Tipografía y Escala Visual
Los textos del modal heredan las fuentes cargadas en el documento (`Plus Jakarta Sans` para titulares y `Manrope` para textos de cuerpo):
* **Títulos de Alerta/Confirmación**: Clase `.font-headline-md` + `.text-headline-md` (`font-weight: 600`, `font-size: 24px`, `line-height: 32px`).
* **Mensajes Descriptivos**: Clase `.font-body-md` + `.text-body-md` (`font-weight: 400`, `font-size: 16px`, `line-height: 24px`).
* **Texto de Botón**: Clase `.font-label-md` + `.text-label-md` (`font-weight: 600`, `font-size: 14px`, `line-height: 20px`, mayúsculas sostenidas).

---

## 3. Estructura y Reglas Mobile-First
El modal y sus layouts internos se estructuran de forma adaptativa y móvil-primero:
* **Contenedor Principal (`fixed inset-0`)**:
  * Por defecto se posiciona como flexbox centrado: `flex items-center justify-center p-4`. El padding de `p-4` asegura que en pantallas móviles la tarjeta nunca toque los bordes del dispositivo.
  * Ocultación y visualización fluida: Transición controlada mediante `opacity-0 pointer-events-none` (oculto) a `opacity-100 pointer-events-auto` (visible) con `transition-all duration-300` para una UX fluida.
* **Tarjeta del Modal**:
  * Ancho responsivo: `max-w-md w-full`. En smartphones se adaptará al ancho del dispositivo restando los márgenes, mientras que en pantallas grandes se limitará a `28rem` (`448px`).
  * Bordes redondeados: `rounded-[2rem]` (32px) para mantener coherencia con las curvas orgánicas asimétricas y redondeadas del sistema de diseño Matices.
  * Sombra: `shadow-2xl` para elevar la capa visual sobre el fondo oscurecido.
  * Transición de Escala: El contenedor interno contará con `transform scale-95 transition-all duration-300`, cambiando a `scale-100` al activarse el modal para lograr un efecto de zoom elegante.
