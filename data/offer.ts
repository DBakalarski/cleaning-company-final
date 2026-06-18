export type Service = { title: string; desc: string; group: string };

export const privateServices: Service[] = [
  {
    group: "Sprzątanie wnętrz",
    title: "Sprzątanie mieszkań i domów",
    desc: "Regularnie lub jednorazowo — całe wnętrze albo wybrane pomieszczenia.",
  },
  {
    group: "Sprzątanie wnętrz",
    title: "Sprzątanie cykliczne",
    desc: "Stałe terminy w ustalonym rytmie — porządek bez umawiania go za każdym razem.",
  },
  {
    group: "Sprzątanie wnętrz",
    title: "Sprzątanie jednorazowe",
    desc: "Jednorazowe doprowadzenie wnętrza do porządku — na odświeżenie albo przed ważną okazją.",
  },
  {
    group: "Sprzątanie wnętrz",
    title: "Sprzątanie po remoncie",
    desc: "Usuwamy kurz, pył i zabrudzenia poremontowe — wnętrze gotowe do wprowadzenia.",
  },
  {
    group: "Mycie i pranie",
    title: "Mycie okien i przeszkleń",
    desc: "Okna, ramy, lustra i powierzchnie szklane — czysto i bez smug.",
  },
  {
    group: "Mycie i pranie",
    title: "Pranie tapicerki meblowej",
    desc: "Kanapy, narożniki, fotele i krzesła — usuwamy plamy i codzienne zabrudzenia.",
  },
  {
    group: "Mycie i pranie",
    title: "Pranie materacy",
    desc: "Głębokie pranie materacy — więcej higieny tam, gdzie śpisz.",
  },
  {
    group: "Mycie i pranie",
    title: "Pranie wykładzin",
    desc: "Odkurzanie i pranie wykładzin w domach i mieszkaniach.",
  },
  {
    group: "Sezonowe i wyjazdowe",
    title: "Sprzątanie domków letniskowych",
    desc: "Otwarcie sezonu, odświeżenie po przerwie albo porządek po gościach.",
  },
  {
    group: "Sezonowe i wyjazdowe",
    title: "Sprzątanie kamperów",
    desc: "Wnętrze i mycie z zewnątrz — przed sezonem, po podróży albo przed sprzedażą.",
  },
  {
    group: "Pomniki i groby",
    title: "Opieka nad grobami",
    desc: "Mycie pomnika, porządek wokół i wymiana zniczy — także przed świętami i rocznicami.",
  },
  {
    group: "Pomniki i groby",
    title: "Renowacja pomników z lastryko",
    desc: "Czyszczenie, utwardzenie i zabezpieczenie przed wilgocią, ścieraniem i słońcem.",
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
    desc: "Biura i przestrzenie pracy — regularnie lub jednorazowo.",
  },
  {
    group: "Przestrzenie komercyjne",
    title: "Sprzątanie lokali użytkowych",
    desc: "Salony, punkty usługowe i gabinety — zakres ustalany pod Twoją działalność.",
  },
  {
    group: "Wynajem i noclegi",
    title: "Apartamenty i obiekty na wynajem",
    desc: "Sprzątanie po pobytach i przygotowanie pod kolejnych gości — standard, który widać w opiniach.",
  },
  {
    group: "Wynajem i noclegi",
    title: "Sprzątanie obiektów noclegowych",
    desc: "Najem krótkoterminowy — domki, apartamenty i pensjonaty gotowe na przyjazd gości.",
  },
  {
    group: "Pranie",
    title: "Odkurzanie i pranie wykładzin",
    desc: "Wykładziny w hotelach, pensjonatach i obiektach noclegowych.",
  },
  {
    group: "Pranie",
    title: "Pranie tapicerki komercyjnej",
    desc: "Meble tapicerowane w hotelach, biurach, apartamentach i poczekalniach.",
  },
  {
    group: "Flota i pojazdy",
    title: "Sprzątanie kamperów dla firm",
    desc: "Dla wypożyczalni i sprzedawców — czyszczenie przed wydaniem, po zwrocie i przed sprzedażą.",
  },
];

export const businessHighlight = {
  title: "Współpraca stała dla firm",
  desc: "Stały serwis dopasowany do trybu pracy obiektu i ustalonej częstotliwości.",
  cta: "Porozmawiajmy →",
};
