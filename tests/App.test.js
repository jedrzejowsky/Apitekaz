import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("check if its working", () => {
  render(<App />);
  const loadingElement = screen.getByRole("progressbar");
  expect(loadingElement).toBeInTheDocument();
});
