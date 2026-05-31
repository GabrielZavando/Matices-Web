# Lista de Tareas: Implementación de Mobile Drawer en Header

Este documento define la secuencia paso a paso para la reestructuración y desarrollo de la interactividad del menú lateral móvil en `src/components/global/Header.astro`.

## Fase 1: Componentes Globales (`Header.astro`)

- [x] **Tarea 1.1: Reestructuración Estructural de la Cabecera en Astro (1.5 horas)**
  - [x] Eliminar el truco CSS del `input[type="checkbox"]` (`#menu-toggle`) y sus selectores asociados en `<style>`.
  - [x] Adaptar el botón de hamburguesa (`<button>` con id `#menu-toggle-btn`) agregando accesibilidad básica (`aria-label="Abrir menú"`, `aria-expanded="false"`).
  - [x] Agregar el contenedor translúcido del overlay de fondo (`#drawer-overlay`) con las clases `fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden transition-opacity duration-300 md:hidden` al mismo nivel jerárquico.
  - [x] Reestructurar el contenedor principal del menú móvil (`#drawer-panel`) con clases Tailwind v4:
    - *Móvil:* `fixed top-0 right-0 h-full w-[80vw] max-w-[400px] z-50 bg-crema-calido translate-x-full transition-transform duration-300 ease-in-out shadow-2xl flex flex-col px-6 py-6 border-l border-verde-bosque/10`
    - *Escritorio (Desktop override):* `md:static md:translate-x-0 md:h-auto md:w-auto md:max-w-none md:bg-transparent md:shadow-none md:flex-row md:px-0 md:py-0 md:border-none`
  - [x] Implementar un botón de cierre dedicado en la esquina superior derecha interna del panel móvil (`<button>` con id `#drawer-close-btn` y clases `absolute top-4 right-4 md:hidden text-verde-bosque hover:opacity-80`) que contenga un icono SVG con forma de cruz (`X`).
  - [x] Alinear verticalmente los enlaces de navegación y el botón de "Solicitar Asesoría" (CTA) con espaciado móvil táctil adecuado (`w-full text-left py-3 border-b border-verde-bosque/5 md:border-none md:py-0`).

- [x] **Tarea 1.2: Lógica de Control e Interactividad en Vanilla JS (1.5 horas)**
  - [x] Agregar la etiqueta `<script>` aislada al final del componente Astro.
  - [x] Seleccionar del DOM los elementos clave: `#menu-toggle-btn`, `#drawer-close-btn`, `#drawer-panel`, `#drawer-overlay`, y el elemento `document.body`.
  - [x] Escribir funciones limpias para el control de estados:
    - `openMenu()`: remueve `translate-x-full` y `hidden` (del overlay), aplica `translate-x-0`, añade `overflow-hidden` al `body` y actualiza `aria-expanded` a `"true"`.
    - `closeMenu()`: añade `translate-x-full` y `hidden` (al overlay), remueve `translate-x-0`, quita `overflow-hidden` al `body` y actualiza `aria-expanded` a `"false"`.
  - [x] Asociar escuchas de eventos `click` a:
    - Botón de hamburguesa (`#menu-toggle-btn`) -> ejecuta `openMenu()`.
    - Botón de cierre (`#drawer-close-btn`) -> ejecuta `closeMenu()`.
    - Overlay de fondo (`#drawer-overlay`) -> ejecuta `closeMenu()` para cerrar el drawer si el usuario presiona en el 20% de espacio vacío a la izquierda.
  - [x] Añadir una salvaguarda para el redimensionamiento de pantalla (evento `resize` en `window`): si el ancho de la pantalla supera los 768px (`window.innerWidth >= 768`), invocar automáticamente `closeMenu()` para limpiar la regla del `body` y evitar que el scroll quede bloqueado en resoluciones de escritorio.

## Fase 2: Pruebas y Aseguramiento de Calidad (1.0 hora)

- [x] **Tarea 2.1: Verificación de Regresiones y Construcción Estática**
  - [x] Levantar el entorno de desarrollo local con `npm run dev` y validar el comportamiento interactivo en herramientas de desarrollo de Chrome/Firefox simulando dispositivos móviles (iPhone SE, Pixel 7, iPad).
  - [x] Verificar que no ocurran saltos de maquetación en el contenido base de fondo mientras se desliza el Drawer.
  - [x] Comprobar que en pantallas de escritorio (>768px) el Navbar mantenga su visualización tradicional horizontal sin rastro del Drawer.
  - [x] Ejecutar el comando de construcción estática (`pnpm run build`) para verificar que el proyecto compile al 100% libre de errores.
