import { render, screen } from "@testing-library/react";
import Home from "./page";

test("scaffold page renders", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});
