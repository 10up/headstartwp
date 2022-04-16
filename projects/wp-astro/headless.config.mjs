/**
 * UHeadless Config
 *
 * @type {import('@10up/headless-core').HeadlessConfig}
 */
export default {
	/**
	 * The WordPress Source Url
	 */
	sourceUrl: 'https://elasticpress.test',
	customPostTypes: [
		// this is just an example
		{
			slug: 'book',
			endpoint: '/wp-json/wp/v2/book',
			// these should match your file-system routing
			single: '/book',
			archive: '/books',
		},
	],
	customTaxonomies: [
		// this is just an example
		{
			slug: 'genre',
			endpoint: '/wp-json/wp/v2/genre',
			postType: ['book'],
		},
	],
	redirectStrategy: '404',
	/**
	 * Using 10up's headless plugin is recommended
	 */
	useWordPressPlugin: true,
};
