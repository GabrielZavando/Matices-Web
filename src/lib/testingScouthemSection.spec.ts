// @vitest-environment happy-dom
/**
 * Contract test for the Scouthem showcase section relocated to the testing
 * page (TICKET-007, change `restructure-page-content`, task T-001).
 *
 * It asserts the built pages (`dist/testing/index.html` and `dist/index.html`)
 * against scenarios SC-001…SC-005 of
 * `openspec/changes/restructure-page-content/scenarios.md` and requirements
 * REQ-001…REQ-003, BEFORE the relocation is implemented (TDD RED phase).
 *
 * The visual/content contract of the section itself (mock copy, mobile-first
 * layout, navy visual panel, semantic markup) is capability
 * `home-scouthem-section`: it is unchanged by the relocation and must keep
 * holding wherever the section is rendered.
 *
 * Pattern mirrors `src/lib/homeScouthemSection.spec.ts`: read the static
 * build output.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../../dist');
const homePath = join(distDir, 'index.html');
const testingPath = join(distDir, 'testing/index.html');
const talentoPath = join(distDir, 'talento/index.html');

const SCOUTHEM_CTA_LABEL = 'Conoce la plataforma SCOUTHEM';
const SCOUTHEM_CTA_HREF = 'https://scouthem.com/es/pagina-de-inicio/';
const SCOUTHEM_BADGE = 'PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN';
const SCOUTHEM_HEADLINE = 'Revoluciona tu';
const SCOUTHEM_TALENT_SPAN = 'Selección de Talento';
const SCOUTHEM_PARAGRAPH =
  'Scouthem es tu plataforma inteligente para centralizar y optimizar todo el proceso de selección. Automatiza la pre-selección con evaluaciones psicométricas de vanguardia para predecir el desempeño, y gestiona candidatos con nuestro avanzado ATS, todo en un solo lugar. Asegura contrataciones de alta calidad y una mejor experiencia para el candidato.';
const TESTING_H1 = 'Pruebas y Testing Organizacional';
const TESTING_HERO_BADGE = 'Rigor Técnico & Diagnóstico';
const TESTING_HERO_PARAGRAPH = 'Garantizamos la precisión y el encaje en la selección';
const TESTING_HERO_CTA_LABEL = 'Solicita tu Demo';
const TESTING_NEXT_SECTION_HEADING =
  'Psicometría Científica de Vanguardia Potenciada por Inteligencia Artificial';
const HERO_BUSINESS_ASSET = 'hero-business';

/** Matches hardcoded hex colors such as `#243B55` or `#fff` in markup. */
const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b/;

function readBuiltHtml(path: string, label: string): string {
  if (!existsSync(path)) {
    throw new Error(`${label} not found — run \`npm run build\` before tests`);
  }
  return readFileSync(path, 'utf-8');
}

function readHomeHtml(): string {
  return readBuiltHtml(homePath, 'dist/index.html');
}

function readTestingHtml(): string {
  return readBuiltHtml(testingPath, 'dist/testing/index.html');
}

function readTalentoHtml(): string {
  return readBuiltHtml(talentoPath, 'dist/talento/index.html');
}

function parseDocument(html: string): Document {
  return new DOMParser().parseFromString(html, 'text/html');
}

function parseHomeDocument(): Document {
  return parseDocument(readHomeHtml());
}

function parseTestingDocument(): Document {
  return parseDocument(readTestingHtml());
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
  const main = mustExist(doc.querySelector('main'), 'Expected a <main> element in the built page');
  return Array.from(main.children).filter((child): child is HTMLElement => child.tagName === 'SECTION');
}

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
      `Scouthem section not found in the built page: expected a <section> child of <main> containing "${SCOUTHEM_HEADLINE}" or the badge "${SCOUTHEM_BADGE}" (REQ-001/SC-002). Run \`npm run build\` if the output is stale.`,
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
 * token and reserving space via an `aspect-*` class.
 */
function findVisualPanel(section: HTMLElement): HTMLElement | undefined {
  return Array.from(section.querySelectorAll<HTMLElement>('[class]')).find(
    (element) =>
      getClassTokens(element).includes('bg-verde-bosque') &&
      subtreeClassTokens(element).some((token) => token.startsWith('aspect-')),
  );
}

