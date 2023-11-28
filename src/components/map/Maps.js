import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Firebase } from "../../config/firebase"; // Import Firebase z Twojego pliku
import { getFirestore, collection, getDocs } from "firebase/firestore";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import url from "../../assets/placeholder.png";

export default function Maps(props) {
  const [pharmacies, setPharmacies] = useState([]);
  const { selectPosition } = props;
  const position = [51.919438, 19.145136];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(Firebase); // Uzyskaj dostęp do Firestore z Firebase

        // Pobranie danych z bazy Firestore
        const pharmaciesCollection = collection(db, "pharmacy"); // Nazwa kolekcji w Firestore
        const snapshot = await getDocs(pharmaciesCollection);
        const pharmaciesData = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          pharmaciesData.push({
            id: doc.id,
            ...data,
          });
        });

        setPharmacies(pharmaciesData);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
      }
    };

    fetchData();
  }, []);

  const customIcon = new L.Icon({
    iconUrl: url,
    iconRetinaUrl: url,
    iconSize: new L.Point(40, 47),
  });

  return (
    <div style={{ width: "50vw", height: "100vh" }}>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        style={{ border: "2px solid red", width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup chunkedLoading>
          {pharmacies.map((pharmacy, index) => (
            <Marker
              key={index}
              position={[pharmacy.position.lat, pharmacy.position.lng]}
              title={pharmacy.name}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <p>{pharmacy.name}</p>
                  <p>{pharmacy.address.label}</p>
                  <p>tel. {pharmacy.phoneNumber}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
