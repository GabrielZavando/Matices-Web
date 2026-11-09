// @vitest-environment happy-dom
/**
 * Contract test for the section order of the home page
 * (TICKET-007, change `restructure-page-content`, task T-003).
 *
 * It asserts the built home (`dist/index.html`) against scenarios SC-006 and
 * SC-007 of `openspec/changes/restructure-page-content/scenarios.md` and
 * requirement REQ-004, BEFORE the client logos section is relocated (TDD RED
 * phase).
 *
 * Sections are identified by their stable, distinctive copy (already present
 * in `src/pages/index.astro`), so the contract does not depend on CSS
 * classes, ids or DOM structure that the change does not touch.
 *
 * Pattern mirrors `src/lib/testingScouthemSection.spec.ts`: read the static
 * build output.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../../dist');
const homePath = join(distDir, 'index.html');

/** Distinctive copy that identifies each home section unambiguously. */
const SECTION_ANCHORS: ReadonlyArray<{ id: string; text: string }> = [
  { id: 'hero', text: 'Reclutamiento y Selección Estratégica' },
  { id: 'logos', text: 'Empresas que han confiado en nosotros' },
  { id: 'services', text: 'Nuestros Servicios' },
  { id: 'empathy-banner', text: '¿Necesitas apoyo en tu organización?' },
  { id: 'specialists', text: 'Especialistas en Potenciar Equipos' },
  { id: 'team', text: 'Nuestro Equipo' },
  { id: 'gallery', text: 'Galeria de imágenes' },
];

/** Expected home order once the client logos section is relocated (SC-007). */
const EXPECTED_ORDER: readonly string[] = [
  'hero',
  'logos',
  'services',
  'empathy-banner',
  'specialists',
  'team',
  'gallery',
];

function readBuiltHtml(path: string, label: string): string {
  if (!existsSync(path)) {
    throw new Error(`${label} not found — run \`npm run build\` before tests`);
  }
  return readFileSync(path, 'utf-8');
}

function readHomeHtml(): string {
  return readBuiltHtml(homePath, 'dist/index.html');
}

function parseHomeDocument(): Document {
  return new DOMParser().parseFromString(readHomeHtml(), 'text/html');
}

function normalizeWhitespace(text: string | null | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

function mustExist<T>(value: T | undefined | null, message: string): T {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
  return value;
}

/** Direct `<section>` children of `<main>`, in document order. */
function getMainSections(doc: Document): HTMLElement[] {
  const main = mustExist(doc.querySelector('main'), 'Expected a <main> element in dist/index.html');
  return Array.from(main.children).filter((child): child is HTMLElement => child.tagName === 'SECTION');
}

/**
 * Identifies a section by its distinctive copy. A section matching no anchor
 * is reported as `unknown`; a section matching several anchors is reported as
 * `ambiguous(...)` so the failure message exposes the ambiguity.
 */
function identifySection(section: HTMLElement): string {
  const text = normalizeWhitespace(section.textContent);
  const matches = SECTION_ANCHORS.filter((anchor) => text.includes(anchor.text)).map(
    (anchor) => anchor.id,
  );
  if (matches.length === 1) {
    return mustExist(matches[0], 'The matched anchor id is missing');
  }
  if (matches.length === 0) {
    return 'unknown';
  }
  return `ambiguous(${matches.join(',')})`;
}

/** The identity of every `<section>` child of `<main>`, in document order. */
function getSectionOrder(doc: Document): string[] {
  return getMainSections(doc).map(identifySection);
}

describe('home section order contract (dist/index.html)', () => {
  it('SC-006 (REQ-004): the logos section is the 2nd <section> of <main>, between the hero and "Nuestros Servicios"', () => {
    const doc = parseHomeDocument();
    const sections = getMainSections(doc);

    const hero = mustExist(sections[0], 'The hero must be the 1st <section> of <main>');
    expect(
      normalizeWhitespace(hero.textContent),
      'The 1st <section> must remain the hero ("Reclutamiento y Selección Estratégica")',
    ).toContain('Reclutamiento y Selección Estratégica');

    const logos = mustExist(sections[1], 'The logos section must be the 2nd <section> of <main>');
    expect(
      normalizeWhitespace(logos.textContent),
      'The 2nd <section> must be the client logos section ("Empresas que han confiado en nosotros")',
    ).toContain('Empresas que han confiado en nosotros');

    const services = mustExist(
      sections[2],
      '"Nuestros Servicios" must follow the logos section as the 3rd <section>',
    );
    expect(
      normalizeWhitespace(services.textContent),
      'The 3rd <section> must be "Nuestros Servicios"',
    ).toContain('Nuestros Servicios');
  });

  it('SC-006 (REQ-004): the logos section comes before "Nuestro Equipo" and the gallery stays last', () => {
    const doc = parseHomeDocument();
    const sections = getMainSections(doc);
    const order = getSectionOrder(doc);

    const logosIndex = order.indexOf('logos');
    const teamIndex = order.indexOf('team');
    expect(logosIndex, 'The logos section must exist in the home page').toBeGreaterThanOrEqual(0);
    expect(teamIndex, 'The "Nuestro Equipo" section must exist in the home page').toBeGreaterThanOrEqual(0);
    expect(
      logosIndex < teamIndex,
      'The logos section must appear before the "Nuestro Equipo" section',
    ).toBe(true);

    const last = mustExist(sections[sections.length - 1], 'The home page must expose a last <section>');
    expect(
      normalizeWhitespace(last.textContent),
      'The last <section> of the home page must remain the gallery ("Galeria de imágenes")',
    ).toContain('Galeria de imágenes');
  });

  it('SC-007 (REQ-004): the whole home section order is hero → logos → services → banner → specialists → team → gallery', () => {
    const doc = parseHomeDocument();
    const sections = getMainSections(doc);
    const order = getSectionOrder(doc);

    expect(
      { count: sections.length, order },
      'The home page must expose exactly the 7 expected <section> children of <main>, in the expected order',
    ).toEqual({ count: EXPECTED_ORDER.length, order: [...EXPECTED_ORDER] });
  });
});
