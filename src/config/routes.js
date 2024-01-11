import Home from "../pages/Home";
import Login from "../pages/Login";

const routes = [
  {
    path: "/map",
    component: Home,
    name: "Home Page",
    protected: true,
  },
  {
    path: "",
    component: Login,
    name: "Login Screen",
    protected: true,
  },
];

export default routes;
