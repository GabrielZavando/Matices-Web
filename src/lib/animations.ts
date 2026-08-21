export interface RevealOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

const REVEAL_SELECTOR = '.reveal:not(.is-visible)';

function revealAllImmediately(): void {
  document
    .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    .forEach((element) => {
      element.classList.add('is-visible');
    });
}

/**
 * Observes `.reveal` elements and adds `is-visible` when they enter the viewport.
 *
 * Progressive-enhancement safe:
 * - In an SSR/non-DOM context (`window` undefined) it is a no-op.
 * - Under `prefers-reduced-motion: reduce` or when `IntersectionObserver` is
 *   unavailable, every `.reveal` is revealed immediately so content is never hidden.
 */
export function initReveal(options: RevealOptions = {}): void {
  if (typeof window === 'undefined') {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof window.IntersectionObserver !== 'function') {
    revealAllImmediately();
    return;
  }

  const {
    root = null,
    rootMargin = '0px 0px -10% 0px',
    threshold = 0.15,
    once = true,
  } = options;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (once) {
            obs.unobserve(entry.target);
          }
        }
      });
    },
    { root, rootMargin, threshold },
  );

  document
    .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    .forEach((element) => {
      observer.observe(element);
    });
}
