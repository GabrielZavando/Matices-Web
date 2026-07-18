# Design: refactor-contact-tokenization

## 1. Tokens de color (src/styles/global.css @theme)

```
--color-contact-background:#f8f9fa
--color-contact-on-background:#191c1d
--color-contact-primary:#003c56
--color-contact-on-primary:#ffffff
--color-contact-secondary:#4e6700
--color-contact-secondary-container:#c6f34c
--color-contact-on-secondary-fixed:#151f00
--color-contact-tertiary:#2e345e
--color-contact-surface-tint:#206488
--color-contact-surface-container-lowest:#ffffff
--color-contact-surface-container-low:#f3f4f5
--color-contact-surface-variant:#e1e3e4
--color-contact-on-surface:#191c1d
--color-contact-on-surface-variant:#40484e
--color-contact-outline:#71787e
--color-contact-primary-container:#005477
--color-contact-on-primary-container:#8bc7ef
--color-contact-error:#ba1a1a
```

## 2. Tipografía y fuentes

- **Eliminar Manrope**. El `<style>` de `contacto.astro` la carga vía `@import`
  (lín. 456) y no se usa en ninguna otra parte del proyecto. Se borra esa línea.
- **Plus Jakarta Sans ya está cargada globalmente** en `src/layouts/Layout.astro`
  (`<link>` a Google Fonts, líns. 56-62) y es la fuente `--font-sans` del sistema.
  Por tanto **NO se modifica `Layout.astro` ni `global.css`** de fuentes, y no hace falta
  ningún `@import` en el componente (evita doble carga / render-blocking).
- Toda la tipografía del componente (display, headline, body, label) usa **Plus Jakarta
  Sans** vía la utilidad global `font-sans`. No se crean tokens de familia de contacto.
- Escala tipográfica (tamaños idénticos a los actuales; la familia de body/label cambia
  de Manrope a Plus Jakarta Sans por decisión de producto):
  - `--text-display-lg: 48px` (line-height 56px; en md 64px/72px)
  - `--text-headline-md: 24px / 32px`
  - `--text-body-lg: 18px / 28px`
  - `--text-body-md: 16px / 24px`
  - `--text-label-sm: 12px / 16px`
  - `--text-label-md: 14px / 20px`
- El hero `h1` mantiene Plus Jakarta Sans (coherente con el sistema).

## 3. Espaciado y decoración (utilidades arbitrarias)

- `pt-xl`(80) -> `pt-[80px]`; `pb-lg`(48) -> `pb-[48px]`; `mb-xl`(80) -> `mb-[80px]`
- `px-margin-mobile`(16) -> `px-[16px]`; `gap-gutter`(24) -> `gap-[24px]`
- `.matiz-blob` -> `h-[400px] w-[400px] rounded-full blur-[80px] opacity-[0.15] -z-10 pointer-events-none absolute`
- `.form-shadow` -> `shadow-[0_10px_40px_-10px_rgba(0,60,86,0.15)]`

## 4. Swaps en el markup (activar foco real)

- inputs: `focus:border-primary` -> `focus:border-contact-primary` ; `focus:ring-primary/10` -> `focus:ring-contact-primary/10`
- checkboxes: `text-primary` -> `text-contact-primary` ; `focus:ring-primary` -> `focus:ring-contact-primary`
- JS: `border-error` -> `border-contact-error`
- Eliminar reglas muertas del `<style>`: `.active`, `.active-primary`, `input:focus`, `input[type=checkbox]`

## 5. Contrato (contact_preference opcional)

- radios `contact_preference`: quitar `required`
- `leadPayload.REQUIRED_FIELDS`: sin `contactPreference`
- `docs/api-spec.yml` / `docs/data-model.md`: `contact_preference` -> Optional
