# Lista de Tareas: Implementación Página de Contacto

## Fase 1: Arquitectura Base y Enrutamiento
- [x] Crear el archivo `src/pages/contacto.astro`.
- [x] Importar el layout base corporativo `src/layouts/Layout.astro` y componentes globales (`<Header />`, `<Footer />` ya provistos en el Layout).
- [x] Estructurar las etiquetas semánticas (`<main>`, `<section>`) para contener la futura lógica.

## Fase 2: Hero Intro y Bloques Decorativos
- [x] Maquetar bloque superior: Etiqueta redondeada ("Venta Consultiva B2B"), título "Hablemos de tu Organización" (con énfasis tipográfico) y párrafo introductorio.
- [x] Posicionar los elementos decorativos absolutos (círculos difuminados de fondo - `matiz-blob`) detrás de la zona donde irá el formulario.
- [x] Construir la tarjeta contenedora principal (`<form>`) con fondo blanco, sombra pronunciada y bordes `rounded-[3rem]`.

## Fase 3: Bloque 1 - Información de Identificación
- [x] Maquetar cabecera del Paso 1 (Círculo numerado "1" y título).
- [x] Construir contenedor grid responsivo (`grid-cols-1` escalando a `md:grid-cols-2`).
- [x] Implementar inputs de texto estándar: Nombres (*), Correo (*), Teléfono (*), Empresa y Cargo.
- [x] Aplicar tokens de estilo para focus y colores de fondo.

## Fase 4: Bloque 2 - Calificación de Requerimientos
- [x] Maquetar cabecera del Paso 2.
- [x] Construir grupo "Servicios de Interés" con diseño de tarjetas individuales de Checkboxes.
- [x] Construir grupo "Desafíos Organizacionales" con tarjetas individuales de Checkboxes.
- [x] Asegurar responsividad (pasando de columna única a grillas en pantallas mayores).

## Fase 5: Bloque 3 - Detalles de Contacto
- [x] Maquetar cabecera del Paso 3.
- [x] Construir selector interactivo "Tamaño de la Organización" usando Radio buttons ocultos pero visualmente representados mediante bloques contenedores.
- [x] Construir selector interactivo "Preferencia de Contacto" de igual manera.
- [x] Añadir área `<textarea>` libre para el Mensaje (Opcional).

## Fase 6: Cierre, Envíos y JS
- [x] Añadir texto centrado inferior (confidencialidad de datos) y enlace hacia el correo directo.
- [x] Construir botón de envío "Enviar Solicitud" adaptativo (ancho completo en móvil, fijo en desktop).
- [x] Implementar input oculto para mitigación de Spam (Honeypot pasivo).
- [x] Inyectar `<script>` en Astro para vincular eventos de 'click'/'change' a los radios y alternar clases visuales (ej. `.ring-primary`, `bg-primary/5`).
