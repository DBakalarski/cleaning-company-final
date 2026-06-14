import { render, screen } from "@testing-library/react";
import Home from "./page";

test("landing page renders hero, offer and contact landmarks", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Sprawnie. Dokładnie. Dyskretnie. Przystępnie.",
  );
  expect(
    screen.getByRole("heading", { name: "Zakres dopasowany do Twojego obiektu" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Zamów bezpłatną wycenę" }),
  ).toBeInTheDocument();
});
