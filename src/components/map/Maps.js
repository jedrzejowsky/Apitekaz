import { divIcon } from 'leaflet';
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";


export default function Maps() {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "row",
      width: "100vw",
      height: "100vh",
    }}
  >
    <div  style={{ width: "50vw", height: "100%" }}>
    <MapContainer center={[51.505, -0.09]} zoom={8} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  </div>
  </div>
  )
}
