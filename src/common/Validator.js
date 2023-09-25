// Archivo encargado de contener las distintas validaciones que pueden existir
export const Validator = {
	validateProduct(product) {
		const errors = {};
		product.name = product.name.trim();
		product.description = product.description.trim();

		if (!product.name || product.name == "") {
			errors.name = "El nombre es obligatorio";
		}
		if (!product.price) {
			errors.price = "El precio es obligatorio";
		}
		if (product.price < 0) {
			errors.price = "El precio no puede ser negativo";
		}
		if (product.productionCost.laborCost < 0) {
			errors.laborCost = "El costo de mano de obra no puede ser negativo";
		}
		if (product.productionCost.materialCost < 0) {
			errors.materialCost = "El costo de materiales no puede ser negativo";
		}
		if (product.productionCost.additionalCosts < 0) {
			errors.additionalCosts = "Los costos adicionales no pueden ser negativos";
		}
		return errors;
	},
	stringToNumber(value) {
		return Number(value);
	},
};
