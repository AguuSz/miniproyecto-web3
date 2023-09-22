<template>
	<v-text-field
		v-model="searchQuery"
		label="Buscar producto"
		dense
		prepend-icon="mdi-magnify"
		@input="emitSearch"
	></v-text-field>
</template>

<script>
export default {
	name: "SearchBar",
	data() {
		return {
			searchQuery: "",
		};
	},
	methods: {
		emitSearch() {
			this.$emit("search", this.searchQuery);
		},
	},
};
</script>
