import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { site } from "@/data/site";

test("about renders heading, brand quote panel and area chip, no photo placeholder", () => {
  render(<About />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Sprzątanie, za którym stoi jakość, estetyka i odpowiedzialność",
  );
  expect(screen.getByText(site.brandQuote)).toBeInTheDocument();
  expect(screen.getByText(site.area)).toBeInTheDocument();
  expect(screen.queryByText(/zdjęcie:/)).not.toBeInTheDocument();
});
