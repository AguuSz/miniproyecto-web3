import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const ApiService = {
	async getProducts() {
		const response = await axios.get(`${API_BASE_URL}/products`);
		return response.data;
	},

	async getProduct(id) {
		const response = await axios.get(`${API_BASE_URL}/products/${id}`);
		return response.data;
	},

	async createProduct(product) {
		const response = await axios.post(`${API_BASE_URL}/products`, product);
		return response.data;
	},

	async updateProduct(product) {
		const response = await axios.put(
			`${API_BASE_URL}/products/${product.id}`,
			product
		);
		return response.data;
	},

	async deleteProduct(id) {
		const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
		return response.data;
	},
};
