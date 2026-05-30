# Mapeo de Sistema de Diseño: Página de Contacto

Este documento mapea los tokens de diseño y las variables semánticas globales de **Matices Consultoría Integral** (definidos en `docs/DESIGN.md` y `src/styles/global.css`) para su aplicación en la interfaz del formulario de contacto.

## 1. Mapeo de Colores del Sistema de Diseño (Tailwind CSS v4)

Utilizamos estrictamente el tema semántico y las variables configuradas en el proyecto para asegurar consistencia visual:

| Token Semántico | Variable CSS | Color Hex | Uso en el Formulario |
| :--- | :--- | :--- | :--- |
| **Primary (Verde Bosque)** | `--color-matices-primary` / `--color-verde-bosque` | `#243B55` | Textos de encabezados, etiquetas (`label`), bordes activos, fondo de botones primarios. |
| **Secondary (Azul Celeste)** | `--color-matices-blue` / `--color-azul-celeste` | `#5A7FA3` | Subtítulos de sección, bordes secundarios, acentos en estados hover. |
| **Green (Verde Lima)** | `--color-matices-green` / `--color-verde-lima` | `#98C245` | Badges, indicadores de selección, acentos de éxito e interactivos. |
| **Orange (Naranja Matices)** | `--color-matices-orange` | `#F09E46` | Alertas o llamadas de atención muy puntuales. |
| **Background (Crema Cálido)** | `--color-matices-bg` / `--color-crema-calido` | `#F4F7F9` | Fondo de la página, fondo de inputs desactivados o alternativos. |

---

## 2. Tipografía y Jerarquía Visual

* **Títulos y Encabezados (font-heading)**: `Playfair Display`, serif.
  * Título principal: `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-verde-bosque`.
  * Títulos de sección: `text-2xl md:text-3xl font-semibold text-verde-bosque`.
* **Cuerpo de Texto y Formulario (font-sans)**: `Plus Jakarta Sans`, sans-serif.
  * Etiquetas de campos (`label`): `font-sans text-sm font-semibold text-verde-bosque/90 uppercase tracking-wider`.
  * Mensajes de ayuda / descripción: `font-sans text-xs text-verde-bosque/70`.
  * Inputs, selectores, radio buttons y checkboxes: `font-sans text-base text-verde-bosque`.

---

## 3. Formas, Bordes y Profundidad

* **Bordes de Inputs y Botones**:
  * Inputs y Selects: `rounded-xl` (12px / `0.75rem`) para una interacción suave y orgánica.
  * Botones de Acción (CTA): `rounded-full` para máxima prominencia interactiva.
* **Bordes de Contenedor de Formulario**:
  * Tarjeta contenedora: `rounded-[2rem]` (`32px`) o `rounded-[2.5rem]` con borde sutil `border border-verde-bosque/5` y sombra extra-difuminada (`shadow-2xl`).
* **Estados Interactivos (Foco y Hover)**:
  * Inputs en Foco: Transición suave de borde a `border-verde-bosque` con anillo de brillo tenue `focus:ring-2 focus:ring-verde-lima/30`.
  * Botones en Hover: Opacidad reducida al 90% (`hover:opacity-90`) y micro-animación de escala (`active:scale-95 transition-all`).

---

## 4. Estructura Mobile-First y Grids del Formulario

El formulario se organiza en una sola columna por defecto y se expande en pantallas grandes (`lg`):

* **Contenedor Principal**:
  * Móvil: `w-full px-4 py-8 flex flex-col gap-8`
  * Escritorio (`lg`): `max-w-[1280px] mx-auto px-16 py-16 grid grid-cols-12 gap-16`
* **Campos en Grid de Formulario**:
  * Grupos de campos múltiples (ej. Nombres y Correo, Teléfono y Empresa):
    * Móvil: `grid grid-cols-1 gap-6` (vertical)
    * Escritorio (`md` o `lg`): `grid grid-cols-2 gap-6` (horizontal)
  * Checkboxes de selección múltiple (Servicios e Intereses):
    * Móvil: `grid grid-cols-1 gap-3`
    * Escritorio (`sm` o `md`): `grid grid-cols-2 gap-4`
