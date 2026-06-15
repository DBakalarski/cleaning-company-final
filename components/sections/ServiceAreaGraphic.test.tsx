import { render } from "@testing-library/react";
import { ServiceAreaGraphic } from "./ServiceAreaGraphic";

test("renders the Konin pill label", () => {
  const { getByText } = render(<ServiceAreaGraphic />);
  expect(getByText("Konin")).toBeInTheDocument();
});

test("renders two ring masks and keeps every svg decorative", () => {
  const { container } = render(<ServiceAreaGraphic />);
  expect(container.querySelectorAll("[data-ring-mask]")).toHaveLength(2);
  container.querySelectorAll("svg").forEach((svg) => {
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});

// Without IntersectionObserver (jsdom), nothing may stay hidden: the rings, pin
// and accent dots render fully drawn (dashoffset 0) and the effect leaves them.
test("with no IntersectionObserver, every stroke is drawn (offset 0)", () => {
  const { container } = render(<ServiceAreaGraphic />);
  const strokes = container.querySelectorAll(
    "[data-ring-mask], [data-pin-stroke], [data-dot]",
  );
  expect(strokes.length).toBeGreaterThan(0);
  strokes.forEach((el) => {
    expect(el).toHaveStyle({ strokeDashoffset: "0" });
  });
});
