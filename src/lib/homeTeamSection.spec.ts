// @vitest-environment happy-dom
/**
 * Contract test for the "Nuestro Equipo" section on the home page
 * (TICKET-006, change `update-team-profiles`).
 *
 * It asserts the built home (`dist/index.html`) against scenarios
 * SC-001…SC-007 of `openspec/changes/update-team-profiles/scenarios.md`
 * BEFORE the section is updated (TDD RED phase): today the cards are out
 * of order, there are no LinkedIn links and the biographies are the old
 * copy, so this suite must fail until T-002/T-003 are implemented.
 *
 * Pattern mirrors `src/lib/homeScouthemSection.spec.ts`: read the static
 * build output and locate the section by its stable `#equipo` id.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../../dist');
const homePath = join(distDir, 'index.html');

interface TeamMemberContract {
  readonly name: string;
  readonly linkedin: string;
  readonly description: string;
  readonly previousDescription: string;
}

const TEAM_MEMBERS: readonly TeamMemberContract[] = [
  {
    name: 'María José Jimenez',
    linkedin:
      'https://www.linkedin.com/in/mar%C3%ADa-jos%C3%A9-jim%C3%A9nez-520a8823/',
    description:
      'Psicóloga y Magister en Neurociencias (c) (Universidad internacional de la Rioja), con más de 20 años de experiencia asesorando organizaciones en materias de gestión del talento, ex Gerente General de editora multinacional de test en Chile, directora de Matices Consultora.',
    previousDescription:
      'Psicóloga y Magister en Neurociencias (c), con más de 20 años de experiencia asesorando organizaciones en materias de gestión del talento, ex gerente general de editora multinacional de test en Chile, directora de la consultora Matices',
  },
  {
    name: 'Cristian Nova',
    linkedin: 'https://www.linkedin.com/in/cristiannova/',
    description:
      'Psicólogo laboral y Magíster en Políticas Sociales, Trabajo y Bienestar (Universidad Autónoma de Barcelona), con trayectoria en estudios territoriales, ciencia de datos y gestión de proyectos. Ha trabajado en procesos de reclutamiento y selección de personal en diversas organizaciones, contando con experiencia en investigación académica.',
    previousDescription:
      'Psicólogo laboral y Magíster en Política Social, Trabajo y Bienestar, con trayectoria en estudios territoriales, ciencia de datos y gestión de proyectos. Ha trabajado en procesos de reclutamiento y selección de personal, y cuenta con experiencia en dirección de eventos académicos.',
  },
  {
    name: 'Catalina Aguilera',
    linkedin:
      'https://www.linkedin.com/in/catalinaaguileradorrhhconsultoriasotalentobienestargestionorganizacionalreclutamientoyseleccion/',
    description:
      'Psicóloga Organizacional y Gestora de Inclusión, con Magíster en Psicología de las Organizaciones (Universidad Adolfo Ibáñez). Más de 15 años de experiencia en el área de gestión de personas, desarrollo organizacional y salud ocupacional.',
    previousDescription:
      'Psicóloga Organizacional y Gestora de Inclusión, con Magíster en Psicología de las Organizaciones. Más de 15 años de experiencia en el área de gestión de personas, Desarrollo Organizacional y Salud Ocupacional.',
  },
  {
    name: 'Lorenzo Traverso',
    linkedin: 'https://www.linkedin.com/in/lorenzotraverso/',
    description:
      'Ingeniero Comercial, con Magíster en Innovación y Emprendimiento (Universidad Adolfo Ibáñez), con más de 6 años de experiencia en áreas de desarrollo comercial, análisis de mercado, optimización de procesos y gestión de canales digitales.',
    previousDescription:
      'Ingeniero Comercial, con Magíster en Innovación y Emprendimiento, con más de 6 años de experiencia en áreas de desarrollo comercial, análisis de mercado, optimización de procesos y gestión de canales digitales.',
  },
];

const EXPECTED_ORDER: readonly string[] = TEAM_MEMBERS.map(
  (member) => member.name,
);

const LINKEDIN_PROFILE_PATTERN = /^https:\/\/www\.linkedin\.com\/in\//i;
const EXTERNAL_IMAGE_URL_PATTERN =
  /https?:\/\/[^\s"'<>]+\.(?:png|jpe?g|gif|webp|avif|svg)(?:[?#][^\s"'<>]*)?/i;

function readHomeHtml(): string {
  if (!existsSync(homePath)) {
    throw new Error(
      'dist/index.html not found — run `npm run build` before tests',
    );
  }
  return readFileSync(homePath, 'utf-8');
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

function getTeamSection(doc: Document): HTMLElement {
  const section = doc.querySelector<HTMLElement>('#equipo');
  if (!section) {
    throw new Error(
      'Team section #equipo not found in dist/index.html (REQ-006/SC-001). Run `npm run build` if the output is stale.',
    );
  }
  return section;
}

function getTeamCards(section: HTMLElement): HTMLElement[] {
  return Array.from(section.querySelectorAll<HTMLElement>('article'));
}

function getMemberName(card: HTMLElement): string {
  const heading = card.querySelector('h3');
  if (!heading) {
    throw new Error(
      'Every team card must render the member name in an <h3> (REQ-006)',
    );
  }
  return normalizeWhitespace(heading.textContent);
}

function findCardByName(
  cards: readonly HTMLElement[],
  memberName: string,
): HTMLElement {
  const card = cards.find((candidate) => getMemberName(candidate) === memberName);
  if (!card) {
    const found = cards.map((candidate) => getMemberName(candidate));
    throw new Error(
      `Team card for "${memberName}" not found in #equipo. Cards found: ${JSON.stringify(found)} (REQ-001/SC-001)`,
    );
  }
  return card;
}

function findLinkedInLinks(card: HTMLElement): HTMLAnchorElement[] {
  return Array.from(card.querySelectorAll<HTMLAnchorElement>('a[href]')).filter(
    (link) => LINKEDIN_PROFILE_PATTERN.test(link.getAttribute('href') ?? ''),
  );
}

function getDescription(card: HTMLElement): string {
  const paragraphs = Array.from(card.querySelectorAll('p'));
  if (paragraphs.length === 0) {
    throw new Error(
      'Every team card must render its biography in a <p> element (REQ-004/SC-006)',
    );
  }
  // The biography is the last paragraph: portrait, name block, role, bio.
  const description = mustExist(
    paragraphs[paragraphs.length - 1],
    'Every team card must render its biography in a <p> element (REQ-004/SC-006)',
  );
  return normalizeWhitespace(description.textContent);
}

function getAccessibleName(link: HTMLAnchorElement): string {
  const ariaLabel = normalizeWhitespace(link.getAttribute('aria-label'));
  if (ariaLabel.length > 0) {
    return ariaLabel;
  }
  const srOnlyText = Array.from(link.querySelectorAll<HTMLElement>('.sr-only'))
    .map((element) => normalizeWhitespace(element.textContent))
    .join(' ');
  return normalizeWhitespace(srOnlyText);
}

describe('home team section contract (dist/index.html)', () => {
  it('[SC-001] (REQ-001): team cards render in the agreed DOM order', () => {
    const doc = parseHomeDocument();
    const section = getTeamSection(doc);
    const cards = getTeamCards(section);

    expect(
      cards,
      'The #equipo section must render exactly four team cards (<article>)',
    ).toHaveLength(TEAM_MEMBERS.length);

    const names = cards.map((card) => getMemberName(card));
    expect(
      names,
      `The DOM order of the team cards must be ${JSON.stringify(EXPECTED_ORDER)} (REQ-001/SC-001), but was ${JSON.stringify(names)}`,
    ).toEqual([...EXPECTED_ORDER]);
  });

  it('[SC-002] (REQ-002): each member card has exactly one LinkedIn link next to the name with the exact URL', () => {
    const doc = parseHomeDocument();
    const section = getTeamSection(doc);
    const cards = getTeamCards(section);

    for (const member of TEAM_MEMBERS) {
      const card = findCardByName(cards, member.name);
      const links = findLinkedInLinks(card);

      expect(
        links,
        `"${member.name}" must have exactly one LinkedIn link inside their card (REQ-002/SC-002)`,
      ).toHaveLength(1);

      const link = mustExist(
        links[0],
        `The LinkedIn link for "${member.name}" is missing (REQ-002/SC-002)`,
      );

      expect(
        link.getAttribute('href'),
        `The LinkedIn href for "${member.name}" must match the client-supplied profile exactly`,
      ).toBe(member.linkedin);

      const heading = mustExist(
        card.querySelector('h3'),
        `The card for "${member.name}" must render the name in an <h3> (REQ-006)`,
      );
      expect(
        link.parentElement,
        `The LinkedIn link for "${member.name}" must live inside the same name block as the <h3> (next to the name), not elsewhere in the card (REQ-002/SC-002)`,
      ).toBe(heading.parentElement);
    }
  });

  it('[SC-003] (REQ-002): LinkedIn links open in a new tab with noopener and noreferrer', () => {
    const doc = parseHomeDocument();
    const section = getTeamSection(doc);
    const cards = getTeamCards(section);

    for (const member of TEAM_MEMBERS) {
      const card = findCardByName(cards, member.name);
      const links = findLinkedInLinks(card);
      const link = mustExist(
        links[0],
        `The LinkedIn link for "${member.name}" is missing (REQ-002/SC-003)`,
      );

      expect(
        link.getAttribute('target'),
        `The LinkedIn link for "${member.name}" must open in a new tab (target="_blank")`,
      ).toBe('_blank');

      const relTokens = (link.getAttribute('rel') ?? '')
        .split(/\s+/)
        .filter(Boolean);
      expect(
        relTokens,
        `The LinkedIn link for "${member.name}" must declare rel="noopener noreferrer"`,
      ).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
    }
  });

  it('[SC-004] (REQ-003): LinkedIn icons are inline decorative SVGs with no external image', () => {
    const doc = parseHomeDocument();
    const section = getTeamSection(doc);
    const cards = getTeamCards(section);

    for (const member of TEAM_MEMBERS) {
      const card = findCardByName(cards, member.name);
      const links = findLinkedInLinks(card);
      const link = mustExist(
        links[0],
        `The LinkedIn link for "${member.name}" is missing (REQ-003/SC-004)`,
      );

      const icon = mustExist(
        link.querySelector('svg'),
        `The LinkedIn link for "${member.name}" must contain an inline <svg> icon (REQ-003/SC-004)`,
      );
      expect(
        icon.getAttribute('aria-hidden'),
        `The inline SVG icon for "${member.name}" must be decorative (aria-hidden="true")`,
      ).toBe('true');

      expect(
        link.querySelector('img'),
        `The LinkedIn link for "${member.name}" must not contain an <img> icon (REQ-003/SC-004)`,
      ).toBeNull();

      const markup = link.outerHTML;
      expect(
        markup.toLowerCase(),
        `The LinkedIn link for "${member.name}" must not reference the external pngtree PNG (REQ-003/SC-004)`,
      ).not.toContain('pngtree');

      expect(
        EXTERNAL_IMAGE_URL_PATTERN.test(markup),
        `The LinkedIn link for "${member.name}" must not reference any external image URL (REQ-003/SC-004): ${markup}`,
      ).toBe(false);
    }
  });

  it('[SC-005] (REQ-003): every LinkedIn link exposes a unique accessible name with the member name', () => {
    const doc = parseHomeDocument();
    const section = getTeamSection(doc);
    const cards = getTeamCards(section);
    const accessibleNames: string[] = [];

    for (const member of TEAM_MEMBERS) {
      const card = findCardByName(cards, member.name);
      const links = findLinkedInLinks(card);
      const link = mustExist(
        links[0],
        `The LinkedIn link for "${member.name}" is missing (REQ-003/SC-005)`,
      );

      const accessibleName = getAccessibleName(link);
      expect(
        accessibleName.length,
        `The LinkedIn link for "${member.name}" must expose an accessible name via aria-label or .sr-only text (REQ-003/SC-005)`,
      ).toBeGreaterThan(0);
      expect(
        accessibleName,
        `The accessible name of the LinkedIn link for "${member.name}" must include the member name (REQ-003/SC-005)`,
      ).toContain(member.name);

      accessibleNames.push(accessibleName);
    }

    expect(
      new Set(accessibleNames).size,
      `The four LinkedIn links must be distinguishable by their accessible names, but got ${JSON.stringify(accessibleNames)} (REQ-003/SC-005)`,
    ).toBe(TEAM_MEMBERS.length);
  });

  it('[SC-006] (REQ-004): biographies match the approved literal copy and old copy is gone', () => {
    const doc = parseHomeDocument();
    const section = getTeamSection(doc);
    const cards = getTeamCards(section);

    for (const member of TEAM_MEMBERS) {
      const card = findCardByName(cards, member.name);
      const description = getDescription(card);
      expect(
        description,
        `The biography of "${member.name}" must match the approved literal copy exactly (whitespace-normalized) (REQ-004/SC-006)`,
      ).toBe(member.description);
    }

    const sectionText = normalizeWhitespace(section.textContent);
    for (const member of TEAM_MEMBERS) {
      expect(
        sectionText,
        `The previous biography of "${member.name}" must no longer appear in #equipo (REQ-004/SC-006)`,
      ).not.toContain(normalizeWhitespace(member.previousDescription));
    }
  });

  it('[SC-007] (REQ-005): each card keeps exactly one optimized portrait with a descriptive alt', () => {
    const doc = parseHomeDocument();
    const section = getTeamSection(doc);
    const cards = getTeamCards(section);

    for (const member of TEAM_MEMBERS) {
      const card = findCardByName(cards, member.name);
      const images = Array.from(card.querySelectorAll<HTMLImageElement>('img'));

      expect(
        images,
        `The card for "${member.name}" must contain exactly one portrait image (REQ-005/SC-007)`,
      ).toHaveLength(1);

      const image = mustExist(
        images[0],
        `The portrait image for "${member.name}" is missing (REQ-005/SC-007)`,
      );

      const width = image.getAttribute('width');
      const height = image.getAttribute('height');
      expect(
        width,
        `The portrait of "${member.name}" must declare width to prevent layout shift`,
      ).toBeTruthy();
      expect(
        height,
        `The portrait of "${member.name}" must declare height to prevent layout shift`,
      ).toBeTruthy();
      expect(
        Number(width),
        `The portrait width of "${member.name}" must be a positive integer`,
      ).toBeGreaterThan(0);
      expect(
        Number(height),
        `The portrait height of "${member.name}" must be a positive integer`,
      ).toBeGreaterThan(0);

      expect(
        image.getAttribute('loading'),
        `The portrait of "${member.name}" must be lazy-loaded`,
      ).toBe('lazy');

      const sizes = (image.getAttribute('sizes') ?? '').trim();
      expect(
        sizes.length,
        `The portrait of "${member.name}" must declare an explicit, non-empty sizes attribute`,
      ).toBeGreaterThan(0);

      const alt = normalizeWhitespace(image.getAttribute('alt'));
      expect(
        alt.length,
        `The portrait of "${member.name}" must expose a non-empty descriptive alt`,
      ).toBeGreaterThan(0);
      expect(
        alt.toLowerCase(),
        `The alt text of "${member.name}" must contain the member name`,
      ).toContain(member.name.toLowerCase());
    }
  });
});
