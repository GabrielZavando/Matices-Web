# Mapeo del Sistema de Diseño (Natural Vitality): Página de Inicio - Matices

Este documento describe la aplicación de los tokens de estilo visual y comportamiento del sistema de diseño para la página de Inicio.

---

## 1. Mapeo de Colores (Tailwind CSS v4)

Los colores están preconfigurados en `src/styles/global.css` y se mapearán de la siguiente manera:

| Token Semántico | Color Hexadecimal | Clase CSS / Tailwind | Aplicación en la Página de Inicio |
| :--- | :--- | :--- | :--- |
| **Surface (Fondo Principal)** | `#f9f9f8` | `bg-crema-calido` | Fondo de la página y de secciones limpias. |
| **Primary (Verde Bosque)** | `#236c32` | `text-verde-bosque` / `bg-verde-bosque` | Encabezados principales, botones de conversión principales y secciones clave. |
| **Secondary (Azul Celeste)** | `#0ea5e9` | `text-azul-celeste` / `bg-azul-celeste` | Acentos de marca, etiquetas secundarias e íconos decorativos. |
| **Lime Accent (Verde Lima)** | `#84cc16` | `bg-verde-lima` / `text-verde-lima` | Resaltados especiales, badges de categoría y llamado a la acción. |
| **Surface Container Low** | `#f3f4f3` | `bg-crema-calido/50` | Fondos de tarjetas de servicios secundarias y contenedores alternados. |
| **Inverse Surface** | `#2e3131` | `bg-[#2e3131]` (u homólogo) | Color de fondo oscuro para el banner de conversión final (Dolor / Empatía). |

---

## 2. Estrategia de Tipografía

*   **Encabezados Principales (Titulares en Hero y secciones `h1`, `h2`):**
    *   **Familia:** `Playfair Display` (Serif editorial premium).
    *   **Clases:** `font-heading font-bold text-verde-bosque`.
    *   **Tamaños:** Hero: `text-4xl md:text-5xl lg:text-6xl`. Secciones: `text-3xl md:text-4xl`.
*   **Cuerpo de Texto y Descripciones (`p`):**
    *   **Familia:** `Plus Jakarta Sans` (Sans-serif moderno y ergonómico).
    *   **Clases:** `font-sans text-base md:text-lg text-verde-bosque/80 leading-relaxed`.
*   **Etiquetas, Badges y Botones (`span`, `a`, `button`):**
    *   **Familia:** `Plus Jakarta Sans` (Semibold/Bold).
    *   **Clases:** `font-sans font-semibold tracking-wider text-xs md:text-sm uppercase`.

---

## 3. Formas y Bordes (Shape Language)

*   **Botones Interactivos:** `rounded-full` para evocar fluidez y dinamismo orgánico.
*   **Tarjetas de Servicios:** `rounded-[2rem]` para suavizar las esquinas.
*   **Caja de Imagen en Hero:** `rounded-[3rem]` o `rounded-[4rem]` asimétrico.
*   **Galería Masonry / Evidencia:** `rounded-2xl` para lograr cohesión visual en composiciones densas.

---

## 4. Elevaciones, Profundidad y Efectos

*   **Glow ambiental:** Uso de sombras muy tenues y difuminadas (`shadow-xl` / `shadow-2xl`) de color verde o azul de opacidad baja (6-10%).
*   **Glassmorphism (Flotantes):** Tarjetas de información complementaria con `bg-white/70 backdrop-blur-md shadow-lg border border-verde-bosque/10`.
