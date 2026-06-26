export type PriceItem = { name: string; price: string };
export type PricingCategory = { title: string; items: PriceItem[] };

export const pricingCategories: PricingCategory[] = [
  {
    title: "Łazienki, płytki, fugi i kamień",
    items: [
      { name: "Mycie płytek od góry do dołu", price: "od 8 zł/m²" },
      { name: "Czyszczenie fug", price: "od 15 zł/m²" },
      { name: "Impregnacja fug", price: "od 10 zł/m²" },
      { name: "Doczyszczanie kabiny prysznicowej z kamienia", price: "od 80 zł/szt." },
      { name: "Odkamienianie armatury, odpływów i zakamarków", price: "od 50 zł" },
    ],
  },
  {
    title: "Kuchnia i sprzęty AGD",
    items: [
      { name: "Czyszczenie piekarnika", price: "od 60 zł/szt." },
      { name: "Mycie lodówki w środku", price: "od 50 zł/szt." },
      { name: "Mycie zmywarki, pralki lub suszarki w środku", price: "od 50 zł/szt." },
      { name: "Mycie okapu z filtrami", price: "od 80 zł/szt." },
      { name: "Mycie witryny kuchennej w środku", price: "od 120 zł" },
      { name: "Mycie witryny wraz z zastawą", price: "od 150 zł" },
    ],
  },
  {
    title: "Pranie tapicerki i tekstyliów",
    items: [
      { name: "Pranie krzesła tapicerowanego", price: "od 20 zł/szt." },
      { name: "Pranie fotela", price: "od 80 zł/szt." },
      { name: "Pranie kanapy", price: "od 150 zł" },
      { name: "Pranie narożnika", price: "od 250 zł" },
      { name: "Pranie materaca", price: "od 120 zł" },
      { name: "Pranie wykładziny biurowej lub hotelowej", price: "od 10 zł/m²" },
    ],
  },
  {
    title: "Podłogi i doczyszczanie maszynowe",
    items: [
      { name: "Maszynowe mycie podłogi", price: "od 6 zł/m²" },
      { name: "Doczyszczanie podłogi szorowarką", price: "od 9 zł/m²" },
      { name: "Doczyszczanie mocno zabrudzonej podłogi", price: "od 15 zł/m²" },
      { name: "Punktowe usuwanie trudnych zabrudzeń", price: "od 50 zł" },
      { name: "Zabezpieczenie lub pielęgnacja podłogi", price: "od 8 zł/m²" },
    ],
  },
  {
    title: "Okna, witryny i przeszklenia",
    items: [
      { name: "Mycie okna standardowego", price: "od 40 zł/szt." },
      { name: "Mycie drzwi balkonowych", price: "od 50 zł/szt." },
      { name: "Mycie dużych przeszkleń", price: "od 70 zł/szt." },
      { name: "Mycie okien HST / dużych drzwi tarasowych", price: "od 80 zł/szt." },
      { name: "Mycie witryn sklepowych", price: "od 8 zł/m²" },
      { name: "Mycie okien po remoncie", price: "dopłata od 30%" },
      { name: "Usuwanie naklejek, kleju, farby lub trudnych zabrudzeń", price: "od 30 zł" },
    ],
  },
  {
    title: "Czyszczenie parowe",
    items: [
      { name: "Czyszczenie parowe fug punktowo", price: "od 80 zł" },
      { name: "Czyszczenie parowe łazienki", price: "od 150 zł" },
      { name: "Czyszczenie parowe kuchni", price: "od 150 zł" },
      { name: "Czyszczenie trudno dostępnych miejsc", price: "od 70 zł" },
    ],
  },
  {
    title: "Pomieszczenia gospodarcze, garaże i domki",
    items: [
      { name: "Gruntowne sprzątanie pomieszczenia gospodarczego", price: "od 150 zł" },
      { name: "Sprzątanie garażu", price: "od 8 zł/m²" },
      { name: "Odkurzanie pajęczyn wewnątrz pomieszczeń", price: "od 80 zł" },
      { name: "Odkurzanie pajęczyn zewnętrznych z domku, tarasu lub elewacji", price: "od 150 zł" },
      { name: "Sprzątanie domku letniskowego", price: "od 500 zł" },
      { name: "Home staging porządkowy przed sprzedażą nieruchomości", price: "od 1200 zł" },
    ],
  },
  {
    title: "Mycie zewnętrzne",
    items: [
      { name: "Mycie kostki brukowej", price: "od 8 zł/m²" },
      { name: "Mycie tarasu", price: "od 10 zł/m²" },
      { name: "Mycie elewacji z poziomu gruntu", price: "od 10 do 15 zł/m²" },
    ],
  },
  {
    title: "Nagrobki i miejsca pamięci",
    items: [
      { name: "Mycie nagrobka pojedynczego", price: "od 100 zł" },
      { name: "Mycie nagrobka podwójnego", price: "od 150 zł" },
      { name: "Doczyszczanie mocnych zabrudzeń", price: "od 50 zł" },
      { name: "Sprzątanie otoczenia grobu", price: "od 50 zł" },
      { name: "Stała opieka nad grobem", price: "od 100 zł/mies." },
      { name: "Czyszczenie nagrobka z lastryko", price: "od 150 zł/szt." },
      { name: "Doczyszczanie mocno zabrudzonego lastryko", price: "od 200 zł/szt." },
      { name: "Renowacja powierzchni lastryko nagrobków", price: "od 250 zł/m²" },
      { name: "Zabezpieczenie powierzchni lastryko", price: "od 80 zł/m²" },
      { name: "Renowacja lastryko z użyciem żywicy epoksydowej", price: "od 300 zł/m²" },
      { name: "Odświeżenie liter na nagrobku", price: "od 100 zł" },
      { name: "Uzupełnienie drobnych ubytków w nagrobku", price: "wycena indywidualna" },
      { name: "Kompleksowa renowacja nagrobka z lastryko", price: "wycena indywidualna" },
    ],
  },
];
