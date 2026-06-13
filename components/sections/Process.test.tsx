import { render, screen } from "@testing-library/react";
import { Process } from "./Process";
import { processSteps } from "@/data/process";
import { PricingInfo } from "./PricingInfo";
import { pricingFactors } from "@/data/pricingInfo";

test("renders all five process steps with numbers", () => {
  render(<Process />);
  expect(processSteps).toHaveLength(5);
  expect(screen.getByText("01")).toBeInTheDocument();
  expect(screen.getByText("05")).toBeInTheDocument();
  expect(
    screen.getByText("Kontaktujesz się z nami telefonicznie lub wiadomością."),
  ).toBeInTheDocument();
});

test("pricing info lists all nine factors", () => {
  render(<PricingInfo />);
  expect(pricingFactors).toHaveLength(9);
  expect(screen.getByText("rodzaju obiektu")).toBeInTheDocument();
  expect(screen.getByText("usług dodatkowych")).toBeInTheDocument();
});
