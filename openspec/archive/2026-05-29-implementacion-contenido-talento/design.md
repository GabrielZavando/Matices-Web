# Especificación del Diseño y Tokens: Gestión del Talento

Este documento detalla la aplicación estricta del sistema de diseño "Natural Vitality" y sus variables de compatibilidad Tailwind v4 configuradas en el proyecto para la página de Gestión del Talento B2B.

## 1. Mapeo de Colores del Sistema de Diseño

Se consumen las variables semánticas configuradas en `@theme` en `src/styles/global.css`:

| Variable Semántica | Equivalente de Compatibilidad | Color Hexadecimal | Uso en Gestión del Talento |
| :--- | :--- | :--- | :--- |
| `--color-matices-primary` | `verde-bosque` | `#243B55` | Color base para textos principales, encabezados, botones primarios y contenedores de alta densidad. |
| `--color-matices-green` | `verde-lima` | `#98C245` | Acentos vivos, fondos de insignias (badges), bordes de enfoque y botones de conversión de alta visibilidad. |
| `--color-matices-bg` | `crema-calido` | `#F4F7F9` | Color de fondo de la página, tarjetas secundarias y separaciones suaves de contenido. |
| `--color-matices-blue` | `azul-celeste` | `#5A7FA3` | Insignias secundarias, iconos y estados sutiles de hover. |
| N/A | Fondo Oscuro (`bg-[#2e3131]`) | `#2e3131` | Secciones de destaque intermedio para crear contraste visual y destacar CTAs de conversión. |

---

## 2. Tipografía y Escalas

* **Encabezados Principales y de Sección:**
  * Clase Tailwind: `font-heading` (mapeada a **Playfair Display**).
  * Tamaños aplicados de forma responsiva:
    * `h1` (Hero): `text-4xl md:text-5xl lg:text-6xl font-bold`
    * `h2` (Secciones): `text-3xl md:text-4xl font-bold`
    * `h3` / `h4` (Tarjetas): `text-2xl font-bold`
* **Textos de Cuerpo, Botones y Etiquetas:**
  * Clase Tailwind: `font-sans` (mapeada a **Plus Jakarta Sans**).
  * Tamaños aplicados:
    * Bajada de texto / Subtítulo: `text-lg text-verde-bosque/80 max-w-xl` o `text-base md:text-lg`
    * Cuerpo de tarjeta / regular: `text-sm md:text-base text-verde-bosque/75`
    * Botones y Etiquetas: `text-sm font-semibold tracking-wider uppercase`

---

## 3. Formas y Bordes (Bordes Orgánicos)

De acuerdo con la estética orgánica y fluida de Matices:
* **Botones Básicos:** `rounded-xl` (`12px` / `0.75rem`) para botones y accesos directos, o `rounded-full` para botones de conversión altamente orgánicos.
* **Tarjetas e Hitos Informativos:** `rounded-[2rem]` (`32px`) para enmarcar el contenido sin bordes duros.
* **Contenedores de Imagen en Tarjetas:** `rounded-t-[2rem]` o máscaras fluidas asimétricas para reflejar la identidad visual de pétalo/hoja de la marca Matices.

---

## 4. Estructuración y Clases de UI de las Secciones

### Sección Superior: Gestión del Talento & Scouthem
* **Contenedor:** `bg-white py-20 border-t border-verde-bosque/5`
* **Grid Informativo:** `grid grid-cols-1 lg:grid-cols-12 gap-12 items-start`
* **Tarjeta Destaque Scouthem (IA & Psicometría):**
  * Caja principal: `bg-crema-calido/50 p-8 md:p-12 rounded-[2.5rem] border border-verde-bosque/5 flex flex-col lg:flex-row justify-between items-center gap-8 w-full hover:border-verde-bosque/10 transition-all duration-300`
  * Botón Conocer Scouthem: `bg-verde-bosque hover:bg-verde-bosque/90 text-white py-4 px-8 rounded-xl font-bold shadow-lg transition-all active:scale-95 text-center text-sm uppercase tracking-wider`

### Sección de Servicios de Talento
* **Contenedor:** `bg-crema-calido/30 py-20 border-t border-b border-verde-bosque/5`
* **Grid Bloque 1 (3 Tarjetas):** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
* **Grid Bloque 2 (2 Tarjetas):** `grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto` (centrado estético para compensar el desbalance visual).
* **Tarjetas de Servicios:**
  * Estructura: `bg-white rounded-[2.5rem] shadow-md border border-verde-bosque/5 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full`
  * Imagen de cabecera: Contenedor con `w-full h-48 overflow-hidden relative` y etiqueta `<Image class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />`
  * Cuerpo de tarjeta: `p-8 flex flex-col justify-between flex-grow space-y-4`
  * Botón/Enlace "Contactar Aquí": `text-verde-lima hover:text-verde-bosque font-bold text-sm tracking-wider uppercase inline-flex items-center gap-2 group/btn mt-auto`
