import { PostsArchiveFetchStrategy } from '../PostsArchiveFetchStrategy';

describe('PostsArchiveFetchStrategy', () => {
	const fetchStrategy = new PostsArchiveFetchStrategy();

	fetchStrategy.setBaseURL('');
	fetchStrategy.setEndpoint('/wp-json/wp/v2/posts');

	beforeEach(() => {
		// @ts-expect-error
		global.__10up__HEADLESS_CONFIG = {};
	});

	it('parses the url properly', async () => {
		// category archives
		expect(fetchStrategy.getParamsFromURL({ path: ['category', 'cat-test'] })).toEqual({
			category: 'cat-test',
		});

		// tag archives
		expect(fetchStrategy.getParamsFromURL({ path: ['tag', 'tag-test'] })).toEqual({
			tag: 'tag-test',
		});

		// doesn't match anything
		expect(
			fetchStrategy.getParamsFromURL({ path: ['category', 'cat-test', 'tag', 'tag-test'] }),
		).toEqual({});

		// date archives
		expect(fetchStrategy.getParamsFromURL({ path: ['2021'] })).toEqual({
			year: '2021',
		});

		expect(fetchStrategy.getParamsFromURL({ path: ['2021', '10'] })).toEqual({
			year: '2021',
			month: '10',
		});

		expect(fetchStrategy.getParamsFromURL({ path: ['2021', '10', '30'] })).toEqual({
			year: '2021',
			month: '10',
			day: '30',
		});

		// pagination
		expect(fetchStrategy.getParamsFromURL({ path: ['page', '1'] })).toEqual({
			page: '1',
		});

		expect(fetchStrategy.getParamsFromURL({ path: ['page', '10'] })).toEqual({
			page: '10',
		});

		// taxonomy archives

		// should only match taxonomy archives if a custom taxonomy has been defined
		expect(
			fetchStrategy.getParamsFromURL({ path: ['genre', 'action', 'page', '10'] }),
		).not.toEqual({
			genre: 'action',
			page: '10',
		});

		// @ts-expect-error
		global.__10up__HEADLESS_CONFIG.customTaxonomies = [
			{
				slug: 'genre',
				endpoint: '/wp-json/wp/v2/genre',
			},
		];

		expect(fetchStrategy.getParamsFromURL({ path: ['genre', 'action'] })).toEqual({
			genre: 'action',
		});

		expect(fetchStrategy.getParamsFromURL({ path: ['genre', 'action', 'page', '10'] })).toEqual(
			{
				genre: 'action',
				page: '10',
			},
		);
	});

	it('bulds the endpoint url properly', () => {
		// category should not be included directly in the url
		expect(fetchStrategy.buildEndpointURL({ category: 'cat-test' })).toEqual(
			'/wp-json/wp/v2/posts',
		);

		// tag should not be included directly in the url
		expect(fetchStrategy.buildEndpointURL({ tag: 'tag-test' })).toEqual('/wp-json/wp/v2/posts');

		expect(fetchStrategy.buildEndpointURL({ page: 2 })).toEqual('/wp-json/wp/v2/posts?page=2');

		// author should not be included in the URL unless config.useWordPressPlugin is true
		expect(fetchStrategy.buildEndpointURL({ author: 'author' })).toEqual(
			'/wp-json/wp/v2/posts',
		);

		// @ts-expect-error
		global.__10up__HEADLESS_CONFIG.useWordPressPlugin = true;

		expect(fetchStrategy.buildEndpointURL({ author: 'author' })).toEqual(
			'/wp-json/wp/v2/posts?author=author',
		);

		// testing that a custom post type changes the endpoint

		// first test that it throws if it's an unkown post type
		expect(() => fetchStrategy.buildEndpointURL({ postType: 'book' })).toThrow(
			'Unkown post type, did you forget to add it to headless.config.js?',
		);

		// @ts-expect-error
		global.__10up__HEADLESS_CONFIG.customPostTypes = [
			{
				slug: 'book',
				endpoint: '/wp-json/wp/v2/book',
			},
		];

		expect(fetchStrategy.buildEndpointURL({ postType: 'book' })).toEqual('/wp-json/wp/v2/book');
	});
});
