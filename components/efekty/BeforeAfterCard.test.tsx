import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BeforeAfterCard } from "./BeforeAfterCard";
import { beforeAfterPairs } from "@/data/beforeAfter";

const pair = beforeAfterPairs[0];

test("renders both photos and the caption, starting on 'before'", () => {
  render(<BeforeAfterCard pair={pair} />);
  // before photo carries the descriptive alt
  expect(screen.getByAltText(pair.alt)).toBeInTheDocument();
  expect(screen.getByText(pair.caption)).toBeInTheDocument();
  const toggle = screen.getByRole("button");
  expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("tapping toggles the reveal state", async () => {
  const user = userEvent.setup();
  render(<BeforeAfterCard pair={pair} />);
  const toggle = screen.getByRole("button");

  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-pressed", "true");

  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-pressed", "false");
});
