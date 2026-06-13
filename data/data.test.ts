import { site } from "./site";
import { navLinks } from "./navigation";

test("site exposes phone and contact links", () => {
  expect(site.phone).toBe("518 169 491");
  expect(site.phoneHref).toBe("tel:+48518169491");
  expect(site.whatsapp).toBe("https://wa.me/48518169491");
  expect(site.messenger).toBe("https://m.me/cleaningservicekonin");
});

test("navigation has the seven header links in order", () => {
  expect(navLinks.map((l) => l.label)).toEqual([
    "O nas",
    "Oferta",
    "Cennik",
    "Współpraca",
    "Opinie",
    "FAQ",
    "Kontakt",
  ]);
  expect(navLinks.find((l) => l.label === "Cennik")?.href).toBe("/cennik");
});
