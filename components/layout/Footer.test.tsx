import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

test("footer shows brand, phone and copyright", () => {
  render(<Footer />);
  expect(screen.getByText("Cleaning Service Konin")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "518 169 491" })).toHaveAttribute(
    "href",
    "tel:+48518169491",
  );
  expect(screen.getByText("© 2026 Cleaning Service Konin")).toBeInTheDocument();
});
