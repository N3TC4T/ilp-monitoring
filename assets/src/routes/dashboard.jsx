import Dashboard from "views/Dashboard/Dashboard";
import RouteView from "views/RouteGraph/RouteGraph";
import MapView from "views/MapView/MapView"
import AlertsView from "views/AlertsView/AlertsView"
import ResourcesView from "views/ResourcesView/ResourcesView"

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "glyphicon glyphicon-scale",
        component: Dashboard
    },
    {
        path: "/route",
        name: "Routing",
        icon: "glyphicon glyphicon-random",
        component: RouteView
    },
    {
        path: "/map",
        name: "Map",
        icon: "glyphicon glyphicon-globe",
        component: MapView
    },
    {
        path: "/alerts",
        name: "Alerts",
        icon: "glyphicon glyphicon-alert",
        component: AlertsView
    },
    {
        path: "/resource",
        name: "Resources",
        icon: "glyphicon glyphicon-book",
        component: ResourcesView
    },
    { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
