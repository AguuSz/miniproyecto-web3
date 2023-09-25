export const Utils = {
	isJSONEmpty(value) {
		return (
			value && Object.keys(value).length === 0 && value.constructor === Object
		);
	},
};
