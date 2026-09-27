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

// Astro inlines component-scoped <style> blocks into the page HTML (selectors
// like [data-astro-cid-*]), while global CSS lives in dist/_astro/*.css.
// Concatenate both so keyframes/utilities from either source are found.
function getAllCss(): string {
  return `${getBuiltCss()}\n${readHomeHtml()}`;
}

const css = getAllCss();

describe('hero-team-carousel: home hero team photo carousel', () => {
  it('renders both team photos (team.jpeg and team-one.jpg) in the home hero', () => {
    const html = readHomeHtml();
    // The hero carousel track is a flex row; astro:assets emits hashed avif srcs.
    // The track duplicates each photo once, so the four <img> inside the hero
    // must resolve to exactly two distinct hashed sources. We scope the match to
    // the hero section (before the services section) to avoid other images on the page.
    const heroHtml = html.slice(0, html.indexOf('Nuestros Servicios'));
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