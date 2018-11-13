// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Jé L'Doua D'Entré",
    icon: Dashboard,
    component: DashboardPage
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
