import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * TDD test for `anim-components`: verifies the three micro-interaction
 * utilities are emitted into the compiled CSS bundle.
 * Reads the built stylesheet(s) under `dist/_astro` (build must run first).
 */
function getBuiltCss(): string {
  const cssDir = join(process.cwd(), 'dist', '_astro')
  if (!existsSync(cssDir)) {
    throw new Error('dist/_astro not found — run `pnpm build` before tests')
  }
  const files = readdirSync(cssDir).filter((f) => f.endsWith('.css'))
  return files.map((f) => readFileSync(join(cssDir, f), 'utf8')).join('\n')
}

const css = getBuiltCss()

describe('anim-components: global micro-interaction utilities', () => {
  it('exposes .link-underline with a left-origin scaleX underline', () => {
    expect(css).toContain('.link-underline')
    // base state collapsed (scaleX(0)) and hover expanded (scaleX(1))
    expect(css).toContain('scaleX(0)')
    expect(css).toContain('scaleX(1)')
    expect(css).toContain(':focus-visible')
  })

  it('exposes .nav-link with an animated active/hover underline', () => {
    expect(css).toContain('.nav-link')
    // active link indicator is driven by aria-current="page"
    // (minifier may emit the unquoted attribute selector)
    expect(css).toMatch(/aria-current=page/)
  })

  it('exposes .card-lift with hover elevation', () => {
    expect(css).toContain('.card-lift')
    expect(css).toContain('translateY(-4px)')
  })
})
