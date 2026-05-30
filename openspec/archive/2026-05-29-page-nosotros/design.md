# Mapeo del Sistema de Diseño: Página "Nosotros" - Matices

Este documento detalla la aplicación rigurosa de los tokens visuales del sistema de diseño **"Natural Vitality"** para la estructuración de la sección "Nosotros".

---

## 1. Mapeo de Colores (Tailwind CSS v4 Moderno)

| Token Semántico | Color Hexadecimal | Clase Tailwind | Aplicación en "Nosotros" |
| :--- | :--- | :--- | :--- |
| **Surface (Fondo)** | `#f9f9f8` | `bg-crema-calido` | Fondo general de la página para evitar sensación clínica. |
| **Surface Container Low** | `#f3f4f3` | `bg-crema-calido/50` | Contenedores secundarios y bloques narrativos de evolución. |
| **Primary (Lively Green)** | `#236c32` | `text-verde-bosque` / `bg-verde-bosque` | Textos de encabezados primarios, botones de conversión principales. |
| **Secondary (Deep Teal)** | `#25667b` | `text-azul-celeste` / `bg-azul-celeste` | Acentos de marca, etiquetas de categoría y bordes de realce. |
| **Primary Fixed (Lime Accent)** | `#a8f5ab` | `bg-verde-lima/10` / `text-verde-bosque` | Fondos de badges de pilares e indicadores de trayectoria. |
| **Inverse Surface** | `#2e3131` | `bg-inverse-surface` | Fondo del banner de conversión final B2B en el pie de página. |

---

## 2. Tipografías Premium

* **Encabezados Principales (`h1`, `h2`):**
  * **Familia:** `Playfair Display` (Serif de alta gama).
  * **Clases:** `font-heading font-bold font-display-lg text-4xl md:text-5xl lg:text-6xl text-verde-bosque tracking-tight`.
* **Cuerpo de Texto y Párrafos (`p`):**
  * **Familia:** `Plus Jakarta Sans` (Sans-serif moderno y blando).
  * **Clases:** `font-sans text-base md:text-lg text-verde-bosque/80 leading-relaxed`.
* **Etiquetas y Botones (`span`, `button`):**
  * **Familia:** `Plus Jakarta Sans` (Semibold/Bold).
  * **Clases:** `font-sans font-semibold tracking-wider text-xs md:text-sm uppercase`.

---

## 3. Formas y Bordes (Shape Language)

* **UI Elementos (Botones):** `rounded-full` para botones de conversión que evocan fluidez y dinamismo orgánico.
* **Cajas Metodológicas (Pillars):** `rounded-[2rem]` para crear esquinas asimétricas y suaves (inspiradas en los pétalos de la marca).
* **Imágenes Narrativas:** `rounded-[3rem]` o máscaras circulares asimétricas orgánicas para dar un aspecto editorial de revista de alta gama.

---

## 4. Elevación y Efectos (Luminous Glassmorphism)

* **Header Translúcido:** `backdrop-blur-md bg-crema-calido/80 border-b border-verde-bosque/10`.
* **Floating Badges:** Tarjetas de Glassmorphism con un 70% de opacidad de fondo blanco (`bg-white/70 backdrop-blur-md shadow-xl border border-verde-bosque/10`) y sombras ambientales difusas de 6% de opacidad teñidas con el color secundario.
