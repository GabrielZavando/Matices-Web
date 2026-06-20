# Especificación de Diseño: Secciones Desplegables

Esta especificación define los estilos, tokens de diseño y micro-interacciones visuales para las cabeceras interactivas y las transiciones de expansión/colapso del formulario.

## 1. Tokens Visuales y Clases Utilizadas

### Encabezado del Acordeón (Botón Interactivo)
* **Contenedor Principal**:
  * Botón nativo de ancho completo: `w-full flex items-center justify-between p-6 rounded-xl border border-surface-variant bg-surface-container-low hover:bg-surface-container/75 transition-all duration-200 text-left focus:outline-none focus:ring-4 focus:ring-primary/10 cursor-pointer`
* **Texto e Indicador**:
  * Título: `.font-headline-md text-headline-md text-primary` (mantiene la fuente Plus Jakarta Sans).
  * Badge de Opcional: `.font-body-md text-body-md text-outline italic ml-2` (mantiene la fuente Manrope).
* **Icono de Flecha**:
  * Contenedor del icono: `w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-transform duration-300` (rotará con la clase `rotate-180` cuando esté activo).
  * Icono: SVG de chevron-down nativo de 20x20px.

---

## 2. Micro-Interacciones y Transiciones Premium

### Animación de la Flecha
* La flecha apuntará hacia abajo por defecto. Al hacer click, el contenedor de la flecha recibirá la clase `rotate-180` (o `-rotate-180`), la cual tiene una transición CSS nativa:
  `transition-transform duration-300 ease-in-out`

### Transición Suave de Despliegue (Altura Fluida)
Para evitar el salto brusco al desplegar, utilizaremos una técnica moderna basada en CSS Grid que permite transicionar de altura cero a altura automática de forma fluida sin usar JS para calcular la altura dinámica del elemento.

```css
/* Estilos en la sección <style> de contacto.astro */
.collapsible-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease;
  opacity: 0;
}

.collapsible-wrapper.expanded {
  grid-template-rows: 1fr;
  opacity: 1;
}

.collapsible-content {
  overflow: hidden;
}
```

Estructura HTML correspondiente:
```html
<div class="collapsible-wrapper" id="seccion-opcional-wrapper">
  <div class="collapsible-content">
    <!-- Contenido del formulario (fieldsets, inputs) con padding superior para espaciado -->
    <div class="pt-6">
      ...
    </div>
  </div>
</div>
```

---

## 3. Disposición del Campo Mensaje
* El campo "Mensaje" se moverá fuera de la Sección 3.
* Se posicionará inmediatamente después del campo "Cargo en la Organización" (último campo de la Sección 1: Información de Identificación).
* Se mantendrá en un contenedor con ancho completo (`md:col-span-2 space-y-2`) y se aplicará la clase `required` para conservar su validación.
