import { divIcon } from 'leaflet';
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";



export default function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const position = [51.505, -0.09];
  
  return (
    <div style={{ width: "50vw", height: "100vh" }}>
      <MapContainer center={position} zoom={8} scrollWheelZoom={false} style={{ border: "2px solid red", width: "100%", height: "100%" }} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[51.508, -0.11]}/>
      </MapContainer>
    </div>

  )
}
