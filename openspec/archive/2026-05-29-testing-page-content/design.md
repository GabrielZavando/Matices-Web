# Sistema de Diseño Aplicado: Testing y Diagnóstico

Este documento define la correspondencia estricta entre los tokens de diseño visual de la nueva identidad de **Matices** definidos en `src/styles/global.css` y las clases de Tailwind CSS v4 que se usarán en el desarrollo de la página de Testing.

## 1. Mapeo de Colores Semánticos (Paleta de Identidad)
De acuerdo con la nueva identidad de marca configurada en `@theme`, utilizaremos exclusivamente las variables de color mapeadas para mantener la cohesión del sitio:

| Nombre Variable CSS | Valor Hexadecimal | Token de Identidad | Clase Tailwind v4 a Utilizar | Uso Principal |
| :--- | :--- | :--- | :--- | :--- |
| `--color-matices-primary` | `#243B55` | Azul Oscuro Corporativo | `bg-verde-bosque` / `text-verde-bosque` | Títulos principales, textos base, botones primarios y bordes sutiles. |
| `--color-matices-green` | `#98C245` | Verde Lima Vibrante | `bg-verde-lima` / `text-verde-lima` | Acentos, badges informativos, iconos de viñetas, hover en CTAs. |
| `--color-matices-blue` | `#5A7FA3` | Azul Celeste Suave | `bg-azul-celeste` / `text-azul-celeste` | Iconos complementarios y fondos secundarios. |
| `--color-matices-bg` | `#F4F7F9` | Crema Cálido (Off-White) | `bg-crema-calido` / `text-crema-calido` | Fondo general de la página, tarjetas o secciones de bajo contraste. |
| `--color-matices-orange` | `#F09E46` | Naranja Tierra | `--color-matices-orange` | Reservado para elementos excepcionales (no requerido en esta página). |

---

## 2. Tipografía Semántica
La jerarquía tipográfica responde a la identidad elegante y moderna del proyecto:

* **Títulos Principales (`font-heading`):**
  * Fuente: **Playfair Display** (Serif).
  * Estilo: Negrita (`font-bold`), con opción de itálica fluida (`font-normal italic`) para acentos conceptuales.
  * Clases clave: `font-heading text-3xl md:text-4xl lg:text-5xl`.
* **Texto de Cuerpo y Etiquetas (`font-sans`):**
  * Fuente: **Plus Jakarta Sans** (Sans-Serif).
  * Estilo: Regular (`font-normal`), Semi-bold o Bold (`font-semibold` / `font-bold`) para énfasis.
  * Clases clave: `font-sans text-base text-verde-bosque/80 leading-relaxed`.

---

## 3. Formas, Redondeados y Bordes
El lenguaje visual evita esquinas agudas para transmitir calidez, naturaleza y precisión:

* **Componentes de Interacción (Botones, Inputs):**
  * Redondeado: `rounded-xl` (12px) o `rounded-full` (píldora).
  * Clases de interacción: `hover:opacity-90 active:scale-95 transition-all duration-300`.
* **Tarjetas y Módulos de Información:**
  * Redondeado: `rounded-[2rem]` (32px) para tarjetas B2B de servicios o bloques de contenido.
  * Bordes: `border border-verde-bosque/5` (delgado y sutil).
* **Marcos de Imágenes y Galería:**
  * Redondeado: `rounded-2xl` (16px) con bordes blancos gruesos en la galería (`border-4 border-white`) para dar efecto de mosaico físico.

---

## 4. Contenedores y Estructura del Grid
Garantizamos la alineación perfecta con las secciones existentes en la página de inicio:

* **Contenedor General de Ancho Máximo:**
  * `max-w-[1280px] mx-auto px-4 md:px-16`
* **Secciones de Contenido (Vertical Rhythm):**
  * Clases de espaciado: `w-full py-16 md:py-24 bg-white/40` o `bg-crema-calido/30` para generar alternancia tonal.
* **Grillas y Contenedores Flexibles (Mobile-First):**
  * Disposición responsiva: `grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16` (colapsa en una sola columna en pantallas de celular por defecto).