describe('testing Scouthem showcase contract (dist/testing/index.html + dist/index.html)', () => {
  it('SC-002 (REQ-001): the showcase is the 1st <section> of <main> on /testing, followed by the psicometría section', () => {
    const doc = parseTestingDocument();
    const sections = getMainSections(doc);

    const first = mustExist(
      sections[0],
      'The testing page must expose at least one <section> child of <main>',
    );
    const firstText = normalizeWhitespace(first.textContent);
    expect(firstText, 'The 1st <section> of /testing must be the Scouthem showcase (badge)').toContain(
      SCOUTHEM_BADGE,
    );
    expect(firstText, 'The 1st <section> of /testing must be the Scouthem showcase (headline)').toContain(
      SCOUTHEM_HEADLINE,
    );
    expect(
      findLinksByLabel(first, SCOUTHEM_CTA_LABEL),
      'The 1st <section> of /testing must render the Scouthem CTA',
    ).toHaveLength(1);

    const second = mustExist(
      sections[1],
      'The testing page must expose a 2nd <section> child of <main>',
    );
    expect(
      normalizeWhitespace(second.textContent),
      'The 2nd <section> of /testing must be "Psicometría Científica de Vanguardia Potenciada por Inteligencia Artificial"',
    ).toContain(TESTING_NEXT_SECTION_HEADING);
  });

  it('SC-001 (REQ-001): the home page renders no Scouthem section and no Scouthem CTA', () => {
    const doc = parseHomeDocument();
    const sections = getMainSections(doc);

    const sectionsWithBadge = sections.filter((section) =>
      normalizeWhitespace(section.textContent).includes(SCOUTHEM_BADGE),
    );
    expect(
      sectionsWithBadge,
      'No <section> of the home page may contain the badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN"',
    ).toEqual([]);

    const sectionsWithHeadline = sections.filter((section) =>
      normalizeWhitespace(section.textContent).includes(SCOUTHEM_HEADLINE),
    );
    expect(
      sectionsWithHeadline,
      'No <section> of the home page may contain the headline "Revoluciona tu Selección de Talento"',
    ).toEqual([]);

    expect(
      findLinksByLabel(doc, SCOUTHEM_CTA_LABEL),
      'The home page must not contain any "Conoce la plataforma SCOUTHEM" link',
    ).toHaveLength(0);
  });

  it('SC-005 (REQ-003): exactly one Scouthem CTA in the site, inside the /testing showcase, with the agreed attributes', () => {
    const homeDoc = parseHomeDocument();
    const testingDoc = parseTestingDocument();

    const homeLinks = findLinksByLabel(homeDoc, SCOUTHEM_CTA_LABEL);
    const testingLinks = findLinksByLabel(testingDoc, SCOUTHEM_CTA_LABEL);

    expect(homeLinks, 'The home page must not contain the Scouthem CTA').toHaveLength(0);
    expect(testingLinks, 'The testing page must contain exactly one Scouthem CTA').toHaveLength(1);
    expect(
      homeLinks.length + testingLinks.length,
      'The site must contain exactly one "Conoce la plataforma SCOUTHEM" link',
    ).toBe(1);

    const link = mustExist(testingLinks[0], 'The unique Scouthem CTA is missing');
    const showcase = findScouthemSection(getMainSections(testingDoc));
    expect(showcase, 'The Scouthem showcase must be rendered on /testing').toBeDefined();
    const section = mustExist(showcase, 'The Scouthem showcase must be rendered on /testing');
    expect(
      section.contains(link),
      'The unique Scouthem CTA must live inside the Scouthem showcase of /testing',
    ).toBe(true);

    expect(link.getAttribute('href'), 'The CTA must keep the agreed destination').toBe(SCOUTHEM_CTA_HREF);
    expect(link.getAttribute('target'), 'The CTA must open in a new tab').toBe('_blank');
    const relTokens = (link.getAttribute('rel') ?? '').split(/\s+/).filter(Boolean);
    expect(relTokens, 'The CTA must declare rel="noopener"').toContain('noopener');

    const className = link.getAttribute('class') ?? '';
    expect(className, 'The CTA must not use the link-underline treatment').not.toContain('link-underline');
    expect(className, 'The CTA must keep hover:bg-verde-bosque/5').toContain('hover:bg-verde-bosque/5');
    expect(className, 'The CTA must keep transition-all').toContain('transition-all');
  });

  it('SC-003 (REQ-001): the "Rigor Técnico & Diagnóstico" hero is gone from /testing', () => {
    const doc = parseTestingDocument();
    const text = normalizeWhitespace(doc.textContent);

    expect(text, 'The "Rigor Técnico & Diagnóstico" badge must be absent from /testing').not.toContain(
      TESTING_HERO_BADGE,
    );
    expect(
      text,
      'The hero paragraph "Garantizamos la precisión y el encaje en la selección…" must be absent from /testing',
    ).not.toContain(TESTING_HERO_PARAGRAPH);
    expect(
      findLinksByLabel(doc, TESTING_HERO_CTA_LABEL),
      'The "Solicita tu Demo" CTA must be absent from /testing',
    ).toHaveLength(0);

    const heroImages = Array.from(doc.querySelectorAll('img')).filter((image) => {
      const src = image.getAttribute('src') ?? '';
      const srcset = image.getAttribute('srcset') ?? '';
      return src.includes(HERO_BUSINESS_ASSET) || srcset.includes(HERO_BUSINESS_ASSET);
    });
    expect(
      heroImages,
      'No <img> of /testing may be derived from src/assets/hero-business.webp',
    ).toHaveLength(0);
  });

  it('SC-004 (REQ-002): /testing exposes exactly one visually hidden <h1>, and the showcase keeps a single <h2>', () => {
    const doc = parseTestingDocument();

    const h1s = Array.from(doc.querySelectorAll('h1'));
    expect(h1s, 'The testing page must expose exactly one <h1>').toHaveLength(1);
    const h1 = mustExist(h1s[0], 'The testing page <h1> is missing');
    expect(normalizeWhitespace(h1.textContent), 'The testing page <h1> text is fixed').toBe(
      TESTING_H1,
    );
    expect(getClassTokens(h1), 'The testing page <h1> must be visually hidden (sr-only)').toContain(
      'sr-only',
    );

    const section = requireScouthemSection(doc);
    const h2s = Array.from(section.querySelectorAll('h2'));
    expect(h2s, 'The Scouthem showcase must expose exactly one <h2>').toHaveLength(1);
    expect(normalizeWhitespace(mustExist(h2s[0], 'The showcase <h2> is missing').textContent)).toBe(
      'Revoluciona tu Selección de Talento',
    );
  });

  it('[SC-016] (REQ-001): the showcase exposes the id="scouthem" anchor', () => {
    const doc = parseTestingDocument();
    const showcase = requireScouthemSection(doc);

    expect(
      showcase.getAttribute('id'),
      'The showcase section must expose the id="scouthem" anchor',
    ).toBe('scouthem');

    // The /talento page links to /testing#scouthem: the anchor must have a
    // target, otherwise the link lands on the top of the testing page.
    const talentoDoc = parseDocument(readTalentoHtml());
    const anchorLinks = Array.from(talentoDoc.querySelectorAll('a')).filter((link) =>
      (link.getAttribute('href') ?? '').includes('/testing#scouthem'),
    );
    expect(
      anchorLinks.length,
      'The /talento page must keep a link to /testing#scouthem',
    ).toBeGreaterThan(0);

    const h2s = Array.from(showcase.querySelectorAll('h2'));
    expect(h2s, 'The anchor must not alter the showcase heading structure').toHaveLength(1);
  });

  it('home-scouthem-section: the showcase reproduces the approved mock copy literally', () => {
    const doc = parseTestingDocument();
    const section = requireScouthemSection(doc);
    const sectionText = normalizeWhitespace(section.textContent);

    expect(sectionText, 'Badge copy must match the mock exactly').toContain(SCOUTHEM_BADGE);

    const h2 = mustExist(section.querySelector('h2'), 'The section must render an <h2> headline');
    expect(normalizeWhitespace(h2.textContent), 'The <h2> copy must match the mock exactly').toBe(
      'Revoluciona tu Selección de Talento',
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
    expect(getClassTokens(talentSpan), 'The talent span must use text-verde-lima').toContain(
      'text-verde-lima',
    );
    expect(getClassTokens(talentSpan), 'The talent span must be italic').toContain('italic');

    const paragraphs = Array.from(section.querySelectorAll('p')).map((p) => normalizeWhitespace(p.textContent));
    expect(paragraphs, 'The Scouthem paragraph must reproduce the mock copy verbatim').toContain(
      SCOUTHEM_PARAGRAPH,
    );
  });

  it('home-scouthem-section: mobile-first — single column with text before panel, 2 columns at lg:', () => {
    const doc = parseTestingDocument();
    const section = requireScouthemSection(doc);
    const classTokens = subtreeClassTokens(section);

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

  it('home-scouthem-section: visual panel uses bg-verde-bosque with a reserved aspect ratio, no hex colors', () => {
    const doc = parseTestingDocument();
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

  it('home-scouthem-section: the panel hosts exactly one optimized, accessible <Image> loaded eagerly', () => {
    const doc = parseTestingDocument();
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
    expect(images, 'The Scouthem section must render exactly one panel image').toHaveLength(1);
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

    expect(
      image.getAttribute('loading'),
      'The image must be eagerly loaded: the showcase is the first section of /testing and its panel image is the LCP candidate',
    ).toBe('eager');

    const sizes = (image.getAttribute('sizes') ?? '').trim();
    expect(sizes, 'The image must declare an explicit sizes attribute').not.toBe('');

    const srcset = (image.getAttribute('srcset') ?? '').trim();
    expect(srcset, 'The image must ship a responsive srcset (optimized format variants)').not.toBe('');
    expect(
      /\.(?:avif|webp)\b/i.test(srcset),
      'The srcset must reference an optimized format (avif/webp), never the raw source file',
    ).toBe(true);
  });

  it('home-scouthem-section: <section> with a single <h2> and content wrapped in reveal--fade-up', () => {
    const doc = parseTestingDocument();
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
