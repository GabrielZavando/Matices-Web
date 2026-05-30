# Lista de Tareas (Roadmap de Desarrollo): Carrusel Infinito de Logotipos

Este documento detalla los pasos secuenciales e incrementales para transformar el componente `<CompanyLogos />` en un carrusel interactivo continuo de alta performance. Cada tarea está diseñada para durar menos de 2 horas.

---

## Fase 1: Estructura HTML y Duplicación de Nodos (Estructura Base)

- [x] **Tarea 1.1: Duplicación del Set de Datos de Logotipos en el Frontmatter de Astro**
  - **Descripción:** Modificar el bloque de script frontal en `src/components/global/CompanyLogos.astro` para duplicar la lista de logotipos mediante desestructuración de arrays (`[...companyList, ...companyList]`). Esto creará los nodos duplicados necesarios en el HTML generado para la continuidad infinita.
  - **Esfuerzo estimado:** 20 minutos
  - **Criterio de aceptación:** El HTML resultante renderiza dos conjuntos idénticos de logotipos uno tras otro en la estructura del DOM.

- [x] **Tarea 1.2: Reestructuración de Contenedores Semánticos con Clases Base**
  - **Descripción:** Reemplazar el contenedor estático de rejilla (`grid`) por la estructura envolvente de carrusel:
    1. Un contenedor envolvente de visualización (`carousel-viewport`) con desbordamiento oculto (`overflow-hidden`) y tipado de contenedor (`@container`).
    2. Un contenedor de desplazamiento (`carousel-track`) configurado en `flex` con ancho `w-max`.
    3. Contenedores de elementos individuales (`carousel-item`) para albergar cada logotipo y su tarjeta interna.
  - **Esfuerzo estimado:** 40 minutos
  - **Criterio de aceptación:** Estructura DOM jerárquicamente correcta sin estilos rotos en la visualización básica del navegador.

---

## Fase 2: Configuración de Estilos CSS e Infinite Scroll (Estilos y Responsividad)

- [x] **Tarea 2.1: Inyección de Keyframes de Animación y Declaración de Variables CSS**
  - **Descripción:** Agregar la etiqueta `<style>` local en el componente `CompanyLogos.astro` e inyectar el `@keyframes marquee` optimizado. Declarar las variables `--carousel-gap` y `--items-visible` en base a los breakpoints del dispositivo para controlar el espaciado y la cantidad de logotipos visibles.
  - **Esfuerzo estimado:** 45 minutos
  - **Criterio de aceptación:** La animación lineal desplaza el carrusel de derecha a izquierda infinitamente y de forma fluida.

- [x] **Tarea 2.2: Implementación de la Fórmula Matemática de Ancho Responsivo (CQ)**
  - **Descripción:** Aplicar la clase `.carousel-item` con la propiedad `width` calculada dinámicamente mediante `calc((100cqw - var(--carousel-gap) * (var(--items-visible) - 1)) / var(--items-visible))`. Ajustar `--items-visible` mediante `@media` queries:
    *   Móvil (<640px): 2 logos visibles.
    *   Tablet (640px - 1024px): 4 logos visibles.
    *   Escritorio (>1024px): 5 logos visibles.
  - **Esfuerzo estimado:** 45 minutos
  - **Criterio de aceptación:** Exactamente el número estipulado de logos encaja a lo ancho del viewport del carrusel en cada resolución de pantalla, sin espacios muertos ni logos adicionales colados.

---

## Fase 3: Lógica de Interacción Avanzada y Optimización de Performance (Interacción y GPU)

- [x] **Tarea 3.1: Configuración de Pausa y Reanudación Automática en Hover**
  - **Descripción:** Configurar la propiedad `animation-play-state: paused` en el track cuando el usuario hace hover sobre cualquier elemento del carrusel.
  - **Esfuerzo estimado:** 15 minutos
  - **Criterio de aceptación:** El carrusel se detiene de forma instantánea al poner el cursor encima y vuelve a desplazarse automáticamente al retirarlo.

- [x] **Tarea 3.2: Creación del Efecto de Enfoque Cromático e Incremento 3D de Tarjeta**
  - **Descripción:** Configurar la tarjeta interna `.carousel-item-inner` con:
    1. Aceleración por hardware (`will-change: transform`).
    2. Transición suave de tamaño (`transform: scale3d(1,1,1)` a `scale3d(1.08,1.08,1)` en hover).
    3. Transición de escala de grises (`grayscale opacity-70` a `grayscale-0 opacity-100` en hover).
  - **Esfuerzo estimado:** 45 minutos
  - **Criterio de aceptación:** La micro-interacción se ejecuta a 60 FPS estables, coloreando el logotipo seleccionado y escalándolo en tres dimensiones de forma fluida.

- [x] **Tarea 3.3: Auditoría de Compilación de Producción y Verificación de Regresión**
  - **Descripción:** Ejecutar la compilación estática de producción del sitio mediante `pnpm build` para asegurar la compatibilidad absoluta de los nuevos estilos con Tailwind CSS v4 y garantizar que no haya impactos negativos en el tiempo de carga (RNF1) ni errores en las páginas que consumen el componente.
  - **Esfuerzo estimado:** 30 minutos
  - **Criterio de aceptación:** El comando de build se completa exitosamente y el carrusel funciona de manera impecable en producción local.
