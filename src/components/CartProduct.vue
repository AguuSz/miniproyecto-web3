<template>
	<div>
		<v-row >
            <v-col cols="2">
               	<v-text-field
                   	readonly
					label = "ID"
				></v-text-field>
            </v-col>
            <v-col cols="4">
				<v-text-field
                   	readonly
               		> {{ name }}
				</v-text-field>
            </v-col>
            <v-col cols="2">
				<v-text-field
                   	readonly
               		> {{ quantity }}
				</v-text-field>
            </v-col>
            <v-col cols="2">
				<v-text-field
            		readonly
             		> {{ price }}
				</v-text-field>
			</v-col>
                        
    	</v-row>
	</div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
	id: Number,
	name: String,
	price: Number,
	quantity: Number,
	
});
</script>
<style>
.selected-product {
	background: yellow !important;
}
</style>
