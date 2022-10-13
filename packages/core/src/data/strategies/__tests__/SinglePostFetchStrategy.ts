import { setHeadlessConfig } from '../../../../test/utils';
import { apiGet } from '../../api';
import { SinglePostFetchStrategy } from '../SinglePostFetchStrategy';

jest.mock('../../api');

const apiGetMock = jest.mocked(apiGet);

describe('SinglePostFetchStrategy', () => {
	let fetchStrategy: SinglePostFetchStrategy;

	beforeEach(() => {
		fetchStrategy = new SinglePostFetchStrategy();

		setHeadlessConfig({});
		apiGetMock.mockReset();
		apiGetMock.mockClear();
	});

	it('parses the url properly', async () => {
		expect(fetchStrategy.getParamsFromURL('/post-name')).toEqual({
			slug: 'post-name',
		});

		expect(fetchStrategy.getParamsFromURL('/2021/post-name')).toEqual({
			slug: 'post-name',
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10/post-name')).toEqual({
			slug: 'post-name',
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10/30/post-name')).toEqual({
			slug: 'post-name',
		});

		expect(fetchStrategy.getParamsFromURL('/parent/post-name')).toEqual({
			slug: 'post-name',
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10/30/parent/post-name')).toEqual({
			slug: 'post-name',
		});
	});

	it('bulds the endpoint url properly', () => {
		expect(fetchStrategy.buildEndpointURL({ slug: 'post-name' })).toEqual(
			'/wp-json/wp/v2/posts?slug=post-name',
		);

		let params = fetchStrategy.getParamsFromURL('/2021/10/30/parent/post-name');
		expect(fetchStrategy.buildEndpointURL(params)).toEqual(
			'/wp-json/wp/v2/posts?slug=post-name',
		);

		params = fetchStrategy.getParamsFromURL('/2021/10/30/post-name');
		expect(fetchStrategy.buildEndpointURL(params)).toEqual(
			'/wp-json/wp/v2/posts?slug=post-name',
		);

		setHeadlessConfig({
			customPostTypes: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		expect(
			fetchStrategy.buildEndpointURL({
				slug: 'book-name',
				postType: 'book',
			}),
		).toEqual('/wp-json/wp/v2/book?slug=book-name');

		// when passing multiple post types, buildEndpointUrl should use the first one to build the URL
		// Then fetch method would later fetch the rest of the post types if needed
		expect(
			fetchStrategy.buildEndpointURL({
				slug: 'book-name',
				postType: ['page', 'book'],
			}),
		).toEqual('/wp-json/wp/v2/pages?slug=book-name');

		expect(
			fetchStrategy.buildEndpointURL({
				postType: 'book',
				id: 10,
			}),
		).toEqual('/wp-json/wp/v2/book/10');

		expect(
			fetchStrategy.buildEndpointURL({
				postType: 'book',
				id: 10,
				revision: true,
			}),
		).toEqual('/wp-json/wp/v2/book/10');

		expect(
			fetchStrategy.buildEndpointURL({
				postType: ['book', 'page'],
				id: 10,
				revision: true,
			}),
		).toEqual('/wp-json/wp/v2/book/10');

		// ensure it thows an error if post type is not defined
		expect(() =>
			fetchStrategy.buildEndpointURL({
				postType: 'custom-post-type',
			}),
		).toThrow('Unkown post type, did you forget to add it to headless.config.js?');
	});

	it('fetches content properly', async () => {
		const samplePost = { title: 'test', id: 1 };
		const sampleHeaders = {
			'x-wp-totalpages': 1,
			'x-wp-total': 1,
		};

		apiGetMock.mockResolvedValue({
			headers: sampleHeaders,
			json: [samplePost],
		});

		setHeadlessConfig({
			customPostTypes: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		let params = fetchStrategy.getParamsFromURL('/post-name');
		const results = await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);

		expect(apiGetMock).toHaveBeenNthCalledWith(1, '/wp-json/wp/v2/posts?slug=post-name', {});
		expect(results).toMatchObject({
			result: samplePost,
			pageInfo: {
				page: 1,
				totalItems: 1,
				totalPages: 1,
			},
		});

		params = fetchStrategy.getParamsFromURL('/2021/10/post-name');
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params);
		expect(apiGetMock).toHaveBeenNthCalledWith(2, '/wp-json/wp/v2/posts?slug=post-name', {});

		params = fetchStrategy.getParamsFromURL('/2021/10/post-name');
		const paramsWithId = { ...params, id: 10 };
		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(paramsWithId), paramsWithId);
		expect(apiGetMock).toHaveBeenNthCalledWith(3, '/wp-json/wp/v2/posts/10', {});

		params = fetchStrategy.getParamsFromURL('/2021/10/post-name');
		const paramsWithPostType = { ...params, postType: 'book' };
		await fetchStrategy.fetcher(
			fetchStrategy.buildEndpointURL(paramsWithPostType),
			paramsWithPostType,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(4, '/wp-json/wp/v2/book?slug=post-name', {});

		params = fetchStrategy.getParamsFromURL('/2021/10/post-name');
		const paramsWithPostTypeAndId = { ...params, postType: 'book', id: 10 };
		await fetchStrategy.fetcher(
			fetchStrategy.buildEndpointURL(paramsWithPostTypeAndId),
			paramsWithPostTypeAndId,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(5, '/wp-json/wp/v2/book/10', {});

		apiGetMock.mockReset();
		apiGetMock.mockClear();

		apiGetMock.mockImplementation(async (url) => {
			const isBookEndpoint = url.includes('/wp/v2/book');
			const ispagesEndpoint = url.includes('/wp/v2/pages');

			if (isBookEndpoint || ispagesEndpoint) {
				return Promise.resolve({ headers: {}, json: [] });
			}

			return Promise.resolve({ headers: {}, json: [{ id: 1 }] });
		});

		// when passing multiple post types and the first one is not found, the rest of the post types should be fetched
		params = fetchStrategy.getParamsFromURL('/2021/10/post-name');
		const paramsWithPostTypes = { ...params, postType: ['book', 'post'] };
		await fetchStrategy.fetcher(
			fetchStrategy.buildEndpointURL(paramsWithPostTypes),
			paramsWithPostTypes,
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(1, '/wp-json/wp/v2/book?slug=post-name', {});
		expect(apiGetMock).toHaveBeenNthCalledWith(2, '/wp-json/wp/v2/posts?slug=post-name', {});
	});

	it('handle revisions', async () => {
		const samplePostRevision = { title: 'test', id: 1 };
		const sampleHeaders = {
			'x-wp-totalpages': 1,
			'x-wp-total': 1,
		};

		apiGetMock.mockResolvedValue({
			headers: sampleHeaders,
			json: [samplePostRevision],
		});

		const params = fetchStrategy.getParamsFromURL('/post-name');
		const revisionParams = { ...params, id: 1, revision: true, authToken: 'test token' };

		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(revisionParams), revisionParams);

		expect(apiGetMock).toHaveBeenNthCalledWith(
			1,
			'/wp-json/wp/v2/posts/1/revisions?per_page=1',
			{
				headers: { Authorization: 'Bearer test token' },
			},
		);
		expect(apiGetMock).toHaveBeenNthCalledWith(2, '/wp-json/wp/v2/posts/1', {
			headers: { Authorization: 'Bearer test token' },
		});
	});

	it('handle draft posts', async () => {
		const samplePost = { title: 'test', id: 1 };
		const sampleHeaders = {
			'x-wp-totalpages': 1,
			'x-wp-total': 1,
		};

		apiGetMock.mockResolvedValue({
			headers: sampleHeaders,
			json: samplePost,
		});

		const params = fetchStrategy.getParamsFromURL('/post-name');
		const draftParams = { ...params, id: 10, authToken: 'test token' };

		await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(draftParams), draftParams);

		expect(apiGetMock).toHaveBeenNthCalledWith(1, '/wp-json/wp/v2/posts/10', {
			headers: { Authorization: 'Bearer test token' },
		});
	});

	it('throws errors with bad arguments', async () => {
		apiGetMock.mockImplementation(async (url) => {
			const isBookEndpoint = url.includes('/wp/v2/book');
			const ispagesEndpoint = url.includes('/wp/v2/pages');

			if (isBookEndpoint || ispagesEndpoint) {
				return Promise.resolve({ headers: {}, json: [] });
			}

			return Promise.resolve({ headers: {}, json: [{ id: 1 }] });
		});

		setHeadlessConfig({
			customPostTypes: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		let params = fetchStrategy.getParamsFromURL('/2021/10/post-name');
		let paramsWithPostTypes = { ...params, postType: ['book', 'unkown-post-type'] };
		let fetchPromise = fetchStrategy.fetcher(
			fetchStrategy.buildEndpointURL(paramsWithPostTypes),
			paramsWithPostTypes,
		);

		await expect(fetchPromise).rejects.toThrow(
			'Unkown post type, did you forget to add it to headless.config.js?',
		);

		params = fetchStrategy.getParamsFromURL('/2021/10/post-name');
		paramsWithPostTypes = {
			...params,
			postType: ['book', 'unkown-post-type-1', 'unkown-post-type-2'],
		};
		fetchPromise = fetchStrategy.fetcher(
			fetchStrategy.buildEndpointURL(paramsWithPostTypes),
			paramsWithPostTypes,
		);

		await expect(fetchPromise).rejects.toThrow(
			'Unkown post type, did you forget to add it to headless.config.js?',
		);
	});
});
