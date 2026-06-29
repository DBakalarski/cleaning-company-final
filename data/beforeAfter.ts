export type BeforeAfterPair = {
  /** Path under /public — the "before" (przed) photo. */
  before: string;
  /** Path under /public — the "after" (po) photo. */
  after: string;
  /** Accessible description (PL) of what the pair shows. */
  alt: string;
  /** Short, general caption shown under the card. */
  caption: string;
};

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    before: "/efekty/1a.jpg",
    after: "/efekty/1b.jpg",
    alt: "Zlew kuchenny i glazura przed i po sprzątaniu",
    caption: "Kuchnia — zlew i glazura",
  },
  {
    before: "/efekty/2a.jpg",
    after: "/efekty/2b.jpg",
    alt: "Mebel kuchenny przed i po doczyszczeniu",
    caption: "Kuchnia — meble",
  },
  {
    before: "/efekty/3a.jpg",
    after: "/efekty/3b.jpg",
    alt: "Zlewozmywak przed i po doczyszczeniu",
    caption: "Zlewozmywak",
  },
  {
    before: "/efekty/4a.jpg",
    after: "/efekty/4b.jpg",
    alt: "Umywalka łazienkowa przed i po sprzątaniu",
    caption: "Łazienka — umywalka",
  },
];
