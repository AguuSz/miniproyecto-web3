<template>
	<v-main class="bg-grey-darken-2">
		<v-container>
			<v-row>
				<!-- Busqueda -->
				<v-col>
					<v-sheet min-height="70vh" rounded="lg" class="py-3 px-3">
						<v-row class="px-4 pt-2">
							<v-text-field
								v-model="search"
								label="Buscar ventas por Cliente/producto/Id"
								prepend-icon="mdi-text-search"
							></v-text-field>

							<!-- Boton cargar venta-->
							<v-btn color="primary" class="mt-3 ms-2">
								Cargar venta
								<v-dialog
									v-model="dialog"
									activator="parent"
									width="50vw"
									height="100vw"
								>
									<v-card>
										<v-card-title>
											<span class="headline">Cargar venta</span>
										</v-card-title>
										<v-card-text>
											<v-container>
												<v-row>
													<v-col cols="3">
														<v-autocomplete
															v-model="currentClient"
															label="ID"
															:items="clients"
															item-title="id"
															clearable
															:item-value="(item) => item"
														></v-autocomplete>
													</v-col>
													<v-col cols="9">
														<v-autocomplete
															v-model="currentClient"
															label="Cliente"
															:items="clients"
															item-title="name"
															:item-value="(item) => item"
															clearable
														></v-autocomplete>
													</v-col>
													<v-divider :thickness="5"></v-divider>
												</v-row>

												<v-row> </v-row>

												<v-table>
													<thead>
														<tr>
															<th class="text-left">id</th>
															<th class="text-left">Nombre</th>
															<th>Cantidad</th>
															<th>Precio</th>
															<th>Total</th>
														</tr>
													</thead>
													<tbody>
														<tr></tr>
														<tr v-for="item in currentCart.items" :key="item">
															<td>{{ item.product }}</td>
															<td>{{ item.name }}</td>
															<td>{{ item.quantity }}</td>
															<td>{{ item.price }}</td>
															<td>{{ item.total }}</td>
														</tr>
														<tr></tr>

														<tr>
															<td colspan="4"></td>
															<td>
																<v-text-field
																	label="Total"
																	prefix="$"
																	v-model="currentCart.total"
																	readonly
																></v-text-field>
															</td>
														</tr>
													</tbody>
												</v-table>
												<v-row>
													<v-col cols="2">
														<v-autocomplete
															v-model="currentItem"
															:items="products"
															item-title="id"
															:item-value="(item) => item"
															@input="updateSubTotal"
														></v-autocomplete>
													</v-col>

													<v-col cols="4">
														<v-autocomplete
															v-model="currentItem"
															:items="products"
															item-title="name"
															:item-value="(item) => item"
														></v-autocomplete>
													</v-col>
													<v-col cols="2">
														<v-text-field
															type="number"
															v-model="currentQuantity"
															min="1"
														></v-text-field>
													</v-col>
													<v-col cols="2">
														<v-text-field
															prefix="$"
															v-model="currentItem.price"
															read
															only
														></v-text-field>
													</v-col>
													<v-col cols="2">
														<v-text-field
															prefix="$"
															v-model="currentTotal"
															:item-value="(item) => item"
															readonly
														></v-text-field>
													</v-col>
												</v-row>
											</v-container>
										</v-card-text>

										<v-card-actions>
											<v-btn
												color="indigo-darken-1"
												variant="flat"
												text
												@click="addNewProduct"
												>Agregar nuevo producto
											</v-btn>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" text @click="cancelSale"
												>Cancelar</v-btn
											>
											<v-btn
												color="blue darken-1"
												variant="flat"
												text
												@click="saveSale"
												>Guardar</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-btn>
						</v-row>

						<!-- Tabla de ventas -->
						<v-data-table
							v-model:expanded="expanded"
							:headers="[
								{
									title: 'Id',
									align: 'start',
									sortable: false,
									key: 'id',
								},

								{ title: 'Customer', key: 'customerID' },
								{ title: 'Fecha', key: 'date' },
								{ title: 'Productos', key: 'products' },
								{ title: 'total', key: 'total' },
								{ title: '', key: 'data-table-expand' },
							]"
							:items="sales"
							:search="search"
							show-expand
							class="elevation-1"
						>
							<!-- Cuando das click en mostrar mas detalles de una venta -->
							<template v-slot:top>
								<v-toolbar flat>
									<v-toolbar-title>Ventas</v-toolbar-title>
								</v-toolbar>
							</template>
							<template v-slot:expanded-row="{ columns, item }">
								<tr>
									<td :colspan="1"></td>
									<td>
										Nombre del cliente:
										{{ getClient(item.columns.customerID).name }}
									</td>

									<td>
										Costo de produccion:
										{{ getSale(item.columns).totalProductionCost }}
									</td>
									<td>
										Profit:
										{{
											item.columns.total -
											getSale(item.columns).totalProductionCost
										}}
									</td>
									<td></td>
									<td>
										<v-icon size="small" @click="deleteSale(item.columns)">
											mdi-delete
										</v-icon>
									</td>
								</tr>
								<v-dialog v-model="dialogDelete" max-width="500px">
									<v-card>
										<v-card-title>Confirmacion</v-card-title>
										<v-card-text>
											¿Esta seguro que desea eliminar la venta?
										</v-card-text>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn
												color="blue-darken-1"
												variant="text"
												@click="closeDelete"
												>Cancelar</v-btn
											>
											<v-btn
												color="blue-darken-1"
												variant="text"
												@click="deleteItemConfirm"
												>Confirmar</v-btn
											>
											<v-spacer></v-spacer>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</template>
						</v-data-table>
					</v-sheet>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { ClientService } from "../services/ClientService.js";
