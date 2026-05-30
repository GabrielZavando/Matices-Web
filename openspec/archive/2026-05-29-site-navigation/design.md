# Especificaciones de Diseño: Navegación y Scroll Top

Esta especificación mapea los tokens visuales del sistema de diseño
"Natural Vitality" al menú de navegación y al botón flotante Scroll Top,
asegurando consistencia estética con la marca Matices.

## 1. Mapeo de Tokens Visuales

### Paleta de Colores
*   **Fondo del Header**: `bg-crema-calido/80` con desenfoque de fondo
    `backdrop-blur-md` ( Glassmorphism ).
*   **Línea Divisoria del Header**: `border-verde-bosque/10` (Borde sutil del
    Primary Green con 10% de opacidad).
*   **Enlaces de Navegación**:
    *   Estado Inactivo: `text-verde-bosque/80` (Deep Teal / Lively Green a 80%
        de opacidad).
    *   Estado Activo / Hover: `text-verde-bosque` (Lively Green puro).
*   **Botón Scroll Top**:
    *   Fondo: `bg-verde-bosque` (`#236c32` - Lively Green).
    *   Icono: `text-crema-calido` (`#f9f9f8` - Warm Cream).
    *   Hover: `hover:bg-verde-lima` (`#84cc16` - Accent Light Green) y escala
        `hover:scale-110`.

### Tipografía
*   **Enlaces de Navegación**: Familia `font-sans` ("Plus Jakarta Sans").
    *   Tamaño: `text-lg` en móviles, `text-base` en pantallas de escritorio.
    *   Peso: Regular (`font-normal`) por defecto, Semibold (`font-semibold`) en
        estado activo.
*   **Encabezados de Páginas Nuevas**: Familia `font-heading` ("Playfair Display")
    para mantener el estilo editorial premium.

### Formas y Elevación (Bordes y Sombras)
*   **Botón Scroll Top**:
    *   Radio de borde: `rounded-full` (Perfectamente esférico, 9999px).
    *   Elevación: Sombra difusa `shadow-lg` para simular profundidad natural y
        dar un efecto de botón flotante elevado sobre el contenido.
    *   Tamaño: `w-12 h-12` (48px) para asegurar una fácil pulsación táctil.

### Posicionamiento y Espaciado
*   **Header**: Ancho máximo centrado a `max-w-[1280px]`, márgenes horizontales
    `px-4` en móviles y `md:px-16` en escritorio.
*   **Botón Scroll Top**: Posicionamiento fijo `fixed bottom-6 right-6 z-50` para
    asegurar visibilidad constante por encima de cualquier otro elemento sin
    bloquear CTAs principales.
