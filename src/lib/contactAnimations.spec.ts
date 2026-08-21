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

function readContactoHtml(): string {
  const file = join(process.cwd(), 'dist', 'contacto', 'index.html')
  if (!existsSync(file)) {
    throw new Error('dist/contacto/index.html not found — run `pnpm build` before tests')
  }
  return readFileSync(file, 'utf8')
}

const css = getBuiltCss()

describe('anim-contact: contact form animations', () => {
  it('defines the pulse-select keyframe', () => {
    expect(css).toContain('keyframes pulse-select')
  })

  it('generates the pulse-select selection utility', () => {
    // Tailwind emits `.has-[:checked]:animate-[pulse-select_0.3s_ease]{animation:.3s pulse-select}`
    expect(css).toMatch(/animation:[^;}]*pulse-select/)
  })

  it('wraps the contact form sections in Reveal (fade-up)', () => {
    const html = readContactoHtml()
    expect(html).toContain('reveal--fade-up')
  })
})
