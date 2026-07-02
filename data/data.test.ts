import { site } from "./site";
import { navLinks } from "./navigation";
import { beforeAfterPairs } from "./beforeAfter";

test("site exposes phone and contact links", () => {
  expect(site.phone).toBe("518 169 491");
  expect(site.phoneHref).toBe("tel:+48518169491");
  expect(site.whatsapp).toBe("https://wa.me/48518169491");
  expect(site.messenger).toBe("https://m.me/cleaningservicekonin");
});

test("navigation has the eight header links in order", () => {
  expect(navLinks.map((l) => l.label)).toEqual([
    "O nas",
    "Oferta",
    "Cennik",
    "Współpraca",
    "Opinie",
    "Efekty",
    "FAQ",
    "Kontakt",
  ]);
  expect(navLinks.find((l) => l.label === "Cennik")?.href).toBe("/cennik");
  expect(navLinks.find((l) => l.label === "Efekty")?.href).toBe("/efekty");
});

test("before/after gallery has well-formed pairs", () => {
  expect(beforeAfterPairs).toHaveLength(15);
  for (const pair of beforeAfterPairs) {
    expect(pair.before).toMatch(/^\/efekty\/.+\.jpg$/);
    expect(pair.after).toMatch(/^\/efekty\/.+\.jpg$/);
    expect(pair.before).not.toBe(pair.after);
    expect(pair.alt.length).toBeGreaterThan(0);
    expect(pair.caption.length).toBeGreaterThan(0);
  }
});
