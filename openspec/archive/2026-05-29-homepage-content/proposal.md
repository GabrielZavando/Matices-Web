# Propuesta Técnica: Contenido Central de la Página de Inicio - Matices

Esta propuesta técnica detalla el diseño de arquitectura y la estrategia de implementación para la integración del contenido central en la página de inicio (`src/pages/index.astro`). Se estructuran fielmente los bloques secuenciales y la información definida en el documento "Mapa de Estructura de Páginas" y el mockup visual.

## 1. Justificación de Arquitectura (Astro SSG)

La implementación se realizará exclusivamente en Astro v6.4.2 utilizando el modelo de Generación de Sitios Estáticos (SSG). Esto garantiza:
*   **TCO de $0 USD:** Despliegue directo en servidores compartidos sin backend activo (Hostinger), lo que elimina costos de infraestructura de servidores dinámicos.
*   **Velocidad de Carga Instantánea:** Los bloques se renderizarán a nivel de servidor en tiempo de compilación, entregando HTML semántico puro al navegador.

---

## 2. Cumplimiento de Requerimientos No Funcionales (RNF)

### ⚡ RNF1: Rendimiento y Optimización de Velocidad (Velocidad Móvil < 2s)
*   **Uso del Componente `<Image />`:** Se prohíbe el uso de la etiqueta `<img>` tradicional. Todas las imágenes corporativas, los logotipos de clientes cargados desde `src/assets/companys/` y las fotografías de la galería masonry cargadas desde `src/assets/gallery/` se procesarán mediante el componente de optimización nativo de Astro (`astro:assets`).
*   **Carga Diferida (Lazy Loading):** La imagen del Hero se configurará con `loading="eager"` para optimizar el LCP (Largest Contentful Paint), mientras que las imágenes de los bloques de servicios, especialización, logos de la carpeta `src/assets/companys/` y la galería de imágenes en `src/assets/gallery/` utilizarán `loading="lazy"` (por defecto).
*   **Cero JavaScript en el Cliente:** Todo el diseño, micro-animaciones (hovers, transiciones) y la maquetación se resolverán exclusivamente con CSS y Tailwind CSS v4. No se utilizarán frameworks JS pesados ni librerías de terceros, manteniendo un bundle de scripts de 0 bytes.

### 📱 RNF2: Enfoque Mobile-First Nativo
*   **Colapso Vertical:** Todas las cuadrículas (Bento de Servicios, Especialidades en dos columnas, Mosaico Masonry) se estructurarán por defecto en una sola columna en pantallas móviles (`grid-cols-1`, `flex-col`), posicionando el texto informativo y sus llamados a la acción en la parte superior.
*   **Escalabilidad a Escritorio:** El uso de modificadores de Tailwind (`md:`, `lg:`) se reservará estrictamente para reordenar o expandir las columnas y cuadrículas en pantallas grandes, respetando el espaciado y márgenes del sistema de diseño.

### 🔍 RNF3: SEO Semántico y Accesibilidad (A11y)
*   **Jerarquía de Etiquetas HTML5:** Estructuración del contenido dentro de `<main class="w-full">` utilizando secciones (`<section>`) y artículos (`<article>`) para cada uno de los bloques secuenciales.
*   **Jerarquía de Títulos:** Un único título `<h1>` en el Hero Section. Los títulos de las siguientes secciones serán `<h2>` e `<h3>` estrictamente secuenciales.
*   **Accesibilidad en Imágenes:** Cada imagen corporativa y fotográfica tendrá un atributo `alt` descriptivo detallado en español.
*   **ID únicos y anclas claras:** Configuración de IDs limpios para scroll nativo suave (como `#servicios`) y anclas hacia la sección de formulario `/contacto`.

---

## 3. Flujo de Navegación Interna

*   **Navegación Suave:** El CTA secundario "Conoce Nuestra Metodología" realizará scroll suave nativo hacia el bloque de servicios (`#servicios`).
*   **Anclas de Conversión:** Todos los botones de conversión rápida ("SOLICITAR ASESORÍA", "HABLEMOS AHORA", "CONTACTAR AQUÍ") apuntarán directamente a `/contacto` o a la sección del formulario de calificación B2B.
