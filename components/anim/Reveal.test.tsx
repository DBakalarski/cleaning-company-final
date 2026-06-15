import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

test("renders children unchanged", () => {
  render(
    <Reveal>
      <p>Sekcja</p>
    </Reveal>,
  );
  expect(screen.getByText("Sekcja")).toBeInTheDocument();
});

test("forwards className to the wrapper element", () => {
  const { container } = render(<Reveal className="block">x</Reveal>);
  expect(container.firstElementChild).toHaveClass("block");
});

test("block mode marks the wrapper with data-reveal", () => {
  const { container } = render(<Reveal>x</Reveal>);
  expect(container.firstElementChild).toHaveAttribute("data-reveal");
  expect(container.firstElementChild).not.toHaveAttribute("data-reveal-stagger");
});

test("stagger mode marks the wrapper with data-reveal-stagger", () => {
  const { container } = render(
    <Reveal stagger>
      <span data-reveal-item>a</span>
    </Reveal>,
  );
  expect(container.firstElementChild).toHaveAttribute("data-reveal-stagger");
  expect(container.firstElementChild).not.toHaveAttribute("data-reveal");
});
