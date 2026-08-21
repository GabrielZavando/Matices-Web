---
name: Natural Vitality
colors:
  surface: '#f9f9f8'
  surface-dim: '#d9dad9'
  surface-bright: '#f9f9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f3'
  surface-container: '#edeeed'
  surface-container-high: '#e7e8e7'
  surface-container-highest: '#e1e3e2'
  on-surface: '#191c1c'
  on-surface-variant: '#40493f'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#f0f1f0'
  outline: '#707a6e'
  outline-variant: '#c0c9bc'
  surface-tint: '#243B55'
  primary: '#243B55'
  on-primary: '#ffffff'
  primary-container: '#5A7FA3'
  on-primary-container: '#ffffff'
  inverse-primary: '#9DB8D4'
  secondary: '#5A7FA3'
  on-secondary: '#ffffff'
  secondary-container: '#aae6fe'
  on-secondary-container: '#243B55'
  tertiary: '#98C245'
  on-tertiary: '#ffffff'
  tertiary-container: '#F09E46'
  on-tertiary-container: '#3A2A00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a8f5ab'
  primary-fixed-dim: '#8dd891'
  on-primary-fixed: '#002107'
  on-primary-fixed-variant: '#00531c'
  secondary-fixed: '#b9eaff'
  secondary-fixed-dim: '#94cfe7'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#004d61'
  tertiary-fixed: '#ffddb5'
  tertiary-fixed-dim: '#ffb957'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#F4F7F9'
  on-background: '#191c1c'
  surface-variant: '#e1e3e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

This design system is built upon the concept of "Natural Vitality"—a harmonious intersection between the raw energy of the outdoors and the refined precision of modern design. It targets a sophisticated audience that values sustainability, health, and premium craftsmanship.

The visual style is a hybrid of **Modern Organic** and **Sophisticated Elegance**. It utilizes generous white space and a fluid layout to evoke a sense of breathability, while incorporating subtle **Glassmorphism**—directly inspired by the "stained glass" quality of the reference logo—to create depth and light-refraction effects. The emotional response should be one of revitalized calm: energetic enough to inspire action, but stable enough to build deep trust.

## Colors

The palette is extracted from the corporate identity of Matices Consultoría Integral.
- **Primary (Corporate Blue):** A deep, confident blue (`#243B55`) used for primary actions, headings, brand text and CTAs. It provides excellent WCAG AA contrast on light backgrounds.
- **Secondary (Steel Blue):** A calmer mid-blue (`#5A7FA3`) derived from the primary, used for secondary elements, details and icons.
- **Tertiary (Lime Accent):** A vivid lime green (`#98C245`) and warm orange (`#F09E46`) used sparingly as success/highlight accents.
- **Surface Neutrals:** A range of warm, "stone-washed" greys and off-whites (`#F4F7F9`) that prevent the interface from feeling clinical or cold.

## Typography

The typographic strategy balances two distinct personalities:
1. **Playfair Display (Serif):** Used for headlines and display text to provide "Sophisticated Elegance." Its high contrast and classic letterforms evoke luxury and editorial authority.
2. **Plus Jakarta Sans (Sans-Serif):** Used for body copy, UI labels, and inputs. Its soft, open terminals provide a "Modern Organic" feel that ensures high legibility and a friendly, approachable tone.

Scale headlines aggressively on desktop to create a rhythmic "magazine" feel, while collapsing to more functional sizes on mobile to maintain readability.

## Layout & Spacing

This design system employs a **Fluid Grid** model with a 12-column structure on desktop.
- **Rhythm:** An 8px baseline grid ensures vertical consistency, while a 4px unit is used for tight internal component padding.
- **Margins:** Intentional use of "asymmetric breathing room." In certain editorial sections, content should be offset or span 8 columns rather than 12 to create visual interest.
- **Breakpoints:**
  - **Mobile (<600px):** 4 columns, 16px margins.
  - **Tablet (600px - 1024px):** 8 columns, 32px margins.
  - **Desktop (>1024px):** 12 columns, 64px margins with a centered max-width container.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Luminous Glassmorphism**:
