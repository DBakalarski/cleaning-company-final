import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "./Faq";
import { faqItems } from "@/data/faq";

test("all questions render and answers start hidden", () => {
  render(<Faq />);
  expect(faqItems).toHaveLength(5);
  expect(screen.getByText("Jak wygląda wycena?")).toBeInTheDocument();
  expect(
    screen.queryByText(/Każda wycena dopasowywana jest indywidualnie/),
  ).not.toBeInTheDocument();
});

test("clicking a question opens its answer and toggling closes it", async () => {
  const user = userEvent.setup();
  render(<Faq />);
  const q1 = screen.getByRole("button", { name: /Jak wygląda wycena\?/ });

  await user.click(q1);
  expect(
    screen.getByText(/Każda wycena dopasowywana jest indywidualnie/),
  ).toBeInTheDocument();

  await user.click(q1);
  expect(
    screen.queryByText(/Każda wycena dopasowywana jest indywidualnie/),
  ).not.toBeInTheDocument();
});

test("opening a second question closes the first (single-open)", async () => {
  const user = userEvent.setup();
  render(<Faq />);
  await user.click(screen.getByRole("button", { name: /Jak wygląda wycena\?/ }));
  await user.click(
    screen.getByRole("button", {
      name: /Czy można zamówić pojedyncze usługi dodatkowe\?/,
    }),
  );
  expect(
    screen.queryByText(/Każda wycena dopasowywana jest indywidualnie/),
  ).not.toBeInTheDocument();
  expect(screen.getByText(/Tak\. Można dobrać konkretne elementy/)).toBeInTheDocument();
});
