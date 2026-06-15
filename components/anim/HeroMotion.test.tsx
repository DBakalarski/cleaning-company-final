import { render, screen } from "@testing-library/react";
import { HeroMotion } from "./HeroMotion";

test("renders its children", () => {
  render(
    <HeroMotion className="flex">
      <h1 data-hero-el>Tytuł</h1>
    </HeroMotion>,
  );
  expect(screen.getByText("Tytuł")).toBeInTheDocument();
});

test("forwards className to the wrapper", () => {
  const { container } = render(<HeroMotion className="flex flex-col">x</HeroMotion>);
  expect(container.firstElementChild).toHaveClass("flex", "flex-col");
});
