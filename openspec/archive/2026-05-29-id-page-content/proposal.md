# Propuesta Técnica: Sección Central de la Página de I+D

Este documento define la arquitectura y justificación técnica para implementar el contenido central de la página de **I+D (Investigación e Innovación Aplicada)** en `src/pages/id.astro`. La propuesta se alinea de manera estricta con las especificaciones del cliente y los estándares del proyecto.

## 1. Justificación Arquitectónica
La página de I+D requiere una estructura fluida y de alto rendimiento que exponga la base científica de Matices. Para lograrlo sin sobrecargar el navegador del cliente, se implementará una solución 100% estática aprovechando el motor de renderizado de **Astro (SSG)**, prescindiendo por completo de frameworks JS pesados (React/Vue) en el cliente.

### Mapeo a Requisitos No Funcionales (RNFs)

| Requisito No Funcional | Estrategia de Implementación | Impacto |
| :--- | :--- | :--- |
| **RNF1: Rendimiento de Carga (Speed)** | • Integración exclusiva del componente `<Image />` de `astro:assets` para procesar, comprimir y convertir las imágenes de stock y marcas institucionales a formatos optimizados (`.webp`/`.avif`).<br>• Incorporación del atributo `loading="lazy"` nativo en el iframe de video de YouTube/Vimeo para posponer su carga hasta que el usuario haga scroll.<br>• Cero dependencias de librerías de animación externas.<br>• Optimización de la carga inicial de scripts interactivos de JS. | Carga de página instantánea con métricas de Web Vitals (LCP, FID, CLS) en verde. |
| **RNF2: Adaptabilidad y Consistencia (Responsive)** | • Uso estricto de Tailwind CSS con un enfoque *Mobile-First* base.<br>• Diseños de rejilla (`grid-cols-1 md:grid-cols-12`) o contenedores flexibles que colapsan limpiamente a una columna vertical en pantallas de smartphones.<br>• En dispositivos móviles, la información textual y los llamados a la acción (CTAs) se posicionarán de forma prioritaria en la parte superior del flujo visual. | Experiencia de navegación natural y fluida en cualquier resolución de pantalla. |
| **RNF3: Accesibilidad y SEO Técnico (SEO)** | • Estructuración del árbol DOM mediante etiquetas semánticas nativas de HTML5 (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).<br>• Inclusión obligatoria y descriptiva del atributo `alt` en cada recurso gráfico.<br>• Jerarquía tipográfica consistente y un único elemento `<h1>` en la página para optimizar el rastreo de motores de búsqueda. | Cumplimiento del estándar WCAG 2.1 y mejora del posicionamiento orgánico. |

---

## 2. Definición del Flujo y Bloques de Contenido

El cuerpo principal de `src/pages/id.astro` se estructurará de forma secuencial en los siguientes bloques, situados inmediatamente después del componente `<Header activePath="/id" />` y antes de `<Footer />`:

1. **Sección Central (Investigación e Innovación Aplicada):**
   Un contenedor `<section>` que expone la trayectoria internacional en psicología aplicada de la consultora, usando una composición visual limpia basada en tipografía de alto contraste (`font-headline-lg` en Playfair Display).

2. **Proyecto FONDEF (Validación Científica):**
   Un bloque destacado (`<section>`) con una tarjeta o fondo contrastante que detalla el **"Proyecto FONDEF IDEA I+D 2025–2026"**, enfatizando la creación de software con Inteligencia Artificial para la gestión del talento organizacional.

3. **Composición de Cierre (Demostración de Scouthem):**
   Una estructura de rejilla asimétrica de dos columnas en ordenadores:
   - **Columna Izquierda:** Contenedor responsivo optimizado para un reproductor de video (`iframe` con `loading="lazy"`) donde se mostrarán demostraciones del software.
   - **Columna Derecha:** Copia comercial y descriptiva del software de gestión del talento **Scouthem**, junto con un botón de acción directa (CTA) `"CONOCER SCOUTHEM"` que redirige como enlace de ancla al formulario de contacto.

4. **Prueba Social / Clientes (Componente Reutilizable):**
   Abstracción de la sección de marcas asociadas preexistente en la página de inicio hacia un nuevo componente global y autocontenido en `src/components/global/CompanyLogos.astro`. Este componente ejecutará su propia importación dinámica optimizada mediante `import.meta.glob` de Astro y consumirá el componente `<Image />` nativo. Será importado e integrado tanto en `src/pages/index.astro` como en `src/pages/id.astro` (y en futuras páginas), garantizando mantenibilidad absoluta del 100%.

5. **Galería de Evidencias / Actividad:**
   Mosaico visual compacto (estilo *masonry* adaptativo) que alberga fotos de talleres de supervisión, proyectos presenciales y prensa, optimizado con tamaños definidos y radios asimétricos que respetan la identidad orgánica del diseño.
