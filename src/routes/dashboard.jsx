// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import FilterBAndW from "@material-ui/icons/FilterBAndW";
import Alarmoff from "@material-ui/icons/AlarmOff";
// core components/views
import DashboardPage from "../views/index.jsx";
import ClassesPage from "../views/class.jsx";
import ClassInfoPage from "../views/classInfo.jsx";

const indexRoutes = [
    {
        path: "/index",
        sidebarName: "Dashboard",
        navbarName: "Jé L'Doua Dentré",
        icon: Dashboard,
        component: DashboardPage
    },
    {
        path: "/class",
        sidebarName: "Classes",
        navbarName: "Jé L'Doua Dentré",
        icon: FilterBAndW,
        component: ClassesPage
    },
    {
        path: "/InfoClass",
        sidebarName: "Class Info",
        navbarName: "Jé L'Doua Dentré",
        icon: Alarmoff,
        component: ClassInfoPage
    },
    {redirect: true, path: "/", to: "/index"},
    {redirect: true, path: "/class", to: "/class"},
    {redirect: true, path: "/InfoClass", to: "/InfoClass"}
];

export default indexRoutes;
