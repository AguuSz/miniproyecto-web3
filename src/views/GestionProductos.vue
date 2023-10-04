<template>
	<v-main class="bg-grey-darken-2">
		<v-container>
			<v-row>
				<!-- Productos -->
				<v-col>
					<v-sheet min-height="70vh" rounded="lg" class="py-3 px-3">
						<v-row class="px-3 py-3 d-flex">
							<v-autocomplete
								label="Buscar producto"
								:items="products"
								item-title="name"
								return-object
								v-model="selectedProduct"
								clearable
								hide-details="auto"
							></v-autocomplete>

							<!-- Boton de New Product -->
							<v-btn
								color="primary ml-2 align-self-center"
								elevated
								prepend-icon="mdi-plus"
								@click="newProductErrors = {}"
								>Nuevo producto

								<v-dialog v-model="dialog" activator="parent" width="50vw">
									<v-card title="Añadir un nuevo producto">
										<v-card-text>
											<v-container>
												<v-row>
													<v-col cols="12">
														<v-text-field
															prepend-icon="mdi-text-account"
															label="Nombre*"
															v-model="newProduct.name"
															:error-messages="newProductErrors.name"
															required
															hide-details="auto"
														></v-text-field>
													</v-col>
													<v-col cols="12">
														<v-textarea
															prepend-icon="mdi-text"
															label="Descripcion"
															v-model="newProduct.description"
															clearable
															no-resize
															rows="3"
															hide-details="auto"
														></v-textarea>
													</v-col>

													<v-col cols="12">
														<v-text-field
															prepend-icon="mdi-cash"
															label="Costo de mano de obra*"
															v-model="newProduct.productionCost.laborCost"
															:error-messages="newProductErrors.laborCost"
															outlined
															type="number"
															hide-details="auto"
															@input="updateProductionCostTotalNewProduct"
														></v-text-field>
													</v-col>

													<v-col cols="12">
														<v-text-field
															prepend-icon="mdi-cash"
															label="Costo de materiales*"
															v-model="newProduct.productionCost.materialCost"
															:error-messages="newProductErrors.materialCost"
															outlined
															type="number"
															hide-details="auto"
															@input="updateProductionCostTotalNewProduct"
														></v-text-field>
													</v-col>

													<v-col cols="12">
														<v-text-field
															prepend-icon="mdi-cash"
															label="Costos adicionales*"
															v-model="
																newProduct.productionCost.additionalCosts
															"
															:error-messages="newProductErrors.additionalCosts"
															outlined
															type="number"
															hide-details="auto"
															@input="updateProductionCostTotalNewProduct"
														></v-text-field>
													</v-col>

													<v-col cols="12">
														<v-text-field
															prepend-icon="mdi-cash"
															label="Costo de Producción total"
															v-model="newProduct.productionCost.total"
															outlined
															disabled
															type="number"
															hide-details="auto"
														></v-text-field>
													</v-col>

													<v-col cols="12">
														<v-text-field
															prepend-icon="mdi-cash-check"
															label="Precio"
															v-model="newProduct.price"
															:error-messages="newProductErrors.price"
															outlined
															type="number"
														></v-text-field>
													</v-col>
												</v-row>
											</v-container>
											<small>* indica un campo requerido</small>
										</v-card-text>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="red" variant="text" @click="dialog = false">
												Cancelar
											</v-btn>
											<v-btn
												color="primary"
												variant="flat"
												@click="handleCreateProduct"
											>
												Guardar
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-btn>
						</v-row>

						<div class="px-1">
							<v-row>
								<v-col v-for="product in products" :key="product" cols="3">
									<Product
										id="product.id"
										:name="product.name"
										:price="product.price"
										:description="product.description"
										:productionCost="product.productionCost.total"
										@click="handleProductClick(product)"
										:isSelected="selectedProduct === product"
									/>
								</v-col>
							</v-row>
						</div>
					</v-sheet>
				</v-col>

				<!-- Edicion de producto -->
				<v-col cols="2">
					<v-card>
						<v-card-title>Editar Producto</v-card-title>
						<v-card-text>
							<v-form>
								<v-text-field
									v-model="editedProduct.name"
									label="Nombre"
									:error-messages="editedProductErrors.name"
									outlined
								></v-text-field>
								<v-textarea
									v-model="editedProduct.description"
									label="Descripción"
									outlined
								></v-textarea>
								<v-text-field
									v-model="editedProduct.productionCost.laborCost"
									label="Mano de obra"
									:error-messages="editedProductErrors.laborCost"
									outlined
									type="number"
									@input="updateProductionCostTotalEditedProduct"
								></v-text-field>
								<v-text-field
									v-model="editedProduct.productionCost.materialCost"
									label="Costo de materiales"
									:error-messages="editedProductErrors.materialCost"
									outlined
									type="number"
									@input="updateProductionCostTotalEditedProduct"
								></v-text-field>
								<v-text-field
									v-model="editedProduct.productionCost.additionalCosts"
									label="Costos adicionales"
									:error-messages="editedProductErrors.additionalCosts"
									outlined
									type="number"
									@input="updateProductionCostTotalEditedProduct"
								></v-text-field>
								<v-text-field
									v-model="editedProduct.productionCost.total"
									label="Costo de Producción total"
									outlined
									disabled
									type="number"
								></v-text-field>

								<v-text-field
									v-model="editedProduct.price"
									label="Precio"
									:error-messages="editedProductErrors.price"
									outlined
									type="number"
								></v-text-field>
								<v-btn
									block
									color="primary"
									@click="handleUpdateProduct"
									:disabled="isDisabled"
									>Actualizar</v-btn
								>
								<v-btn class="mt-2" block color="red" :disabled="isDisabled"
									>Eliminar

									<v-dialog
										v-model="deleteDialog"
										activator="parent"
										width="auto"
										persistent
									>
										<v-card title="Confirmacion">
											<v-card-text>
												<p>
													Estas seguro que deseas eliminar el producto:
													{{ editedProduct.name }}
												</p>
											</v-card-text>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn color="red" @click="deleteDialog = false">
													Cancelar
												</v-btn>
												<v-btn
													color="red"
													@click="handleDeleteProduct"
													variant="flat"
												>
													Confirmar
												</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
								</v-btn>
							</v-form>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script setup>
