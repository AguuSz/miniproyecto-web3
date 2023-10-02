<template>
	<div>
		<button-date-picker
			:selectedDate="selectedDate"
			@date-selected="updateSelectedDate"
		></button-date-picker>
		<p>Fecha seleccionada: {{ selectedDate }}</p>
	</div>
</template>

<script setup>
import { ref } from "vue";

const selectedDate = ref(null);

const updateSelectedDate = (date) => {
	selectedDate.value = date;
};
</script>

<!-- Importa y registra el componente ButtonDatePicker -->
<template>
	<ButtonDatePicker
		:selectedDate="selectedDate"
		@date-selected="updateSelectedDate"
	/>
</template>

<script>
import ButtonDatePicker from "./ButtonDatePicker.vue";

export default {
	components: {
		ButtonDatePicker,
	},
};
</script>
