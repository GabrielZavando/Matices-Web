# Diseño: Animación Ambiental / Decorativa (`anim-ambient`)

Reutiliza `--animate-float` (keyframe `float`, definido en `anim-foundation`).

## 1. Guarda de accesibilidad para animaciones ambientales

En `src/styles/global.css`, añadir junto a la guarda de `.reveal`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-float {
    animation: none !important;
  }
}
```

## 2. Orbes de `contacto.astro`

Los 3 orbes de fondo (líneas ~51-53) y el cluster inferior (líneas ~266-272)
reciben `animate-float` con delays escalonados vía propiedad arbitraria
(`[animation-delay:...]`, que genera una clase utilitaria, no `style=""` inline):

```astro
<div class="... rounded-full blur-[80px] opacity-[0.15] -z-10 pointer-events-none absolute bg-contact-secondary top-20 -left-20 animate-float [animation-delay:0ms]"></div>
<div class="... bg-contact-surface-tint bottom-40 -right-20 animate-float [animation-delay:2s]"></div>
<div class="... bg-contact-secondary-container top-1/2 left-1/2 -translate-x-1/2 animate-float [animation-delay:4s]"></div>
```

El cluster inferior (3 círculos `-space-x-20`) puede recibir `animate-float` con
distintos delays para un efecto de deriva suave.

## 3. Acentos en los heroes (6 páginas)

* **Blob decorativo**: dentro de cada `<section>` hero (ya `relative
  overflow-hidden`), añadir un `<div>` absolutamente posicionado, borroso y
  `pointer-events-none -z-10`, con `animate-float`:
  ```astro
  <div class="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-verde-lima/10 blur-3xl -z-10 pointer-events-none animate-float"></div>
  ```
  Ajustar posición/color por página para no tapar texto (mantener `-z-10`).
* **Badges glassmorphism existentes**: añadir `animate-float` a los badges
  flotantes ya presentes ("98% Match" en `index`, "98%" en `talento`, "+15 Años"
  en `psicologia`), que hoy son `absolute hidden sm:block`.

## Sin nuevos keyframes

Se reutiliza `float` de `anim-foundation`; no se crean keyframes nuevos.
