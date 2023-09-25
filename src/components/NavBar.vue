<template>
	<v-app>
		<v-toolbar app class="bg-grey-darken-3">
			<v-toolbar-title>
				<router-link
					to="/"
					tag="span"
					style="text-decoration: none; color: white"
				>
					{{ appTitle }}
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-xs-only">
				<v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
					<v-icon left dark>{{ item.icon }}</v-icon>
					{{ item.title }}
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>

		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			appTitle: "Productos",
			sidebar: false,
			menuItems: [
				{
					title: "Gestion de productos",
					path: "/gestion-productos",
					icon: "mdi-store",
				},
				{ title: "Ventas", path: "/ventas", icon: "mdi-sale" },
				{ title: "Dashboard", path: "/dashboard", icon: "mdi-view-dashboard" },
			],
		};
	},
};
</script>
<style></style>
