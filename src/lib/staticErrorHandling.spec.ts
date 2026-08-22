import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../../dist');
const htaccessPath = join(distDir, '.htaccess');

describe('serve-custom-404: static hosting error handling', () => {
  it('build output contains .htaccess with ErrorDocument directive for the 404 page', () => {
    expect(existsSync(htaccessPath)).toBe(true);
    const htaccess = readFileSync(htaccessPath, 'utf-8');
    expect(htaccess).toMatch(/^\s*ErrorDocument\s+404\s+\/404\.html\s*$/m);
  });
});
