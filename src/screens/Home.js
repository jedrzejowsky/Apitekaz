import { useEffect } from "react";
import Center from "../components/utils/Center";
import MapPage from "../components/map/MapPage";

const Home = (props) => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Center>
      <MapPage />
    </Center>
  );
};

export default Home;
