# Design: Mapping de Tokens "Natural Vitality"

## 1. Declaración de Colores (Tailwind CSS v4 Variables)
Se integrarán de manera estricta los siguientes tokens al diseño global del CSS:

- **`crema-calido`** (`#f9f9f8`): Base para fondos "Surface Neutrals", reemplazando el blanco clínico para aportar calidez orgánica. (Mapeado a fondos base).
- **`verde-bosque`** (`#236c32`): Verde oscuro y corporativo (Lively Green/Primary). Usado para la jerarquía principal de texto (h1, h2, p) y fondos invertidos en Footer/Header.
- **`verde-lima`** (`#84cc16`): Acento energético secundario, ideal para botones primarios o highlights.
- **`azul-celeste`** (`#0ea5e9`): Acento derivado del secondary (Deep Teal) adaptado a interacciones interactivas u outlines.

## 2. Declaración de Tipografía
- **`font-sans`:** `Plus Jakarta Sans`, sans-serif limpio y geométrico. Aplicado en cuerpos de texto y meta información (Modern Organic).
- **`font-heading`:** `Playfair Display`, serif corporativo de alto contraste. Aplicado en la jerarquía alta `h1`, `h2` para generar autoridad visual (Sophisticated Elegance).

## 3. Guía de Interfaz Base (Componentes Nucleares)
- **Primary CTA:** `<button class="bg-verde-lima text-white font-sans font-semibold rounded-lg">`
- **Secondary CTA:** `<button class="border border-azul-celeste text-azul-celeste hover:bg-azul-celeste hover:text-white transition-colors rounded-lg">`
- **Glassmorphism (Frosted Leaf):** `<div class="bg-white/80 backdrop-blur-md">`
