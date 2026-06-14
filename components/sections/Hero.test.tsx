import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

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
