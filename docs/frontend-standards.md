# Frontend Standards - Astro & Tailwind CSS

## 1. Mandatory Mobile-First Approach
* Every grid, alignment box, spacing, or interactive component MUST be structured using mobile device resolutions as the default baseline (e.g., `class="w-full flex flex-col p-4"`).
* Tailwind CSS responsive modifiers (`md:`, `lg:`, `xl:`) are exclusively reserved for scaling designs up to desktop screens.
* Complex asymmetrical compositions (RNF2) must collapse vertically on smartphones, prioritizing text and CTAs at the top.

## 2. Design System and Visual Identity Tokens
* **Corporate Color Palette**:
  * `primary`: `#236c32` (Lively Green).
  * `secondary`: `#25667b` (Deep Teal).
  * `background` / `surface`: `#f9f9f8` (Warm Cream / Off-White).
* **Typography Strategy**:
  * Main Headings: **Playfair Display**.
  * Body text, labels, and forms: **Plus Jakarta Sans**.
* **Shapes and Elevations**:
  * Base input/button radii: `0.5rem` (`8px`).
  * Containers/Masks: Asymmetrical curves from `1.5rem` to `3rem`.

## 3. Optimization and Static Islands
* **Extreme Load Performance (RNF1)**: The traditional HTML `<img />` tag is strictly forbidden. Every image must be processed using the native `<Image />` component from `astro:assets` (WebP/AVIF).
* **Semantic Accessibility (RNF3)**: The DOM tree must be structured using HTML5 semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).