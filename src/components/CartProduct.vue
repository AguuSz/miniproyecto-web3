<template>
	
	<v-col cols="2">
    <v-text-field
	  readonly>
		</v-text-field>
	</v-col>
  <v-col cols="4">
    <v-text-field
    
    label = "Producto"
    readonly
    ></v-text-field>
  </v-col>
  <v-col cols="2">
    <v-text-field
      label="Cantidad"
      readonly
    ></v-text-field>
  </v-col>
  <v-col cols="2">
    <v-text-field
      label="Precio"
      readonly
    ></v-text-field>
  </v-col>
  <v-col cols="2">
    <v-text-field
      v-model="total"
      label="Total"
			readonly	
    ></v-text-field>
  </v-col>
	
</template>

<script >
export default {
  props: {
    id: Number,
	  name: String,
	  price: Number,
	  quantity: Number,
  },
  computed: {
    total() {
      return this.price * this.quantity;
    },
  },
};
</script>
<style>
</style>
