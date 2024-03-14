function camelcase(text: string) {
	const a = text.toLowerCase().replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
	return a.substring(0, 1).toLowerCase() + a.substring(1);
}

export default camelcase;
