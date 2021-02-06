/*
 * LocalStorage will create new entries if a simple typo is made.
 * Therefore we create a library of constatns and force our methods to read from it.
 */
const library = {
	USER: 'user',
};

// CRUD Methods
export const save = (label, value) => {
	if (library[label.toUpperCase()]) {
		if (typeof value === 'object') {
			localStorage.setItem(
				library[label.toUpperCase()],
				JSON.stringify(value, null, 2)
			);
		} else {
			localStorage.setItem(library[label.toUpperCase()], value);
		}
	}
};
export const append = (label, value, uid) => {
	const parsedLabel = label.toUpperCase();
	let previousValue;
	let newValue;
	if (library[parsedLabel]) {
		if (typeof value === 'object') {
			previousValue = get(label) || '{}';
			newValue = getUnique([value, ...JSON.parse(previousValue)], uid);
			localStorage.setItem(
				library[parsedLabel],
				JSON.stringify(newValue, null, 2)
			);
		} else {
			newValue = [...new Set(`${newValue}, ${value}`.join(','))];
			localStorage.setItem(library[parsedLabel], newValue);
		}
	}
};
export const get = (label) =>
	localStorage.getItem(library[label.toUpperCase()]);
export const remove = (label) => {
	localStorage.removeItem(library[label.toUpperCase()]);
};
export const clear = () => {
	localStorage.clear();
};

// Helper Methods
const getUnique = (arr, comp) =>
	arr
		.filter((e) => Object.prototype.hasOwnProperty.call(e, comp))
		.map((e) => e[comp])
		.map((e, i, final) => final.indexOf(e) === i && i)
		.filter((e) => arr[e])
		.map((e) => arr[e]);

export default {
	save,
	append,
	get,
	remove,
	clear,
};
