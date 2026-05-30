# Especificación del Diseño y Tokens: Formación Continua

Este documento detalla la aplicación estricta del sistema de diseño "Natural Vitality" y sus variables de compatibilidad Tailwind v4 configuradas en el proyecto para la página de Formación Continua.

## 1. Mapeo de Colores del Sistema de Diseño

Se consumen las variables semánticas configuradas en `@theme` en `src/styles/global.css`:

| Variable Semántica | Equivalente de Compatibilidad | Color Hexadecimal | Uso en Formación Continua |
| :--- | :--- | :--- | :--- |
| `--color-matices-primary` | `verde-bosque` | `#243B55` | Color base para textos principales, encabezados, botones primarios y contenedores de alta densidad. |
| `--color-matices-green` | `verde-lima` | `#98C245` | Acentos vivos, fondos de insignias (badges), bordes de enfoque y botones de conversión de alta visibilidad. |
| `--color-matices-bg` | `crema-calido` | `#F4F7F9` | Color de fondo de la página, tarjetas secundarias y separaciones suaves de contenido. |
| `--color-matices-blue` | `azul-celeste` | `#5A7FA3` | Insignias secundarias, iconos y estados sutiles de hover. |
| N/A | Fondo Oscuro (`bg-[#2e3131]`) | `#2e3131` | Bloques de alta empatía (Banner de dolor) para crear contraste visual y destacar CTAs. |

---

## 2. Tipografía y Escalas

* **Encabezados Principales y de Sección:**
  * Clase Tailwind: `font-heading` (mapeada a **Playfair Display**).
  * Tamaños aplicados de forma responsiva:
    * `h1` (Hero): `text-4xl md:text-5xl lg:text-6xl font-bold`
    * `h2` (Secciones): `text-3xl md:text-4xl font-bold`
    * `h3` (Tarjetas): `text-2xl font-bold`
* **Textos de Cuerpo, Botones y Etiquetas:**
  * Clase Tailwind: `font-sans` (mapeada a **Plus Jakarta Sans**).
  * Tamaños aplicados:
    * Bajada de texto / Subtítulo: `text-lg text-verde-bosque/80 max-w-xl` o `text-base md:text-lg`
    * Cuerpo regular: `text-sm md:text-base text-verde-bosque/75`
    * Botones y Etiquetas: `text-sm font-semibold tracking-wider uppercase`

---

## 3. Formas y Bordes (Bordes Orgánicos)

De acuerdo con la estética orgánica y fluida de Matices:
* **Botones e Inputs Básicos:** `rounded-xl` (`12px` / `0.75rem`) para un aspecto suave pero estructurado.
* **Tarjetas e Hitos Informativos:** `rounded-[2rem]` (`32px`) para enmarcar el contenido sin bordes duros.
* **Contenedores de Imagen / Mosaicos:** `rounded-[3rem]` o máscaras fluidas asimétricas para reflejar la identidad visual de pétalo/hoja del logotipo corporativo.

---

## 4. Estructuración y Clases de UI de las Secciones

### Sección Superior: Programas & Aula Virtual
* **Contenedor:** `bg-white/40 border-t border-verde-bosque/5 py-20`
* **Grid Informativo:** `grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`
* **Subbloque Aula Virtual:**
  * Tarjeta destacada: `bg-crema-calido/50 p-8 md:p-12 rounded-[2.5rem] border border-verde-bosque/5 flex flex-col md:flex-row justify-between items-center gap-8`
  * Botón Aula Virtual: `bg-verde-bosque hover:bg-verde-bosque/90 text-white py-4 px-8 rounded-xl font-bold shadow-lg transition-all active:scale-95 text-center`

### Banner de Dolor / Empatía (Fondo Oscuro)
* **Contenedor:** `bg-[#2e3131] py-20 text-crema-calido relative overflow-hidden`
* **Detalles Visuales:** Degradados radiales internos con blurs sutiles (`bg-verde-lima/5 rounded-full blur-3xl`) para profundidad lumínica (Stained Glass).
* **Botón Hablemos Ahora:** `bg-verde-lima hover:bg-verde-lima/90 text-verde-bosque py-4 px-10 rounded-full font-bold shadow-lg transition-all hover:scale-105 text-center`

### Sección Intermedia de Alianzas y Cursos
* **Contenedor:** `bg-crema-calido/30 py-20 border-t border-b border-verde-bosque/5`
* **Grid de Subbloques:** `grid grid-cols-1 md:grid-cols-2 gap-8`
* **Tarjetas de Propuesta:** `bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-verde-bosque/5 flex flex-col justify-between min-h-[320px]`
* **Botón Solicitar Propuesta:** `bg-verde-bosque hover:bg-verde-bosque/90 text-white py-4 px-10 rounded-full font-bold shadow-lg transition-all hover:scale-105 text-center`
