import { render, screen } from "@testing-library/react";
import { Testimonials } from "./Testimonials";
import { testimonials } from "@/data/testimonials";

test("renders all testimonials with authors", () => {
  render(<Testimonials />);
  expect(testimonials).toHaveLength(13);
  // The marquee renders the list twice for a seamless loop, so each author
  // appears more than once in the DOM.
  expect(
    screen.getAllByText("Małgorzata Kałużna — opinia z Facebooka").length,
  ).toBeGreaterThan(0);
  expect(
    screen.getAllByText("Ewelina Petzke — opinia z Facebooka").length,
  ).toBeGreaterThan(0);
});

test("mobile carousel exposes one dot indicator per testimonial", () => {
  render(<Testimonials />);
  const dots = screen.getAllByRole("button", { name: /Przejdź do opinii \d+/ });
  expect(dots).toHaveLength(testimonials.length);
});
