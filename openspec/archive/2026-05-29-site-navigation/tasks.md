# Tareas: Implementación de la Navegación y Scroll Top

Esta es la lista de tareas ordenadas secuencialmente bajo el flujo de desarrollo
especificado (Componentes Globales -> Enrutamiento -> Páginas). Cada tarea está
diseñada para realizarse en menos de 2 horas.

## 1. Componentes Globales

- [x] **Creación del Botón Flotante Scroll Top** (1.5h)
  - [x] Crear el archivo `src/components/global/ScrollToTop.astro`.
  - [x] Estructurar el marcado HTML5 semántico utilizando un botón (`<button>`).
  - [x] Estilizar el botón con Tailwind v4.x (`bg-verde-bosque`, `text-crema-calido`, `rounded-full`, `shadow-lg`, `hover:bg-verde-lima`, `hover:scale-110`).
  - [x] Añadir un icono de flecha hacia arriba (SVG ligero integrado).
  - [x] Implementar la lógica Vanilla JS en una etiqueta `<script>` para controlar la visibilidad del botón en base al evento scroll de la página y el desplazamiento de 300px.
  - [x] Añadir la lógica de clic para desplazar suavemente la ventana al tope superior (`window.scrollTo`).

- [x] **Integración en el Layout Principal** (0.5h)
  - [x] Modificar `src/layouts/Layout.astro`.
  - [x] Importar el nuevo componente `ScrollToTop`.
  - [x] Colocar el componente `<ScrollToTop />` justo antes del cierre del body (`</body>`) para asegurar su disponibilidad global.

## 2. Enrutamiento y Navegación (Routing)

- [x] **Optimización del Logo Corporativo en el Header** (1.0h)
  - [x] Modificar `src/components/global/Header.astro`.
  - [x] Importar el componente `<Image />` desde `astro:assets`.
  - [x] Importar la imagen corporativa `src/assets/logo.webp`.
  - [x] Reemplazar la etiqueta SVG del logo por el componente `<Image />` configurando los atributos necesarios (`alt`, `class`).

- [x] **Estructuración de Enlaces en el Menú** (0.5h)
  - [x] Modificar el arreglo `navItems` en `src/components/global/Header.astro` para reordenar y configurar las rutas correspondientes:
    - [x] Inicio -> `/`
    - [x] Nosotros -> `/nosotros`
    - [x] Testing -> `/testing`
    - [x] I+D -> `/id`
    - [x] Formación -> `/formacion`
    - [x] Talento -> `/talento`
    - [x] Psicología -> `/psicologia`
  - [x] Asegurar que el enlace envolvente del logo y el texto redirija correctamente a la home (`/`).

## 3. Creación de Páginas (Pages)

- [x] **Ajuste de Ruta Activa en Inicio** (0.5h)
  - [x] Modificar `src/pages/index.astro`.
  - [x] Cambiar la propiedad del componente Header a `activePath="/"`.

- [x] **Creación de la Página de Testing** (1.0h)
  - [x] Crear el archivo `src/pages/testing.astro`.
  - [x] Importar e implementar `Layout`, `Header` y `Footer`.
  - [x] Añadir sección inicial con el diseño editorial de la marca (tipografía de Playfair Display y Plus Jakarta Sans) para presentar los servicios de Testing.

- [x] **Creación de la Página de I+D** (1.0h)
  - [x] Crear el archivo `src/pages/id.astro`.
  - [x] Importar e implementar `Layout`, `Header` y `Footer`.
  - [x] Añadir la estructura de sección inicial para I+D (Investigación y Desarrollo).

- [x] **Creación de la Página de Formación** (1.0h)
  - [x] Crear el archivo `src/pages/formacion.astro`.
  - [x] Importar e implementar `Layout`, `Header` y `Footer`.
  - [x] Añadir la estructura de sección inicial para Formación.

- [x] **Creación de la Página de Talento** (1.0h)
  - [x] Crear el archivo `src/pages/talento.astro`.
  - [x] Importar e implementar `Layout`, `Header` y `Footer`.
  - [x] Añadir la estructura de sección inicial para Talento.

- [x] **Creación de la Página de Psicología** (1.0h)
  - [x] Crear el archivo `src/pages/psicologia.astro`.
  - [x] Importar e implementar `Layout`, `Header` y `Footer`.
  - [x] Añadir la estructura de sección inicial para Psicología.
