# Diseño: Micro-interacciones de Componentes Globales (`anim-components`)

Se añaden utilidades de animación a `src/styles/global.css` (junto al sistema de
`anim-foundation`) y se aplican en `Header.astro`, `Footer.astro` y
`src/pages/index.astro`.

## 1. Utilidad `.link-underline` (subrayado animado)

```css
.link-underline {
  position: relative;
  display: inline-block;
}
.link-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  width: 100%;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.link-underline:hover::after,
.link-underline:focus-visible::after {
  transform: scaleX(1);
}
@media (prefers-reduced-motion: reduce) {
  .link-underline::after { transition: none; }
}
```

## 2. Utilidad `.nav-link` (indicador activo/hover en nav)

```css
.nav-link {
  position: relative;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  width: 100%;
  background-color: var(--color-verde-bosque);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover::after,
.nav-link:focus-visible::after,
.nav-link[aria-current="page"]::after {
  transform: scaleX(1);
}
@media (prefers-reduced-motion: reduce) {
  .nav-link::after { transition: none; }
}
```

## 3. Utilidad `.card-lift` (elevación de tarjeta)

```css
.card-lift {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}
.card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -12px rgba(36, 59, 85, 0.25);
}
@media (prefers-reduced-motion: reduce) {
  .card-lift { transition: none; }
  .card-lift:hover { transform: none; }
}
```

## 4. Aplicación

* **Footer** (`Footer.astro`): añadir `link-underline` a los `<a>` de
  `quickLinks`, `legalLinks`, y a la CTA "Iniciar Diagnóstico" y al link mailto
  de la barra de crédito.
* **Index SCOUTHEM** (`index.astro`): añadir `link-underline` al link "Conoce
  nuestra plataforma SCOUTHEM".
* **Header** (`Header.astro`): reemplazar la clase `border-b-2 border-verde-bosque`
  del link activo por `nav-link` + `aria-current="page"` en desktop y móvil;
  añadir `nav-link` a todos los links de nav (desktop y móvil) para el hover.
* **Index servicios** (`index.astro`): añadir `card-lift` a las 6 tarjetas
  "Nuestros Servicios" (reemplazando `hover:shadow-lg transition-shadow` por la
  utilidad unificada), manteniendo el `group` para los iconos internos.
