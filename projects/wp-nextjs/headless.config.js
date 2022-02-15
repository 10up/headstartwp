module.exports = {
	customPostTypes: [
		{
			slug: 'book',
			endpoint: '/wp-json/wp/v2/book',
			single: '/book',
			archive: '/books',
		},
	],
	customTaxonomies: [
		{
			slug: 'genre',
			endpoint: '/wp-json/wp/v2/genre',
			postType: ['book'],
		},
	],
	redirectStrategy: '404',
	useWordPressPlugin: true,
};
