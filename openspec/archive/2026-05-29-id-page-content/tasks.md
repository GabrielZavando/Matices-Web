# Lista de Tareas de Desarrollo (Plan de Ejecución)

Este documento detalla la lista de tareas granulares necesarias para implementar la sección de contenido central en la página de **I+D (Investigación e Innovación Aplicada)** en `src/pages/id.astro`, incorporando la refactorización y abstracción de la sección de marcas asociadas a un componente global reutilizable. Cada tarea está planificada para no exceder las 2 horas de esfuerzo y sigue un orden lógico incremental.

---

## Fase 1: Componentes Globales y Preparación de Recursos
* [x] **Tarea 1.1: Refactorizar y extraer la sección de marcas a un componente reutilizable (2 horas)**
  * Crear el archivo del componente Astro en `src/components/global/CompanyLogos.astro`.
  * Extraer e integrar en este nuevo componente la lógica de importación dinámica (`import.meta.glob`) de los logotipos institucionales ubicados en `src/assets/companys/`.
  * Migrar el marcado completo, las clases utilitarias de Tailwind y la optimización con la etiqueta nativa `<Image />` desde `src/pages/index.astro` hacia el componente global para que sea autocontenido.
  * Importar y renderizar el nuevo componente `<CompanyLogos />` en `src/pages/index.astro` en sustitución del código original, verificando que la página de inicio mantenga su diseño y funcionalidad de manera idéntica.

* [x] **Tarea 1.2: Mapear y preparar activos de la galería de evidencias de I+D (1 hora)**
  * Identificar y seleccionar de 4 a 6 fotografías representativas de la galería desde `src/assets/gallery/` (ej. `01.jpeg`, `04.jpeg`, `06.jpeg`, `08.jpeg`) para la galería de evidencias presenciales y de supervisión en la página de I+D.
  * Configurar y probar los imports de estas imágenes directamente en la cabecera frontmatter de `src/pages/id.astro`.

---

## Fase 2: Configuración de Rutas y Enlaces (Routing & Enlaces)
* [x] **Tarea 2.1: Configurar el flujo de conversión y enlaces de ancla (0.5 horas)**
  * Establecer la ruta del botón de llamado a la acción (CTA) `"CONOCER SCOUTHEM"` y otros CTAs secundarios para que apunten al formulario de contacto o calificación del sitio (ej. `/contacto` o `#contacto-form`).
  * Asegurar la consistencia de los atributos de enlace para no penalizar el SEO.

---

## Fase 3: Maquetación y Construcción de Secciones (Pages - id.astro)
* [x] **Tarea 3.1: Desarrollar la Sección Central de Investigación (1.5 horas)**
  * Agregar el bloque semántico `<section>` dedicado al encabezado de la sección central "Investigación e Innovación Aplicada".
  * Incluir la descripción comercial y el mensaje que resalta las décadas de experiencia internacional de la consultora en psicología aplicada.
  * Aplicar tipografías de visualización en Serif (`font-heading`) y colores semánticos (`text-primary`) respetando el sistema de diseño.

* [x] **Tarea 3.2: Construir el Bloque Destacado del Proyecto FONDEF (1.5 horas)**
  * Agregar la sección semántica `<section>` con fondo contrastante o enmarcado suave (`bg-surface-container-low` o un degradado sutil de vitalidad).
  * Redactar y maquetar los detalles del **"Proyecto FONDEF IDEA I+D 2025–2026"**, enfocándose en el desarrollo científico de software con Inteligencia Artificial para el ámbito organizacional B2B.
  * Garantizar la legibilidad y estructura de rejilla para la presentación de los hitos tecnológicos del proyecto.

* [x] **Tarea 3.3: Diseñar el Cierre de Sección con Demostración de Scouthem (2 horas)**
  * Crear la estructura de dos columnas adaptativa (`grid-cols-1 lg:grid-cols-12`):
    * **Columna Izquierda (6/12):** Contenedor responsivo optimizado con aspecto de reproductor de video (`aspect-video`), que albergue un `iframe` de YouTube/Vimeo para las demostraciones del software, con carga diferida obligatoria (`loading="lazy"`).
    * **Columna Derecha (6/12):** Bloque informativo que describa el software de gestión del talento **Scouthem**, integrando un botón interactivo de acción directa (CTA) `"CONOCER SCOUTHEM"` con animaciones de micro-interacción en hover.
  * Validar el colapso vertical en pantallas móviles, posicionando la información textual por encima del video para priorizar la lectura móvil.

* [x] **Tarea 3.4: Integrar el Componente Reutilizable de Marcas Aliadas (0.5 horas)**
  * Importar el componente reutilizable `CompanyLogos.astro` en la cabecera frontmatter de `src/pages/id.astro`.
  * Renderizar `<CompanyLogos />` en el flujo secuencial central de la página, eliminando cualquier código duplicado y logrando consistencia absoluta con el inicio del sitio.

* [x] **Tarea 3.5: Construir la Galería de Evidencias estilo Masonry (1.5 horas)**
  * Diseñar la estructura de rejilla asimétrica compacta (estilo *masonry* responsivo de Tailwind) para las fotografías seleccionadas del trabajo de campo presencial, talleres de supervisión y prensa.
  * Aplicar radios redondeados asimétricos pronunciados (`rounded-2xl` a `rounded-[3rem]`) para mantener consistencia con las formas orgánicas de la marca.
  * Configurar de forma rigurosa el atributo descriptivo `alt` en cada una de las imágenes integradas.

---

## Fase 4: Control de Calidad y Criterios de Aceptación (Auditoría)
* [x] **Tarea 4.1: Auditoría Semántica, Accesibilidad, Responsividad y Rendimiento (1 hora)**
  * Validar que todo el contenido de I+D esté enmarcado en el Layout base y que no se hayan modificado layouts globales o configuraciones principales.
  * Confirmar que el iframe de video cuente con la carga diferida nativa (`loading="lazy"`) y un atributo descriptivo `title` para herramientas de asistencia.
  * Validar de manera exhaustiva que el componente reutilizable `<CompanyLogos />` se despliegue y funcione de forma idéntica y responsiva tanto en la página de inicio (`index.astro`) como en la de I+D (`id.astro`).
  * Ejecutar una validación visual del colapso responsivo en resoluciones móviles estándar (<600px).
