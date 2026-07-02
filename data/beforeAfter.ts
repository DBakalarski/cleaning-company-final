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
  {
    before: "/efekty/5a.jpg",
    after: "/efekty/5b.jpg",
    alt: "Korek i odpływ umywalki przed i po usunięciu osadu",
    caption: "Łazienka — korek umywalki",
  },
  {
    before: "/efekty/6a.jpg",
    after: "/efekty/6b.jpg",
    alt: "Szkło kabiny prysznicowej przed i po usunięciu kamienia",
    caption: "Prysznic — szkło kabiny",
  },
  {
    before: "/efekty/7a.jpg",
    after: "/efekty/7b.jpg",
    alt: "Drewniana altana ogrodowa przed i po umyciu z zielonego nalotu",
    caption: "Ogród — altana",
  },
  {
    // Zdjęcia w źródle odwrócone: 8b to stan „przed", 8a to efekt „po".
    before: "/efekty/8b.jpg",
    after: "/efekty/8a.jpg",
    alt: "Zlew ze stali nierdzewnej przed i po doczyszczeniu",
    caption: "Zlew ze stali nierdzewnej",
  },
  {
    before: "/efekty/11a.jpg",
    after: "/efekty/11b.jpg",
    alt: "Kabina prysznicowa i łazienka przed i po sprzątaniu",
    caption: "Łazienka — kabina prysznicowa",
  },
  {
    before: "/efekty/12a.jpg",
    after: "/efekty/12b.jpg",
    alt: "Odpływ liniowy w prysznicu przed i po doczyszczeniu",
    caption: "Prysznic — odpływ liniowy",
  },
  {
    before: "/efekty/13a.jpg",
    after: "/efekty/13b.jpg",
    alt: "Mosiężny kinkiet przed i po odkurzeniu i wyczyszczeniu",
    caption: "Kinkiet — mosiężna lampa",
  },
  {
    before: "/efekty/14a.jpg",
    after: "/efekty/14b.jpg",
    alt: "Pokój na poddaszu przed i po posprzątaniu i uporządkowaniu",
    caption: "Pokój — sprzątanie i porządki",
  },
  {
    before: "/efekty/15a.jpg",
    after: "/efekty/15b.jpg",
    alt: "Podłoga przy ścianie przed i po odkurzeniu i umyciu",
    caption: "Podłoga — odkurzanie i mycie",
  },
  {
    before: "/efekty/16a.jpg",
    after: "/efekty/16b.jpg",
    alt: "Bateria umywalkowa przed i po usunięciu kamienia",
    caption: "Łazienka — bateria umywalkowa",
  },
  {
    before: "/efekty/17a.jpg",
    after: "/efekty/17b.jpg",
    alt: "Bateria kuchenna i zlew przed i po usunięciu osadu",
    caption: "Kuchnia — bateria i zlew",
  },
];
