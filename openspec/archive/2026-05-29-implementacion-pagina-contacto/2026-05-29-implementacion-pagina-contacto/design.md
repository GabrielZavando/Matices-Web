# Design Tokens: Página de Contacto

## 1. Tipografía y Jerarquía
* **Títulos Principales (Hero):** Se usará `font-display-lg` o `font-headline-lg` de la familia **Playfair Display**. La palabra "Organización" llevará énfasis cursivo (`italic`) para resonar con el estilo *Sophisticated Elegance*.
* **Textos de Cuerpo e Inputs:** Empleo de **Plus Jakarta Sans** (`font-body-md`, `font-label-md`) para todo el contenido de los bloques del formulario, garantizando limpieza y la estética *Modern Organic*.

## 2. Paleta de Colores (Semantic Tokens)
* **Fondos Generales:** Uso de `bg-surface` (`#f9f9f8`) para la vista general.
* **Identidad Primaria:** La marca `text-primary` (`#236c32` - Lively Green) se aplicará a palabras clave y al botón de "Enviar Solicitud".
* **Contenedor Principal del Formulario:** La tarjeta contenedora utilizará `bg-surface-container-lowest` (`#ffffff`) para destacar del fondo neutro.
* **Bloques e Inputs:** Los campos de texto usarán un fondo gris cálido, pasando sus bordes a color `border-primary` y aplicando `outline-none` y `ring` suave en el pseudo-estado `:focus`.
* **Círculos Decorativos (Matiz Blobs):** Elementos posicionados de fondo detrás del formulario usando baja opacidad (ej. `bg-primary/10`, `bg-secondary-fixed/20`) con `rounded-full` y filtrado blur.

## 3. Formas, Dimensiones y Elevación
* **Bordes Orgánicos (Shape):**
  * Etiqueta tipo píldora inicial: `rounded-full`.
  * Contenedor central del Formulario: `rounded-[2rem]` o `rounded-[3rem]`, similar a otras tarjetas destacadas del sitio.
  * Inputs, Checkboxes y Radios en bloque: `rounded-lg` (0.5rem) a `rounded-xl`.
* **Sombras (Elevation):** Sombra suave `shadow-lg` o `shadow-xl` para el contenedor principal. Sombras de ambiente (bajo opacidad) sin llegar al negro fuerte.
* **Layout Fluido:** `max-w-container-max` (`1280px`) y espaciados laterales controlados por `px-margin-mobile` y `px-margin-desktop`.

## 4. Estilos de Interacción del Cliente
* Los botones de radio (Tamaño, Preferencias) serán ocultados nativamente usando `sr-only` o `hidden`, delegando su aspecto visual al `<label>` contenedor. El estado seleccionado recibirá una clase `.active` inyectada por JS, con una transición suave en fondo, bordes y texto.
