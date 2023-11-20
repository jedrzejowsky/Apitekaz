import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import database from "./Firebase"; // Import initialized Firebase database

const PharmacyMap = () => {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Fetch pharmacy data from Firebase
    const pharmaciesRef = database.ref("pharmacies");

    pharmaciesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const pharmaciesArray = Object.values(data);
        setPharmacies(pharmaciesArray);
      }
    });

    return () => {
      pharmaciesRef.off(); // Detach listener when the component unmounts
    };
  }, []);

  return (
    <MapContainer
      center={[52.2297, 21.0122]}
      zoom={12}
      style={{ height: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pharmacies.map((pharmacy, index) => (
        <Marker key={index} position={[pharmacy.latitude, pharmacy.longitude]}>
          <Popup>
            <div>
              <h2>{pharmacy.name}</h2>
              <p>Address: {pharmacy.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PharmacyMap;
