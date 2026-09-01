// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Contract test for the canonical typography tokens in `src/styles/global.css`
 * (Tailwind CSS v4 `@theme`). Guards the heading-font-migration change:
 * `--font-heading` must be **Antic** (legacy heading font removed), and
 * `--font-sans` must remain Plus Jakarta Sans.
 */
const globalCss = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8');

function extractFontToken(token: string): string | undefined {
  const line = globalCss.split('\n').find((l) => l.includes(`--${token}:`));
  return line?.trim();
}

describe('canonical typography tokens (global.css)', () => {
  it('uses Antic as the heading font', () => {
    expect(extractFontToken('font-heading')).toBe(
      '--font-heading: "Antic", ui-sans-serif, system-ui, sans-serif;',
    );
  });

  it('does not reference the legacy heading font in the token', () => {
    expect(globalCss).not.toContain('Playfair');
  });

  it('keeps Plus Jakarta Sans as the body font', () => {
    expect(extractFontToken('font-sans')).toBe(
      '--font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;',
    );
  });
});