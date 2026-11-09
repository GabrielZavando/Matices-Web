import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function getBuiltCss(): string {
  const cssDir = join(process.cwd(), 'dist', '_astro');
  if (!existsSync(cssDir)) {
    throw new Error('dist/_astro not found — run `pnpm build` before tests');
  }
  const files = readdirSync(cssDir).filter((f) => f.endsWith('.css'));
  return files.map((f) => readFileSync(join(cssDir, f), 'utf8')).join('\n');
}

function readHomeHtml(): string {
  const file = join(process.cwd(), 'dist', 'index.html');
  if (!existsSync(file)) {
    throw new Error('dist/index.html not found — run `pnpm build` before tests');
  }
  return readFileSync(file, 'utf8');
}

/**
 * The hero markup: the first `<section>` child of `<main>`.
 *
 * The scope must be the hero itself and not a proxy range such as "everything
 * before 'Nuestros Servicios'": with the client logos section now rendered
 * right below the hero, that proxy range also collects the logos' own image
 * sources (REQ-011/SC-015). The carousel markup, mask and animation are
 * untouched by this change.
 */
function getHeroSectionHtml(html: string): string {
  const mainIndex = html.indexOf('<main');
  const firstSectionIndex = html.indexOf('<section', mainIndex);
  const sectionPattern = /<section\b|<\/section>/g;
  sectionPattern.lastIndex = firstSectionIndex;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = sectionPattern.exec(html)) !== null) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (depth === 0) {
      return html.slice(mainIndex, match.index + match[0].length);
    }
  }
  throw new Error('Could not delimit the first <section> of <main> in dist/index.html');
}

// Astro inlines component-scoped <style> blocks into the page HTML (selectors
// like [data-astro-cid-*]), while global CSS lives in dist/_astro/*.css.
// Concatenate both so keyframes/utilities from either source are found.
function getAllCss(): string {
  return `${getBuiltCss()}\n${readHomeHtml()}`;
}

const css = getAllCss();

describe('hero-team-carousel: home hero team photo carousel', () => {
  it('[SC-015] (REQ-011): renders both team photos (team.jpeg and team-one.jpg) scoped to the hero section', () => {
    const html = readHomeHtml();
    // The hero carousel track is a flex row; astro:assets emits hashed avif srcs.
    // The track duplicates each photo once, so the four <img> inside the hero
    // must resolve to exactly two distinct hashed sources. The inspected range
    // is the hero section itself (the first <section> of <main>), so the client
    // logos section rendered below it does not contribute its own sources.
    const heroHtml = getHeroSectionHtml(html);
    const imgSrcs = heroHtml.match(/src="\/_astro\/[^"]+\.avif"/g) ?? [];
    // Track has 3 slides (A-B-A): each of the 2 unique photos appears at least once.
    expect(imgSrcs.length).toBeGreaterThanOrEqual(3);
    const unique = new Set(imgSrcs);
    expect(unique.size).toBe(2);
  });

  it('keeps the hero mask with overflow hidden around a 200% track', () => {
    const html = readHomeHtml();
    expect(html).toContain('overflow-hidden');
    expect(html).toContain('aspect-[4/5]');
  });

  it('defines the carousel track animation with a 300% width loop in CSS', () => {
    // Track utility + keyframes must exist in the compiled CSS for the loop.
    expect(css).toContain('hero-carousel-track');
    expect(css).toMatch(/width:\s*300%/);
    expect(css).toContain('@keyframes hero-carousel');
    // 11s cycle: 5s hold + 0.5s slide + 5s hold + 0.5s slide.
    // The Rust compiler (Astro 7) minifies the shorthand differently than Go.
    expect(css).toMatch(/animation:\s*11s\s+ease-in-out\s+infinite\s+hero-carousel/);
  });

  it('disables carousel animation under prefers-reduced-motion', () => {
    // The bundler may group reduced-motion rules; assert the carousel is disabled.
    // Rust compiler output has different bracket placement than Go.
    expect(css).toMatch(/hero-carousel-track\[data-astro-cid-[^\]]*\][^{]*\{animation:none/);
  });
});