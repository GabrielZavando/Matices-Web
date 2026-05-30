# Plan de Tareas: Sección de Contenido Central para Gestión del Talento

Este plan de desarrollo detalla la secuencia de tareas incrementales y granulares para la implementación del contenido central en `src/pages/talento.astro`, garantizando el cumplimiento estricto de las directrices arquitectónicas, de accesibilidad y del sistema de diseño.

---

## Fase 1: Preparativos, Importaciones y Estructura Base

### [x] Tarea 1.1: Importación de Componentes y Recursos
* **Descripción:** Importar los componentes reutilizables necesarios y las imágenes temáticas en el bloque frontmatter (YAML) de `src/pages/talento.astro`:
  * `CompanyLogos` desde `../components/global/CompanyLogos.astro`
  * Imágenes de la galería en `src/assets/gallery/` (`01.jpeg`, `02.jpeg`, `03.jpeg`, `04.jpeg`, `05.jpeg`) para asignarlas selectivamente a cada una de las 5 tarjetas de servicios de talento.
* **Criterio de Aceptación:** El frontmatter del archivo no genera advertencias de compilación y los componentes y recursos de imagen se importan correctamente.
* **Tiempo Estimado:** 30 minutos

### [x] Tarea 1.2: Limpieza e Inicialización de la Estructura Principal
* **Descripción:** Asegurar que el cuerpo principal del archivo `src/pages/talento.astro` envuelva todo el contenido central (después del Hero Section) dentro del contenedor `<main class="w-full">` semántico, justo antes del componente `<Footer />`.
* **Criterio de Aceptación:** La estructura base compila perfectamente sin romper el layout y los componentes globales de cabecera y pie de página cargan correctamente.
* **Tiempo Estimado:** 30 minutos

---

## Fase 2: Implementación de Bloques de Contenido

### [x] Tarea 2.1: Sección Superior de Gestión del Talento y Scouthem
* **Descripción:** Implementar la sección superior informativa justo debajo del Hero Section:
  * **Cabecera informativa:** Título "Te Asesoramos en Gestión del Talento" (`h2` con clase `font-heading`) y bajada informativa en `p` de Plus Jakarta Sans destacando los altos estándares de calidad metodológica y base científica.
  * **Subbloque Scouthem:** Caja destacada responsiva (flex/grid que colapsa en móvil) titulada "Scouthem – IA y Psicometría Avanzada", detallando formalmente la acreditación como representantes exclusivos en la región y el botón destacado "CONOCER SCOUTHEM" apuntando como enlace directo a `/testing#scouthem`.
* **Criterio de Aceptación:** Estructura responsiva, colapsa limpiamente en dispositivos móviles, y respeta la paleta semántica del proyecto (`verde-bosque`, `verde-lima` y `crema-calido`).
* **Tiempo Estimado:** 1.5 horas

### [x] Tarea 2.2: Sección de Servicios de Talento - Primer Bloque (3 Tarjetas)
* **Descripción:** Implementar la primera sección del catálogo de servicios B2B utilizando un grid de 3 columnas en escritorio (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`):
  * **Tarjeta 1:** *Reclutamiento y Selección* (con imagen `01.jpeg` de la galería, título, descripción persuasiva y enlace interactivo "Contactar Aquí" hacia `/contacto`).
  * **Tarjeta 2:** *Evaluación de Competencias* (con imagen `02.jpeg` de la galería, título, descripción persuasiva y enlace interactivo "Contactar Aquí" hacia `/contacto`).
  * **Tarjeta 3:** *Assessment y Psicometría* (con imagen `03.jpeg` de la galería, título, descripción persuasiva y enlace interactivo "Contactar Aquí" hacia `/contacto`).
  * Utilizar la etiqueta nativa `<Image />` de Astro con su respectivo `alt` descriptivo en cada tarjeta.
* **Criterio de Aceptación:** Rejilla responsiva, tarjetas estilizadas con bordes suaves (`rounded-[2.5rem]`) y sombras tenues de compatibilidad. Carga diferida en imágenes.
* **Tiempo Estimado:** 1.5 horas

### [x] Tarea 2.3: Sección de Servicios de Talento - Segundo Bloque (2 Tarjetas)
* **Descripción:** Implementar el segundo bloque de servicios inmediatamente después de la primera fila, usando un grid de 2 columnas en escritorio (`grid-cols-1 md:grid-cols-2 gap-8`) con un ancho máximo estético (`max-w-4xl mx-auto`):
  * **Tarjeta 4:** *Gestión del Desempeño* (con imagen `04.jpeg` de la galería, título, descripción persuasiva y enlace interactivo "Contactar Aquí" hacia `/contacto`).
  * **Tarjeta 5:** *Planes de Desarrollo* (con imagen `05.jpeg` de la galería, título, descripción persuasiva y enlace interactivo "Contactar Aquí" hacia `/contacto`).
  * Utilizar la etiqueta nativa `<Image />` de Astro con su respectivo `alt` descriptivo en cada tarjeta.
* **Criterio de Aceptación:** Rejilla responsiva, perfectamente centrada y alineada con la rejilla superior, con espaciado vertical orgánico consistente.
* **Tiempo Estimado:** 1 hora

---

## Fase 3: Integración de Componentes Reutilizables y QA

### [x] Tarea 3.1: Integración de Prueba Social (CompanyLogos)
* **Descripción:** Insertar secuencialmente el componente `<CompanyLogos />` justo después de la Sección de Servicios de Talento para renderizar el carrusel dinámico de marcas asociadas.
* **Criterio de Aceptación:** El componente carga correctamente e integra de manera fluida sus estilos sin solaparse ni romper la diagramación general.
* **Tiempo Estimado:** 30 minutos

### [x] Tarea 3.2: Auditoría SEO, Accesibilidad y Build Check
* **Descripción:** Realizar validaciones finales de calidad:
  * Verificar que cada imagen use obligatoriamente el componente `<Image />` con atributo `alt` enriquecido.
  * Validar la jerarquía impecable de encabezados (`h1` en Hero, `h2` en secciones principales y `h3` en títulos de tarjetas).
  * Comprobar la responsividad móvil en múltiples resoluciones.
  * Ejecutar la compilación estática de producción del proyecto para verificar la ausencia de errores:
    * `pnpm build` o `pnpm astro check`
* **Criterio de Aceptación:** La página pasa la auditoría semántica y de accesibilidad (RNF3) al 100%, y la compilación estática del proyecto finaliza exitosamente sin advertencias.
* **Tiempo Estimado:** 1 hora
