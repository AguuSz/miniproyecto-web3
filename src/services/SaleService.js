import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const SaleService = {
	async getSales() {
		const response = await axios.get(`${API_BASE_URL}/sales`);
		return response.data;
	},

	async getSale(id) {
		const response = await axios.get(`${API_BASE_URL}/sales/${id}`);
		return response.data;
	},

	async createSale(Sale) {
		const response = await axios.post(`${API_BASE_URL}/sales`, Sale);
		return response.data;
	},

	async updateSale(Sale) {
		const response = await axios.put(
			`${API_BASE_URL}/sales/${Sale.id}`,
			Sale
		);
		return response.data;
	},

	async deleteSale(id) {
		const response = await axios.delete(`${API_BASE_URL}/sales/${id}`);
		return response.data;
	},
};
