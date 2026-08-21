// ESLint flat config — Astro sites / landing
//
// Mechanical enforcement of the SOLID/POO principle declared in
// docs/base-standards.md §9 and docs/frontend-standards.md.
//
// Astro has the smallest malicious surface of the three template stacks
// (no run-time business logic container as in NestJS/Angular). The main
// risk is logic leaking into the frontmatter. ESLint can only catch *size*
// signals here; checking whether frontmatter holds *business logic* (vs
// rendering-only instructions) is the Lente Architect's job
// (code-auditing SKILL, Fase 8 / Astro).
//
// SOLID coverage in this file:
//   SRP — `max-lines`  (size guard only)
//
// LOCAL ADAPTATION (intentional drift from upstream Specboot template):
//   - Rewritten as ESLint flat config (upstream ships legacy eslintrc
//     format for ESLint 8, EOL). Requires eslint >= 9.
//   - eslint-plugin-sonarjs omitted (not installed in this project);
//     core `complexity` covers cyclomatic complexity.
//   - HONEST LIMITATION inherited from upstream: no numeric max-lines
//     threshold is pinned for Astro yet; mirrors the Angular value as a
//     `warn` (NOT `error`) until a future ticket pins the number.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  {
    // Position-independent global ignores (this config lives outside the repo root).
    ignores: ['**/dist/**', '**/node_modules/**', '**/.astro/**', '**/*.spec.ts'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['src/**/*.{ts,astro}'],
    rules: {
      // SOLID: SRP — component size guard. warn (not error) — see HONEST LIMITATION above.
      'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 10],
    },
  },
];
