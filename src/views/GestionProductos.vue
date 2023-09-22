<template>
	<v-main class="bg-grey-darken-2">
		<v-container>
			<v-row>
				<!-- Productos -->
				<v-col>
					<v-sheet min-height="70vh" rounded="lg" class="py-3 px-3">
						<SearchBar @search="handleSearch" />

						<div class="px-1">
							<v-row>
								<v-col v-for="product in products" :key="product" cols="2">
									<Product
										:name="product.name"
										:price="product.price"
										:description="product.description"
										:productionCost="product.productionCost.total"
									/>
								</v-col>
							</v-row>
						</div>
					</v-sheet>
				</v-col>

				<!-- Edicion de producto -->
				<v-col cols="2">
					<v-sheet rounded="lg">
						<v-list rounded="lg">
							<v-list-item
								v-for="n in 5"
								:key="n"
								link
								:title="`List Item ${n}`"
							></v-list-item>

							<v-divider class="my-2"></v-divider>

							<v-list-item
								color="grey-lighten-4"
								link
								title="Refresh"
							></v-list-item>
						</v-list>
					</v-sheet>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import Product from "../components/Product.vue";
import SearchBar from "../components/SearchBar.vue";

const products = ref([]);

onBeforeMount(() => {
	// Llamada a la API para obtener los productos
	axios
		.get("http://localhost:3000/products")
		.then((response) => {
			products.value = response.data;
		})
		.catch((error) => console.error(error));
});
</script>

<style></style>
