# Lista de Tareas: Contenido Central de la Página de Inicio - Matices

Esta lista detalla las tareas secuenciales y granulares para la implementación del contenido de la página de inicio. Cada tarea tiene una duración estimada inferior a 2 horas.

---

## Fase 1: Preparación e Importación de Componentes e Imágenes (1.0h)
- [x] Configurar el archivo `src/pages/index.astro` para envolver el contenido en el layout global `<Layout title="Reclutamiento y Selección Estratégica" />`[cite: 1].
- [x] Importar el componente `<Image />` nativo de Astro para optimizar todas las imágenes de la página[cite: 1, 2].
- [x] Importar los assets de imágenes fijas (`hero-business.jpg`, `collaborative-workshop.jpg`, `collaborative-discussion.jpg`) en el frontmatter[cite: 1].
- [x] Configurar la importación dinámica mediante `import.meta.glob` para las imágenes de la galería en `src/assets/gallery/` y los logotipos comerciales en `src/assets/companys/`.

---

## Fase 2: Construcción de Bloques Secuenciales (HTML5 y Tailwind)

### Tarea 2.1: Hero Section Responsiva y Optimización de LCP (1.5h)
- [x] Estructurar la sección Hero con un fondo degradado radial (`bg-radial from-verde-lima/5 to-transparent`) y márgenes fluidos.
- [x] Añadir el titular principal `<h1>` ("Reclutamiento y Selección Estratégica") utilizando la tipografía `font-heading Playfair Display`[cite: 2, 3].
- [x] Añadir la descripción de soporte y el llamado a la acción principal ("Comenzar Proceso" -> `/contacto`) y secundario ("Conoce Nuestra Metodología" -> `#servicios`)[cite: 2, 3].
- [x] Posicionar la imagen principal del Hero optimizada con `<Image />` y la directiva `loading="eager"` para optimizar el LCP (RNF1)[cite: 1, 2].
- [x] Agregar el Floating Badge de Glassmorphism ("98% Match") con sombra ambiental difusa y backdrop blur.

### Tarea 2.2: Sección "Nuestros Servicios" en Bento Grid (2.0h)
- [x] Crear la sección con ID `#servicios` y el título `<h2>` "Nuestros Servicios" con el subtítulo descriptivo "Soluciones estratégicas para el desarrollo organizacional"[cite: 3].
- [x] Implementar una cuadrícula responsiva (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) para albergar las 6 tarjetas de servicios[cite: 3].
- [x] Diseñar las 6 tarjetas correspondientes con esquinas redondeadas (`rounded-[2rem]`):
  1. **Salud Laboral**: Iconografía SVG, descripción del servicio y enlace.
  2. **Reclutamiento y Selección**: Iconografía SVG, descripción del servicio y enlace.
  3. **Evaluación Psicológica**: Iconografía SVG, descripción del servicio y enlace.
  4. **Capacitación y Formación**: Iconografía SVG, descripción del servicio y enlace.
  5. **Gestión del Talento**: Iconografía SVG, descripción del servicio y enlace.
  6. **Clima Organizacional**: Iconografía SVG, descripción del servicio y enlace.
- [x] Asegurar que las tarjetas colapsen de forma ordenada en dispositivos móviles (`grid-cols-1`).

### Tarea 2.3: Banner de Dolor y Empatía (1.0h)
- [x] Crear la sección de fondo oscuro (`bg-[#2e3131]` / `inverse-surface`) para lograr un fuerte contraste visual de interpelación.
- [x] Agregar la pregunta directa "¿Necesitas apoyo en tu organización?" en tamaño grande y tipografía Playfair[cite: 3].
- [x] Agregar el bloque informativo que describe los procesos de acompañamiento en salud laboral, reclutamiento y desarrollo.
- [x] Agregar el botón de conversión rápida "HABLEMOS AHORA" que redirija a `/contacto` con el estilo de botón principal.

### Tarea 2.4: Áreas de Especialización en Dos Columnas (1.5h)
- [x] Crear la sección con estructura responsiva de dos columnas (texto a la izquierda o arriba en móviles, listado a la derecha).
- [x] Columna Informativa: Explicar el enfoque multidisciplinario de Matices.
- [x] Columna de Especialidades: Desplegar el listado exacto de las 7 áreas con marcadores SVG de tipo hoja cruzada o similar:
  - Reclutamiento y Selección
  - Evaluación Psicológica
  - Capacitación y Formación
  - Gestión del Talento
  - Clima Organizacional
  - Salud Laboral
  - Gestión del Cambio
- [x] Asegurar que en móviles la sección colapse verticalmente con los textos descriptivos en la parte superior.

### Tarea 2.5: Prueba Social / Sección de Clientes (1.5h)
- [x] Diseñar el bloque titulado "Empresas que han confiado en nosotros" con subtítulo de soporte.
- [x] Estructurar una fila o grid interactiva con soporte para logos comerciales e institucionales en escala de grises que se aclaren en hover.
- [x] Usar `<Image />` para renderizar y optimizar los logos correspondientes cargados desde la carpeta `src/assets/companys/` con `loading="lazy"`.

### Tarea 2.6: Galería de Evidencia Estilo Masonry (2.0h)
- [x] Crear la sección titulada "Galeria de imágenes" con un breve texto explicativo.
- [x] Implementar un contenedor denso estilo masonry responsivo (`columns-1 sm:columns-2 lg:columns-3 gap-4`) utilizando Tailwind puro para evitar librerías externas JS.
- [x] Distribuir las imágenes reales de registros (talleres, transmisiones, conferencias, prensa) importadas de la carpeta `src/assets/gallery/` (los 15 archivos JPG/JPEG) dentro del mosaico.
- [x] Configurar obligatoriamente el atributo `alt` descriptivo detallado para cada fotografía para cumplir con A11y y SEO.

---

## Fase 3: Integración y Verificación de Navegación (1.0h)
- [x] Verificar la redirección de los enlaces "SOLICITAR ASESORÍA", "HABLEMOS AHORA", "CONTACTAR AQUÍ" a la página de `/contacto`[cite: 1, 2, 3].
- [x] Validar que la navegación al hacer clic en "Conoce Nuestra Metodología" realice scroll nativo fluido hacia el bloque `#servicios`.
- [x] Realizar una auditoría básica del marcado semántico y accesibilidad del archivo `src/pages/index.astro`.
