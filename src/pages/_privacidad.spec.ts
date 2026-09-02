import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

// Build-time rendering test (no JS DOM): validates the compiled static HTML of
// `src/pages/privacidad.astro` (route /privacidad) that ships to production.
// Mirrors the pattern of contactFormA11y.spec.ts: build on demand (only when
// the dist artifact is missing) and assert against the final static HTML.
const DIST_PATH = resolve(process.cwd(), 'dist/privacidad/index.html');

let pageHtml = '';

beforeAll(() => {
  if (!existsSync(DIST_PATH)) {
    // Self-contained: build the static site if the dist artifact is missing.
    execSync('npx astro build', { stdio: 'inherit' });
  }
  pageHtml = readFileSync(DIST_PATH, 'utf-8');
}, 120000);

/** Page-owned markup: everything between `<main` and `</main>`. The shared
 *  Header/Footer legitimately contain `<Image>` (`<img>`) and the Layout emits
 *  a GTM noscript iframe with an inline `style=`; the page itself must add
 *  neither, so the no-img/no-inline-style assertions are scoped to `<main>`. */
function mainHtml(): string {
  const start = pageHtml.indexOf('<main');
  const end = pageHtml.indexOf('</main>');
  if (start === -1 || end === -1) return '';
  return pageHtml.slice(start, end);
}

/** All `<h2>` section headings rendered by the page, in document order. */
function sectionHeadings(): string[] {
  const matches = pageHtml.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g);
  return [...matches].map((match) => (match[1] ?? '').replace(/<[^>]+>/g, '').trim());
}

/** Verbatim copy of the client's twelve numbered section titles (source of
 *  truth: openspec/changes/add-privacy-page — design D2). */
const EXPECTED_HEADINGS = [
  '1. Introducción',
  '2. Datos Personales que Recopilamos',
  '3. Finalidad del Tratamiento',
  '4. Base Legal para el Tratamiento',
  '5. Uso de Cookies y Tecnologías de Rastreo',
  '6. Almacenamiento y Transferencia Internacional de Datos',
  '7. No Compartición con Terceros',
  '8. Plazo de Conservación',
  '9. Derechos del Titular de los Datos (Derechos ARCO)',
  '10. Seguridad de la Información',
  '11. Modificaciones a esta Política',
  '12. Contacto',
];

describe('privacy-policy-page — rendered static output', () => {
  describe('Req 1: renders at /privacidad with the canonical site layout', () => {
    it('builds dist/privacidad/index.html', () => {
      expect(existsSync(DIST_PATH)).toBe(true);
    });

    it('wraps content in <header>, <main> and <footer> and keeps the footer link', () => {
      expect(pageHtml).toContain('<header');
      expect(pageHtml).toContain('<main');
      expect(pageHtml).toContain('<footer');
      // Footer keeps its "Políticas de Privacidad" entry pointing to /privacidad.
      expect(pageHtml).toContain('href="/privacidad"');
    });
  });

  describe('Req 2: legal content is transcribed faithfully (12 sections)', () => {
    it('renders the full <h1> title and the update notice', () => {
      const h1 = pageHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
      expect(h1.trim()).toBe('Política de Privacidad y Protección de Datos Personales');
      expect(pageHtml).toContain('Última actualización: Septiembre 2026');
    });

    it('renders the twelve numbered section headings, in order', () => {
      expect(sectionHeadings()).toEqual(EXPECTED_HEADINGS);
    });

    it('references the Chilean legal framework (Ley N° 19.628)', () => {
      expect(pageHtml).toContain('Ley N° 19.628 sobre Protección de la Vida Privada de Chile');
    });
  });

  describe('Req 3: collection distinguishes required and optional fields', () => {
    it('lists the required fields', () => {
      const section2 = pageHtml.slice(
        pageHtml.indexOf('2. Datos Personales que Recopilamos'),
        pageHtml.indexOf('3. Finalidad del Tratamiento'),
      );
      expect(section2).toContain('Obligatorios:');
      for (const field of ['Nombres y Apellidos', 'Correo electrónico', 'Teléfono']) {
        expect(section2).toContain(field);
      }
    });

    it('lists the optional fields', () => {
      const section2 = pageHtml.slice(
        pageHtml.indexOf('2. Datos Personales que Recopilamos'),
        pageHtml.indexOf('3. Finalidad del Tratamiento'),
      );
      expect(section2).toContain('Opcionales:');
      for (const field of [
        'Nombre de la empresa',
        'Cargo dentro de la organización',
        'Tamaño de la empresa (cantidad de colaboradores/as)',
      ]) {
        expect(section2).toContain(field);
      }
    });

    it('states that no sensitive or candidate data is collected', () => {
      const section2 = pageHtml.slice(
        pageHtml.indexOf('2. Datos Personales que Recopilamos'),
        pageHtml.indexOf('3. Finalidad del Tratamiento'),
      );
      expect(section2).toContain(
        'No recopilamos datos de candidatos(as) ni información sensible',
      );
    });
  });

  describe('Req 4: ARCO rights are presented with their action channel', () => {
    it('lists the four ARCO rights', () => {
      const section9 = pageHtml.slice(
        pageHtml.indexOf('9. Derechos del Titular de los Datos (Derechos ARCO)'),
        pageHtml.indexOf('10. Seguridad de la Información'),
      );
      for (const right of ['Acceso', 'Rectificación', 'Cancelación', 'Oposición']) {
        expect(section9).toContain(right);
      }
    });

    it('points ARCO requests to the contact email', () => {
      const section9 = pageHtml.slice(
        pageHtml.indexOf('9. Derechos del Titular de los Datos (Derechos ARCO)'),
        pageHtml.indexOf('10. Seguridad de la Información'),
      );
      expect(section9).toContain('contacto@maticesconsultora.cl');
    });
  });

  describe('Req 5: contact points are functional links', () => {
    it('renders the email as a mailto anchor', () => {
      const section12 = pageHtml.slice(pageHtml.indexOf('12. Contacto'));
      expect(section12).toContain('<a href="mailto:contacto@maticesconsultora.cl"');
      expect(section12).toContain('contacto@maticesconsultora.cl');
    });

    it('renders the website URL as an anchor', () => {
      const section12 = pageHtml.slice(pageHtml.indexOf('12. Contacto'));
      expect(section12).toContain('<a href="https://maticesconsultora.cl/"');
    });
  });

  describe('Req 6: design-system identity and accessibility', () => {
    it('applies the brand tokens (bg-crema-calido, text-verde-bosque, font-heading)', () => {
      const content = mainHtml();
      expect(content).toContain('bg-crema-calido');
      expect(content).toContain('text-verde-bosque');
      expect(content).toContain('font-heading');
      expect(content).toContain('bg-verde-lima/10');
    });

    it('uses mobile-first spacing (px-4 md:px-16)', () => {
      expect(mainHtml()).toContain('px-4 md:px-16');
    });

    it('contains no raw <img> tags and no inline style= attributes in the page content', () => {
      const content = mainHtml();
      expect(content).not.toContain('<img');
      expect(content).not.toContain('style=');
    });
  });
});