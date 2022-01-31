module.exports = {
	customPostTypes: [{ slug: 'book', endpoint: '/wp-json/wp/v2/book' }],
	customTaxonomies: [
		{
			slug: 'genre',
			endpoint: '/wp-json/wp/v2/genre',
		},
	],
	redirectStrategy: '404',
	useWordPressPlugin: true,
};