import { ProductService } from "../services/ProductService";
import { SaleService } from "../services/SaleService.js";

const search = new ref("");
const products = new ref([]);
const clients = new ref([]);
const sales = new ref([]);
const dialogDelete = new ref(false);
const dialog = new ref(false);
const expanded = new ref([]);

const currentItem = new ref({
	id: 0,
	name: "",
	price: 0,
});
const currentQuantity = new ref(1);
const currentTotal = new ref(0);

const currentClient = new ref({
	id: 0,
	name: "",
	address: "",
	phone: "",
});

const currentCart = new ref({
	client: currentClient.value,
	items: [],
	total: 0,
});

onBeforeMount(async () => {
	await getProducts();
	await getSales();
	await getClients();
});

const addNewProduct = () => {
	if (currentItem.value.id == 0) {
		alert("Seleccione un producto");
		return;
	} else {
		currentCart.value.items.push({
			product: currentItem.value.id,
			name: currentItem.value.name,
			quantity: currentQuantity.value,
			price: currentItem.value.price,
			totalProductionCost: currentItem.value.productionCost.total,
			total: currentTotal.value,
		});
		updateTotal();
		currentItem.value = {
			id: 0,
			name: "",
			price: 0,
		};
		//console.log(JSON.stringify(currentCart.value))
	}
};

const deleteSale = async (sale) => {
	dialogDelete.value = true;
	try {
		const response = await SaleService.deleteSale(sale.id);
		getSales();
		console.log("Venta eliminada con exito");
	} catch (error) {
		console.error("Error al eliminar la venta:", error);
	}
};

const updateSubTotal = () => {
	currentTotal.value = currentItem.value.price * currentQuantity.value;
};

const updateTotal = () => {
	currentCart.value.total = 0;
	currentCart.value.items.forEach((item) => {
		currentCart.value.total += item.total;
	});
};

const getClient = (customerID) => {
	return clients.value.find((client) => client.id == customerID);
};

const getProducts = async () => {
	try {
		products.value = await ProductService.getProducts();
	} catch (error) {
		console.error("Error al obtener los producto:", error);
	}
};

const getSale = (tempSale) => {
	return sales.value.find((sale) => sale.id == tempSale.id);
};

const getSales = async () => {
	try {
		sales.value = await SaleService.getSales();
	} catch (error) {
		console.error("Error al obtener los producto:", error);
	}
};
const getClients = async () => {
	try {
		clients.value = await ClientService.getClients();
	} catch (error) {
		console.error("Error al obtener los producto:", error);
	}
};

const cancelSale = () => {
	currentCart.value = {
		client: currentClient.value,
		items: [],
		total: 0,
	};
	dialog.value = false;
};

const saveSale = async () => {
	// Check si hay productos en la venta
	if (currentCart.value.items.length == 0) {
		alert("No hay productos en la venta");
		return;
	}
	// Check si el cliente existe
	if (!(currentCart.value.client in clients.value)) {
		alert("No hay cliente seleccionado");
		return;
	}
	try {
		let cart = cartAdapter(currentCart.value);
		console.log(JSON.stringify(cart));
		const response = await SaleService.createSale(cart);
		getSales();
		currentCart.value = {
			client: 0,
			items: [],
			total: 0,
		};

		dialog.value = false;
		console.log("Venta guardada con exito");
	} catch (error) {
		console.error("Error al guardar la venta:", error);
	}
};

const cartAdapter = (cart) => {
	return {
		customerID: cart.client,
		products: productsAdapter(cart.items),
		totalProductionCost: calculateCost(cart.items),
		total: cart.total,
	};
};

const calculateCost = (items) => {
	let cost = 0;
	items.forEach((item) => {
		cost += item.totalProductionCost * item.quantity;
	});
	return cost;
};

const productsAdapter = (products) => {
	let productsP = [];
	products.forEach((item) => {
		productsP.push({
			product: item.product,
			quantity: item.quantity,
		});
	});

	return productsP;
};

watch(currentQuantity, updateSubTotal);
watch(currentItem, updateSubTotal);
watch(currentClient, () => {
	currentCart.value.client = currentClient.value.id;
});
</script>

<style></style>
