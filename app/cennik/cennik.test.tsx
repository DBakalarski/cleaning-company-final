import { render, screen } from "@testing-library/react";
import CennikPage from "./page";
import { pricingCategories } from "@/data/pricing";

test("data has nine categories and 57 items total", () => {
  expect(pricingCategories).toHaveLength(9);
  const total = pricingCategories.reduce((n, c) => n + c.items.length, 0);
  expect(total).toBe(57);
});

test("renders category headings and a sample price", () => {
  render(<CennikPage />);
  expect(
    screen.getByRole("heading", { name: "Łazienki, płytki, fugi i kamień" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Nagrobki i miejsca pamięci" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Mycie płytek od góry do dołu")).toBeInTheDocument();
  expect(screen.getAllByText("od 150 zł").length).toBeGreaterThan(0);
});
