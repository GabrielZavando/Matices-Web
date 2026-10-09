// @vitest-environment happy-dom
/**
 * Contract test for the new Scouthem showcase section on the home page
 * (TICKET-005, change `add-scouthem-section`).
 *
 * It asserts the built home (`dist/index.html`) against scenarios
 * SC-001…SC-009 of `openspec/changes/add-scouthem-section/scenarios.md`
 * BEFORE the section exists (TDD RED phase). Since the section has no
 * stable id yet, it is located robustly by its content (headline or
 * badge copy from the approved mock `docs/assets/design/nueva-seccion.jpeg`).
 *
 * Pattern mirrors `src/lib/sections.spec.ts`: read the static build output.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../../dist');
const homePath = join(distDir, 'index.html');

const SCOUTHEM_CTA_LABEL = 'Conoce nuestra plataforma SCOUTHEM';
const SCOUTHEM_CTA_HREF = 'https://scouthem.com/es/pagina-de-inicio/';
const SCOUTHEM_BADGE = 'PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN';
const SCOUTHEM_HEADLINE = 'Revoluciona tu';
const SCOUTHEM_TALENT_SPAN = 'Selección de Talento';
const SCOUTHEM_PARAGRAPH =
  'Scouthem es tu plataforma inteligente para centralizar y optimizar todo el proceso de selección. Automatiza la pre-selección con evaluaciones psicométricas de vanguardia para predecir el desempeño, y gestiona candidatos con nuestro avanzado ATS, todo en un solo lugar. Asegura contrataciones de alta calidad y una mejor experiencia para el candidato.';
const HERO_H1 = 'Reclutamiento y Selección Estratégica';
const HERO_PRIMARY_CTA = 'Comenzar Proceso';

/** Matches hardcoded hex colors such as `#243B55` or `#fff` in markup. */
const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b/;

function readHomeHtml(): string {
  if (!existsSync(homePath)) {
    throw new Error('dist/index.html not found — run `npm run build` before tests');
  }
  return readFileSync(homePath, 'utf-8');
}

function parseHomeDocument(): Document {
  return new DOMParser().parseFromString(readHomeHtml(), 'text/html');
}

function normalizeWhitespace(text: string | null | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

function getClassTokens(element: Element): string[] {
  return (element.getAttribute('class') ?? '').split(/\s+/).filter(Boolean);
}

function subtreeClassTokens(root: HTMLElement): string[] {
  const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('[class]'))];
  return elements.flatMap(getClassTokens);
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

/** Content-based location: the section has no stable id yet (SC-001). */
function findScouthemSection(sections: HTMLElement[]): HTMLElement | undefined {
  return sections.find((section) => {
    const text = normalizeWhitespace(section.textContent);
    return text.includes(SCOUTHEM_HEADLINE) || text.includes(SCOUTHEM_BADGE);
  });
}

function requireScouthemSection(doc: Document): HTMLElement {
  const section = findScouthemSection(getMainSections(doc));
  if (!section) {
    throw new Error(
      `Scouthem section not found in dist/index.html: expected a <section> child of <main> containing "${SCOUTHEM_HEADLINE}" or the badge "${SCOUTHEM_BADGE}" (REQ-001/SC-001). Run \`npm run build\` if the output is stale.`,
    );
  }
  return section;
}

function findLinksByLabel(root: ParentNode, label: string): HTMLAnchorElement[] {
  return Array.from(root.querySelectorAll('a')).filter(
    (link) => normalizeWhitespace(link.textContent) === label,
  );
}

/**
 * The visual panel: an element carrying the canonical `bg-verde-bosque`
 * token and reserving space via an `aspect-*` class (REQ-006/SC-007).
 */
function findVisualPanel(section: HTMLElement): HTMLElement | undefined {
  return Array.from(section.querySelectorAll<HTMLElement>('[class]')).find(
    (element) =>
      getClassTokens(element).includes('bg-verde-bosque') &&
      subtreeClassTokens(element).some((token) => token.startsWith('aspect-')),
  );
}

