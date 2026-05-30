# Plan de Tareas: Sección de Contenido Central para Formación Continua

Este plan de desarrollo detalla la secuencia de tareas incrementales y granulares para la implementación del contenido central en `src/pages/formacion.astro`, garantizando el cumplimiento estricto de las directrices arquitectónicas, de accesibilidad y del sistema de diseño.

## Fase 1: Preparativos, Importaciones y Estructura Base

### [x] Tarea 1.1: Importación de Componentes y Recursos
* **Descripción:** Importar los componentes reutilizables necesarios en el bloque frontmatter (YAML) de `src/pages/formacion.astro`:
  * `CompanyLogos` desde `../components/global/CompanyLogos.astro`
  * `EvidenceGallery` desde `../components/ui/EvidenceGallery.astro`
* **Criterio de Aceptación:** El frontmatter del archivo no genera advertencias de compilación y los componentes se importan correctamente.
* **Tiempo Estimado:** 30 minutos

### [x] Tarea 1.2: Limpieza e Inicialización de la Estructura Principal
* **Descripción:** Estructurar el cuerpo principal del archivo `src/pages/formacion.astro` envolviendo el contenido entre `<Header activePath="/formacion" />` and `<Footer />` dentro de un `<main class="w-full">` semántico.
* **Criterio de Aceptación:** La estructura base compila perfectamente sin romper el layout y los componentes globales de cabecera y pie de página cargan correctamente.
* **Tiempo Estimado:** 30 minutos

---

## Fase 2: Implementación de Bloques de Contenido

### [x] Tarea 2.1: Sección Superior de Formación
* **Descripción:** Implementar el primer bloque informativo debajo del Hero:
  * **Cabecera informativa:** Título "Programas de Formación Continua" (`h2` con clase `font-heading`) y bajada informativa en `p` de Plus Jakarta Sans destacando a docentes con trayectoria sobresaliente.
  * **Subbloque Aula Virtual:** Caja destacada responsiva (flex/grid que colapsa en móvil) titulada "Conoce nuestro calendario y aula virtual", con la indicación de exclusividad para Chile y Latinoamérica y el botón destacado "INGRESAR A AULA VIRTUAL" apuntando al LMS externo.
* **Criterio de Aceptación:** Estructura responsiva, colapsa limpiamente en dispositivos móviles, y respeta la paleta semántica (`verde-bosque`, `verde-lima` y `crema-calido`).
* **Tiempo Estimado:** 1.5 horas

### [x] Tarea 2.2: Banner de Dolor / Empatía (Intermedio)
* **Descripción:** Implementar el bloque de fondo oscuro intermedio:
  * Contenedor de ancho completo con color `#2e3131` o `verde-bosque` (según `global.css`) y ambientación de stained glass (efectos blur de luz radiales de fondo).
  * Copy enfocado a incentivar la consultoría en formación y capacitación organizacional B2B.
  * Botón CTA destacado "HABLEMOS AHORA" configurado como enlace ancla hacia `/contacto`.
* **Criterio de Aceptación:** Contraste visual fuerte con alta legibilidad del texto en crema-calido/blanco y un botón de acción perfectamente integrado.
* **Tiempo Estimado:** 1 hora

### [x] Tarea 2.3: Sección Intermedia de Alianzas y Cursos
* **Descripción:** Implementar la estructura complementaria dividida en dos subbloques limpios:
  * Tarjeta 1: **Alianzas y Representación Internacional** (destacando la red de soporte exclusivo).
  * Tarjeta 2: **Cursos y Programas Personalizados** (ofreciendo el diseño a medida de programas de capacitación para empresas).
  * Integrar al pie de la sección el botón destacado "SOLICITAR PROPUESTA" que enlace al formulario en `/contacto`.
* **Criterio de Aceptación:** Rejilla responsiva de dos columnas en escritorio que colapsa verticalmente en móvil, con espaciado orgánico consistente.
* **Tiempo Estimado:** 1.5 horas

---

## Fase 3: Integración de Componentes Reutilizables y QA

### [x] Tarea 3.1: Integración de CompanyLogos y EvidenceGallery
* **Descripción:** Insertar secuencialmente los componentes en el cuerpo principal de la página:
  * Integrar `<CompanyLogos />` justo después de la Sección de Alianzas y Cursos.
  * Integrar `<EvidenceGallery />` dentro de una sección semántica estructurada, con encabezado descriptivo "Actividad & Ejecución Práctica".
* **Criterio de Aceptación:** Ambos componentes cargan correctamente e integran de manera fluida sus estilos sin solaparse ni romper la diagramación.
* **Tiempo Estimado:** 30 minutos

### [x] Tarea 3.2: Auditoría SEO, Accesibilidad y Build Check
* **Descripción:** Realizar validaciones finales:
  * Verificar que cada imagen nativa o importada use el componente `<Image />` con atributo `alt` obligatorio y descriptivo.
  * Validar que la jerarquía de encabezados (`h1`, `h2`, `h3`) sea impecable.
  * Comprobar la responsividad móvil en múltiples resoluciones.
  * Ejecutar el comando de producción para validar la integridad del compilador:
    * `pnpm build` o `pnpm astro check`
* **Criterio de Aceptación:** La página pasa la validación de accesibilidad y semántica, y el proyecto compila estáticamente (build) al 100% sin errores.
* **Tiempo Estimado:** 1 hora
