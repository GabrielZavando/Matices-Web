// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initReveal } from './animations';

/**
 * Minimal IntersectionObserver mock. Records observed elements and the options
 * passed to the constructor so tests can assert behavior and trigger callbacks.
 */
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  private observed = new Set<Element>();
  private cb: IntersectionObserverCallback;
  readonly options: IntersectionObserverInit | undefined = undefined;

  constructor(cb: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.cb = cb;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element): void {
    this.observed.add(el);
  }

  unobserve(el: Element): void {
    this.observed.delete(el);
  }

  disconnect(): void {
    this.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Test helper: simulate the browser firing intersection entries. */
  emit(entries: IntersectionObserverEntry[]): void {
    this.cb(entries, this as unknown as IntersectionObserver);
  }

  get observedElements(): Element[] {
    return [...this.observed];
  }
}

function makeMatchMedia(matches: boolean): typeof window.matchMedia {
  return vi.fn().mockImplementation(
    () =>
      ({
        matches,
        media: '',
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList,
  ) as unknown as typeof window.matchMedia;
}

function mountReveal(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'reveal';
  document.body.appendChild(el);
  return el;
}

function setWindowIntersectionObserver(value: unknown): void {
  const w = window as unknown as { IntersectionObserver?: unknown };
  w.IntersectionObserver = value;
}

describe('initReveal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    MockIntersectionObserver.instances = [];
    window.matchMedia = makeMatchMedia(false);
    setWindowIntersectionObserver(MockIntersectionObserver);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('adds is-visible to a .reveal element when it intersects (and unobserves when once)', () => {
    const el = mountReveal();
    const unobserveSpy = vi.spyOn(MockIntersectionObserver.prototype, 'unobserve');

    initReveal();

    const observer = MockIntersectionObserver.instances[0]!;
    expect(observer.observedElements).toContain(el);

    observer.emit([{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry]);

    expect(el.classList.contains('is-visible')).toBe(true);
    expect(unobserveSpy).toHaveBeenCalledWith(el);
  });

  it('does NOT unobserve when once is false', () => {
    const el = mountReveal();
    const unobserveSpy = vi.spyOn(MockIntersectionObserver.prototype, 'unobserve');

    initReveal({ once: false });

    const observer = MockIntersectionObserver.instances[0]!;
    observer.emit([{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry]);

    expect(el.classList.contains('is-visible')).toBe(true);
    expect(unobserveSpy).not.toHaveBeenCalled();
  });

  it('respects rootMargin and threshold options passed to the observer', () => {
    initReveal({ rootMargin: '0px', threshold: 0.5 });

    const observer = MockIntersectionObserver.instances[0]!;
    expect(observer.options).toEqual({ root: null, rootMargin: '0px', threshold: 0.5 });
  });

  it('reveals all elements immediately under prefers-reduced-motion (no observer created)', () => {
    window.matchMedia = makeMatchMedia(true);
    const el = mountReveal();

    initReveal();

    expect(el.classList.contains('is-visible')).toBe(true);
    expect(MockIntersectionObserver.instances.length).toBe(0);
  });

  it('reveals all elements immediately when IntersectionObserver is unsupported', () => {
    setWindowIntersectionObserver(undefined);
    const el = mountReveal();

    initReveal();

    expect(el.classList.contains('is-visible')).toBe(true);
    expect(MockIntersectionObserver.instances.length).toBe(0);
  });

  it('does not throw in an SSR context (window undefined)', () => {
    const globalRef = globalThis as unknown as { window?: unknown };
    const saved = globalRef.window;
    globalRef.window = undefined;

    expect(() => initReveal()).not.toThrow();

    globalRef.window = saved;
  });
});
