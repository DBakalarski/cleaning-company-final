import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { site } from "@/data/site";

test("hero renders the headline, subcopy and primary CTAs", () => {
  render(<Hero />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Sprawnie. Dokładnie. Dyskretnie. Przystępnie.",
  );
  expect(
    screen.getByText(/Profesjonalne usługi sprzątające dla klientów prywatnych/),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Zamów wycenę" })).toHaveAttribute(
    "href",
    "#kontakt",
  );
  expect(screen.getByRole("link", { name: "Zobacz ofertę" })).toHaveAttribute(
    "href",
    "#oferta",
  );
});

test("hero renders the brand panel: logo, wordmark and trust chips, no photo placeholder", () => {
  render(<Hero />);
  expect(screen.getByAltText(site.name)).toBeInTheDocument();
  expect(screen.getByText("do 100 km")).toBeInTheDocument();
  expect(screen.getByText("wycena indywidualna")).toBeInTheDocument();
  expect(screen.getByText("klienci prywatni i firmy")).toBeInTheDocument();
  expect(screen.getByText("Estetyczny efekt")).toBeInTheDocument();
  expect(screen.queryByText(/zdjęcie:/)).not.toBeInTheDocument();
});
