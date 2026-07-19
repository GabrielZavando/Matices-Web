# Diseño: Animaciones del Formulario de Contacto (`anim-contact`)

Reutiliza `<Reveal>` y tokens de `anim-foundation`; añade un keyframe nuevo
(`pulse-select`) para la selección.

## 1. Entrada escalonada del formulario (`contacto.astro`)

Envolver cada bloque de sección del `<form>` en `<Reveal as="div" variant="fade-up">`
con `delay` por sección:

```astro
<Reveal as="div" variant="fade-up" delay={0} class="w-full">   <!-- Sección 1: Identificación --> ... </Reveal>
<Reveal as="div" variant="fade-up" delay={120} class="w-full"> <!-- Sección 2: Requerimientos --> ... </Reveal>
<Reveal as="div" variant="fade-up" delay={240} class="w-full space-y-8"> <!-- Sección 3: Detalles --> ... </Reveal>
<Reveal as="div" variant="fade-up" delay={360} class="pt-8 border-t ..."> <!-- Acciones --> ... </Reveal>
```

El honeypot y los campos requeridos permanecen en el DOM (la animación solo
afecta `opacity`/`transform`); la validación de `contacto.astro` no se toca.

## 2. Pulso de selección (`CheckboxCard.astro`, `RadioCard.astro`)

Añadir a `src/styles/global.css` el keyframe:

```css
@keyframes pulse-select {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.02); }
  100% { transform: scale(1); }
}
```

En `CheckboxCard.astro` y `RadioCard.astro`, añadir a `labelClass` la clase
arbitraria que dispara el pulso al quedar seleccionado (vía `:has(:checked)`):

```astro
has-[:checked]:animate-[pulse-select_0.3s_ease]
```

(Tailwind v4 genera `animation: pulse-select 0.3s ease;`.) La animación se
reproduce una vez cuando el elemento empieza a coincidir con `:has(:checked)`.
Bajo `prefers-reduced-motion` se desactiva con la guarda global de `animate-*`
(definida en T5; si aún no existe, añadir `.animate-\[pulse-select_0\.3s_ease\]`
al bloque reduced-motion).

## 3. Pop del icono de éxito (`contacto.astro`)

El modal ya transiciona la tarjeta `scale-95` → `scale-100`. Para el icono de
éxito, en `openModal(state)` añadir la clase `animate-scale-in` al contenedor
del icono cuando `state === 'success'`:

```ts
if (state === 'success') {
  const icon = modal.querySelector('#modal-success .success-icon');
  icon?.classList.add('animate-scale-in');
}
```

(El token `--animate-scale-in` ya existe en `anim-foundation`.) Esto da un
"pop" one-shot al aparecer el éxito.

## Sin nuevos tokens de reveal

Se reutilizan `fade-up` y `scale-in` de `anim-foundation`; solo se añade
`pulse-select`.
