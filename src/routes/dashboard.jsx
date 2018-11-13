// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views
import DashboardPage from "../views/index.jsx";

const indexRoutes = [
  {
    path: "/index",
    sidebarName: "Dashboard",
    navbarName: "Jé L'Doua D'Entré",
    icon: Dashboard,
    component: DashboardPage
  },
  { redirect: true, path: "/", to: "/index", navbarName: "Redirect" }
];

export default indexRoutes;