import { computed, onBeforeMount, ref, toRaw, watch } from "vue";
import { Utils } from "../common/Utils";
import { Validator } from "../common/Validator";
import Product from "../components/Product.vue";
import { ProductService } from "../services/ProductService";

const products = ref([]);
const selectedProduct = ref(null);
const editedProduct = ref({
	id: 0,
	name: "",
	description: "",
	unitOfMeasure: "",
	productionCost: {
		laborCost: 0,
		materialCost: 0,
		additionalCosts: 0,
		total: 0,
	},
	price: 0,
});
const newProduct = ref({
	name: "",
	description: "",
	unitOfMeasure: "",
	productionCost: {
		laborCost: 0,
		materialCost: 0,
		additionalCosts: 0,
		total: 0,
	},
	price: 0,
});
const dialog = ref(false);
const deleteDialog = ref(false);
const isDisabled = computed(() => {
	return selectedProduct.value == null;
});
const editedProductErrors = ref({});
const newProductErrors = ref({});

onBeforeMount(() => {
	getProducts();
});

const handleProductClick = (product) => {
	editedProductErrors.value = {};
	selectedProduct.value = product;
	editedProduct.value = { ...product };
};

const updateProductionCostTotalEditedProduct = () => {
	editedProduct.value.productionCost.total =
		Number(editedProduct.value.productionCost.laborCost) +
		Number(editedProduct.value.productionCost.materialCost) +
		Number(editedProduct.value.productionCost.additionalCosts);
};

const updateProductionCostTotalNewProduct = () => {
	newProduct.value.productionCost.total =
		Number(newProduct.value.productionCost.laborCost) +
		Number(newProduct.value.productionCost.materialCost) +
		Number(newProduct.value.productionCost.additionalCosts);
};

const handleUpdateProduct = async () => {
	// TODO: Agregar validaciones y convertir los valores de los costos en numeros, que por defecto los toma como Strings
	// Llamada a la API para actualizar un producto
	try {
		const product = editedProduct.value;

		if (isProductValid(product, editedProductErrors)) {
			await ProductService.updateProduct(product);
			getProducts();
			selectedProduct.value = null;
		} else {
			throw new Error("El producto no es valido");
		}
	} catch (error) {
		// TODO: Arrojar Toastr con el error
		console.error("Error al actualizar el producto:", error);
	}
};

const handleDeleteProduct = async () => {
	// Llamada a la API para borrar un producto
	let product = selectedProduct.value;

	try {
		await ProductService.deleteProduct(product.id);
		getProducts();
		selectedProduct.value = null;
		deleteDialog.value = false;
	} catch (error) {
		// TODO: Arrojar Toastr con el error
		console.error("Error al eliminar el producto:", error);
	}
};

const handleCreateProduct = async () => {
	// Llamada a la API para crear un producto
	try {
		if (isProductValid(toRaw(newProduct.value), newProductErrors)) {
			await ProductService.createProduct(toRaw(newProduct.value));
			getProducts();
			selectedProduct.value = null;
			dialog.value = false;
		}
	} catch (error) {
		console.error("Error al crear el producto:", error);
	}
};

const getProducts = async () => {
	// Llamada a la API para obtener los productos
	try {
		products.value = await ProductService.getProducts();
	} catch (error) {
		// TODO: Arrojar Toastr con el error
		console.error("Error al obtener los producto:", error);
	}
};

watch(selectedProduct, () => {
	if (selectedProduct.value == null) {
		editedProduct.value = {
			id: 0,
			name: "",
			description: "",
			unitOfMeasure: "",
			productionCost: {
				laborCost: 0,
				materialCost: 0,
				additionalCosts: 0,
				total: 0,
			},
			price: 0,
		};
	} else {
		editedProduct.value = { ...selectedProduct.value };
	}
});

const isProductValid = (product, errors) => {
	// Dejamos la lista de errores vacia
	errors.value = {};

	// Validacion de los costos de produccion
	product.productionCost.laborCost = Validator.stringToNumber(
		product.productionCost.laborCost
	);
	product.productionCost.materialCost = Validator.stringToNumber(
		product.productionCost.materialCost
	);
	product.productionCost.additionalCosts = Validator.stringToNumber(
		product.productionCost.additionalCosts
	);
	product.productionCost.total = Validator.stringToNumber(
		product.productionCost.total
	);
	product.price = Validator.stringToNumber(product.price);

	// Validacion del producto
	errors.value = Validator.validateProduct(product);

	if (!Utils.isJSONEmpty(errors.value)) {
		return false;
	}

	return true;
};
</script>

<style></style>
