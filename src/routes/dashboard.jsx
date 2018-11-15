// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Alarm from "@material-ui/icons/Alarm";
// core components/views
import DashboardPage from "../views/index.jsx";
import ClassesPage from "../views/class.jsx";

const indexRoutes = [
    {
        path: "/index",
        sidebarName: "Dashboard",
        navbarName: "Jé L'Doua D'Entré",
        icon: Dashboard,
        component: DashboardPage
    },
    {
        path: "/class",
        sidebarName: "Classes",
        navbarName: "Jé L'Doua D'Entré",
        icon: Alarm,
        component: ClassesPage
    },
    {redirect: true, path: "/", to: "/index", navbarName: "Redirect"},
    {redirect: true, path: "/class", to: "/class", navbarName: "Redirect"}
];

export default indexRoutes;
