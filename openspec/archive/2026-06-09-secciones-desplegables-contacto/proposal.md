# Propuesta Técnica: Secciones Desplegables en Formulario de Contacto

Esta propuesta detalla la reestructuración del formulario de la página de contacto (`src/pages/contacto.astro`) para mejorar la conversión y legibilidad del usuario. Se transformarán las secciones opcionales en componentes desplegables (acordeones) interactivos, manteniendo la semántica y accesibilidad nativas.

## Objetivos del Cambio
1. **Reducir la carga cognitiva**: Ocultar secciones extensas y opcionales por defecto ("Calificación de Requerimientos" y "Detalles de Contacto") para que el formulario se sienta más corto y amigable a primera vista.
2. **Priorizar campos requeridos**: Ubicar el campo "Mensaje" (que es obligatorio) en el flujo principal del formulario, antes de las secciones opcionales desplegables.
3. **Ofrecer micro-interacciones premium**: Añadir un botón/cabecera interactivo con una flecha que se anime (gire 180 grados) al expandir/colapsar las secciones.

---

## Mapeo con Requerimientos No Funcionales (RNF)

### RNF1: Rendimiento y Velocidad (Speed)
* **CSS Puro para Transiciones**: Se implementará el despliegue de altura mediante transiciones de CSS Grid en lugar de animaciones complejas basadas en JavaScript que sobrecarguen el hilo principal de renderizado de la CPU móvil.
* **Sin Dependencias**: No se añadirán librerías externas de acordeones o componentes. Toda la lógica se resolverá con Vanilla JS liviano e inline ya existente en el archivo.

### RNF2: Diseño Responsivo y Mobile-First (Responsive)
* Las cabeceras interactivas y botones desplegables utilizarán grids y flexbox adaptables. El ancho será `w-full` por defecto, ocupando todo el ancho en dispositivos móviles.
* Las áreas cliqueables cumplirán con el tamaño recomendado de al menos 48px de altura en móviles para evitar toques accidentales y mejorar la usabilidad.

### RNF3: Accesibilidad y Estándares SEO (SEO)
* **Marcado Semántico**: Se mantendrán las etiquetas `<fieldset>` e `<input>` dentro del formulario para preservar la semántica del envío de datos.
* **Atributos ARIA**: Los botones interactivos de control de despliegue tendrán `aria-expanded="false"`, `aria-controls="[id-seccion]"`, y un rol de botón (`role="button"`) para que sean perfectamente legibles por lectores de pantalla.
* **Navegación por Teclado**: Los botones de despliegue serán accesibles mediante el teclado (`tabindex="0"` o usando etiquetas `<button>` nativas) y responderán a la tecla `Enter` y `Espacio`.
