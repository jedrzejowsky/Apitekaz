import { render, waitFor } from "@testing-library/react";
import App from "../src/App";
import { auth } from "../src/config/firebase";

jest.mock("../src/config/firebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

// Test renderowania komponentu App
test("renders App", async () => {
  auth.onAuthStateChanged.mockImplementationOnce((callback) => callback(null));

  const { getByText } = render(<App />);

  await waitFor(() =>
    expect(getByText(/No user detected/i)).toBeInTheDocument()
  );
});

// Test funkcji onAuthStateChanged
test("onAuthStateChanged function", async () => {
  const user = { uid: "testUid" };
  auth.onAuthStateChanged.mockImplementationOnce((callback) => callback(user));

  const { getByText } = render(<App />);

  await waitFor(() => expect(getByText(/User detected./i)).toBeInTheDocument());
});
