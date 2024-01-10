import React, { useState } from "react";
import Maps from "./Maps";

export default function MapPage() {
  const [selectPosition, setSelectPosition] = useState(null);
  const position = [51.919438, 19.145136];

  return <Maps position={position} />;
}
