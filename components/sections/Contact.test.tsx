import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "./Contact";
import { contactServices } from "@/data/contactServices";

test("renders the form with all service options", () => {
  render(<Contact />);
  expect(contactServices).toHaveLength(10);
  expect(screen.getByLabelText("Imię")).toBeInTheDocument();
  expect(screen.getByLabelText("Telefon")).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Sprzątanie cykliczne" })).toBeInTheDocument();
});

test("submitting shows the thank-you panel without leaving the form", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  await user.type(screen.getByLabelText("Imię"), "Anna");
  await user.click(screen.getByRole("button", { name: "Wyślij zapytanie" }));
  expect(screen.getByText("Dziękujemy za wiadomość!")).toBeInTheDocument();
  expect(screen.queryByLabelText("Imię")).not.toBeInTheDocument();
});

test("'Wyślij kolejną' returns to the empty form", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  await user.click(screen.getByRole("button", { name: "Wyślij zapytanie" }));
  await user.click(screen.getByRole("button", { name: "Wyślij kolejną" }));
  expect(screen.getByLabelText("Imię")).toBeInTheDocument();
});

test("WhatsApp and Messenger links point to the right URLs", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute(
    "href",
    "https://wa.me/48518169491",
  );
  expect(screen.getByRole("link", { name: /Messenger/ })).toHaveAttribute(
    "href",
    "https://m.me/cleaningservicekonin",
  );
});
