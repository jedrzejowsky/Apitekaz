import { divIcon } from 'leaflet';
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import data from './geoPharmacies_0_800.json';
import L, { MarkerCluster } from "leaflet";
import  url  from './placeholder.png';


export default function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const position = [51.919438, 19.145136];
  
  const customIcon =  new L.Icon({
    iconUrl: url,
    iconRetinaUrl: url,
    iconSize: new L.Point(40, 47),
    
  })

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true)
    });
  };

  return (
    <div style={{ width: "50vw", height: "100vh" }}>
      <MapContainer center={position} zoom={6} scrollWheelZoom={true}  style={{ border: "2px solid red", width: "100%", height: "100%" }} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MarkerClusterGroup
        chunkedLoading
      >
        {data.map((address, index) => (
          <Marker
            key={index}
            position={[address.position.lat, address.position.lng]}
            title={address.name}
            icon= {customIcon}
            
          >
            <Popup>
              <div>
                  <p>{address.name}</p>
                  <p>{address.address.label}</p>
                  <p>tel. {address.phoneNumber}</p>
              </div>
            </Popup>
          </Marker>
          
        ))}
      </MarkerClusterGroup>


        {/* <Marker position={position}>
          <Popup>
            
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* <Marker position={[51.819438, 19.155136]}/> */}


      </MapContainer>
    </div>

  )
}
