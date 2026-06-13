export type Service = { title: string; desc: string };

export const privateServices: Service[] = [
  {
    title: "Sprzątanie mieszkań i domów",
    desc: "Regularne oraz jednorazowe sprzątanie dopasowane do potrzeb — od bieżącego utrzymania porządku po dokładniejsze sprzątanie wybranych pomieszczeń.",
  },
  {
    title: "Sprzątanie cykliczne",
    desc: "Stała współpraca dla osób, które chcą mieć porządek pod kontrolą — wygoda, regularność i spokój, bez organizowania wszystkiego od nowa.",
  },
  {
    title: "Sprzątanie jednorazowe",
    desc: "Jednorazowe doprowadzenie wnętrza do porządku — odświeżenie mieszkania lub przygotowanie domu na ważną okazję czy przyjęcie gości.",
  },
  {
    title: "Sprzątanie po remoncie",
    desc: "Dokładne usuwanie kurzu, pyłu i zabrudzeń poremontowych. Przygotowujemy wnętrze do użytkowania, dbając o estetykę wykończenia.",
  },
  {
    title: "Mycie okien i przeszkleń",
    desc: "Dokładne mycie okien, ram, luster i powierzchni szklanych — z naciskiem na przejrzystość i estetyczny efekt bez smug.",
  },
  {
    title: "Pranie tapicerki meblowej",
    desc: "Profesjonalne pranie kanap, narożników, foteli i krzeseł tapicerowanych — odświeża wygląd mebli i usuwa codzienne zabrudzenia.",
  },
  {
    title: "Pranie materacy",
    desc: "Dokładne pranie materacy, które poprawia higienę codziennego użytkowania i odświeża powierzchnię do spania.",
  },
  {
    title: "Pranie wykładzin",
    desc: "Odkurzanie i pranie wykładzin w domach i mieszkaniach — świeżość, czystość i estetyka powierzchni tekstylnych.",
  },
  {
    title: "Sprzątanie domków letniskowych",
    desc: "Przygotowanie obiektu do sezonu, odświeżenie wnętrza po dłuższej przerwie albo uporządkowanie domku po pobycie gości.",
  },
  {
    title: "Sprzątanie kamperów",
    desc: "Zadbanie o kamper przed sezonem, po podróży albo przed sprzedażą — sprzątanie wnętrza oraz mycie zewnętrznej części pojazdu.",
  },
  {
    title: "Opieka nad grobami",
    desc: "Sprzątanie i uporządkowanie miejsca, mycie pomników, wymiana zniczy oraz przygotowanie grobu przed świętami, rocznicami i ważnymi datami.",
  },
  {
    title: "Renowacja pomników z lastryko",
    desc: "Dokładne wyczyszczenie, utwardzenie oraz zabezpieczenie przed czynnikami atmosferycznymi, wilgocią, ścieraniem i promieniowaniem.",
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
    title: "Sprzątanie biur",
    desc: "Regularne lub jednorazowe utrzymanie czystości w biurach i przestrzeniach pracy — porządek, świeżość i estetyka na co dzień.",
  },
  {
    title: "Sprzątanie lokali użytkowych",
    desc: "Salony, punkty usługowe, gabinety i inne obiekty komercyjne. Zakres ustalany indywidualnie — zależnie od działalności i powierzchni.",
  },
  {
    title: "Apartamenty i obiekty na wynajem",
    desc: "Przygotowanie obiektów do kolejnych gości, sprzątanie po pobytach i dbanie o standard, który wpływa na opinie klientów.",
  },
  {
    title: "Odkurzanie i pranie wykładzin",
    desc: "Profesjonalne pranie wykładzin w hotelach, pensjonatach i obiektach noclegowych — estetyka, świeżość, higiena i komfort gości.",
  },
  {
    title: "Pranie tapicerki komercyjnej",
    desc: "Odświeżanie mebli tapicerowanych w hotelach, apartamentach, biurach i poczekalniach — utrzymanie wysokiego standardu wnętrza.",
  },
  {
    title: "Sprzątanie obiektów noclegowych",
    desc: "Domki, apartamenty i pensjonaty na wynajem krótkoterminowy — wnętrza gotowe na przyjazd kolejnych gości, estetyczne od pierwszego wejścia.",
  },
  {
    title: "Sprzątanie kamperów dla firm",
    desc: "Dla wypożyczalni i sprzedawców pojazdów rekreacyjnych — wnętrze i mycie zewnętrzne przed wydaniem klientowi, po zwrocie albo przed sprzedażą.",
  },
];

export const businessHighlight = {
  title: "Współpraca stała dla firm",
  desc: "Stała współpraca dopasowana do trybu pracy obiektu, częstotliwości sprzątania i realnych potrzeb klienta biznesowego.",
  cta: "Porozmawiajmy →",
};
