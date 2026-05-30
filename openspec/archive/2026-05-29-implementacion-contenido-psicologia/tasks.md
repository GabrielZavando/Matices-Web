# Lista de Tareas (Tasks) - Implementación de la Sección de Psicología

Este documento contiene la lista detallada y secuencial de tareas de desarrollo para completar la implementación de la página de "Psicología" en `src/pages/psicologia.astro`. Cada tarea está planificada para completarse en menos de 2 horas.

---

## Fase 1: Preparación de Assets y Estructura
* [x] **Tarea 1.1: Identificar e importar assets y componentes en `psicologia.astro`**
  * *Duración estimada:* 30 min.
  * *Descripción:* Importar la imagen corporativa requerida para la sección de especialidades (como `src/assets/collaborative-workshop.png`) y el componente global `<CompanyLogos />` en el frontmatter del archivo `src/pages/psicologia.astro`.
  * *Criterio de Aceptación:* El frontmatter cuenta con los imports válidos sin errores de TypeScript.

---

## Fase 2: Implementación de Bloques de Contenido Secuenciales
* [x] **Tarea 2.1: Crear la Sección Superior de Salud Mental & Ocupacional**
  * *Duración estimada:* 1h 30m.
  * *Descripción:* Implementar una sección semántica `<section id="salud-mental" ...>` inmediatamente después del Hero. Estructurar la cabecera con el título principal ("Salud Mental y Ocupacional") y la bajada correspondiente. Crear un grid responsivo de 3 columnas para distribuir los servicios clínicos:
    * Columna 1: *Psicoterapia y Atención Clínica*
    * Columna 2: *Evaluaciones y Diagnóstico* (evaluaciones neuropsicológicas y test proyectivos)
    * Columna 3: *Formación y Desarrollo Profesional* (supervisión y coaching)
  * *Criterio de Aceptación:* Grid responsivo que colapsa a una columna en móviles, con viñetas estéticas alineadas al sistema de diseño.

* [x] **Tarea 2.2: Implementar el Llamado a Telemedicina de Salud Mental**
  * *Duración estimada:* 45 min.
  * *Descripción:* En la base de la sección de Salud Mental, estructurar un bloque destacado para "Atención Médica y Telemedicina" que incorpore un botón destacado con la acción "AGENDAR HORA ONLINE". Este botón debe apuntar al enlace externo de telemedicina.
  * *Criterio de Aceptación:* El botón es visible, resalta según el sistema de diseño y abre la plataforma externa correspondiente.

* [x] **Tarea 2.3: Implementar el Banner de Dolor / Empatía Intermedio**
  * *Duración estimada:* 1h.
  * *Descripción:* Crear una sección semántica con fondo oscuro (`bg-[#2e3131]`) y efectos luminosos de fondo (`blur-3xl` sobre círculos de baja opacidad). Presentar la pregunta interpelativa sobre bienestar y productividad organizacional, junto al botón comercial "HABLEMOS AHORA" que redirige al formulario de contacto B2B (ancla o link a `/contacto`).
  * *Criterio de Aceptación:* El banner tiene el contraste estético de fondo oscuro y texto claro, con botones funcionales y responsive móvil perfecto.

* [x] **Tarea 2.4: Construir la Sección de Áreas de Especialización B2B**
  * *Duración estimada:* 1h 30m.
  * *Descripción:* Diseñar una sección semántica `<section id="especialidades" ...>` estructurada en una grilla responsiva a 2 columnas. 
    * Columna Informativa: Presentar la descripción y la lista exacta de las 7 áreas clave (*Reclutamiento y Selección*, *Evaluación Psicológica*, *Capacitación y Formación*, *Gestión del Talento*, *Clima Organizacional*, *Salud Laboral* y *Gestión del Cambio*) junto al botón comercial "HABLEMOS AHORA".
    * Columna de Imagen: Integrar la imagen corporativa `collaborative-workshop.png` de manera óptima utilizando el componente `<Image />` nativo de Astro con un atributo `alt` descriptivo.
  * *Criterio de Aceptación:* Maquetación fluida a 2 columnas en desktop que colapsa limpiamente a una columna en móviles, mostrando el texto en la parte superior.

---

## Fase 3: Integración Global y Calidad
* [x] **Tarea 3.1: Integrar Prueba Social y Cerrar Cuerpo de Contenido**
  * *Duración estimada:* 45 min.
  * *Descripción:* Insertar el componente `<CompanyLogos />` al final del cuerpo principal (antes del componente `<Footer />`) para mantener la coherencia de prueba social. Asegurar que todo el contenido central esté correctamente envuelto en el layout base y dentro de la etiqueta `<main class="w-full">`.
  * *Criterio de Aceptación:* Los componentes globales renderizan perfectamente en el orden especificado.

* [x] **Tarea 3.2: Ejecutar Auditoría Semántica, Accesibilidad y Compilación**
  * *Duración estimada:* 1h.
  * *Descripción:* Realizar una verificación exhaustiva para garantizar que no existan etiquetas `img` nativas (todo debe usar `<Image />`), que se cumpla la semántica HTML5 estricta, que no haya estilos inline prohibidos ni colores hexadecimales hardcodeados fuera de los tokens, y ejecutar una compilación local con `npm run build` (o equivalente de pnpm) para validar que no haya errores de build estático.
  * *Criterio de Aceptación:* Build exitosa sin advertencias ni errores en la compilación estática de Astro.