describe('home Scouthem section contract (dist/index.html)', () => {
  it('SC-001 (REQ-001): is the 2nd <section> of <main>, between hero and "Nuestros Servicios"', () => {
    const doc = parseHomeDocument();
    const sections = getMainSections(doc);
    const section = requireScouthemSection(doc);
    expect(sections.indexOf(section), 'The Scouthem section must be the 2nd <section> of <main> (index 1)').toBe(1);
    const hero = mustExist(sections[0], 'The hero must stay the 1st <section> of <main>');
    expect(normalizeWhitespace(hero.textContent), 'The 1st <section> must remain the hero').toContain(HERO_H1);
    const services = mustExist(
      sections[2],
      '"Nuestros Servicios" must follow the Scouthem section as the 3rd <section>',
    );
    expect(normalizeWhitespace(services.textContent), 'The 3rd <section> must be "Nuestros Servicios"').toContain(
      'Nuestros Servicios',
    );
  });

  it('SC-002 (REQ-002): the hero drops the SCOUTHEM link and keeps "Comenzar Proceso"', () => {
    const doc = parseHomeDocument();
    const sections = getMainSections(doc);
    const hero = mustExist(sections[0], 'The hero must be the 1st <section> of <main>');
    const scouthemLinksInHero = findLinksByLabel(hero, SCOUTHEM_CTA_LABEL);
    expect(scouthemLinksInHero, 'The hero must no longer render the SCOUTHEM CTA').toHaveLength(0);
    const primaryCtas = findLinksByLabel(hero, HERO_PRIMARY_CTA);
    expect(primaryCtas, 'The hero must keep exactly one "Comenzar Proceso" CTA').toHaveLength(1);
    const primaryCta = mustExist(primaryCtas[0], 'The hero primary CTA is missing');
    expect(primaryCta.getAttribute('href'), 'The primary CTA must point to /contacto').toBe('/contacto');
  });

  it('SC-003 (REQ-003): exactly one SCOUTHEM CTA in the home, inside the new section, with contract attrs', () => {
    const doc = parseHomeDocument();
    const links = findLinksByLabel(doc, SCOUTHEM_CTA_LABEL);
    expect(links, 'The home must contain exactly one "Conoce nuestra plataforma SCOUTHEM" link').toHaveLength(1);
    const link = mustExist(links[0], 'The unique SCOUTHEM CTA is missing');
    const section = requireScouthemSection(doc);
    expect(section.contains(link), 'The unique SCOUTHEM CTA must live inside the new Scouthem section').toBe(true);
    expect(link.getAttribute('href'), 'The CTA must keep the agreed destination').toBe(SCOUTHEM_CTA_HREF);
    expect(link.getAttribute('target'), 'The CTA must open in a new tab').toBe('_blank');
    const relTokens = (link.getAttribute('rel') ?? '').split(/\s+/).filter(Boolean);
    expect(relTokens, 'The CTA must declare rel="noopener"').toContain('noopener');
  });

  it('SC-004 (REQ-003): the SCOUTHEM CTA preserves the home-hero link contract', () => {
    const doc = parseHomeDocument();
    const section = requireScouthemSection(doc);
    const links = findLinksByLabel(section, SCOUTHEM_CTA_LABEL);
    expect(links, 'The new section must render the SCOUTHEM CTA').toHaveLength(1);
    const link = mustExist(links[0], 'The SCOUTHEM CTA inside the new section is missing');
    const className = link.getAttribute('class') ?? '';
    expect(className, 'The CTA must not use the link-underline treatment').not.toContain('link-underline');
    expect(className, 'The CTA must keep hover:bg-verde-bosque/5 (home-hero spec)').toContain(
      'hover:bg-verde-bosque/5',
    );
    expect(className, 'The CTA must keep transition-all (home-hero spec)').toContain('transition-all');
  });

  it('SC-005 (REQ-004): reproduces the approved mock copy literally', () => {
    const doc = parseHomeDocument();
    const section = requireScouthemSection(doc);
    const sectionText = normalizeWhitespace(section.textContent);
    expect(sectionText, 'Badge copy must match the mock exactly').toContain(SCOUTHEM_BADGE);
    expect(sectionText, 'Headline copy must match the mock exactly').toContain(SCOUTHEM_HEADLINE);

    const h2 = mustExist(section.querySelector('h2'), 'The section must render an <h2> headline');
    expect(normalizeWhitespace(h2.textContent), 'The <h2> must contain "Revoluciona tu"').toContain(
      SCOUTHEM_HEADLINE,
    );
    expect(getClassTokens(h2), 'The <h2> must use the canonical font-heading token (Antic)').toContain(
      'font-heading',
    );
    const talentSpan = mustExist(
      Array.from(h2.querySelectorAll('span')).find(
        (span) => normalizeWhitespace(span.textContent) === SCOUTHEM_TALENT_SPAN,
      ),
      `The <h2> must wrap "${SCOUTHEM_TALENT_SPAN}" in a <span>`,
    );
    expect(getClassTokens(talentSpan), 'The talent span must use text-verde-lima').toContain('text-verde-lima');
    expect(getClassTokens(talentSpan), 'The talent span must be italic').toContain('italic');

    const paragraphs = Array.from(section.querySelectorAll('p')).map((p) => normalizeWhitespace(p.textContent));
    expect(paragraphs, 'The Scouthem paragraph must reproduce the mock copy verbatim').toContain(
      SCOUTHEM_PARAGRAPH,
    );
  });

  it('SC-006 (REQ-005): mobile-first — single column with text before panel, 2 columns at lg:', () => {
    const doc = parseHomeDocument();
    const section = requireScouthemSection(doc);
    const classTokens = [
      section,
      ...Array.from(section.querySelectorAll<HTMLElement>('[class]')),
    ].flatMap(getClassTokens);

    expect(classTokens, 'The section must scale to a 2-column grid with the lg: prefix (≥1024px)').toContain(
      'lg:grid-cols-2',
    );
    const multiColumnBelowLg = classTokens.filter((token) =>
      /^(?:sm:|md:)?grid-cols-(?:[2-9]|\d{2,})$/.test(token),
    );
    expect(
      multiColumnBelowLg,
      'Mobile/tablet must stay single-column: no grid-cols-2+ without the lg: prefix',
    ).toEqual([]);

    const h2 = mustExist(section.querySelector('h2'), 'The section must render an <h2> headline');
    const panel = mustExist(
      findVisualPanel(section),
      'The section must render the visual panel (bg-verde-bosque + reserved aspect ratio)',
    );
    const orderedElements = Array.from(section.querySelectorAll('*'));
    expect(
      orderedElements.indexOf(h2) < orderedElements.indexOf(panel),
      'The text block must come before the visual panel in the DOM (mobile single-column order)',
    ).toBe(true);
  });

  it('SC-007 (REQ-006): visual panel uses bg-verde-bosque with a reserved aspect ratio, no hex colors', () => {
    const doc = parseHomeDocument();
    const section = requireScouthemSection(doc);
    const panel = mustExist(
      findVisualPanel(section),
      'Expected a visual panel carrying the bg-verde-bosque class',
    );
    expect(getClassTokens(panel), 'The panel must use the canonical bg-verde-bosque token').toContain(
      'bg-verde-bosque',
    );
    expect(
      subtreeClassTokens(panel).some((token) => token.startsWith('aspect-')),
      'The panel must reserve space with an aspect-ratio class',
    ).toBe(true);
    expect(
      section.outerHTML,
      'The section markup must not hardcode hex colors (use @theme tokens only)',
    ).not.toMatch(HEX_COLOR_PATTERN);
  });

  it('SC-008 (REQ-007): the panel hosts exactly one optimized, accessible <Image>', () => {
    const doc = parseHomeDocument();
    const section = requireScouthemSection(doc);
    const panel = mustExist(
      findVisualPanel(section),
      'The section must render the visual panel (bg-verde-bosque + reserved aspect ratio) to host the image',
    );
    expect(
      subtreeClassTokens(panel).some((token) => token.startsWith('aspect-')),
      'The panel hosting the image must keep its reserved aspect ratio (no layout shift)',
    ).toBe(true);

    // `astro:assets`' <Image> serializes to <img> in the built HTML; the
    // source authoring rule (never hand-written <img>) does not apply here.
    const images = Array.from(section.querySelectorAll('img'));
    expect(
      images,
      'The Scouthem section must render exactly one panel image once src/assets/scouthem-section.* exists (REQ-007/SC-008)',
    ).toHaveLength(1);
    const image = mustExist(images[0], 'The Scouthem panel image is missing');
    expect(
      panel.contains(image),
      'The image must live inside the panel that carries bg-verde-bosque + aspect-*',
    ).toBe(true);

    const alt = normalizeWhitespace(image.getAttribute('alt'));
    expect(alt.length, 'The image must expose a non-empty descriptive alt').toBeGreaterThan(0);
    expect(
      alt.split(' ').length,
      'The alt must be descriptive (several words), not a bare keyword',
    ).toBeGreaterThanOrEqual(4);

    const width = image.getAttribute('width');
    const height = image.getAttribute('height');
    expect(width, 'The image must declare width to prevent layout shift').toBeTruthy();
    expect(height, 'The image must declare height to prevent layout shift').toBeTruthy();
    expect(Number(width), 'width must be a positive integer').toBeGreaterThan(0);
    expect(Number(height), 'height must be a positive integer').toBeGreaterThan(0);

    expect(image.getAttribute('loading'), 'The image must be lazy-loaded').toBe('lazy');

    const sizes = (image.getAttribute('sizes') ?? '').trim();
    expect(sizes, 'The image must declare an explicit sizes attribute').not.toBe('');

    const srcset = (image.getAttribute('srcset') ?? '').trim();
    expect(srcset, 'The image must ship a responsive srcset (optimized format variants)').not.toBe('');
    expect(
      /\.(?:avif|webp)\b/i.test(srcset),
      'The srcset must reference an optimized format (avif/webp), never the raw source file',
    ).toBe(true);
  });

  it('SC-009 (REQ-008): <section> with a single <h2> and content wrapped in reveal--fade-up', () => {
    const doc = parseHomeDocument();
    const section = requireScouthemSection(doc);
    expect(section.tagName, 'The Scouthem block must be a <section> element').toBe('SECTION');
    const h2s = Array.from(section.querySelectorAll('h2'));
    expect(h2s, 'The section must expose exactly one <h2> (h1 → h2 hierarchy intact)').toHaveLength(1);
    const revealNodes = section.querySelectorAll('.reveal--fade-up');
    expect(
      revealNodes.length,
      'The section content must be wrapped in Reveal elements with variant="fade-up"',
    ).toBeGreaterThan(0);
  });
});
