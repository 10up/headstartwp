module.exports = {
	customPostTypes: ['book'],
	customTaxonomies: [
		{
			slug: 'genre',
			endpoint: '/wp-json/wp/v2/genre',
		},
	],
	redirectStrategy: '404',
	useWordPressPlugin: true,
};
