<template>
  <v-main class="bg-grey-darken-2">
    <v-container>
      <v-row  >
        <!-- Busqueda -->
        <v-col >
          <v-sheet min-height="70vh" rounded="lg" class="py-3 px-3">
          <v-row>

            
            <v-autocomplete
            
            label="Buscar ventas por Cliente/producto/Id"
            :items="sales"
            prepend-icon="mdi-text-search"
            item-title="customerID"
            clearable
            ></v-autocomplete>

            <!-- Boton cargar venta-->
            <v-btn color="primary" class="mt-3" >
              Cargar venta
              <v-dialog v-model="dialog" activator="parent" width="50vw" height="100vw">
							  <v-card>
                  <v-card-title>
                    <span class="headline">Cargar venta</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-autocomplete
                            v-model = currentClient
                            label = "ID"
                            :items="clients"
                            item-title="id"
                            clearable
                            :item-value="(item) => item"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="9">
                          <v-autocomplete
                            v-model = currentClient
                            label = "Cliente"
                            :items="clients"
                            item-title="name"
                            :item-value="(item) => item"
                            clearable
                          ></v-autocomplete>
                        </v-col>
                        
                      </v-row>
                      <v-row >
                        <v-col cols="2">
                          <v-autocomplete
                            v-model = currentItem
                            label = "Id"
                            :items="products"
                            item-title="id"
                            :item-value="(item) => item"
                            @input = "updateSubTotal"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                          <v-autocomplete
                            v-model = currentItem
                            label = "Producto"
                            :items="products"
                            item-title="name"
                            :item-value="(item) => item"
                            
                            
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                            label="Cantidad"
                            type="number"
                            v-model = currentQuantity
                            min="1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                            label="Precio"
                            v-model = currentItem.price
                            
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                            label="Total"
                            v-model = currentTotal
                            :item-value="(item) => item"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row v-for="product in products">
                        <CartProduct 
                          :id="product.product" 
                          :name="product.product" 
                          :price="product.total" 
                          :quantity="product.quantity"/>
                      </v-row>
                      
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="indigo-darken-1" variant="flat" text @click="addNewProduct">Agregar nuevo producto </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1"  text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" variant="flat" text @click="save">Guardar</v-btn>
                  </v-card-actions>
                </v-card>	
						  </v-dialog>
            </v-btn>
          </v-row>
          
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";
import CartProduct from "../components/CartProduct.vue";
import { SaleService } from "../services/SaleService.js";
import { ProductService } from "../services/ProductService";
import { onBeforeMount } from "vue";
import { ClientService } from "../services/ClientService.js";
import { watch } from "vue";

const products = new ref([]);
const clients = new ref([]);
const sales = new ref([]);

const dialog = new ref(false);

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
  phone: "",});

const currentCart = new ref({
  client: currentClient.value,
  items: [{product:1,quantity:1,total:25.5},{product:2,quantity:1,total:31.5}],
  total: 0,
})



onBeforeMount(() => {
	getProducts();
  getSales();
  getClients();
});

const addNewProduct = () => {
  currentCart.value.items.push({
    product : currentItem.value.id,
    quantity : currentQuantity.value,
    total : currentTotal.value,  
  })
  updateTotal();
  console.log(JSON.stringify(currentCart.value))
}

const updateSubTotal = () => {
  
  currentTotal.value = currentItem.value.price * currentQuantity.value;
}

const updateTotal = () => {
  currentCart.value.total = 0;
  currentCart.value.items.forEach(item => {
    currentCart.value.total += item.total;
  })
}

const getProducts = async () => {
	// Llamada a la API para obtener los productos
	try {
		products.value  = await ProductService.getProducts();
		
	} catch (error) {
		// TODO: Arrojar Toastr con el error
		console.error("Error al obtener los producto:", error);
	}
};
const getSales = async () => {
	// Llamada a la API para obtener las ventas
	try {
		sales.value = await SaleService.getSales();
		 
	} catch (error) {
		// TODO: Arrojar Toastr con el error
		console.error("Error al obtener los producto:", error);
	}
};
const getClients = async () => {
	// Llamada a la API para obtener las ventas
	try {
		clients.value = await ClientService.getClients();
	} catch (error) {
		// TODO: Arrojar Toastr con el error
		console.error("Error al obtener los producto:", error);
	}
};

watch(currentQuantity, updateSubTotal)
watch(currentItem, updateSubTotal)
watch(currentClient, () => {
  currentCart.value.client = currentClient.value.id;
})

</script>

<style></style>
