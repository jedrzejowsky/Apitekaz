import { divIcon } from "leaflet";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import data from "./geoPharmacies_id_all.json";
import L, { MarkerCluster } from "leaflet";
import url from "../../assets/placeholder.png";
import Search from "./Search";
import LocateControl from "./LocateControl";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { auth, Firebase } from "../../config/firebase";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Maps(props) {
  const [pharmacies, setPharmacies] = useState([]);
  const { selectPosition } = props;
  const position = [51.919438, 19.145136];
  const firestore = getFirestore();
  const userDocId = auth.currentUser.uid;
  const [addedPharmacies, setAddedPharmacies] = useState([]);

  const customIcon = new L.Icon({
    iconUrl: url,
    iconRetinaUrl: url,
    iconSize: new L.Point(40, 47),
  });

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };

  const handleAdd = async (pharmacy) => {
    try {
      const docRef = doc(firestore, "userLikedPharmacy", userDocId);
      await updateDoc(docRef, {
        ["list"]: arrayUnion(pharmacy.id),
      });

      setAddedPharmacies((prev) => [...prev, pharmacy.id]);

      console.log(`Adding ${pharmacy.name}`);
    } catch (error) {
      console.error("Błąd podczas dodawania elementu do tablicy", error);
    }
  };

  const handleDelete = async (pharmacy) => {
    try {
      const docRef = doc(firestore, "userLikedPharmacy", userDocId);
      await updateDoc(docRef, {
        ["list"]: arrayRemove(pharmacy.id),
      });

      setAddedPharmacies((prev) => prev.filter((id) => id !== pharmacy.id));

      console.log(`Deleting ${pharmacy.name}`);
    } catch (error) {
      console.error("Błąd podczas usuwania elementu z tablicy", error);
    }
  };

  useEffect(() => {
    const fetchAddedPharmacies = async () => {
      const docRef = doc(firestore, "userLikedPharmacy", userDocId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAddedPharmacies(docSnap.data().list);
      } else {
        console.log("Brak dokumentu");
      }
    };

    fetchAddedPharmacies();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <Search />
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {data.map((address, index) => (
            <Marker
              key={index}
              position={[address.position.lat, address.position.lng]}
              title={address.name}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <p>{address.name}</p>
                  <p>{address.address.label}</p>
                  <p>tel. {address.phoneNumber}</p>
                  {addedPharmacies.includes(address.id) ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(address)}
                    >
                      Usuń aptekę
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddBoxIcon />}
                      onClick={() => handleAdd(address)}
                    >
                      Dodaj aptekę
                    </Button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <LocateControl />
      </MapContainer>
    </div>
  );
}
