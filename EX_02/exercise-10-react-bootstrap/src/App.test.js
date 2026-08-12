import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the LAB2 Pizza House interface", () => {
  render(<App />);

  expect(screen.getByText("Pizza House")).toBeInTheDocument();
  expect(screen.getByText("Our Menu")).toBeInTheDocument();
  expect(screen.getByText("Book Your Table")).toBeInTheDocument();
  expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
});

test("filters menu cards with the navbar search", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText("Search pizza"), {
    target: { value: "pesto" }
  });

  expect(screen.getByText("Pesto Pizza")).toBeInTheDocument();
  expect(screen.queryByText("Mushroom Pizza")).not.toBeInTheDocument();
});
