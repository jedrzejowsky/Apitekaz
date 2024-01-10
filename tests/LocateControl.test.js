import { render, unmountComponentAtNode } from "react-dom";
import { MapContainer } from "react-leaflet";
import LocateControl from "./LocateControl";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders LocateControl and checks if MyLocationIcon is present", () => {
  render(
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <LocateControl />
    </MapContainer>,
    container
  );

  expect(container.querySelector("[role='presentation']")).toBeTruthy();
});
