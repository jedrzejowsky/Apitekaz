import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import data from "./geoPharmacies_id_all.json";
import L from "leaflet";
import url from "../../assets/placeholder.png";
import Search from "./Search";
import LocateControl from "./LocateControl";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "../../config/firebase";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {Box} from "@mui/material";

export default function Maps(props) {
  const position = [51.919438, 19.145136];
  const firestore = getFirestore();
  const userDocId = auth.currentUser ? auth.currentUser.uid : null;
  const [addedPharmacies, setAddedPharmacies] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const customIcon = new L.Icon({
    iconUrl: url,
    iconRetinaUrl: url,
    iconSize: new L.Point(40, 47),
  });

  const handleAdd = async (pharmacy) => {
    try {
      const docRef = doc(firestore, "userLikedPharmacy", userDocId);
      await updateDoc(docRef, {
        ["list"]: arrayUnion(pharmacy.id),
      });

      setAddedPharmacies((prev) => [...prev, pharmacy.id]);

      console.log(`Adding ${pharmacy.name}`);
    } catch (error) {
      console.error("Error adding element to array", error);
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
      console.error("Error removing element from array", error);
    }
  };

  const handleLocationFound = (event) => {
    setUserLocation(event.latlng);
  };

  const calculateDistance = (pointA, pointB) => {
    const R = 6371;
    const dLat = deg2rad(pointB[0] - pointA[0]);
    const dLon = deg2rad(pointB[1] - pointA[1]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(pointA[0])) *
        Math.cos(deg2rad(pointB[0])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    const fetchAddedPharmacies = () => {
      if (userDocId !== null && userDocId !== undefined) {
      const docRef = doc(firestore, "userLikedPharmacy", userDocId);

      onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setAddedPharmacies(docSnap.data().list);
        } else {
          console.log("No document found");
        }
      });
    }
    };

    fetchAddedPharmacies();
  }, [firestore, userDocId]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        whenReady={(mapInstance) => {
          mapInstance.target.on("locationfound", handleLocationFound);
        }}
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
                  <p>
                    <LocalPhoneIcon style={{ fontSize: 18 }} />  {address.phoneNumber}
                  </p>
                  {addedPharmacies.includes(address.id) ? (
                    <Box mb={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(address)}
                    >
                      Usuń aptekę
                    </Button>
                    </Box>
                  ) : (
                    <Box mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddBoxIcon />}
                      onClick={() => handleAdd(address)}
                      
                    >
                      Dodaj aptekę
                    </Button>
                    </Box>
                  )}
                  {userLocation && (
                      <Box mb={2}>
                    <Button 
                      variant="contained"
                      color="primary"
                      startIcon={<DirectionsIcon />}
                      onClick={() => {
                        const distance = calculateDistance(
                          [userLocation.lat, userLocation.lng],
                          [address.position.lat, address.position.lng]
                        );
                        alert(
                          `Apteka znajduje się ${distance.toFixed(1)} km stąd`
                        );
                      }}
                   
                    >
                      Oblicz trasę
                    </Button>
                    </Box>
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
