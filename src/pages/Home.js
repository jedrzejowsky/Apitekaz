// Home.js
import React from "react";
import Drawer from "../components/guideUI/Drawer";
import MapPage from "../components/map/MapPage";

const Home = (props) => {
  return (
    <>
      <MapPage />
      <Drawer />
    </>
  );
};

export default Home;
