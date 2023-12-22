import Center from "../components/utils/Center";
import Navbar from "../components/navbar/navbar";
import MapPage from "../components/map/MapPage";

const Home = (props) => {
  return (
    <>
      <Navbar />
      <Center>
        <MapPage />
      </Center>
    </>
  );
};

export default Home;
