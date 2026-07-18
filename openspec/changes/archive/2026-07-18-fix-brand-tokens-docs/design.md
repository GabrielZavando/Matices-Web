# Especificación de Diseño: Paleta de Marca Matices (Azul Primario)

Esta especificación documenta la paleta corporativa canónica de Matices Consultoría Integral,
alineada al código existente en `src/styles/global.css` (Tailwind CSS v4, directiva `@theme`).

## 1. Tokens de Color Canónicos

Estos son los valores de verdad. Coinciden exactamente con `global.css`:

| Token CSS | Valor Hex | Rol Visual | Utilidad Tailwind |
| :--- | :--- | :--- | :--- |
| `--color-matices-primary` | `#243B55` | Azul oscuro profundo: primario, texto de marca, CTAs, header/footer. | `bg-matices-primary`, `text-matices-primary` |
| `--color-matices-blue` | `#5A7FA3` | Azul medio/acerado: secundario, detalles, iconos. | `bg-matices-blue`, `text-matices-blue` |
| `--color-matices-green` | `#98C245` | Verde lima: acento de éxito, hover, highlights. | `bg-matices-green`, `text-matices-green` |
| `--color-matices-orange` | `#F09E46` | Naranja cálido: alertas y destacados. | `bg-matices-orange`, `text-matices-orange` |
| `--color-matices-bg` | `#F4F7F9` | Fondo gris-azulado muy claro. | `bg-matices-bg`, `text-matices-bg` |

## 2. Aliases de Compatibilidad (no cambiar)

`global.css` conserva estos aliases apuntando a los tokens anteriores. Se mantienen para no
romper componentes existentes:

| Alias | Mapea a | Valor efectivo |
| :--- | :--- | :--- |
| `--color-crema-calido` | `--color-matices-bg` | `#F4F7F9` |
| `--color-verde-bosque` | `--color-matices-primary` | `#243B55` |
| `--color-verde-lima` | `--color-matices-green` | `#98C245` |
| `--color-azul-celeste` | `--color-matices-blue` | `#5A7FA3` |

> Nota: el nombre `verde-bosque` es un alias heredado; su valor es azul por decisión de marca.
> Renombrarlo es un cambio de código fuera de alcance.

## 3. Tipografía (sin cambios)

- Cabeceras: `--font-heading: "Playfair Display"`.
- Cuerpo/labels/formularios: `--font-sans: "Plus Jakarta Sans"`.

## 4. Ítems Diferidos (documentados, no resueltos aquí)

- `src/pages/contacto.astro` contiene un bloque `<style>` (líneas ~452-656) con una paleta
  hardcodeada distinta (navy `#003c56`, oliva `#4e6700`, tertiary `#2e345e`) y tipografía
  `Manrope`. Debe reconciliarse con los tokens de esta especificación en un ticket posterior
  de purga de estilos inline.
