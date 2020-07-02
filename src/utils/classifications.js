export const getCode = classification => {
	const paths = classification.split('/');
	if (classification.includes('cj')) return paths[paths.length - 1];
	return paths[paths.length - 2];
};
