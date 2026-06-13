import { render, screen } from "@testing-library/react";
import { WhyUs } from "./WhyUs";
import { whyUsCards } from "@/data/whyUs";

test("renders all eight reasons", () => {
  render(<WhyUs />);
  expect(whyUsCards).toHaveLength(8);
  for (const card of whyUsCards) {
    expect(screen.getByText(card)).toBeInTheDocument();
  }
});
