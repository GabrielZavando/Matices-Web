# Plan de Trabajo Incremental: Implementación de la Página de Contacto

Este documento contiene la lista detallada y secuencial de tareas granulares para la implementación de la página de contacto y calificación B2B de venta consultiva. Ninguna tarea individual excede las 2 horas de duración estimada.

---

## Fase 1: Estructura Base y Enrutamiento de la Página

### [x] Tarea 1.1: Creación del archivo de página único en Astro
- **Descripción**: Crear el archivo `src/pages/contacto.astro` e importar los componentes globales `Layout`, `Header` y `Footer`.
- **Detalle de Implementación**:
  - Envolver la página en `<Layout title="Contacto" description="...">`.
  - Insertar `<Header activePath="/contacto" />` al inicio del body.
  - Insertar `<Footer />` al final.
  - Colocar un contenedor `<main class="w-full flex-grow bg-crema-calido/30">` vacío en el centro para el contenido del formulario.
- **Entregable**: `src/pages/contacto.astro` con la estructura base integrada y enrutamiento funcional.
- **Estimación**: 45 minutos.

---

## Fase 2: Construcción de la Estructura Semántica y Contenedores

### [x] Tarea 2.1: Diseño del Hero de Presentación Semántica
- **Descripción**: Crear la sección superior de introducción que da la bienvenida a los prospectos e introduce el propósito del formulario (calificación y asesoría consultiva).
- **Detalle de Implementación**:
  - Usar una etiqueta `<section class="w-full pt-16 pb-10 bg-radial from-verde-lima/5 to-transparent">`.
  - Añadir un badge superior `Solicitud de Asesoría` y un título principal `Hablemos de tu Organización` con tipografía de encabezado (`font-heading`).
  - Añadir un texto descriptivo e invitador con tipografía `font-sans`.
- **Entregable**: Sección de cabecera visualmente atractiva en `src/pages/contacto.astro`.
- **Estimación**: 45 minutos.

### [x] Tarea 2.2: Contenedor del Formulario y Honeypot Antispam
- **Descripción**: Estructurar la etiqueta del formulario `<form>` con el Honeypot pasivo para protección contra robots.
- **Detalle de Implementación**:
  - Insertar una tarjeta de formulario con fondo blanco `bg-white`, bordes suaves `rounded-[2.5rem]`, sombra sutil `shadow-xl` y borde suave `border border-verde-bosque/5`.
  - Crear la etiqueta `<form>` con el método `POST`.
  - Incorporar el campo Honeypot: un `<input type="text" name="_honeypot" style="display:none" tabindex="-1" autocomplete="off" />` (u oculto mediante clases de Tailwind como `sr-only` o `hidden` de forma que sea invisible para los humanos pero visible para los robots).
- **Entregable**: Etiqueta `<form>` maquetada y Honeypot invisible integrado correctamente.
- **Estimación**: 45 minutos.

---

## Fase 3: Implementación de Campos de Formulario y Calificación B2B

### [x] Tarea 3.1: Campos de Identificación y Contacto (Texto y Validaciones Nativas)
- **Descripción**: Implementar los campos de entrada de texto esenciales: Nombres, Correo electrónico, Teléfono, Empresa y Cargo.
- **Detalle de Implementación**:
  - Nombres: `<input type="text" required />` con validación nativa de texto.
  - Correo: `<input type="email" required />` con validación de estructura de email nativa.
  - Teléfono / WhatsApp: `<input type="tel" required />` con validación numérica de formato telefónico.
  - Empresa y Cargo: `<input type="text" />` (opcionales).
  - Usar un grid responsivo: 1 columna en móvil (`grid-cols-1`) y 2 columnas en pantallas medianas o grandes (`md:grid-cols-2`).
- **Entregable**: Campos de datos de contacto maquetados, estilizados y validados de forma nativa.
- **Estimación**: 60 minutos.

