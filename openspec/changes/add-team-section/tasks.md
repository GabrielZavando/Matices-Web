# Plan de Tareas: Sección "Nuestro Equipo"

Este plan define las tareas secuenciales y granulares para la implementación de la nueva sección de equipo en la página de inicio.

---

## Fase 1: Componentes Globales (N/A)
*Esta sección no requiere la creación o modificación de componentes globales del Layout.*

---

## Fase 2: Enrutamiento y Páginas (N/A)
*La sección se implementará directamente en la página de inicio existente (`src/pages/index.astro`).*

---

## Fase 3: Secciones Atómicas (Sección de Equipo)

### [x] Tarea 3.1: Preparar Datos e Importación de Imágenes en `index.astro`
* **Descripción**: Definir los datos de los 4 integrantes del equipo (nombre, descripción, imagen) como un arreglo en el frontmatter de `index.astro`. Importar imágenes existentes desde `src/assets/` para los integrantes (por ejemplo, `directora-matices.jpeg`, `competencias.jpg`, `desempeno.jpg`, `reclutamiento.jpg`).
* **Estimación**: 30 minutos.
* **Criterio de aceptación**: Las imágenes y los datos del arreglo se importan correctamente y se resuelven sin errores de compilación de TypeScript/Astro.

### [x] Tarea 3.2: Implementar la Estructura Semántica de la Sección "Nuestro Equipo"
* **Descripción**: Añadir el marcado de la sección en `src/pages/index.astro`, inmediatamente debajo de la sección "Áreas de Especialización" (línea ~343, antes de `<CompanyLogos />`). Usar estructura semántica de HTML5 (`<section>`, `<article>`).
* **Estimación**: 1 hora.
* **Criterio de aceptación**: El título "Nuestro Equipo" se renderiza correctamente con la tipografía *Playfair Display*, y las 4 tarjetas se muestran estructuradas semánticamente en el DOM.

### [x] Tarea 3.3: Aplicar Diseño Responsivo y Optimización de Imágenes con `<Image />`
* **Descripción**: Configurar la grilla de las tarjetas con enfoque Mobile-First (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`). Implementar el componente `<Image />` de `astro:assets` con la proporción 4:3 (`aspect-[4/3]`) y `object-cover`.
* **Estimación**: 1 hora.
* **Criterio de aceptación**: La sección es totalmente responsiva en todas las resoluciones (móvil, tablet, escritorio) y las imágenes se cargan en formatos optimizados (WebP/AVIF) con el atributo `loading="lazy"`.

### [x] Tarea 3.4: Añadir Micro-Interacciones y Detalles Estéticos
* **Descripción**: Implementar efectos de transición en las tarjetas (`hover:shadow-lg hover:-translate-y-1 transition-all duration-300`) y efectos de zoom suave en las imágenes al pasar el cursor (`group-hover:scale-105 transition-transform duration-500`).
* **Estimación**: 30 minutos.
* **Criterio de aceptación**: Las animaciones se ejecutan de manera fluida y de acuerdo al sistema de diseño "Natural Vitality" de Matices.
