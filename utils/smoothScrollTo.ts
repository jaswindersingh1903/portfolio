let activeAnimationFrame: number | null = null;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const getScrollDuration = (distance: number, maxDuration: number) => {
  const clampedDistance = Math.min(Math.abs(distance), 1600);
  const scaledDuration = 260 + clampedDistance * 0.14;
  return Math.min(maxDuration, Math.max(260, scaledDuration));
};

export const smoothScrollTo = (top: number, maxDuration = 460) => {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    window.scrollTo({ top });
    return;
  }

  const start = window.scrollY;
  const distance = top - start;
  const duration = getScrollDuration(distance, maxDuration);

  if (Math.abs(distance) < 2) return;

  if (activeAnimationFrame !== null) {
    window.cancelAnimationFrame(activeAnimationFrame);
  }

  const startTime = performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo({ top: start + distance * easedProgress });

    if (progress < 1) {
      activeAnimationFrame = window.requestAnimationFrame(step);
    } else {
      activeAnimationFrame = null;
    }
  };

  activeAnimationFrame = window.requestAnimationFrame(step);
};

export const smoothScrollToElement = (element: HTMLElement, offset = 80, duration = 700) => {
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  smoothScrollTo(top, duration);
};
