import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Maps from "./Maps";

export default function MapPage() {
    const [selectPosition, setSelectPosition] = useState(null);
    const position = [51.505, -0.09];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    > 
      <div>
            <Maps position={position} />
        </div>
        <div>
           <SearchBar/>
        </div>
    </div>
  )
}
