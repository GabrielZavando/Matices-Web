# Plan de Tareas: Configuración de la Nueva Paleta de Colores

Este documento detalla los pasos secuenciales necesarios para aplicar la paleta tradicional de Matices Consultoría Integral en el archivo de configuración global.

## Fase 1: Componentes Globales
*No aplica para este cambio (Fuera de alcance en esta iteración).*

## Fase 2: Enrutamiento y Páginas
*No aplica para este cambio (Fuera de alcance en esta iteración).*

## Fase 3: Estilos Base y Configuración Global

- [x] **Configurar las variables de color tradicionales en global.css** (Tiempo estimado: 30 minutos)
  - Abre el archivo `src/styles/global.css`.
  - En la directiva `@theme`, elimina por completo las variables del tema orgánico previo:
    - `--color-crema-calido`
    - `--color-verde-bosque`
    - `--color-verde-lima`
    - `--color-azul-celeste`
  - Inyecta y registra las nuevas variables de color corporativas bajo el prefijo `matices`:
    ```css
    --color-matices-primary: #243B55;
    --color-matices-blue: #5A7FA3;
    --color-matices-green: #98C245;
    --color-matices-orange: #F09E46;
    --color-matices-bg: #F4F7F9;
    ```
  - Conserva intactas las directivas `@import "tailwindcss";` y las definiciones de tipografía (`--font-sans` y `--font-heading`).

- [x] **Verificar la integridad de la compilación estática** (Tiempo estimado: 20 minutos)
  - Ejecuta el comando de verificación `pnpm run astro check` o el build en producción para garantizar que no existan errores de compilación ni variables huérfanas en el archivo global de estilos.
  - Monitorea la consola del servidor de desarrollo para comprobar que los estilos de Tailwind v4 se recompilen correctamente sin conflictos.
