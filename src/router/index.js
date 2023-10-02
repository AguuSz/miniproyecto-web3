import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/gestion-productos",
		name: "gestion-productos",
		component: () => import("../views/GestionProductos.vue"),
	},
	{
		path: "/ventas",
		name: "Ventas",
		component: () => import("../views/SalesView.vue"),
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () => import("../views/DashboardView.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
