# Mapeo de Diseño y Fichas de Estilo (Tokens): Carrusel de Logotipos

Este documento define la integración de los tokens visuales del sistema **Natural Vitality** y el código de prototipo de Matices (`code.html`) para el carrusel de logotipos de empresas.

---

## 1. Mapeo de Tokens de Diseño (Design Tokens)

Se extraen los siguientes tokens clave de `docs/DESIGN.md` y `docs/assets/design/code.html` para el diseño del carrusel:

### Colores Corporativos

*   **Fondo de la Sección:** `#ffffff` (Blanco puro para mantener alto contraste) con un sutil borde superior e inferior de `#236c32` al 5% de opacidad (`border-verde-bosque/5`).
*   **Fondo de Tarjeta del Logotipo:** `rgba(255, 255, 255, 0.4)` (`bg-white/40`) con transición en hover a `rgba(255, 255, 255, 0.8)` (`hover:bg-white/80`).
*   **Borde de Tarjeta:** Transparente por defecto; en hover cambia a `#236c32` con un 10% de opacidad (`hover:border-verde-bosque/10`).
*   **Color Primario (Lively Green):** `#236c32` (Verde Bosque / Primario de Matices) para el encabezado de la sección.

### Tipografía

*   **Título de Sección ("Empresas que han confiado..."):**
    *   Familia: **Playfair Display** (`font-heading`).
    *   Estilos: `font-bold`, `text-2xl` en móvil a `text-3xl` en escritorio.
    *   Color: `#236c32` (`text-verde-bosque`).
*   **Subtítulo de Sección:**
    *   Familia: **Plus Jakarta Sans** (`font-sans`).
    *   Estilos: `text-sm`, `text-verde-bosque/60` (opacidad del 60%).

### Formas y Bordes (Shapes)

*   **Esquinas del Contenedor de Logo:** `rounded-2xl` (16px de radio de curvatura orgánico), alineado con las tarjetas de la metodología de Matices.
*   **Sombra en Hover:** `hover:shadow-sm` con un difuminado sutil ("Ambient Glow").

---

## 2. Configuración Estructural del Carrusel (Marquee)

Para garantizar un control preciso del flujo y un comportamiento responsivo libre de librerías externas, se inyectan variables de entorno CSS a través de Container Queries:

### Variables CSS del Carrusel (`:root` o `@container` scope)

*   `--carousel-gap`: Espaciado horizontal entre elementos. Configurado en `2.5rem` (`40px`).
*   `--items-visible`: Número de logotipos visibles simultáneamente en pantalla:
    *   **Móvil (<640px):** `2`
    *   **Tablet (640px - 1024px):** `4`
    *   **Desktop (>1024px):** `5`

### Fórmula de Ancho Dinámico (`.carousel-item`)

Cada tarjeta de logotipo se calcula de forma responsiva mediante la unidad `cqw` (ancho del contenedor padre):

```css
.carousel-item {
  flex-shrink: 0;
  width: calc((100cqw - var(--carousel-gap) * (var(--items-visible) - 1)) / var(--items-visible));
}
```

---

## 3. Animaciones y Transiciones 60FPS

### Animación del Desplazamiento Infinito (`marquee`)

La transición continua se realiza desplazando el contenedor un `50%` de su ancho ajustado por la mitad de la separación para lograr un bucle infinito matemáticamente perfecto:

```css
@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(calc(-50% - var(--carousel-gap) / 2), 0, 0);
  }
}

.carousel-track {
  display: flex;
  gap: var(--carousel-gap);
  width: max-content;
  animation: marquee 25s linear infinite;
}
```

### Micro-interacción Tridimensional (Hardware-Accelerated Hover)

Al hacer hover sobre un elemento individual, se cancela la escala de grises y se agranda mediante transformaciones 3D aceleradas por GPU:

```css
.carousel-item-inner {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease, opacity 0.4s ease;
  will-change: transform;
  transform: scale3d(1, 1, 1);
}

.carousel-item-inner:hover {
  transform: scale3d(1.08, 1.08, 1);
}
```
