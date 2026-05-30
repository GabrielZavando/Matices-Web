# Propuesta Técnica: Página "Nosotros" - Matices

Esta propuesta técnica detalla el diseño de arquitectura e implementación para la sección institucional **"Nosotros"** en el rediseño B2B de Matices Consultoría Integral, operando bajo un modelo estrictamente estático (SSG) de Astro.

## 1. Justificación de Arquitectura

La página operará en modo estático pre-renderizado (SSG), garantizando una disponibilidad óptima, compatibilidad total con servidores compartidos ($0 USD TCO) y un tiempo de respuesta ultra-rápido. Se estructurará mediante componentes nativos de Astro organizados en secciones semánticas aisladas dentro de `src/pages/nosotros.astro` para mantener la mantenibilidad.

---

## 2. Alineamiento con Requerimientos No Funcionales (RNF)

### ⚡ RNF1 (Speed & Performance)
* **Optimización de Assets:** Prohibido el uso de la etiqueta estándar `<img>`. Se importarán imágenes en formato crudo en la zona de frontmatter y se procesarán utilizando la etiqueta nativa `<Image />` de `astro:assets`.
* **Formatos de Entrega:** Astro convertirá automáticamente las imágenes a formatos WebP o AVIF con dimensiones restringidas a sus cajas de contenido en móviles y escritorio, reduciendo el peso de la página y garantizando un **LCP (Largest Contentful Paint) < 1.2s** y un **TTFB < 2.0s**.
* **Zero JS Bloqueante:** Se elimina la carga de scripts externos o librerías de animación. Las transiciones e interacciones de hover se resolverán mediante animaciones aceleradas por hardware en CSS puro.

### 📱 RNF2 (Mobile-First Layouts)
* **Diseño Responsivo Integrado:** Las composiciones asimétricas (por ejemplo, textos narrativos en conjunción con imágenes con máscaras orgánicas) se diseñarán con un flujo vertical predeterminado para dispositivos móviles (`flex-col`, `grid-cols-1`).
* **Priorización de Contenido:** En móviles, la información textual crítica, titulares y botones de llamada a la acción (CTA) se posicionarán arriba, relegando las imágenes decorativas a la parte inferior del flujo del contenedor.
* **Escalabilidad:** Se aplicarán modificadores responsivos de Tailwind (`md:`, `lg:`) única y exclusivamente para desplegar alineaciones en paralelo (side-by-side) al alcanzar pantallas de escritorio.

### 🔍 RNF3 (Semantic SEO & Accessibility)
* **Estructura Semántica de HTML5:** El DOM tree evitará el uso excesivo de `<div>` vacíos, maquetando las secciones con `<main>`, `<section>` y `<article>`.
* **Jerarquía de Encabezados:** Habrá un único título `<h1>` en el Hero Section. Las secciones secundarias utilizarán `<h2>` y `<h3>` en orden jerárquico estricto.
* **Accesibilidad Web (A11y):** Inclusión obligatoria de atributos `alt` detallados y contextualizados en idioma español para describir la escena y el propósito de cada imagen.

---

## 3. Flujo de Datos y Navegación
* **Navegación Contextual:**
  * **CTA Hero ("Solicitar Asesoría"):** Redirección fluida al formulario B2B ubicado en la landing page (`/contacto` o `/#contacto`).
  * **CTA Secundario ("Conoce Nuestra Metodología"):** Implementa scroll suave directo hacia la sección de pilares metodológicos mediante un ID de anclaje (`#metodologia`) en la misma página.
  * **CTA Bloque de Cierre ("Agendar Consultoría"):** Redirección al canal de conversión principal.
