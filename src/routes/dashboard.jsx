// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Alarm from "@material-ui/icons/Alarm";
// core components/views
import DashboardPage from "../views/index.jsx";
import ClassesPage from "../views/class.jsx";

const indexRoutes = [
    {
        path: "/LOG515_FrontEnd/index",
        sidebarName: "Dashboard",
        navbarName: "Jé L'Doua D'Entré",
        icon: Dashboard,
        component: DashboardPage
    },
    {
        path: "/LOG515_FrontEnd/class",
        sidebarName: "Classes",
        navbarName: "Jé L'Doua D'Entré",
        icon: Alarm,
        component: ClassesPage
    },
    {redirect: true, path: "/LOG515_FrontEnd/", to: "/LOG515_FrontEnd/index", navbarName: "Redirect"},
    {redirect: true, path: "/LOG515_FrontEnd/class", to: "/LOG515_FrontEnd/class", navbarName: "Redirect"}
];

export default indexRoutes;
