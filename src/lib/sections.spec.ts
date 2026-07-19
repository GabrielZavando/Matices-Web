// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../../dist');

type PageSpec = { file: string; minFadeUp: number };

// Thresholds are set ABOVE the current hero-only counts (index: 6, content pages: 5)
// so the test is RED before T3 wraps section/card content, and GREEN afterwards.
const pages: PageSpec[] = [
  { file: 'index.html', minFadeUp: 7 },
  { file: 'talento/index.html', minFadeUp: 6 },
  { file: 'psicologia/index.html', minFadeUp: 6 },
  { file: 'testing/index.html', minFadeUp: 6 },
  { file: 'id/index.html', minFadeUp: 6 },
  { file: 'formacion/index.html', minFadeUp: 6 },
];

describe('anim-sections: reveal markup present in built pages', () => {
  for (const { file, minFadeUp } of pages) {
    it(`page ${file} exposes at least ${minFadeUp} reveal--fade-up elements`, () => {
      const path = join(distDir, file);
      expect(existsSync(path)).toBe(true);
      const html = readFileSync(path, 'utf-8');
      const count = (html.match(/reveal--fade-up/g) ?? []).length;
      expect(count).toBeGreaterThanOrEqual(minFadeUp);
    });
  }
});
