import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

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
    protected: false,
  },
  {
    path: "/*",
    name: "Not Found",
    component: NotFound,
    protected: false,
  }
];

export default routes;
