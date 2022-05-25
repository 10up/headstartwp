import { TaxonomyTermsStrategy } from '../TaxonomyTermsStrategy';
import { apiGet } from '../../api';
import { setHeadlessConfig } from '../../../../test/utils';

jest.mock('../../api');

const apiGetMock = jest.mocked(apiGet);

describe('TaxonomyTermsStrategy', () => {
	let fetchStrategy: TaxonomyTermsStrategy;

	beforeEach(() => {
		fetchStrategy = new TaxonomyTermsStrategy();

		setHeadlessConfig({});
		apiGetMock.mockReset();
		apiGetMock.mockClear();
	});

	it('does not parse anything from url', async () => {
		expect(fetchStrategy.getParamsFromURL('/')).toEqual({
			_embed: true,
		});

		expect(fetchStrategy.getParamsFromURL('/tag/tag-test')).toEqual({
			_embed: true,
		});

		expect(fetchStrategy.getParamsFromURL('/category/cat-test/tag/tag-test')).toEqual({
			_embed: true,
		});
	});

	it('bulds the endpoint url properly', () => {
		// category should not be included directly in the url
		expect(fetchStrategy.buildEndpointURL({ taxonomy: 'category' })).toEqual(
			'/wp-json/wp/v2/categories',
		);

		// first test that it throws if it's an unkown taxonomy
		expect(() => fetchStrategy.buildEndpointURL({ taxonomy: 'book' })).toThrow(
			'Unkown taxonomy, did you forget to add it to headless.config.js?',
		);

		setHeadlessConfig({
			customTaxonomies: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		expect(fetchStrategy.buildEndpointURL({ taxonomy: 'book' })).toEqual('/wp-json/wp/v2/book');
	});

	it.skip('fetches content properly without wordpress plugin', async () => {
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
		);

		params = fetchStrategy.getParamsFromURL('/2021/');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(2, '/wp-json/wp/v2/posts?year=2021', {});

		params = fetchStrategy.getParamsFromURL('/author/author-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);

		expect(apiGetMock).toHaveBeenNthCalledWith(3, '/wp-json/wp/v2/users?slug=author-test');
		expect(apiGetMock).toHaveBeenNthCalledWith(4, '/wp-json/wp/v2/posts?author=1', {});

		params = fetchStrategy.getParamsFromURL('/category/category-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			5,
			'/wp-json/wp/v2/categories?slug=category-test',
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(6, '/wp-json/wp/v2/posts?categories=1', {});

		params = fetchStrategy.getParamsFromURL('/tag/tag-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(7, '/wp-json/wp/v2/tags?slug=tag-test');
		expect(apiGetMock).toHaveBeenNthCalledWith(8, '/wp-json/wp/v2/posts?tags=1', {});

		params = fetchStrategy.getParamsFromURL('/genre/action');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(9, '/wp-json/wp/v2/genre?slug=action');
		expect(apiGetMock).toHaveBeenNthCalledWith(10, '/wp-json/wp/v2/posts?genre=1', {});

		params = fetchStrategy.getParamsFromURL('/type/type-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(11, '/wp-json/wp/v2/types?slug=type-test');
		expect(apiGetMock).toHaveBeenNthCalledWith(12, '/wp-json/wp/v2/posts?type=1', {});

		// with a custom post type
		params = fetchStrategy.getParamsFromURL('/genre/action/page/2');
		const paramsWithPostType = { ...params, postType: 'book' };
		await fetchStrategy.fetcher(
			fetchStrategy.buildEndpointURL(paramsWithPostType),
			paramsWithPostType,
		);

		expect(apiGetMock).toHaveBeenNthCalledWith(13, '/wp-json/wp/v2/genre?slug=action');
		expect(apiGetMock).toHaveBeenNthCalledWith(14, '/wp-json/wp/v2/book?page=2&genre=1', {});
	});

	it.skip('throws exceptions when content is not found (without wordpress plugin)', async () => {
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
		await expect(fetchPromise).rejects.toThrow('Category "category-test" has not been found');

		params = fetchStrategy.getParamsFromURL('/tag/tag-test');
		fetchPromise = fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		await expect(fetchPromise).rejects.toThrow('Tag "tag-test" has not been found');

		params = fetchStrategy.getParamsFromURL('/genre/action');
		fetchPromise = fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		await expect(fetchPromise).rejects.toThrow('Term "action" from "genre" has not been found');

		params = fetchStrategy.getParamsFromURL('/type/type-test');
		fetchPromise = fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		await expect(fetchPromise).rejects.toThrow(
			'Term "type-test" from "type" has not been found',
		);
	});

	it.skip('fetches content properly with wordpress plugin', async () => {
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
		);

		params = fetchStrategy.getParamsFromURL('/category/category-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(
			2,
			'/wp-json/wp/v2/posts?category=category-test',
			{},
		);

		params = fetchStrategy.getParamsFromURL('/tag/tag-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(3, '/wp-json/wp/v2/posts?post_tag=tag-test', {});

		params = fetchStrategy.getParamsFromURL('/genre/action');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(4, '/wp-json/wp/v2/posts?genre=action', {});

		params = fetchStrategy.getParamsFromURL('/type/type-test');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(5, '/wp-json/wp/v2/posts?type=type-test', {});

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
		);
	});
});
