import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("sprawdza czy app się uruchamia", () => {
  render(<App />);
  const loadingElement = screen.getByRole("progressbar");
  expect(loadingElement).toBeInTheDocument();
});
