import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

// Rendering test (no real DOM): validates the compiled static HTML output of
// `contacto.astro`. This exercises the real RadioCard/CheckboxCard markup that
// ships to production, avoiding the need for a JS DOM while still asserting the
// post-refactor a11y/DRY structure.
const DIST_PATH = resolve(process.cwd(), 'dist/contacto/index.html');

let pageHtml = '';

beforeAll(() => {
  if (!existsSync(DIST_PATH)) {
    // Self-contained: build the static site if the dist artifact is missing.
    execSync('npx astro build', { stdio: 'inherit' });
  }
  pageHtml = readFileSync(DIST_PATH, 'utf-8');
}, 120000);

/** Extract every <input ...> tag of a given type from the markup. */
function inputsOfType(html: string, type: 'radio' | 'checkbox'): string[] {
  const re = new RegExp(`<input[^>]*type="${type}"[^>]*>`, 'g');
  return html.match(re) ?? [];
}

describe('Contact form a11y / DRY — rendered static output', () => {
  describe('Scenario 1: Radios stay in the accessibility tree (sr-only, not hidden)', () => {
    it('renders 8 radios, all sr-only and none hidden', () => {
      const radios = inputsOfType(pageHtml, 'radio');
      expect(radios).toHaveLength(8);
      for (const radio of radios) {
        expect(radio).toContain('class="sr-only"');
        expect(radio).not.toContain('hidden');
      }
    });
  });

  describe('Scenario 4: Checkbox keeps consistent size in long-label rows', () => {
    it('renders the multi-column checkbox input with shrink-0 and md:col-span-2', () => {
      const checkboxes = inputsOfType(pageHtml, 'checkbox');
      expect(checkboxes).toHaveLength(9);
      // Every checkbox keeps its fixed, non-shrinking box.
      for (const cb of checkboxes) {
        expect(cb).toContain('h-5 w-5 shrink-0');
      }
      // The long-label "Cumplimiento" option spans two columns.
      const colSpanIdx = pageHtml.indexOf('md:col-span-2"> <input name="organizational_challenges"');
      expect(colSpanIdx).toBeGreaterThan(-1);
      const chunk = pageHtml.slice(colSpanIdx, colSpanIdx + 220);
      expect(chunk).toContain('type="checkbox"');
      expect(chunk).toContain('h-5 w-5 shrink-0');
    });
  });

  describe('Scenario 5: Option groups are rendered from data arrays', () => {
    it('maps each array to the expected number of inputs', () => {
      expect(pageHtml.match(/name="organization_size"/g) ?? []).toHaveLength(4);
      expect(pageHtml.match(/name="contact_preference"/g) ?? []).toHaveLength(4);
      expect(pageHtml.match(/name="services_of_interest"/g) ?? []).toHaveLength(4);
      expect(pageHtml.match(/name="organizational_challenges"/g) ?? []).toHaveLength(5);
    });
  });

  describe('Scenario 6: Collapsibles use grid-rows transition with inner overflow wrapper', () => {
    it('uses grid-rows-[0fr] for both collapsibles plus an inner overflow-hidden min-h-0 wrapper', () => {
      expect(pageHtml.match(/grid-rows-\[0fr\]/g) ?? []).toHaveLength(2);
      expect(pageHtml.match(/overflow-hidden min-h-0/g) ?? []).toHaveLength(2);
    });
  });
});
