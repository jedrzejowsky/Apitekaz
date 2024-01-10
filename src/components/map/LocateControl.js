import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import locateme from "../../assets/locateme.png";

export default function LocateControl() {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    const locateIcon = L.icon({
      iconUrl: locateme,
      iconSize: [30, 30],
    });

    function onLocationFound(e) {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      markerRef.current = L.marker(e.latlng, { icon: locateIcon })
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();
    }

    function onLocationError(e) {
      alert(e.message);
    }

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
    };
  }, [map]);

  return (
    <div
      style={{ position: "absolute", top: "90px", left: "15px", zIndex: 400 }}
    >
      <MyLocationIcon
        onClick={() => map.locate({ setView: true, maxZoom: 16 })}
      />
    </div>
  );
}
