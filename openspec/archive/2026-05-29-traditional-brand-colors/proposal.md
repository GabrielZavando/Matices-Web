# Propuesta de Cambio: Actualización de la Paleta de Colores Corporativa Tradicional

Esta propuesta detalla la transición arquitectónica y visual del esquema de diseño "Natural Vitality" al esquema tradicional e institucional de **Matices Consultoría Integral** en el entorno de Tailwind CSS v4.

## 1. Justificación Arquitectónica

El cambio consiste en reemplazar el diseño basado en tonos crema y verdes orgánicos por una paleta corporativa más sobria y profesional. Al centralizar esta configuración en `src/styles/global.css` utilizando la directiva nativa `@theme` de Tailwind CSS v4, logramos:

- **Cero TCO (Total Cost of Ownership)**: No se añaden librerías adicionales ni pesos de procesamiento al build final.
- **Limpieza de variables antiguas**: Eliminamos completamente los colores orgánicos (`--color-crema-calido`, `--color-verde-bosque`, etc.) para evitar inconsistencias de marca.
- **Facilidad de uso**: Los nuevos colores estarán disponibles como clases utilitarias de Tailwind (ej. `bg-matices-primary`, `text-matices-orange`).

## 2. Alineación con Requerimientos No Funcionales (RNF)

### RNF1: Rendimiento de Carga Extrema (Speed)
La definición de variables en la directiva `@theme` de Tailwind v4 se procesa en tiempo de compilación. Esto se traduce en CSS puro compilado estáticamente sin necesidad de scripts en tiempo de ejecución, lo que ayuda a mantener el rendimiento en Lighthouse al 100%.

### RNF2: Diseño Responsivo Mobile-First
La configuración de temas nativa no afecta las clases de layout responsivas. Los componentes conservarán su flujo móvil predeterminado y aplicarán breakpoints (`lg:`, `xl:`) usando la nueva escala cromática de forma completamente fluida.

### RNF3: Accesibilidad Semántica y SEO
El contraste visual de la nueva paleta se mapea para cumplir con los estándares WCAG AA. El azul oscuro profundo (`#243B55`) provee una excelente relación de contraste para el texto principal sobre fondos claros, asegurando la legibilidad.

## 3. Estructura y Archivos Afectados

La implementación se limita estrictamente a:
- **`src/styles/global.css`**: Modificación para redefinir el bloque `@theme` y registrar las variables bajo el prefijo `matices`.
