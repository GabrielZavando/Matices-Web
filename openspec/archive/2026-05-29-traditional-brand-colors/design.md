# Especificación de Diseño: Paleta de Colores Tradicional de Matices

Esta especificación documenta el mapeo de los nuevos tokens de diseño tradicionales para reemplazar el esquema orgánico anterior ("Natural Vitality").

## 1. Mapeo de Tokens de Color

Eliminamos por completo las variables de colores orgánicos y aplicamos la nueva paleta bajo el prefijo `matices`:

| Token / Variable CSS | Valor Hexadecimal | Propósito / Rol Visual | Clase de Utilidad Tailwind |
| :--- | :--- | :--- | :--- |
| `--color-matices-primary` | `#243B55` | Azul oscuro profundo para texto principal y encabezados. | `bg-matices-primary`, `text-matices-primary` |
| `--color-matices-blue` | `#5A7FA3` | Azul medio/acerado para elementos secundarios e iconos. | `bg-matices-blue`, `text-matices-blue` |
| `--color-matices-green` | `#98C245` | Verde suave/natural para indicadores de éxito y secciones 'verdes'. | `bg-matices-green`, `text-matices-green` |
| `--color-matices-orange` | `#F09E46` | Naranja cálido para botones principales, alertas y destacados. | `bg-matices-orange`, `text-matices-orange` |
| `--color-matices-bg` | `#F4F7F9` | Fondo gris-azulado muy claro para secciones alternas. | `bg-matices-bg`, `text-matices-bg` |

## 2. Tipografía y otros Tokens

Los tokens de tipografía y formas se mantienen sin cambios en esta iteración para garantizar la consistencia visual y estructural:

- **Tipografía de Encabezados**: `--font-heading: "Playfair Display", ui-serif, Georgia, serif;`
- **Tipografía de Cuerpo**: `--font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;`

## 3. Estrategia de Aplicación Mobile-First

- Los fondos por defecto en pantallas móviles utilizarán el color neutral del sistema (`bg-[#ffffff]` o `bg-matices-bg` según la sección) estructurándose de manera vertical y simple.
- Las variaciones y contrastes usando `bg-matices-primary` o `text-matices-orange` se mantendrán escalables mediante modificadores responsivos en las siguientes fases de rediseño.
