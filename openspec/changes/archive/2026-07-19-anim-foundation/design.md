# Diseño: Sistema Base de Animación CSS (`anim-foundation`)

Este documento especifica la implementación técnica de la fundación de animación.
Todo el código resultante debe estar completamente tipado, sin `any`, y seguir
TDD (el test fallido se escribe antes que el helper).

---

## 1. Tokens y Keyframes en `src/styles/global.css`

Se añaden los tokens de animación dentro del bloque `@theme` existente (Tailwind
CSS v4 genera automáticamente las utilidades `animate-*` correspondientes) y los
`@keyframes` asociados al final del archivo.

```css
@theme {
  /* ...tokens existentes... */

  /* Animation tokens (genera utilidades animate-*) */
  --animate-fade-up:  fade-up  0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  --animate-fade-in:  fade-in  0.6s ease both;
  --animate-scale-in: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  --animate-slide-l:  slide-l  0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  --animate-slide-r:  slide-r  0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  --animate-float:    float    6s   ease-in-out infinite;
}

@keyframes fade-up  { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes fade-in  { from { opacity: 0; } to { opacity: 1; } }
@keyframes scale-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes slide-l  { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: none; } }
@keyframes slide-r  { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
@keyframes float    { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
```

## 2. Sistema de Revelado Progresivo (`.reveal`)

Se añade al final de `global.css`. El estado oculto inicial **solo** se aplica
cuando `html.js` está presente y el usuario permite motion. El reset a estado
visible usa `transition` respetando un `transition-delay` por elemento (stagger).

```css
/* Progressive-enhancement reveal system */
@media (prefers-reduced-motion: no-preference) {
  html.js .reveal {
    opacity: 0;
    will-change: opacity, transform;
  }
  html.js .reveal--fade-up  { transform: translateY(24px); }
  html.js .reveal--slide-l  { transform: translateX(-24px); }
  html.js .reveal--slide-r  { transform: translateX(24px); }
  html.js .reveal--scale-in { transform: scale(0.96); }
  html.js .reveal--fade-in  { transform: none; }

  html.js .reveal.is-visible {
    opacity: 1;
    transform: none;
    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--reveal-delay, 0ms);
  }
}

/* Reduced motion: nunca ocultar el contenido */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

- El stagger se controla con la propiedad CSS arbitraria `--reveal-delay`
  (p. ej. `[--reveal-delay:200ms]`), **sin usar `style=""` inline**.
- La clase `is-visible` la añade el helper en el momento de la intersección.

## 3. Helper `src/lib/animations.ts` (tipado, TDD)

```ts
export interface RevealOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

const REVEAL_SELECTOR = '.reveal:not(.is-visible)';

function revealAllImmediately(): void {
  document
    .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    .forEach((el) => el.classList.add('is-visible'));
}

export function initReveal(options: RevealOptions = {}): void {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealAllImmediately();
    return;
  }

  const {
    root = null,
    rootMargin = '0px 0px -10% 0px',
    threshold = 0.15,
    once = true,
  } = options;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (once) obs.unobserve(entry.target);
        }
      });
    },
    { root, rootMargin, threshold }
  );

  document
    .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    .forEach((el) => observer.observe(el));
}
```

**Casos de test** (`src/lib/animations.spec.ts`, entorno jsdom):
1. Añade `is-visible` a un `.reveal` cuando su entry `isIntersecting` es `true`.
2. Con `once`, llama `unobserve` sobre el elemento tras revelarlo.
3. Bajo `prefers-reduced-motion: reduce`, revela todos los `.reveal` sin crear
   `IntersectionObserver`.
4. En contexto SSR (`window` indefinido) no lanza excepción.
5. Respeta `rootMargin` y `threshold` pasados al constructor del observer.

## 4. Componente `src/components/ui/Reveal.astro`

Punto de integración único para marcar elementos animables. Usa una prop
`delay` convertida a clase arbitraria (sin `style=""`).

```astro
---
interface Props {
  as?: 'div' | 'section' | 'article' | 'li' | 'ul' | 'header' | 'span' | 'figure';
  variant?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-l' | 'slide-r';
  delay?: number;
  class?: string;
  [key: string]: unknown;
}

const {
  as = 'div',
  variant = 'fade-up',
  delay = 0,
  class: className = '',
  ...rest
} = Astro.props;

const revealClass = [
  'reveal',
  `reveal--${variant}`,
  delay > 0 ? `[--reveal-delay:${delay}ms]` : '',
  className,
]
  .filter(Boolean)
  .join(' ');

const Tag = as;
---
<Tag class={revealClass} {...rest}>
  <slot />
</Tag>
```

## 5. Integración en `src/layouts/Layout.astro`

- En `<head>`, antes del primer paint, script `is:inline`:
  ```astro
  <script is:inline>
    document.documentElement.classList.add('js');
  </script>
  ```
- Al final de `<body>`, script de cliente que importa e inicializa el helper:
  ```astro
  <script>
    import { initReveal } from '../lib/animations';
    initReveal();
  </script>
  ```

## 6. Documentación `docs/DESIGN.md`

Añadir sección **Motion** que documente:
- Principios: sutil/breathable, solo `transform`/`opacity`, `prefers-reduced-motion`.
- Tokens `--animate-*` y keyframes disponibles.
- Uso del componente `<Reveal>` y la clase `.reveal` (con `--reveal-delay` para stagger).
- Garantía de enhancement progresivo (contenido visible si falla el JS).
