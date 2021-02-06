export const parseNumber = (number) => {
	return number.toLocaleString('en-US');
};

export const commaSpacing = (str) => {
	return str.split(',').join(', ');
};
