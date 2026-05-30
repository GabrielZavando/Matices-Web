# Propuesta de Cambio (Proposal) - Implementación de la Sección de Psicología

Este documento describe la propuesta técnica para estructurar e implementar la sección de contenido central de la página "Psicología" (Salud Mental y Ocupacional) en `src/pages/psicologia.astro` dentro del rediseño B2B de Matices Consultoría Integral.

---

## 1. Justificación de la Arquitectura
Para mantener la consistencia estética y de rendimiento del sitio web estático (SSG), la solución propuesta estructurará la página en bloques secuenciales de contenido semántico construidos exclusivamente en Astro y Tailwind CSS v4, sin agregar JavaScript en el cliente para el renderizado. Se preserva el enfoque SSG 100% estático que elimina cualquier sobrecarga del lado del cliente.

### Componentes y Bloques Clave:
1. **Hero Section (Existente):** Mantiene la introducción al servicio con la llamada inicial a la acción.
2. **Sección de Salud Mental y Ocupacional:** Un bloque semántico `<section>` con un diseño de 3 columnas de viñetas que distribuyen el catálogo clínico y de consulta. Cuenta con un llamado destacado a la telemedicina en la base.
3. **Banner de Dolor / Empatía (Fondo Oscuro):** Un bloque persuasivo intermedio diseñado en base a la psicología del consumidor B2B que interpela el bienestar empresarial y estimula el contacto inmediato.
4. **Sección de Áreas de Especialización B2B (Estructura a Dos Columnas):** Un panel que equilibra visualmente la descripción de las 7 áreas clave en una columna de texto/viñetas, y una ilustración corporativa real en la otra utilizando optimización nativa de imágenes.
5. **Prueba Social (`<CompanyLogos />`):** Inserción del módulo reutilizable global para consolidar la autoridad de Matices con clientes del sector B2B.

---

## 2. Mapeo a los Requisitos No Funcionales (RNF)

### RNF1: Rendimiento Extremo de Carga (Speed)
* **Astro Image Optimization:** Prohibición absoluta de la etiqueta HTML nativa `<img />`. Todas las imágenes, incluyendo el collage corporativo y las ilustraciones de las especializaciones, serán procesadas mediante el componente nativo `<Image />` de `astro:assets`. Las imágenes se transformarán automáticamente en formatos de última generación (`.webp` o `.avif`) con dimensiones controladas a nivel de build y carga diferida (`loading="lazy"` para secciones no iniciales).
* **Cero JavaScript de Frameworks:** Al no utilizar React, Vue ni librerías pesadas de animación, el TBT (Total Blocking Time) y la carga de bundles JS en la página de Psicología se mantendrán en 0ms, lo que garantiza una puntuación de 100/100 en Google Lighthouse para rendimiento móvil.

### RNF2: Adaptabilidad y Enfoque Mobile-First (Responsive)
* **Estructura Colapsable Limpia:** Las grillas de 3 columnas en la sección de Salud Mental y las secciones a 2 columnas de Especialidades se diseñarán utilizando la aproximación Mobile-First de Tailwind CSS. Las clases base definirán un comportamiento vertical monocolumna (`grid-cols-1` o `flex-col`) con espaciados cómodos para la interacción táctil en smartphones. Las escalas responsivas (`md:grid-cols-2`, `lg:grid-cols-3` y `lg:grid-cols-12`) se aplicarán progresivamente solo para resoluciones mayores.
* **Priorización de Textos y CTAs:** La disposición estructural garantizará que el texto explicativo y los botones de conversión de alto valor comercial ("AGENDAR HORA ONLINE", "HABLEMOS AHORA") se visualicen primero al colapsar en pantallas móviles, reduciendo la fricción del usuario.

### RNF3: Semántica HTML5 y SEO Técnico (SEO & Accesibilidad)
* **Estructura Jerárquica Limpia:** Se implementará un marcado HTML5 estrictamente semántico usando `<main>`, `<section>`, y `<article>` para la estructuración de servicios individuales.
* **Jerarquía de Encabezados (Headings):** Mantiene una única etiqueta `<h1>` principal en el Hero. Las subsecciones principales utilizarán etiquetas `<h2>` semánticas y los títulos de servicios clínicos o especialidades emplearán etiquetas `<h3>`, garantizando que los motores de búsqueda indexen la página con excelente legibilidad jerárquica.
* **Atributos de Accesibilidad (A11y):** Cada imagen optimizada dispondrá de un atributo `alt` descriptivo detallado, asegurando la compatibilidad absoluta con lectores de pantalla y mejorando el posicionamiento de imágenes en buscadores.
* **SEO Metadata:** Configuración explícita del título semántico y la meta-descripción orientada a la búsqueda B2B de salud mental ocupacional a través del layout global.