### [x] Tarea 3.2: Campos de Selección de Servicios y Desafíos (Checkboxes Múltiples)
- **Descripción**: Implementar las selecciones múltiples para "Servicios de interés" y "Desafíos organizacionales".
- **Detalle de Implementación**:
  - Crear un grupo con `<legend>` y `<fieldset>` para mejorar la accesibilidad (A11y).
  - Checkboxes de Servicios de Interés: Salud Laboral, Selección, Capacitación, Evaluación.
  - Checkboxes de Desafíos Organizacionales: Clima laboral, Cubrir vacantes/cargos, Reducir ausentismo, Capacitar equipos, Diagnóstico de riesgos.
  - Diseñar los checkboxes con estilos personalizados usando las variables de Tailwind CSS v4 para que hagan juego con la marca de Matices (bordes circulares o cuadrados suaves, color de acento `text-verde-bosque`).
- **Entregable**: Bloques de selección múltiple responsivos y accesibles.
- **Estimación**: 60 minutos.

### [x] Tarea 3.3: Campos de Tamaño de Organización y Preferencia (Radio Buttons)
- **Descripción**: Implementar los radio buttons para elegir una sola opción en "Tamaño de la organización" y "Preferencia de contacto".
- **Detalle de Implementación**:
  - Tamaño de la organización (colaboradores): 1-10, 11-50, 51-200, Más de 200.
  - Preferencia de contacto: Email, Teléfono, WhatsApp, Reunión virtual.
  - Maquetar con botones de selección redondeados estándar y etiquetas asociadas explícitamente mediante `id` y `for`.
- **Entregable**: Grupos de radio buttons funcionales e integrados al formulario.
- **Estimación**: 45 minutos.

### [x] Tarea 3.4: Botón de Envío y Estados Visuales
- **Descripción**: Implementar el botón CTA de envío final y los textos legales informativos del formulario.
- **Detalle de Implementación**:
  - Añadir un texto de descargo de responsabilidad sutil al final indicando que la información se procesará con estricta confidencialidad para la propuesta B2B.
  - Implementar el botón de envío `<button type="submit">Enviar Solicitud</button>` estilizado con fondo `bg-verde-bosque`, texto blanco `text-white`, fuente sans-serif en negrita y bordes redondeados (`rounded-full`).
  - Agregar efectos hover de Tailwind v4 y micro-animaciones en click (`active:scale-95`).
- **Entregable**: Botón de envío implementado con micro-interacciones visuales.
- **Estimación**: 30 minutos.

---

## Fase 4: Integración del Backend de Captura (Formbold)

### [x] Tarea 4.1: Configuración del Procesamiento POST a Formbold
- **Descripción**: Configurar el endpoint de envío POST en el atributo `action` de la etiqueta del formulario.
- **Detalle de Implementación**:
  - Dejar preparado el atributo `action` como un string vacío o mapeado a una constante de configuración en el frontmatter del archivo Astro, indicando claramente la casilla destino `contacto@maticesconsultora.cl`.
  - Asegurar que todos los campos del formulario tengan el atributo `name` estructurado e inteligible (ej. `nombre`, `email`, `telefono`, `empresa`, `cargo`, `servicios[]`, `desafios[]`, `tamano_organizacion`, `preferencia_contacto`).
- **Entregable**: Configuración completa del envío de datos listo para producción.
- **Estimación**: 30 minutos.

---

## Fase 5: Aseguramiento de Calidad y Validación de Compilación

### [x] Tarea 5.1: Auditoría de Accesibilidad Semántica y Responsive
- **Descripción**: Verificar que el marcado del formulario sea 100% accesible (cumpliendo con RNF3) y que se adapte perfectamente en pantallas móviles sin desbordes (RNF2).
- **Detalle de Implementación**:
  - Asegurar la asociación de todos los `<label for="...">` con sus respectivos `<input id="...">`.
  - Revisar que todos los campos sean legibles y que el tamaño de letra en inputs sea de al menos 16px para evitar que Safari en iOS haga zoom automático no deseado.
- **Entregable**: Reporte visual de conformidad de diseño y accesibilidad en mobile.
- **Estimación**: 40 minutos.

### [x] Tarea 5.2: Pruebas de Compilación y Verificación de Build Estático
- **Descripción**: Ejecutar el comando de compilación estática de Astro para asegurar que la nueva página no contenga errores de sintaxis o de tipado TypeScript y se integre perfectamente.
- **Detalle de Implementación**:
  - Ejecutar `astro check` y `astro build` localmente para confirmar que el compilador compile la página `contacto.astro` sin advertencias ni fallos.
- **Entregable**: Compilación estática exitosa verificada.
- **Estimación**: 30 minutos.
