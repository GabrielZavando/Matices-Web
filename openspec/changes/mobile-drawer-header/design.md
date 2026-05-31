# Mapeo de Tokens de Diseño: Mobile Drawer

Este documento detalla los tokens y clases del sistema de diseño de **Matices** que se implementarán rigurosamente en el menú lateral móvil dentro de `Header.astro`.

## 1. Tokens de Color y Clases Utilizadas

| Token de Color | Valor Hex / CSS Variable | Clase Tailwind CSS v4 | Propósito en el Drawer |
| :--- | :--- | :--- | :--- |
| **Matices Primary** | `#243B55` / `var(--color-matices-primary)` | `bg-verde-bosque` / `text-verde-bosque` / `border-verde-bosque` | Color para enlaces activos, bordes y fondo del botón CTA. |
| **Matices Background** | `#F4F7F9` / `var(--color-matices-bg)` | `bg-crema-calido` | Fondo sólido del panel lateral para asegurar legibilidad. |
| **Overlay Oscuro** | `rgba(0, 0, 0, 0.4)` | `bg-black/40` | Capa translúcida que cubre el 20% libre para atenuar el fondo del sitio. |
| **Borde Suave** | `rgba(36, 59, 85, 0.1)` | `border-verde-bosque/10` | Línea divisoria del lateral izquierdo del drawer y el separador de la cabecera. |

---

## 2. Tipografía y Estructura Visual

- **Fuente Sans-Serif:** Se aplicará `font-sans` (`"Plus Jakarta Sans"`) para garantizar una lectura cómoda y amigable en móviles en todos los enlaces y etiquetas del panel.
- **Tamaño de Enlaces:** `text-lg` con un espaciado vertical táctil amplio (`py-3` o `py-4`) para cumplir con los estándares de accesibilidad en pantallas táctiles de móviles (objetivo táctil mínimo de 48px).
- **Espaciado y Padding:**
  - El Drawer móvil contará con un padding interno de `px-6 py-6` para respirar de forma armónica.
  - La lista de navegación interna se estructurará con `flex flex-col gap-6 items-start w-full`.
- **Botón CTA ("Solicitar Asesoría"):**
  - Mantendrá `rounded-full` (redondeado completo) para conservar el aspecto de pastilla elegante.
  - Estará posicionado al final de la lista móvil con `w-full` (ancho completo) para facilitar la interacción con el pulgar.

---

## 3. Comportamientos de Elevación y Profundidad (Glassmorphism)

- **Z-Index:**
  - El panel lateral utilizará `z-50` para estar por encima de cualquier otro elemento del sitio (como el botón ScrollToTop, galerías o banners).
  - El overlay oscurecedor utilizará `z-40`, situándose justo debajo del panel pero sobre la página base.
- **Backdrop Blur:**
  - El overlay incorporará `backdrop-blur-sm` (difuminado sutil) para generar ese efecto de "frosted leaf" (vidrio esmerilado) del sistema de diseño, manteniendo la cohesión estética.
- **Sombra Proyectada (Shadows):**
  - El panel del drawer utilizará `shadow-2xl` para dar volumen y elevación visual con una sombra ambiental profunda hacia el lado izquierdo.
