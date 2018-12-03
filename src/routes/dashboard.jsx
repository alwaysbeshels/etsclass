// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import FilterBAndW from "@material-ui/icons/FilterBAndW";
// core components/views
import DashboardPage from "../views/index.jsx";
import ClassesPage from "../views/class.jsx";
import ClassInfoPage from "../views/classInfo.jsx";
import lostRoute from "../views/404.jsx";

const indexRoutes = [
    {
        path: "/index",
        sidebarName: "Dashboard",
        navbarName: "Jé L'Doua Dentré",
        icon: Dashboard,
        component: DashboardPage,
        exact: true,
        displayInMenu : true
    },
    {
        path: "/class",
        sidebarName: "Classes",
        navbarName: "Jé L'Doua Dentré",
        icon: FilterBAndW,
        component: ClassesPage,
        exact: true,
        displayInMenu: true
    },
    {
        path: "/class/:numero",
        component: ClassInfoPage,
        exact: false,
        displayInMenu: false
    },
    {
        path: "/lost",
        component: lostRoute,
        exact: false,
        displayInMenu: false,
    },


    {redirect: true, path: "/*", to: "/lost"},
    {redirect: true, path: "/", to: "/index"},
    {redirect: true, path: "/class", to: "/class"},
    {redirect: true, path: "/class/:numero", to: "/class/:numero"}
   
];

export default indexRoutes;
