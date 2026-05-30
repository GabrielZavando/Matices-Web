# Sistema de Diseño y Ficha de Tokens: Página de I+D

Este documento establece el mapeo explícito de los tokens visuales del sistema de diseño **"Natural Vitality"** (y el esquema tradicional de marca de Matices) para su aplicación directa en los componentes de la página de I+D en `src/pages/id.astro`.

## 1. Paleta de Colores Corporativos (Tailwind CSS)

Mapeamos los colores semánticos definidos en el sistema global para estructurar el contraste y las capas visuales de cada bloque:

| Token Semántico | Color Hexadecimal | Clase Tailwind CSS | Uso Recomendado en I+D |
| :--- | :--- | :--- | :--- |
| **Primary (Verde Bosque)** | `#236c32` | `text-primary` / `bg-primary` / `border-primary` | Botones de acción principales, títulos destacados, bordes activos y acentos de marca. |
| **Secondary (Teal Profundo)** | `#25667b` | `text-secondary` / `bg-secondary` | Subtítulos, bordes decorativos secundarios y fondos de tarjetas complementarias. |
| **Tertiary (Cosecha Dorada)** | `#835400` | `text-tertiary` / `bg-tertiary` | Etiquetas de categoría menores, alertas de validación o detalles específicos de I+D. |
| **Background / Surface** | `#f9f9f8` | `bg-background` / `bg-surface` | Fondo base de la página (Warm Cream). |
| **Surface Low** | `#f3f4f3` | `bg-surface-container-low` | Fondo para contenedores secundarios (bloque del Proyecto FONDEF). |
| **Surface High** | `#e7e8e7` | `bg-surface-container-high` | Fondos de tarjetas interactivas de clientes o evidencia. |
| **Inverse Surface** | `#2e3131` | `bg-inverse-surface` | Fondo contrastante oscuro para secciones de impacto (CTA inferior de Scouthem). |

---

## 2. Tipografía y Jerarquía Visual

El balance tipográfico del proyecto combina la elegancia editorial clásica con la legibilidad moderna y orgánica:

* **Títulos de Secciones y Encabezados Primarios:**
  * **Tipografía:** Playfair Display (Serif).
  * **Clases de Fuente:** `font-heading` o `font-display` (mapeada a Playfair Display).
  * **Estilos:** `text-4xl md:text-5xl font-bold leading-tight tracking-tight`.
* **Cuerpo de Texto y Descripciones:**
  * **Tipografía:** Plus Jakarta Sans (Sans-Serif).
  * **Clases de Fuente:** `font-sans` (mapeada a Plus Jakarta Sans).
  * **Estilos:** `text-base md:text-lg font-normal leading-relaxed text-on-surface-variant`.
* **Etiquetas y Botones:**
  * **Tipografía:** Plus Jakarta Sans (Sans-Serif).
  * **Clases de Fuente:** `font-sans` con peso seminegrilla o negrita.
  * **Estilos:** `text-xs md:text-sm font-semibold tracking-wider uppercase`.

---

## 3. Formas, Radios y Efectos Orgánicos

Para reflejar la identidad visual inspirada en la naturaleza y en la precisión técnica, aplicaremos de forma estricta las siguientes reglas de bordes y elevaciones:

* **Botones e Inputs Base:**
  * **Radio:** `0.5rem` / `8px` (`rounded-xl` o `rounded-lg`).
* **Tarjetas e Infografías (FONDEF/Evidencias):**
  * **Radio:** `1rem` o `1.5rem` (`rounded-2xl` o `rounded-3rem` en dispositivos de escritorio) para un enmarcado suave y moderno.
* **Máscaras y Contenedores Grandes (Mosaico Masonry / Video / Hero):**
  * **Radio Asimétrico:** Se integrarán curvas pronunciadas y asimétricas (`rounded-[2rem]` hasta `rounded-[4rem]`).
  * **Contenedor de Video:** Tendrá un marco limpio con bordes redondeados pronunciados y sombra difusa para emular una pantalla moderna.
* **Efectos de Vidrio (Glassmorphism):**
  * **Clase personalizada:** `glass-card` (`background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(35, 108, 50, 0.1);`).
  * **Uso:** En distintivos flotantes, indicadores de métricas o superposiciones en el mosaico de evidencias.
