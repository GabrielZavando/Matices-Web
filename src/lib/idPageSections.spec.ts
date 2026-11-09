// @vitest-environment happy-dom
/**
 * Contract test for the innovation (I+D) page sections
 * (TICKET-007, change `restructure-page-content`, task T-004).
 *
 * It asserts the built I+D page (`dist/id/index.html`) against scenarios
 * SC-008…SC-011 of `openspec/changes/restructure-page-content/scenarios.md`
 * and requirements REQ-005…REQ-007, BEFORE the page is adjusted (TDD RED
 * phase).
 *
 * Every element is located by stable, distinctive copy or by structural
 * anchors that the change does not touch (the hero badge is identified by its
 * `animate-float` + `max-w-[200px]` container, not by the ambiguous "I+D"
 * string that also appears in the page title).
 *
 * Pattern mirrors `src/lib/testingScouthemSection.spec.ts`: read the static
 * build output.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../../dist');
const idPath = join(distDir, 'id/index.html');

const HERO_BADGE = 'Innovación Científica & Futuro';
const HERO_HEADLINE = 'Investigación y Desarrollo (I+D)';
const BADGE_NEW_TITLE = 'Proyecto FONDEF';
const BADGE_NEW_PARAGRAPH = 'Innova I+D';
const BADGE_OLD_TITLE = 'I+D';
const BADGE_OLD_PARAGRAPH = 'Diseño de metodologías de vanguardia.';
const TALENT_SECTION_LABEL = 'Plataforma de Talento Inteligente';
const TALENT_HEADING = 'I+D en Scouthem';
const CTA_LABEL = 'CONOCER SCOUTHEM';
const CTA_HREF = '/testing';
const APPROVED_PARAGRAPH =
  'Contamos con una solución tecnológica para la gestión del talento. Diseñada en base a las necesidades organizacionales y metodologías en investigación científica, validadas bajo el respaldo de privacidad y manejo de datos europeo. El programa Scouthem automatiza el reclutamiento, integrando la inteligencia artificial y psicometría avanzada para procesos de evaluación y predicción del desempeño organizacional.';
const PREVIOUS_PARAGRAPH = 'La solución tecnológica para la gestión del talento.';

function readBuiltHtml(path: string, label: string): string {
  if (!existsSync(path)) {
    throw new Error(`${label} not found — run \`npm run build\` before tests`);
  }
  return readFileSync(path, 'utf-8');
}

function readIdHtml(): string {
  return readBuiltHtml(idPath, 'dist/id/index.html');
}

function parseIdDocument(): Document {
  return new DOMParser().parseFromString(readIdHtml(), 'text/html');
}

function normalizeWhitespace(text: string | null | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

function getClassTokens(element: Element): string[] {
  return (element.getAttribute('class') ?? '').split(/\s+/).filter(Boolean);
}

function mustExist<T>(value: T | undefined | null, message: string): T {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
  return value;
}

/** Direct `<section>` children of `<main>`, in document order. */
function getMainSections(doc: Document): HTMLElement[] {
  const main = mustExist(doc.querySelector('main'), 'Expected a <main> element in dist/id/index.html');
  return Array.from(main.children).filter((child): child is HTMLElement => child.tagName === 'SECTION');
}

function findSectionByText(doc: Document, text: string): HTMLElement | undefined {
  return getMainSections(doc).find((section) => normalizeWhitespace(section.textContent).includes(text));
}

