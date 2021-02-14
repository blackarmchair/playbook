export const parseNumber = (number) => {
	if (!!number) return number.toLocaleString('en-US');
	return 0;
};

export const commaSpacing = (str) => {
	if (!!str) return str.split(',').join(', ');
	return '';
};
