# Design: Mejoras Formulario de Contacto

## Sistema de Diseño (Natural Vitality)
Las modificaciones respetan el sistema visual existente para Matices.

### Ajustes Visuales
1. **Espaciado (Spacing):**
   * Incorporación de espaciado estándar `gap-4` (equivalente a `1rem` o `16px`) en los contenedores flexibles que envuelven los títulos y el texto secundario ("Opcional").
   * Mejora semántica estructurando el título en un bloque agrupado (`<div>` flex interno) para garantizar el margen adecuado con el ícono del acordeón, sin que se quiebre el diseño en móvil.

2. **Interacción (Interaction Tokens):**
   * Inclusión de la clase de utilidad `cursor-pointer` provista por Tailwind en los elementos interactivos `<button id="toggle-requerimientos">` y `<button id="toggle-detalles">`. Esto anula el cursor por defecto (flecha de selección) y presenta el cursor en forma de mano (pointer).
