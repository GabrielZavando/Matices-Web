# Propuesta Técnica: Panel Lateral de Navegación Móvil (Mobile Drawer)

## 1. Justificación Arquitectónica

Esta propuesta resuelve los problemas de visualización y de experiencia de usuario en dispositivos móviles para el sitio web de **Matices Consultoría Integral**. Reemplazaremos el actual menú colapsable (que usa un truco de CSS puro con `input[type="checkbox"]` y cubría la pantalla completa) por un **Panel Lateral Flotante interactivo (Drawer)** que se desliza desde el extremo derecho de la pantalla, cubriendo exactamente el **80% del ancho del viewport (80vw)**.

### Beneficios Clave del Drawer:
- **Enfoque Centrado en el Usuario (UX):** Al cubrir el 80% de la pantalla, el 20% restante actúa como un área de contexto visual, permitiendo al usuario ver el contenido de fondo difuminado y sutilmente oscurecido. Esto disminuye la desorientación cognitiva durante la navegación.
- **Interactividad Aislada (Vanilla JS):** Al utilizar un script encapsulado nativo de Astro (`<script>`), evitamos añadir frameworks pesados de cliente (React, Svelte) y mantenemos la velocidad del sitio en su nivel óptimo.
- **Aislamiento de Maquetación (Layout):** El panel lateral se posiciona como un elemento fijo (`fixed`) con un `z-index` sumamente elevado (`z-50`), asegurando que su transición de entrada/salida no empuje, modifique ni altere el flujo normal de la página base de fondo.
- **Control del Scroll del Body:** Se implementa un bloqueo de scroll vertical en el elemento `<body>` mediante la adición dinámica de la clase `overflow-hidden` mientras el menú esté desplegado. Esto previene comportamientos erráticos o scroll indeseado en la página trasera.

---

## 2. Solución Técnica

### Componente Afectado:
- `src/components/global/Header.astro`

### Estructura de Capas Propuesta:
1. **Fondo / Capa del Sitio:** El flujo HTML normal de la página.
2. **Capa del Overlay de Fondo (`#drawer-overlay`):** Un contenedor fijo (`fixed inset-0 bg-black/40 backdrop-blur-sm`) que aparece cuando el menú está abierto, permitiendo ver el fondo y cerrando el panel al hacer clic en él.
3. **Capa del Panel Lateral (`#drawer-panel`):** Posicionado a la derecha (`fixed top-0 right-0 h-full w-[80vw] max-w-[400px]`), con fondo opaco y de alta fidelidad al sistema de diseño (`bg-matices-bg`), bordes suaves y un botón de cierre dedicado en la esquina superior derecha (`#drawer-close-btn`).
4. **Navegación de Escritorio (`md:flex`):** Sin cambios, se mantendrá en línea y horizontal en pantallas de escritorio, permaneciendo el Drawer completamente inactivo e invisible en resoluciones superiores a `768px`.

---

## 3. Mapeo a Requerimientos No Funcionales (RNF)

| Requerimiento | Descripción del Mapeo | Beneficio Técnico |
| :--- | :--- | :--- |
| **RNF1: Velocidad (Speed)** | **Interactividad con Vanilla JS encapsulado:** Evitamos bibliotecas externas de animación o frameworks JS pesados. El código compilado por Astro para este componente pesa menos de 1KB, garantizando una carga instantánea y un valor óptimo en la métrica *Time to Interactive (TTI)* y *First Contentful Paint (FCP)*. | Cero impacto en el rendimiento de red y de CPU móvil. |
| **RNF2: Adaptabilidad (Responsive)** | **Diseño Mobile-First con breakpoints de Tailwind CSS v4:** El panel del menú móvil solo opera en pantallas `< 768px` (`md:hidden`). En pantallas de escritorio, el menú se posiciona de forma tradicional (`md:static md:translate-x-0`). El ancho del drawer se define mediante unidades del viewport (`w-[80vw]`), con un tope máximo responsivo (`max-w-[400px]`). | Excelente adaptabilidad en un amplio espectro de dispositivos (desde smartphones de 320px hasta tablets). |
| **RNF3: SEO & Accesibilidad** | **Semántica e Indicadores de Estado:** Usamos elementos nativos como `<button>` con atributos de accesibilidad como `aria-label="Cerrar menú"` y `aria-expanded="false"`. Mantenemos los enlaces de navegación (`<a>`) completamente legibles en una jerarquía semántica dentro de `<nav>`. | Indexación perfecta por parte de los motores de búsqueda y compatibilidad con lectores de pantalla. |
