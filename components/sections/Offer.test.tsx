import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Offer } from "./Offer";
import { privateServices, businessServices } from "@/data/offer";

test("defaults to the private tab and lists private services", () => {
  render(<Offer />);
  expect(privateServices).toHaveLength(12);
  expect(screen.getByText("Sprzątanie mieszkań i domów")).toBeInTheDocument();
  expect(screen.queryByText("Sprzątanie biur")).not.toBeInTheDocument();
});

test("switching to the business tab swaps the visible services", async () => {
  const user = userEvent.setup();
  render(<Offer />);
  await user.click(
    screen.getByRole("button", { name: "Firmy i obiekty komercyjne" }),
  );
  expect(businessServices).toHaveLength(7);
  expect(screen.getByText("Sprzątanie biur")).toBeInTheDocument();
  expect(
    screen.queryByText("Sprzątanie mieszkań i domów"),
  ).not.toBeInTheDocument();
  expect(screen.getByText("Współpraca stała dla firm")).toBeInTheDocument();
});

test("private tab shows the add-on tags", () => {
  render(<Offer />);
  const panel = screen.getByTestId("addons");
  expect(within(panel).getByText("Piekarnik")).toBeInTheDocument();
  expect(within(panel).getByText("Łazienki do doczyszczenia")).toBeInTheDocument();
});
