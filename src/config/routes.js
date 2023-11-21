import Home from "../screens/Home";
import Login from "../screens/Login";
import Maps from "../components/map/Maps";

const routes = [
  {
    path: "",
    component: Home,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
  },
  {
    path: "/map",
    component: Maps,
    name: "Map",
    protected: false,
  }
];

export default routes;
