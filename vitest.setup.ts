import "@testing-library/jest-dom";

// jsdom lacks matchMedia. Report reduced-motion as ON so anim components skip
// animation and leave content fully visible/queryable in tests.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: /prefers-reduced-motion/.test(query),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
