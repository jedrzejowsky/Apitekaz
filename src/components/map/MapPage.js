import React, { useState } from "react";
import Maps from "./Maps";

export default function MapPage() {
  const [selectPosition, setSelectPosition] = useState(null);
  const position = [51.505, -0.09];

  return <Maps position={position} />;
}