function requireSectionByText(doc: Document, text: string): HTMLElement {
  const section = findSectionByText(doc, text);
  if (!section) {
    throw new Error(
      `Section not found in dist/id/index.html: expected a <section> child of <main> containing "${text}"`,
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
 * The container of the hero image: the closest ancestor declaring an
 * `aspect-*` class (the frame that reserves the image space).
 */
function findImageContainer(image: HTMLImageElement): HTMLElement | undefined {
  let ancestor = image.parentElement;
  while (ancestor) {
    if (getClassTokens(ancestor).some((token) => token.startsWith('aspect-'))) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }
  return undefined;
}

/**
 * The hero grid: the 12-column container that holds the copy column and the
 * image column of the I+D hero. The grid balance decides how much width the
 * 3:2 image gets (SC-008).
 */
function findHeroGrid(imageContainer: HTMLElement): HTMLElement | undefined {
  let ancestor = imageContainer.parentElement;
  while (ancestor) {
    if (getClassTokens(ancestor).includes('lg:grid-cols-12')) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }
  return undefined;
}

/**
 * The floating glassmorphism badge over the hero image: the element carrying
 * both `animate-float` and `max-w-[200px]` (the hero also decorates itself
 * with a blurred circle that floats, so `animate-float` alone is ambiguous).
 */
function findHeroFloatingBadge(hero: HTMLElement): HTMLElement | undefined {
  return Array.from(hero.querySelectorAll<HTMLElement>('[class]')).find((element) => {
    const tokens = getClassTokens(element);
    return tokens.includes('animate-float') && tokens.includes('max-w-[200px]');
  });
}

describe('I+D page sections contract (dist/id/index.html)', () => {
  it('SC-008 (REQ-005): the hero image uses a 3:2 full-width frame with optimized astro:assets attributes', () => {
    const doc = parseIdDocument();
    const hero = requireSectionByText(doc, HERO_BADGE);
    expect(normalizeWhitespace(hero.textContent), 'The hero section must keep its headline').toContain(
      HERO_HEADLINE,
    );

    const image = mustExist(
      hero.querySelector<HTMLImageElement>('img'),
      'The hero section must render its lateral image',
    );
    const container = mustExist(
      findImageContainer(image),
      'The hero image must live inside a container declaring an aspect-ratio class',
    );
    const containerTokens = getClassTokens(container);

    expect(containerTokens, 'The hero image container must declare aspect-[3/2]').toContain(
      'aspect-[3/2]',
    );
    expect(containerTokens, 'The hero image container must not declare aspect-[4/5]').not.toContain(
      'aspect-[4/5]',
    );
    expect(
      containerTokens,
      'The hero image container must not be capped by max-w-md (full column width)',
    ).not.toContain('max-w-md');

    const width = Number(image.getAttribute('width'));
    const height = Number(image.getAttribute('height'));
    expect(Number.isFinite(width) && width > 0, 'The image must declare a positive width').toBe(true);
    expect(Number.isFinite(height) && height > 0, 'The image must declare a positive height').toBe(
      true,
    );
    expect(
      width * 2,
      'The declared width/height must express a 3:2 ratio (width * 2 === height * 3)',
    ).toBe(height * 3);

    expect(image.getAttribute('loading'), 'The hero image must be eagerly loaded').toBe('eager');
    expect((image.getAttribute('sizes') ?? '').trim(), 'The hero image must declare sizes').not.toBe(
      '',
    );

    const src = image.getAttribute('src') ?? '';
    expect(src, 'The hero image must be served from /_astro/').toMatch(/^\/_astro\//);
    expect(src, 'The hero image must be served in an optimized format').toMatch(/\.(?:avif|webp)$/i);

    // Grid balance (SC-008): the image column takes 7 of the 12 tracks (≈60 %)
    // and the copy column the remaining 5 (≈40 %), so the 3:2 image renders
    // larger without breaking the two-column layout.
    const grid = mustExist(
      findHeroGrid(container),
      'The hero image must live inside the 12-column hero grid',
    );
    const gridChildren = Array.from(grid.children).filter(
      (child): child is HTMLElement => child.tagName === 'DIV',
    );
    const imageColumn = mustExist(
      gridChildren.find((child) => child.contains(container)),
      'The hero grid must have a column holding the image',
    );
    const copyColumn = mustExist(
      gridChildren.find((child) => child !== imageColumn && child.querySelector('h1')),
      'The hero grid must have a column holding the copy',
    );

    expect(getClassTokens(grid), 'The hero grid must keep its 12 columns').toContain('lg:grid-cols-12');
    expect(
      getClassTokens(copyColumn),
      'The copy column must take 5 of the 12 tracks (≈40 %)',
    ).toContain('lg:col-span-5');
    expect(
      getClassTokens(imageColumn),
      'The image column must take 7 of the 12 tracks (≈60 %)',
    ).toContain('lg:col-span-7');
  });

  it('SC-009 (REQ-006): the floating badge over the hero image shows "Proyecto FONDEF" / "Innova I+D"', () => {
    const doc = parseIdDocument();
    const hero = requireSectionByText(doc, HERO_BADGE);
    const badge = mustExist(
      findHeroFloatingBadge(hero),
      'The hero must render the floating badge (animate-float + max-w-[200px])',
    );

    const badgeTokens = getClassTokens(badge);
    expect(badgeTokens, 'The floating badge must keep the animate-float utility').toContain(
      'animate-float',
    );
    expect(badgeTokens, 'The floating badge must keep the max-w-[200px] constraint').toContain(
      'max-w-[200px]',
    );

    const paragraphs = Array.from(badge.querySelectorAll('p'));
    const title = mustExist(
      paragraphs[0],
      'The floating badge must render a title paragraph',
    );
    const paragraph = mustExist(
      paragraphs[1],
      'The floating badge must render a descriptive paragraph',
    );

    const titleText = normalizeWhitespace(title.textContent);
    expect(titleText, 'The floating badge title must be "Proyecto FONDEF"').toBe(BADGE_NEW_TITLE);
    expect(titleText, 'The floating badge must no longer use the old "I+D" title').not.toBe(
      BADGE_OLD_TITLE,
    );
    expect(
      normalizeWhitespace(paragraph.textContent),
      'The floating badge paragraph must be "Innova I+D"',
    ).toBe(BADGE_NEW_PARAGRAPH);
    expect(
      normalizeWhitespace(badge.textContent),
      'The floating badge must no longer contain the old "Diseño de metodologías de vanguardia." paragraph',
    ).not.toContain(BADGE_OLD_PARAGRAPH);

    const paragraphTokens = getClassTokens(paragraph);
    expect(paragraphTokens, 'The floating badge paragraph must keep text-sm').toContain('text-sm');
    expect(paragraphTokens, 'The floating badge paragraph must keep font-semibold').toContain(
      'font-semibold',
    );
    expect(paragraphTokens, 'The floating badge paragraph must keep text-verde-bosque/70').toContain(
      'text-verde-bosque/70',
    );
  });

  it('SC-010 (REQ-007): the "Plataforma de Talento Inteligente" paragraph matches the approved copy exactly', () => {
    const doc = parseIdDocument();
    const section = requireSectionByText(doc, TALENT_SECTION_LABEL);

    const heading = mustExist(
      Array.from(section.querySelectorAll('h3')).find(
        (h3) => normalizeWhitespace(h3.textContent) === TALENT_HEADING,
      ),
      `The "Plataforma de Talento Inteligente" section must keep the "${TALENT_HEADING}" heading`,
    );
    const paragraph = mustExist(
      heading.nextElementSibling,
      'The section heading must be followed by its descriptive paragraph',
    );
    expect(paragraph.tagName, 'The paragraph following the heading must be a <p>').toBe('P');

    expect(
      normalizeWhitespace(paragraph.textContent),
      'The paragraph must reproduce the approved copy verbatim',
    ).toBe(APPROVED_PARAGRAPH);
    expect(
      normalizeWhitespace(section.textContent),
      'The previous paragraph text must no longer be present',
    ).not.toContain(PREVIOUS_PARAGRAPH);
  });

  it('SC-011 (REQ-007): the "CONOCER SCOUTHEM" CTA points to the internal /testing route without target or rel', () => {
    const doc = parseIdDocument();
    const section = requireSectionByText(doc, TALENT_SECTION_LABEL);

    const links = findLinksByLabel(section, CTA_LABEL);
    expect(links, 'The section must render exactly one "CONOCER SCOUTHEM" link').toHaveLength(1);
    const link = mustExist(links[0], 'The "CONOCER SCOUTHEM" link is missing');

    expect(link.getAttribute('href'), 'The CTA must point to the internal /testing route').toBe(
      CTA_HREF,
    );
    expect(link.getAttribute('target'), 'The CTA must not declare a target attribute').toBeNull();
    expect(link.getAttribute('rel'), 'The CTA must not declare a rel attribute').toBeNull();
  });
});
