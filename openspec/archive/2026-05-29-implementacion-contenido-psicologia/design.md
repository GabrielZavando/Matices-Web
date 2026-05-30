# Mapeo de Tokens de Diseño (Design) - Sección de Psicología

Este documento detalla cómo se aplican los tokens del sistema de diseño **"Natural Vitality"** (definidos en `docs/DESIGN.md`) a las nuevas secciones del archivo `src/pages/psicologia.astro` usando clases utilitarias de Tailwind CSS v4 preconfiguradas en el proyecto.

---

## 1. Colores y Capas de Superficies (Surface & Colors)
* **Fondo de la Página:** Mantiene la tonalidad base cálida (`#f9f9f8`), estructurada mediante clases como `bg-crema-calido/20` en el contenedor principal o secciones secundarias.
* **Sección de Salud Mental (Fondo Limpio/Blanco):**
  * Fondo: `bg-white` para destacar el contenido clínico y transmitir claridad.
  * Bordes separadores: `border-t border-verde-bosque/5`.
  * Viñetas personalizadas: Iconos de viñeta usando `text-verde-lima` u opacidades controladas.
* **Banner de Dolor / Empatía (Fondo Oscuro Luminous):**
  * Fondo: `bg-[#2e3131]` (Neutral oscuro que aporta sofisticación y rompe la monotonía).
  * Glows Ambientales: Círculos decorativos desenfocados en el fondo con `bg-verde-lima/5` y `bg-azul-celeste/5` con `blur-3xl` para simular la refracción de luz de "Natural Vitality".
  * Texto: `text-crema-calido` para un contraste suave y legible.
* **Sección de Especialidades (Fondo Soft):**
  * Fondo: `bg-crema-calido/30` con bordes finos `border-t border-b border-verde-bosque/5`.

---

## 2. Tipografía (Typography)
* **Títulos Principales (`<h2>`):**
  * Clase: `font-heading text-3xl md:text-4xl font-bold text-verde-bosque` (Mapea a **Playfair Display**, garantizando elegancia editorial).
  * Enfoque orgánico: Se aplican spans con clases como `text-verde-lima font-normal italic` para los conceptos de realce clínico/humano.
* **Títulos de Tarjetas / Columnas de Servicios (`<h3>`):**
  * Clase: `font-heading text-xl md:text-2xl font-bold text-verde-bosque`.
* **Cuerpo de Texto y Viñetas (`<p>`, `<li>`):**
  * Clase: `font-sans text-sm md:text-base text-verde-bosque/75` (Mapea a **Plus Jakarta Sans**, legible y amigable).
* **Etiquetas Superiores (Kicker):**
  * Clase: `inline-block px-4 py-1.5 rounded-full bg-verde-lima/10 text-verde-bosque font-sans text-xs font-semibold tracking-wider uppercase`.

---

## 3. Botones y Llamados a la Acción (CTAs & Buttons)
* **Botón Comercial B2B ("HABLEMOS AHORA"):**
  * Ubicación: Banner de Dolor y Sección de Especialidades.
  * Estilo: Sólido, redondeado y llamativo.
  * Clases: `bg-verde-lima hover:bg-verde-lima/90 text-verde-bosque font-sans font-bold py-4 px-10 rounded-full hover:scale-105 transition-all shadow-lg text-center block uppercase tracking-wider`.
* **Botón Clínico de Telemedicina ("AGENDAR HORA ONLINE"):**
  * Ubicación: Sección de Salud Mental.
  * Estilo: Corporativo, verde bosque de alto contraste.
  * Clases: `bg-verde-bosque hover:bg-verde-bosque/90 text-white font-sans font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 text-center text-sm inline-block uppercase tracking-wider`.

---

## 4. Estructuras de Grilla, Bordes y Formas (Layout & Shapes)
* **Grilla Clínico-Viñetas (3 Columnas):**
  * Comportamiento: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`. Colapsa limpiamente a una columna en móviles.
  * Tarjetas de Columnas: `bg-white p-8 rounded-[2.5rem] border border-verde-bosque/5 shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 min-h-[320px]`.
* **Grilla Especialidades (2 Columnas):**
  * Comportamiento: `grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`.
  * Columna Informativa: Ocupa `lg:col-span-7`.
  * Columna Gráfica / Imagen: Ocupa `lg:col-span-5` para centrar el collage.
* **Máscaras de Imágenes:**
  * Estilo de marco: Las imágenes de collage B2B incorporan `rounded-[3rem] shadow-2xl relative border-4 border-white/40` que respeta la estética orgánica de Matices.
