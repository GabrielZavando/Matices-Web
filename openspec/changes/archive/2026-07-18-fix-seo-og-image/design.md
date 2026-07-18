# Especificación de Diseño: Imagen OG por Defecto

## 1. Requisitos del Asset

- Formato: JPEG (compatible con scrapers sociales; el SVG no es soportado por todas las redes).
- Dimensiones: 1200×630 px (ratio 1.91:1 recomendado por Open Graph).
- Composición: fondo sólido azul corporativo `#243B55`, logo `src/assets/logo.webp`
  centrado y escalado para no exceder ~40% del ancho.
- Ruta final: `public/images/og-default.jpg`.

## 2. Generación

Usar `sharp` para:
1. Crear un lienzo 1200×630 relleno `#243B55`.
2. Cargar `src/assets/logo.webp`, redimensionarlo (p.ej. ancho ~420px, preservando aspecto).
3. Compositar el logo centrado sobre el lienzo.
4. Exportar a `public/images/og-default.jpg` (quality ~80).

## 3. Verificación

Tras `astro build`, el archivo `dist/images/og-default.jpg` debe existir y la meta etiqueta
`og:image` debe apuntar a `/images/og-default.jpg` (resolución 200).
