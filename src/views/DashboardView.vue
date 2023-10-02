<template>
	<v-main class="bg-grey-darken-2">
		<v-container>
			<v-row>
				<v-col>
					<h1>Total</h1>
				</v-col>
			</v-row>
			<v-row>
				<!-- Dashboard -->
				<v-col>
					<v-card class="pa-2">
						<v-card-title class="text-center">Total de ventas</v-card-title>
						<v-card-text>
							<p>$ {{ total }}</p>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col>
					<v-card class="pa-2">
						<v-card-title>Total de costos de produccion</v-card-title>
						<v-card-text>
							<p>$ {{ productionCostsTotal }}</p>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col>
					<v-card class="pa-2">
						<v-card-title>Total de profit</v-card-title>
						<v-card-text>
							<p>$ {{ profit }}</p>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<!-- Total por mes -->
			<v-row>
				<v-col>
					<h1 class>Total por mes</h1>
				</v-col>
			</v-row>
			<v-row class="d-flex">
				<v-col cols="4">
					<h3 class="text-center">Desde</h3>
					<VueDatePicker
						placeholder="Selecciona una fecha"
						:min-date="new Date(2022, 1, 1)"
						:format="dateFormat"
						:enable-time-picker="false"
						v-model="sinceDate"
					></VueDatePicker>
				</v-col>
				<v-col cols="4">
					<h3 class="text-center">Hasta</h3>
					<VueDatePicker
						placeholder="Selecciona una fecha"
						:min-date="new Date(2022, 1, 2)"
						:format="dateFormat"
						:enable-time-picker="false"
						v-model="toDate"
					></VueDatePicker>
				</v-col>
				<v-col align-self="end">
					<v-btn type="elevated" @click="filterByDate" :disabled="isDisabled"
						>Buscar</v-btn
					>
				</v-col>
			</v-row>
			<v-row v-if="showFilteredSales">
				<!-- Dashboard -->
				<v-col>
					<v-card class="pa-2">
						<v-card-title class="text-center">Total de ventas</v-card-title>
						<v-card-text>
							<p>$ {{ filteredSalesTotal }}</p>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col>
					<v-card class="pa-2">
						<v-card-title>Total de costos de produccion</v-card-title>
						<v-card-text>
							<p>$ {{ filteredSalesProductionCostsTotal }}</p>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col>
					<v-card class="pa-2">
						<v-card-title>Total de profit</v-card-title>
						<v-card-text>
							<p>$ {{ filteredSalesProfit }}</p>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script setup>
import { SaleService } from "@/services/SaleService";
import "@vuepic/vue-datepicker/dist/main.css";
import { onMounted, ref, watch } from "vue";

const sinceDate = ref();
const toDate = ref();
const isDisabled = ref(false);
const sales = ref();
const total = ref(0);
const productionCostsTotal = ref(0);
const profit = ref(0);
const showFilteredSales = ref(false);
const filteredSalesTotal = ref(0);
const filteredSalesProductionCostsTotal = ref(0);
const filteredSalesProfit = ref(0);

onMounted(async () => {
	try {
		sales.value = await SaleService.getSales();
		total.value = getTotalSales(sales.value);
		productionCostsTotal.value = getProductionCostsTotal(sales.value);
		profit.value = total.value - productionCostsTotal.value;
	} catch (error) {
		console.log(error);
	}
});

const dateFormat = (date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
};

watch(() => {
	if (toDate.value == null && sinceDate.value == null) {
		isDisabled.value = true;
	} else {
		isDisabled.value = false;
	}
});

const filterByDate = async () => {
	if (toDate.value == null) {
		toDate.value = new Date();
	}
	if (sinceDate.value == null) {
		sinceDate.value = new Date(2022, 1, 1);
	}

	let date_gte = sinceDate.value.toISOString().split("T")[0];
	let date_lte = toDate.value.toISOString().split("T")[0];

	let salesFiltered = await SaleService.getSalesSinceDateAndToDate(
		date_gte,
		date_lte
	);

	filteredSalesTotal.value = getTotalSales(salesFiltered);
	filteredSalesProductionCostsTotal.value =
		getProductionCostsTotal(salesFiltered);
	filteredSalesProfit.value =
		filteredSalesTotal.value - filteredSalesProductionCostsTotal.value;

	showFilteredSales.value = true;
};

// Funciones para calcular costos
const getTotalSales = (salesTemp) => {
	let total = 0;
	for (let sale of salesTemp) {
		total += sale.total;
	}

	return total;
};

const getProductionCostsTotal = (salesTemp) => {
	let productionCostsTotal = 0;
	for (let sale of salesTemp) {
		productionCostsTotal += sale.totalProductionCost;
	}

	return productionCostsTotal;
};
</script>

<style scoped></style>
