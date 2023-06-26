import { createMocks } from 'node-mocks-http';
import { getSiteByHost } from '@headstartwp/core';
import { revalidateHandler } from '../revalidateHandler';
import { revalidatePost } from '../revalidateHandler/revalidatePost';
import { revalidateTerms } from '../revalidateHandler/revalidateTerms';
import { fetchHookData } from '../../data';

jest.mock('../revalidateHandler/revalidatePost', () => {
	const original = jest.requireActual('../revalidateHandler/revalidatePost');
	return {
		__esModule: true,
		revalidatePost: jest.fn(original.revalidatePost),
	};
});

jest.mock('../revalidateHandler/revalidateTerms', () => {
	const original = jest.requireActual('../revalidateHandler/revalidateTerms');
	return {
		__esModule: true,
		revalidateTerms: jest.fn(original.revalidateTerms),
	};
});

jest.mock('../../data', () => {
	const original = jest.requireActual('../../data');
	return {
		__esModule: true,
		...original,
		fetchHookData: jest.fn(),
	};
});

jest.mock('@headstartwp/core', () => {
	const original = jest.requireActual('@headstartwp/core');
	return {
		__esModule: true,
		...original,
		getSiteByHost: jest.fn(original.getSiteByHost),
	};
});

const mockedFetchHookData = fetchHookData as jest.Mock;
const mockedGetSiteByHost = getSiteByHost as jest.Mock;

describe('revalidateHandler', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 401 if method is not GET', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			query: {},
		});

		await revalidateHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Invalid method' });
	});

	it('should call revalidatePost if receiving post_id, path and token', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_id: '1',
				path: '/post',
				token: 'sometoken',
			},
		});

		await revalidateHandler(req, res);

		expect(revalidatePost).toHaveBeenCalledTimes(1);
		expect(revalidatePost).toHaveBeenCalledWith(req, res);
		expect(revalidateTerms).not.toHaveBeenCalled();
	});

	it('should call revalidateTerms if receiving terms_ids, paths, total_pages and token', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				terms_ids: '1,2',
				paths: '/category/test,/tag/test',
				total_pages: '2',
				token: 'sometoken',
			},
		});

		await revalidateHandler(req, res);

		expect(revalidateTerms).toHaveBeenCalledTimes(1);
		expect(revalidateTerms).toHaveBeenCalledWith(req, res);
		expect(revalidatePost).not.toHaveBeenCalled();
	});

	it('should return 401 if missing required params', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {},
		});

		await revalidateHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Missing required params' });
	});
});

describe('revalidatePost', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 401 if invalid params', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {},
		});

		await revalidatePost(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Invalid params' });
	});

	it('should revalidate the post path', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_id: '1',
				path: '/post',
				token: 'sometoken',
			},
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					post_id: '1',
					path: '/post',
				},
			},
		});

		res.revalidate = jest.fn();

		await revalidatePost(req, res);

		expect(fetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).toHaveBeenCalledWith('/post');
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			path: '/post',
		});
	});

	it('should revalidate the post path for a multisite request', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_id: '1',
				path: '/post',
				token: 'sometoken',
			},
			headers: {
				host: 'site1.localhost:3001',
			},
		});

		mockedGetSiteByHost.mockReturnValueOnce({
			hostUrl: 'http://site1.localhost:3001',
			host: 'site1.localhost:3301',
			sourceUrl: 'https://js1.10up.com',
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					post_id: '1',
					path: '/post',
				},
			},
		});

		res.revalidate = jest.fn();

		await revalidatePost(req, res);

		expect(fetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).toHaveBeenCalledWith('/_sites/site1.localhost:3001/post');
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			path: '/_sites/site1.localhost:3001/post',
		});
	});

	it('should revalidate the post path for a multisite request with locale', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_id: '1',
				path: '/post',
				locale: 'es',
				token: 'sometoken',
			},
			headers: {
				host: 'site1.localhost:3001',
			},
		});

		mockedGetSiteByHost.mockReturnValueOnce({
			hostUrl: 'http://site1.localhost:3001',
			host: 'site1.localhost:3301',
			sourceUrl: 'https://js1.10up.com',
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					post_id: '1',
					path: '/post',
				},
			},
		});

		res.revalidate = jest.fn();

		await revalidatePost(req, res);

		expect(fetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).toHaveBeenCalledWith('/_sites/site1.localhost:3001/es/post');
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			path: '/_sites/site1.localhost:3001/es/post',
		});
	});

	it('should return a 500 response when token mismatch', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_id: '1',
				path: '/post',
				token: 'invalidtoken',
			},
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					post_id: '2',
					path: '/post',
				},
			},
		});

		res.revalidate = jest.fn();

		await revalidatePost(req, res);

		expect(mockedFetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).not.toHaveBeenCalled();
		expect(res._getStatusCode()).toBe(500);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Token mismatch' });
	});
});

describe('revalidateTerms', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 401 if invalid params', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {},
		});

		await revalidateTerms(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Invalid params' });
	});

	it('should revalidate the existing terms paths', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				terms_ids: '1,2',
				paths: '/category/test,/tag/test',
				total_pages: '2',
				token: 'sometoken',
			},
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					terms_ids: [1, 2],
					paths: ['/category/test', '/tag/test'],
				},
			},
		});

		res.revalidate = jest.fn(
			(path) =>
				new Promise((resolve, reject) => {
					if (path.endsWith('/page/2')) reject();
					resolve(path);
				}),
		);

		await revalidateTerms(req, res);

		expect(res.revalidate).toHaveBeenCalledTimes(4);
		expect(res.revalidate).toHaveBeenNthCalledWith(1, '/category/test');
		expect(res.revalidate).toHaveBeenNthCalledWith(2, '/category/test/page/2');
		expect(res.revalidate).toHaveBeenNthCalledWith(3, '/tag/test');
		expect(res.revalidate).toHaveBeenNthCalledWith(4, '/tag/test/page/2');
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			paths: ['/category/test', '/tag/test'],
		});
	});
});
