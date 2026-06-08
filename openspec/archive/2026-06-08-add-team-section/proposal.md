# Propuesta de Cambio: Sección "Nuestro Equipo" en Página de Inicio

Esta propuesta detalla la incorporación de la sección "Nuestro Equipo" en la página de inicio (`src/pages/index.astro`), ubicada inmediatamente debajo de la sección "Áreas de Especialización".

## Justificación Arquitectónica

La sección de equipo es fundamental para aumentar la confianza y la credibilidad B2B de Matices Consultoría Integral. Desde la perspectiva técnica, se integra de manera nativa en el flujo estático de Astro (SSG), lo que garantiza que no haya sobrecarga de JavaScript en el cliente, manteniendo el rendimiento óptimo del sitio.

## Mapeo a Requisitos No Funcionales (RNF)

### RNF1: Rendimiento y Velocidad (Speed)
* **Optimización de Imágenes**: Queda estrictamente prohibido el uso de la etiqueta HTML `<img>` estándar. En su lugar, se importarán los retratos de los miembros del equipo y se renderizarán usando el componente nativo `<Image />` de `astro:assets` para generar automáticamente formatos modernos (WebP/AVIF) y redimensionamiento responsivo.
* **Carga Diferida**: Se utilizará el atributo `loading="lazy"` para todas las imágenes de la sección, evitando que bloqueen el renderizado inicial (First Contentful Paint) de la mitad superior de la página.

### RNF2: Diseño Responsivo y Adaptabilidad (Responsive)
* **Enfoque Mobile-First**: La grilla se definirá por defecto en una sola columna para pantallas móviles (`grid grid-cols-1`), escalando a dos columnas en tabletas (`md:grid-cols-2`) y a cuatro columnas en pantallas de escritorio (`lg:grid-cols-4`).
* **Relación de Aspecto Fija**: La imagen de cada integrante se mantendrá en una proporción exacta de 4:3 (`aspect-[4/3]`) con la propiedad `object-cover` para evitar distorsiones de imagen en cualquier tamaño de pantalla.

### RNF3: Accesibilidad Semántica y SEO (SEO)
* **Estructura de Contenido**: Se empleará la etiqueta semántica `<section>` con un ID descriptivo (`id="equipo"`).
* **Jerarquía de Encabezados**: El título principal de la sección utilizará un `h2` ("Nuestro Equipo"), y los nombres de los integrantes utilizarán `h3` o `h4` según corresponda para mantener una jerarquía limpia y accesible.
* **Textos Alternativos**: Cada imagen de equipo tendrá un atributo `alt` descriptivo detallando el nombre y rol del profesional (por ejemplo: "Retrato profesional de [Nombre], [Rol] en Matices").
