import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "./Faq";
import { faqItems } from "@/data/faq";

test("all questions render and start collapsed", () => {
  render(<Faq />);
  expect(faqItems).toHaveLength(5);
  expect(screen.getByText("Jak wygląda wycena?")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Jak wygląda wycena\?/ }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("clicking a question expands it and toggling collapses it", async () => {
  const user = userEvent.setup();
  render(<Faq />);
  const q1 = screen.getByRole("button", { name: /Jak wygląda wycena\?/ });

  await user.click(q1);
  expect(q1).toHaveAttribute("aria-expanded", "true");

  await user.click(q1);
  expect(q1).toHaveAttribute("aria-expanded", "false");
});

test("opening a second question collapses the first (single-open)", async () => {
  const user = userEvent.setup();
  render(<Faq />);
  const q1 = screen.getByRole("button", { name: /Jak wygląda wycena\?/ });
  const q2 = screen.getByRole("button", {
    name: /Czy można zamówić pojedyncze usługi dodatkowe\?/,
  });

  await user.click(q1);
  await user.click(q2);

  expect(q1).toHaveAttribute("aria-expanded", "false");
  expect(q2).toHaveAttribute("aria-expanded", "true");
});
