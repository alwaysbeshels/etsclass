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
        sidebarName: "Class",
        navbarName: "ETSClass",
        icon: FilterBAndW,
        component: ClassesPage,
        exact: true,
        displayInMenu : false
    },
    {
        path: "/info",
        component: DashboardPage,
        exact: true,
        displayInMenu: false
    },
    {
        path: "/class",
        sidebarName: "Classes",
        navbarName: "ETSClass",
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
        path: "/info",
        sidebarName: "Info",
        navbarName: "ETSClass",
        icon: Dashboard,
        component: DashboardPage,
        exact: true,
        displayInMenu : true
    },
    {
        path: "/lost",
        component: lostRoute,
        exact: false,
        displayInMenu: false,
    },
    {redirect: true, path: "/index", to: "/class"},
    {redirect: true, path: "/info", to: "/info"},
    {redirect: true, exact: true, path: "/", to: "/index"},
    {redirect: true, path: "/class", to: "/class"},
    {redirect: true, path: "/class/:numero", to: "/class/:numero"},
    {redirect: true, path: "*", to: "/lost"},
];

export default indexRoutes;
