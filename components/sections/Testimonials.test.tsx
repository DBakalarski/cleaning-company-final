import { render, screen } from "@testing-library/react";
import { Testimonials } from "./Testimonials";
import { testimonials } from "@/data/testimonials";

test("renders three testimonials with authors", () => {
  render(<Testimonials />);
  expect(testimonials).toHaveLength(3);
  expect(
    screen.getByText("Anna M. — sprzątanie jednorazowe"),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Karolina W. — apartamenty na wynajem"),
  ).toBeInTheDocument();
});
