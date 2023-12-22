import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import url from "./placeholder.png";

class LocateMe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: null,
    };

    this.customIcon = new L.Icon({
      iconUrl: url,
      iconRetinaUrl: url,
      iconSize: new L.Point(40, 47),
    });
  }

  handleLocateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    } else {
      alert("Twoja przeglądarka nie obsługuje geolokalizacji.");
    }
  };

  render() {
    const { userLocation } = this.state;

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <button onClick={this.handleLocateMe}>Zlokalizuj mnie</button>
        <MapContainer
          center={[51.919438, 19.145136]}
          zoom={6}
          scrollWheelZoom={true}
          style={{
            border: "2px solid red",
            width: "100%",
            height: "calc(100vh - 40px)",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Dodanie markera dla lokalizacji użytkownika */}
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={this.customIcon}
            >
              <Popup>
                <div>
                  <p>Twoja aktualna lokalizacja</p>
                  {/* Możesz dodać dodatkowe informacje o aktualnej lokalizacji */}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
  }
}

export default LocateMe;
