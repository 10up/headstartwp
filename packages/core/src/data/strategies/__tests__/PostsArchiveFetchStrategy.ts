import { PostsArchiveFetchStrategy } from '../PostsArchiveFetchStrategy';
import { apiGet } from '../../api';
import { setHeadlessConfig } from '../../../utils';

jest.mock('../../api');

const apiGetMock = jest.mocked(apiGet);

describe('PostsArchiveFetchStrategy', () => {
	let fetchStrategy: PostsArchiveFetchStrategy;

	beforeEach(() => {
		fetchStrategy = new PostsArchiveFetchStrategy();

		setHeadlessConfig({});
		apiGetMock.mockReset();
		apiGetMock.mockClear();
	});

	it('parses the url properly', async () => {
		// category archives
		expect(fetchStrategy.getParamsFromURL('/category/cat-test')).toEqual({
			category: 'cat-test',
		});

		// tag archives
		expect(fetchStrategy.getParamsFromURL('/tag/tag-test')).toEqual({
			tag: 'tag-test',
		});

		// doesn't match anything
		expect(fetchStrategy.getParamsFromURL('/category/cat-test/tag/tag-test')).toEqual({});

		// date archives
		expect(fetchStrategy.getParamsFromURL('/2021')).toEqual({
			year: '2021',
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10')).toEqual({
			year: '2021',
			month: '10',
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10/30')).toEqual({
			year: '2021',
			month: '10',
			day: '30',
		});

		// pagination
		expect(fetchStrategy.getParamsFromURL('/page/1')).toEqual({
			page: '1',
		});

		expect(fetchStrategy.getParamsFromURL('/page/10')).toEqual({
			page: '10',
		});

		// taxonomy archives

		// should only match taxonomy archives if a custom taxonomy has been defined
		expect(fetchStrategy.getParamsFromURL('/genre/action/page/10')).not.toEqual({
			genre: 'action',
			page: '10',
		});

		setHeadlessConfig({
			customTaxonomies: [
				{
					slug: 'genre',
					endpoint: '/wp-json/wp/v2/genre',
				},
			],
		});

		expect(fetchStrategy.getParamsFromURL('/genre/action')).toEqual({
			genre: 'action',
		});

		expect(fetchStrategy.getParamsFromURL('/genre/action/page/10')).toEqual({
			genre: 'action',
			page: '10',
		});
	});

	it('parses the url properly when taxonomy is set', () => {
		expect(fetchStrategy.getParamsFromURL('/category-name', { taxonomy: 'category' })).toEqual({
			category: 'category-name',
		});

		expect(fetchStrategy.getParamsFromURL('/tag-name', { taxonomy: 'post_tag' })).toEqual({
			tag: 'tag-name',
		});

		// pagination
		expect(
			fetchStrategy.getParamsFromURL('/category-name/page/1', { taxonomy: 'category' }),
		).toEqual({
			category: 'category-name',
			page: '1',
		});

		expect(
			fetchStrategy.getParamsFromURL('/category-name/page/10', { taxonomy: 'category' }),
		).toEqual({
			category: 'category-name',
			page: '10',
		});

		// nested taxonomies
		expect(
			fetchStrategy.getParamsFromURL('/parent-category/category-name/page/1', {
				taxonomy: 'category',
			}),
		).toEqual({
			category: 'category-name',
			page: '1',
		});

		expect(
			fetchStrategy.getParamsFromURL('/parent-category/category-name/page/1', {
				taxonomy: 'category',
			}),
		).toEqual({
			category: 'category-name',
			page: '1',
		});

		expect(
			fetchStrategy.getParamsFromURL('/parent-tag/tag-name/page/1', {
				taxonomy: 'post_tag',
			}),
		).toEqual({
			tag: 'tag-name',
			page: '1',
		});
	});

	it('parses url properly for custom taxonomies when taxonomy is set', () => {
		setHeadlessConfig({
			useWordPressPlugin: false,
			customTaxonomies: [
				{
					slug: 'genre',
					endpoint: '/wp-json/wp/v2/genre',
				},
				{
					slug: 'type',
					endpoint: '/wp-json/wp/v2/types',
				},
			],
		});

		expect(fetchStrategy.getParamsFromURL('/genre-name', { taxonomy: 'genre' })).toEqual({
			genre: 'genre-name',
		});

		// pagination
		expect(fetchStrategy.getParamsFromURL('/genre-name/page/1', { taxonomy: 'genre' })).toEqual(
			{
				genre: 'genre-name',
				page: '1',
			},
		);

		expect(
			fetchStrategy.getParamsFromURL('/genre-name/page/10', { taxonomy: 'genre' }),
		).toEqual({
			genre: 'genre-name',
			page: '10',
		});
	});

	it('throws exceptions when taxonomy is unknown', () => {
		expect(() => fetchStrategy.getParamsFromURL('/term-name', { taxonomy: 'genre' })).toThrow(
			'Taxonomy "genre" not found',
		);
	});

	it('builds the endpoint url properly', () => {
		// category should not be included directly in the url
		expect(fetchStrategy.buildEndpointURL({ category: 'cat-test' })).toBe(
			'/wp-json/wp/v2/posts',
		);

		// tag should not be included directly in the url
		expect(fetchStrategy.buildEndpointURL({ tag: 'tag-test' })).toBe('/wp-json/wp/v2/posts');

		expect(fetchStrategy.buildEndpointURL({ page: 2 })).toBe('/wp-json/wp/v2/posts?page=2');

		// author should not be included in the URL unless config.useWordPressPlugin is true
		expect(fetchStrategy.buildEndpointURL({ author: 'author' })).toBe('/wp-json/wp/v2/posts');

		setHeadlessConfig({
			useWordPressPlugin: true,
		});

		expect(fetchStrategy.buildEndpointURL({ author: 'author' })).toBe(
			'/wp-json/wp/v2/posts?author=author',
		);

		// testing that a custom post type changes the endpoint

		// first test that it throws if it's an unknown post type
		expect(() => fetchStrategy.buildEndpointURL({ postType: 'book' })).toThrow(
			'Unknown post type, did you forget to add it to headless.config.js?',
		);

		setHeadlessConfig({
			customPostTypes: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		expect(fetchStrategy.buildEndpointURL({ postType: 'book' })).toBe('/wp-json/wp/v2/book');
	});

	it('fetches content properly without wordpress plugin', async () => {
		setHeadlessConfig({
			useWordPressPlugin: false,
			customTaxonomies: [
				{
					slug: 'genre',
					endpoint: '/wp-json/wp/v2/genre',
				},
				{
					slug: 'type',
					endpoint: '/wp-json/wp/v2/types',
				},
			],
			customPostTypes: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		apiGetMock.mockResolvedValue({ headers: {}, json: [{ id: 1 }] });

		let params = fetchStrategy.getParamsFromURL('/2021/10/30');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);

		expect(apiGetMock).toHaveBeenNthCalledWith(
			1,
			'/wp-json/wp/v2/posts?year=2021&month=10&day=30',
			{},
			false,
		);

		params = fetchStrategy.getParamsFromURL('/2021/');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(2, '/wp-json/wp/v2/posts?year=2021', {}, false);

		params = fetchStrategy.getParamsFromURL('/author/author-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);

		expect(apiGetMock).toHaveBeenNthCalledWith(
			3,
			'/wp-json/wp/v2/users?slug=author-test',
			{},
			false,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(4, '/wp-json/wp/v2/posts?author=1', {}, false);

		params = fetchStrategy.getParamsFromURL('/category/category-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			5,
			'/wp-json/wp/v2/categories?slug=category-test',
			{},
			false,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			6,
			'/wp-json/wp/v2/posts?categories=1',
			{},
			false,
		);

		params = fetchStrategy.getParamsFromURL('/tag/tag-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			7,
			'/wp-json/wp/v2/tags?slug=tag-test',
			{},
			false,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(8, '/wp-json/wp/v2/posts?tags=1', {}, false);

		params = fetchStrategy.getParamsFromURL('/genre/action');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			9,
			'/wp-json/wp/v2/genre?slug=action',
			{},
			false,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(10, '/wp-json/wp/v2/posts?genre=1', {}, false);

		params = fetchStrategy.getParamsFromURL('/type/type-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			11,
			'/wp-json/wp/v2/types?slug=type-test',
			{},
			false,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(12, '/wp-json/wp/v2/posts?type=1', {}, false);

		// with a custom post type
		params = fetchStrategy.getParamsFromURL('/genre/action/page/2');
		const paramsWithPostType = { ...params, postType: 'book' };
		await fetchStrategy.fetcher(
			fetchStrategy.buildEndpointURL(paramsWithPostType),
			paramsWithPostType,
		);

		expect(apiGetMock).toHaveBeenNthCalledWith(
			13,
			'/wp-json/wp/v2/genre?slug=action',
			{},
			false,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			14,
			'/wp-json/wp/v2/book?page=2&genre=1',
			{},
			false,
		);
	});

	it('throws exceptions when content is not found (without wordpress plugin)', async () => {
		apiGetMock.mockResolvedValue({ headers: {}, json: [] });
		setHeadlessConfig({
			useWordPressPlugin: false,
			customTaxonomies: [
				{
					slug: 'genre',
					endpoint: '/wp-json/wp/v2/genre',
				},
				{
					slug: 'type',
					endpoint: '/wp-json/wp/v2/types',
				},
			],
			customPostTypes: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		let params = fetchStrategy.getParamsFromURL('/category/category-test');
		let fetchPromise = fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		await expect(fetchPromise).rejects.toThrow(
			'Term "category-test" from "category" has not been found',
		);

		params = fetchStrategy.getParamsFromURL('/tag/tag-test');
		fetchPromise = fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		await expect(fetchPromise).rejects.toThrow(
			'Term "tag-test" from "post_tag" has not been found',
		);

		params = fetchStrategy.getParamsFromURL('/genre/action');
		fetchPromise = fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		await expect(fetchPromise).rejects.toThrow('Term "action" from "genre" has not been found');

		params = fetchStrategy.getParamsFromURL('/type/type-test');
		fetchPromise = fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		await expect(fetchPromise).rejects.toThrow(
			'Term "type-test" from "type" has not been found',
		);
	});

	it('fetches content properly with wordpress plugin', async () => {
		setHeadlessConfig({
			useWordPressPlugin: true,
			customTaxonomies: [
				{
					slug: 'genre',
					endpoint: '/wp-json/wp/v2/genre',
				},
				{
					slug: 'type',
					endpoint: '/wp-json/wp/v2/types',
				},
			],
			customPostTypes: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		apiGetMock.mockResolvedValue({ headers: {}, json: [{ id: 1 }] });

		let params = fetchStrategy.getParamsFromURL('/author/author-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);

		expect(apiGetMock).toHaveBeenNthCalledWith(
			1,
			'/wp-json/wp/v2/posts?author=author-test',
			{},
			false,
		);

		params = fetchStrategy.getParamsFromURL('/category/category-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			2,
			'/wp-json/wp/v2/posts?categories=category-test',
			{},
			false,
		);

		params = fetchStrategy.getParamsFromURL('/tag/tag-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			3,
			'/wp-json/wp/v2/posts?tags=tag-test',
			{},
			false,
		);

		params = fetchStrategy.getParamsFromURL('/genre/action');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			4,
			'/wp-json/wp/v2/posts?genre=action',
			{},
			false,
		);

		params = fetchStrategy.getParamsFromURL('/type/type-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			5,
			'/wp-json/wp/v2/posts?type=type-test',
			{},
			false,
		);

		// with a custom post type
		params = fetchStrategy.getParamsFromURL('/genre/action/page/2');
		const paramsWithPostType = { ...params, postType: 'book' };
		await fetchStrategy.fetcher(
			fetchStrategy.buildEndpointURL(paramsWithPostType),
			paramsWithPostType,
		);

		expect(apiGetMock).toHaveBeenNthCalledWith(
			6,
			'/wp-json/wp/v2/book?page=2&genre=action',
			{},
			false,
		);
	});

	it('fetches content properly when taxonomy is set', async () => {
		setHeadlessConfig({
			useWordPressPlugin: true,
			customTaxonomies: [
				{
					slug: 'genre',
					endpoint: '/wp-json/wp/v2/genre',
					rewrite: 'genres',
					restParam: 'genre-rest-param',
				},
			],
		});

		apiGetMock.mockResolvedValue({ headers: {}, json: [{ id: 1 }] });

		let params = fetchStrategy.getParamsFromURL('/genre-name', { taxonomy: 'genre' });
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);

		expect(apiGetMock).toHaveBeenNthCalledWith(
			1,
			'/wp-json/wp/v2/posts?genre-rest-param=genre-name',
			{},
			false,
		);

		params = fetchStrategy.getParamsFromURL('/genre-name/page/2', { taxonomy: 'genre' });
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			2,
			'/wp-json/wp/v2/posts?page=2&genre-rest-param=genre-name',
			{},
			false,
		);
	});

	it('allows overriding default params', () => {
		const defaultParams = { postType: 'book' };
		const fetcher = new PostsArchiveFetchStrategy('http://sourceurl.com', defaultParams);
		expect(fetcher.getDefaultParams()).toMatchObject(defaultParams);
	});
});
