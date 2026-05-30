# Global Base Standards - Matices Consultoría Integral

## 1. Repository Language and Nomenclature
* **Source Code and Infrastructure**: All Astro files, components, variables, Props, TypeScript interfaces, Git commits, and engineering documentation MUST be written strictly in **English**.
* **Visual Layer and User Content**: All end-user copywriting, UI microcopy, SEO tags, B2B form fields, success/error messages, and business-layer assets MUST be written strictly in **Spanish**.

## 2. Semantic Commit Conventions
* `feat(ui)`: New visual components or page integrations.
* `fix(form)`: Bug fixes in validation or Honeypot logic.
* `docs(seo)`: Updates to structured metadata or OpenSpec markdown.
* `refactor(style)`: Strict utility layout adjustments using Tailwind CSS.

## 3. Incremental Build Hierarchy (Non-Negotiable)
1. **Phase 1: Reusable Global UI Components**: Universal Header (Sticky Navbar) and Universal Footer.
2. **Phase 2: Base Page Structure and Layout**: Static file-based routing configuration in `src/pages/` for the 6 key sections.
3. **Phase 3: Page-by-Page Construction**: Modular and progressive section-by-section development, starting mandatorily with the Home Landing Page (`index.astro`).

## 4. Type Safety & Prohibitions
* The use of the `any` type or compiler suppression directives (`@ts-ignore`, `@ts-nocheck`) is strictly prohibited.
* Inline styles (`style=""`) or global `.css` files are forbidden. All design is resolved with Tailwind CSS utility classes.
* Heavy SPA frameworks (React, Vue, Svelte) are forbidden to protect the bundle size.