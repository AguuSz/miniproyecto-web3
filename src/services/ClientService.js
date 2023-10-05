import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const ClientService = {
	async getClients() {
		const response = await axios.get(`${API_BASE_URL}/clients`);
		return response.data;
	},

	async getClient(id) {
		const response = await axios.get(`${API_BASE_URL}/clients/${id}`);
		return response.data;
	},

	async createClient(client) {
		const response = await axios.post(`${API_BASE_URL}/clients`, client);
		return response.data;
	},

	async updateClient(client) {
		const response = await axios.put(
			`${API_BASE_URL}/Clients/${client.id}`,
			client
		);
		return response.data;
	},

	async deleteClient(id) {
		const response = await axios.delete(`${API_BASE_URL}/clients/${id}`);
		return response.data;
	},
};
