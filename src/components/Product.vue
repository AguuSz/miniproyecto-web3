<template>
	<div>
		<v-hover v-slot="{ isHovering, props }">
			<v-card
				v-bind="props"
				:color="
					isSelected ? 'primary' : isHovering ? 'secondary' : 'grey-darken-3'
				"
			>
				<v-card-item>
					<v-card-title>
						<h3>{{ name }}</h3>
					</v-card-title>
					<v-card-subtitle>$ {{ price }}</v-card-subtitle>
				</v-card-item>

				<v-card-text>
					<p>{{ description }}</p>
					<br />
					<p>Costo de produccion: $ {{ productionCost }}</p>
				</v-card-text>
			</v-card>
		</v-hover>
	</div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
	name: String,
	price: Number,
	description: String,
	productionCost: Number,
	isSelected: Boolean,
});
</script>
<style>
.selected-product {
	background: yellow !important;
}
</style>