- **Surfaces:** Main content lives on a Level 0 (Neutral) background. Overlays and cards use Level 1 (Pure White) with a 2% tint of the primary green.
- **Shadows:** Avoid heavy black shadows. Use "Ambient Glows"—extra-diffused, low-opacity shadows (6-10% opacity) tinted with the Secondary Teal color to simulate natural lighting.
- **Backdrop Blur:** Use a 12px-16px blur on navigation bars and floating modals to create a "frosted leaf" effect, allowing background colors to peek through without sacrificing legibility.

## Shapes

The shape language is consistently **Rounded**, avoiding sharp corners to maintain the "Organic" theme.
- **Standard UI (Buttons/Inputs):** 0.5rem (8px) radius.
- **Containers/Cards:** 1rem (16px) radius for a soft, approachable framing.
- **Media/Imagery:** Should use slightly larger radii (1.5rem) or organic, non-perfect circular masks to echo the logo's petal-like shapes.

## Components

### Buttons
- **Primary:** Solid "Corporate Blue" (`#243B55`) with white text. High-contrast, bold weight.
- **Secondary:** Outlined in "Steel Blue" (`#5A7FA3`) with a subtle blue fill on hover.
- **Tertiary:** Text-only with an animated underline that mimics growth (left-to-right expansion).

### Input Fields
- Use a soft warm-grey background (`#F0F2F0`) rather than a white box. 
- On focus, the border transitions to the Primary Blue with a soft glow.

### Cards
- Cards should not have heavy borders. Use a Level 1 shadow and a 1px soft-blue inner stroke to define the edge against the background.

### Chips & Tags
- Pill-shaped (rounded-xl). Use low-saturation versions of the logo colors (steel blue, soft orange, pale lime) to categorize content without overwhelming the primary blue.

### Lists
- Use custom iconography for bullet points based on the logo's central intersection shape (the "leaf" overlap).

## Motion

Motion reinforces the "Natural Vitality" identity: **subtle, breathable, sophisticated**. Animations are CSS-only (Tailwind v4 `@theme` tokens) plus a minimal native `IntersectionObserver` helper (`src/lib/animations.ts`). No animation libraries are used (RNF1).

### Principles
- **Compositor-only properties**: animate exclusively `opacity` and `transform` to avoid layout/paint cost and protect LCP/CLS.
- **Subtle & breathable**: entrances use `translateY` ≤ 24px, durations ≤ 600ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Accessible by default**: every animation is wrapped in `@media (prefers-reduced-motion: no-preference)`. Under `prefers-reduced-motion: reduce` all content is shown statically (never hidden).
- **Progressive enhancement**: the hidden initial state is applied only when `html.js` is present (set by `Layout.astro`). If JS fails or `IntersectionObserver` is unavailable, content is revealed immediately — it is never left invisible.

### Tokens (`src/styles/global.css` `@theme`)
| Token | Keyframes | Use |
| :--- | :--- | :--- |
| `--animate-fade-up` | `fade-up` | Elements rise + fade in (default reveal) |
| `--animate-fade-in` | `fade-in` | Pure opacity fade |
| `--animate-scale-in` | `scale-in` | Subtle scale from 0.96 + fade |
| `--animate-slide-l` | `slide-l` | Enter from left |
| `--animate-slide-r` | `slide-r` | Enter from right |
| `--animate-float` | `float` | Ambient vertical float (6s loop) |

### Usage
- Wrap any block with the `<Reveal>` component (`src/components/ui/Reveal.astro`). Props: `as` (tag), `variant` (`fade-up|fade-in|scale-in|slide-l|slide-r`), `delay` (ms → applied as `[--reveal-delay:Nms]`, no inline `style`), plus `class` and arbitrary attributes.
- `initReveal()` is invoked once from `Layout.astro` and adds `is-visible` to `.reveal` elements as they enter the viewport.
- Stagger sequences by passing incremental `delay` values (e.g. `0`, `80`, `160` ms).