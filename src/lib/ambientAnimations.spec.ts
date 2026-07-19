import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

function getBuiltCss(): string {
  const cssDir = join(process.cwd(), 'dist', '_astro')
  if (!existsSync(cssDir)) {
    throw new Error('dist/_astro not found — run `pnpm build` before tests')
  }
  const files = readdirSync(cssDir).filter((f) => f.endsWith('.css'))
  return files.map((f) => readFileSync(join(cssDir, f), 'utf8')).join('\n')
}

function readHtmlPage(name: string): string {
  // The home page builds to dist/index.html; every other page to dist/<name>/index.html
  const file = name === 'index'
    ? join(process.cwd(), 'dist', 'index.html')
    : join(process.cwd(), 'dist', name, 'index.html')
  if (!existsSync(file)) {
    throw new Error(`dist/${name}/index.html not found — run \`pnpm build\` before tests`)
  }
  return readFileSync(file, 'utf8')
}

const css = getBuiltCss()

describe('anim-ambient: floating ambient motion', () => {
  it('generates the .animate-float utility class', () => {
    // Tailwind only emits the utility once it is used in markup
    expect(css).toContain('.animate-float{')
  })

  it('disables .animate-float under prefers-reduced-motion', () => {
    // The bundler may group identical reduced-motion rules; assert animate-float is disabled
    expect(css).toMatch(/animate-float[^}]*animation:none!important/)
  })

  it('applies animate-float to the contacto.astro ambient orbs', () => {
    const html = readHtmlPage('contacto')
    expect(html).toContain('animate-float')
  })

  it('applies animate-float to at least one hero accent (index.astro)', () => {
    const html = readHtmlPage('index')
    expect(html).toContain('animate-float')
  })
})
