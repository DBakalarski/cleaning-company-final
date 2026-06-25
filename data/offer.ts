export type Service = { title: string; desc: string; group: string };

export const privateServices: Service[] = [
  {
    group: "Sprzątanie wnętrz",
    title: "Sprzątanie mieszkań i domów",
    desc: "Całe wnętrze lub wybrane pomieszczenia.",
  },
  {
    group: "Sprzątanie wnętrz",
    title: "Sprzątanie cykliczne",
    desc: "Stałe terminy w ustalonym rytmie.",
  },
  {
    group: "Sprzątanie wnętrz",
    title: "Sprzątanie jednorazowe",
    desc: "Odświeżenie albo porządek przed okazją.",
  },
  {
    group: "Sprzątanie wnętrz",
    title: "Sprzątanie po remoncie",
    desc: "Kurz, pył i zabrudzenia poremontowe.",
  },
  {
    group: "Mycie i pranie",
    title: "Mycie okien i przeszkleń",
    desc: "Okna, ramy i lustra bez smug.",
  },
  {
    group: "Mycie i pranie",
    title: "Pranie tapicerki meblowej",
    desc: "Kanapy, narożniki, fotele i krzesła.",
  },
  {
    group: "Mycie i pranie",
    title: "Pranie materacy",
    desc: "Głębokie pranie i więcej higieny.",
  },
  {
    group: "Mycie i pranie",
    title: "Pranie wykładzin",
    desc: "Odkurzanie i pranie wykładzin.",
  },
  {
    group: "Sezonowe i wyjazdowe",
    title: "Sprzątanie domków letniskowych",
    desc: "Otwarcie sezonu lub porządek po gościach.",
  },
  {
    group: "Sezonowe i wyjazdowe",
    title: "Sprzątanie kamperów",
    desc: "Wnętrze i mycie z zewnątrz.",
  },
  {
    group: "Pomniki i groby",
    title: "Opieka nad grobami",
    desc: "Mycie pomnika, porządek, wymiana zniczy.",
  },
  {
    group: "Pomniki i groby",
    title: "Renowacja pomników z lastryko",
    desc: "Czyszczenie, utwardzenie i zabezpieczenie.",
  },
];

export const privateAddons: string[] = [
  "Piekarnik",
  "Mikrofala",
  "Lodówka",
  "Zmywarka",
  "Pralka",
  "Suszarka",
  "Wnętrza szafek",
  "Czyszczenie fug",
  "Impregnacja fug",
  "Mocniej zabrudzone kuchnie",
  "Łazienki do doczyszczenia",
  "Strefy wymagające większej dokładności",
];

export const businessServices: Service[] = [
  {
    group: "Przestrzenie komercyjne",
    title: "Sprzątanie biur",
    desc: "Regularnie lub jednorazowo.",
  },
  {
    group: "Przestrzenie komercyjne",
    title: "Sprzątanie lokali użytkowych",
    desc: "Zakres pod Twoją działalność.",
  },
  {
    group: "Wynajem i noclegi",
    title: "Apartamenty i obiekty na wynajem",
    desc: "Gotowe pod kolejnych gości.",
  },
  {
    group: "Wynajem i noclegi",
    title: "Sprzątanie obiektów noclegowych",
    desc: "Domki, apartamenty i pensjonaty.",
  },
  {
    group: "Pranie",
    title: "Odkurzanie i pranie wykładzin",
    desc: "Hotele, pensjonaty i obiekty noclegowe.",
  },
  {
    group: "Pranie",
    title: "Pranie tapicerki komercyjnej",
    desc: "Meble w hotelach, biurach i poczekalniach.",
  },
  {
    group: "Flota i pojazdy",
    title: "Sprzątanie kamperów dla firm",
    desc: "Przed wydaniem, po zwrocie, przed sprzedażą.",
  },
];

export const businessHighlight = {
  title: "Współpraca stała dla firm",
  desc: "Stały serwis dopasowany do trybu pracy obiektu i ustalonej częstotliwości.",
  cta: "Porozmawiajmy →",
};
