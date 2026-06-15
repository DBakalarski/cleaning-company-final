import { render } from "@testing-library/react";
import { SketchUnderline } from "./SketchUnderline";

const D = "M3 9 C 28 3, 62 2.5, 78 5.5 S 122 9.5, 137 4";

test("renders a path with the given d", () => {
  const { container } = render(<SketchUnderline d={D} />);
  expect(container.querySelector("path")).toHaveAttribute("d", D);
});

test("forwards className to the svg and hides it from a11y", () => {
  const { container } = render(<SketchUnderline d={D} className="block" />);
  const svg = container.firstElementChild;
  expect(svg?.tagName).toBe("svg");
  expect(svg).toHaveClass("block");
  expect(svg).toHaveAttribute("aria-hidden", "true");
});

test("defaults viewBox/strokeWidth and accepts overrides", () => {
  const { container, rerender } = render(<SketchUnderline d={D} />);
  expect(container.firstElementChild).toHaveAttribute("viewBox", "0 0 140 12");
  expect(container.querySelector("path")).toHaveAttribute("stroke-width", "2.5");

  rerender(<SketchUnderline d={D} viewBox="0 0 140 10" strokeWidth={2.2} />);
  expect(container.firstElementChild).toHaveAttribute("viewBox", "0 0 140 10");
  expect(container.querySelector("path")).toHaveAttribute("stroke-width", "2.2");
});

// Without IntersectionObserver (jsdom), the stroke must never stay hidden:
// the effect draws it immediately rather than leaving dashoffset at 1.
test("with no IntersectionObserver, the stroke is drawn (offset 0)", () => {
  const { container } = render(<SketchUnderline d={D} />);
  expect(container.querySelector("path")).toHaveStyle({ strokeDashoffset: "0" });
});
