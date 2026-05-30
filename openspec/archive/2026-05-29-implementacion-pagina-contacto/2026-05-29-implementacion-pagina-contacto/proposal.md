# Propuesta Arquitectónica: Página de Contacto y Formulario B2B

## 1. Objetivo
Implementar la página de "Contacto" (`src/pages/contacto.astro`) para capturar y calificar prospectos B2B, replicando la estructura modular, pasos secuenciales, e integración estricta con el sistema de diseño "Natural Vitality".

## 2. Decisiones de Arquitectura
* **Astro SSG:** La página se genera de forma estática en el servidor para maximizar la velocidad de despliegue y entrega.
* **Sistema de Componentes:** La página será inyectada dentro del layout corporativo (`src/layouts/Layout.astro`), manteniendo la consistencia global del encabezado y pie de página.
* **Gestión de Estado (Vanilla JS):** Las micro-interacciones (como marcar como activos los botones de radio personalizados) se manejarán con un `<script>` nativo de Astro, manteniendo el TCO de la infraestructura en $0 USD sin requerir de librerías como React o Vue.
* **Integración Formbold:** El formulario `<form>` utilizará el atributo `action` apuntando a Formbold o a una variable temporal para permitir procesamiento asíncrono sin levantar un servidor backend propio.

## 3. Mapeo de Requisitos No Funcionales (RNF)
* **RNF1 (Velocidad):** Empleo de HTML nativo y utilidades de Tailwind CSS. La mitigación de spam se implementa como un Honeypot pasivo en CSS, evitando la carga de dependencias externas bloqueantes como reCAPTCHA.
* **RNF2 (Responsive Mobile-First):** Toda la estructura de grillas (identificación, checkboxes, radio buttons) se diseña en pila (`flex-col` o `grid-cols-1`) para dispositivos móviles, escalando con directivas como `md:grid-cols-2` o `lg:grid-cols-4` para pantallas mayores garantizando adaptabilidad fluida.
* **RNF3 (SEO):** Utilización rigurosa de semántica HTML5 (`<main>`, `<section>`, `<form>`, `<label>`, `<fieldset>`) favoreciendo la lectura por parte de screen readers y web crawlers, mejorando el puntaje de accesibilidad técnica de la página como punto de conversión.
