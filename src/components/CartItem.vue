<template>
	 <v-row>
                                                    <v-col cols="2">
                                                        <v-text-field
                                                            
                                                            
                                                        >{{id}}</v-text-field>
                                                    </v-col>
                                                    <v-col cols="10">
                                                        <v-autocomplete
                                                        
                                                        >{{ name }}</v-autocomplete>
                                                    </v-col>
                                                </v-row>
                                                
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
	id: Number,
	price: Number,
	name: String,
});
</script>
<style>

</style>
