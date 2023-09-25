// Archivo encargado de contener las distintas validaciones que pueden existir
export const Validator = {
	validateProduct(product) {
		const errors = {};
		if (!product.name) {
			errors.name = "El nombre es obligatorio";
		}
		if (!product.price) {
			errors.price = "El precio es obligatorio";
		}
		if (product.price < 0) {
			errors.price = "El precio no puede ser negativo";
		}
		if (
			product.laborCost < 0 ||
			product.materialCost < 0 ||
			product.additionalCosts < 0
		) {
			errors.productionCosts = "Los costos no pueden ser negativos";
		}
		return errors;
	},
	stringToNumber(value) {
		return Number(value.replace(/[^0-9.-]+/g, ""));
	},
};
