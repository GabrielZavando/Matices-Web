# Propuesta: Organización de la Navegación y Scroll Top

Esta propuesta aborda la reestructuración del menú de navegación del sitio web
de Matices, asegurando una óptima indexación y legibilidad arquitectónica,
además de integrar la identidad corporativa visual mediante el uso correcto
del logo WebP y proporcionar una excelente experiencia de usuario con un botón
de retorno al inicio (Scroll Top).

## 1. Justificación de Arquitectura

El proyecto está construido sobre Astro (SSG). Esto nos permite optimizar la
entrega de activos y minimizar el código Javascript en el cliente mediante
Static Islands y componentes puros de Astro.

*   **Menú de Navegación**: Se estructurará mediante una barra de navegación
    centralizada en `Header.astro`. Los enlaces apuntarán a rutas estáticas
    limpias (`/nosotros`, `/testing`, etc.). Esto garantiza compatibilidad total
    con el modelo de renderizado estático de Astro y un ruteo rápido.
*   **Scroll Top**: Se encapsulará en un componente ligero `ScrollToTop.astro`
    que utiliza Vanilla JS puro. No requiere librerías externas pesadas ni
    frameworks complejos en el cliente, manteniendo el TCO del sitio en $0 USD y
    un rendimiento de carga del 100%.

## 2. Mapeo de Requisitos No Funcionales (RNF)

*   **RNF1 (Carga y Velocidad Extremas - Speed)**:
    *   Uso obligatorio de la etiqueta `<Image />` del módulo `astro:assets` para
        cargar `src/assets/logo.webp`. Esto compila la imagen a formatos de
        próxima generación (AVIF/WebP) y previene Cumulative Layout Shift (CLS)
        definiendo dimensiones precisas.
    *   El Javascript para el scroll top se incrusta mediante una etiqueta
        `<script>` autoejecutable nativa de Astro, cargándose de forma diferida.
*   **RNF2 (Diseño Mobile-First - Responsive)**:
    *   La navegación en dispositivos móviles se contrae en un menú lateral
        de pantalla completa activado mediante un control puramente CSS (`peer` y
        `checkbox`), reduciendo la cantidad de JS activo.
    *   El botón Scroll Top flotante se posicionará en `fixed bottom-6 right-6`
        para no interferir con las áreas comunes del pulgar al interactuar
        en dispositivos móviles.
*   **RNF3 (Accesibilidad Semántica - SEO)**:
    *   El menú se estructurará semánticamente mediante `<header>`, `<nav>`,
        `<ul>`, `<li>` y elementos de enlace `<a>` válidos para que los motores
        de búsqueda rastreen e indexen las subpáginas con facilidad.
    *   Cada nueva página creada contará con etiquetas `<title>` y descripciones
        `<meta>` optimizadas para SEO en base a las directrices de Matices.
