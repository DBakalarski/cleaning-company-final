import { render, screen } from "@testing-library/react";
import { PricingPreview } from "./PricingPreview";
import { pricingPreview } from "@/data/pricingPreview";

test("shows six sample prices and a link to the full pricelist", () => {
  render(<PricingPreview />);
  expect(pricingPreview).toHaveLength(6);
  expect(screen.getByText("Czyszczenie piekarnika")).toBeInTheDocument();
  expect(screen.getByText("od 60 zł/szt.")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Zobacz pełny cennik →" }),
  ).toHaveAttribute("href", "/cennik");
});
