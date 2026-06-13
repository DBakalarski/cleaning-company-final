import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

test("renders the brand name and phone CTA", () => {
  render(<Header />);
  expect(screen.getAllByText("Cleaning Service Konin").length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /518 169 491/ }).length).toBeGreaterThan(0);
});

test("mobile menu toggles open and closed via the hamburger button", async () => {
  const user = userEvent.setup();
  render(<Header />);
  const toggle = screen.getByRole("button", { name: "Menu" });

  expect(toggle).toHaveAttribute("aria-expanded", "false");
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("clicking a link in the open mobile menu closes it", async () => {
  const user = userEvent.setup();
  render(<Header />);
  const toggle = screen.getByRole("button", { name: "Menu" });
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");

  const mobileMenu = screen.getByTestId("mobile-menu");
  await user.click(within(mobileMenu).getByText("O nas"));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});
