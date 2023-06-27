import { createMocks } from 'node-mocks-http';
import { getSiteByHost } from '@headstartwp/core';
import { revalidateHandler } from '../revalidateHandler';
import { revalidatePost } from '../revalidateHandler/revalidatePost';
import { revalidateArchive } from '../revalidateHandler/revalidateArchive';
import { revalidateTerms } from '../revalidateHandler/revalidateTerms';
import { fetchHookData } from '../../data';
import { ERROR_MESSAGE } from '../revalidateHandler/constants';

jest.mock('../revalidateHandler/revalidatePost', () => {
	const original = jest.requireActual('../revalidateHandler/revalidatePost');
	return {
		__esModule: true,
		revalidatePost: jest.fn(original.revalidatePost),
	};
});

jest.mock('../revalidateHandler/revalidateArchive', () => {
	const original = jest.requireActual('../revalidateHandler/revalidateArchive');
	return {
		__esModule: true,
		revalidateArchive: jest.fn(original.revalidateArchive),
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
		expect(JSON.parse(res._getData())).toMatchObject({ message: ERROR_MESSAGE.INVALID_METHOD });
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
		expect(revalidateArchive).not.toHaveBeenCalled();
		expect(revalidateTerms).not.toHaveBeenCalled();
	});

	it('should call revalidateArchive if receiving post_type, path, total_pages and token', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_type: 'post',
				path: '/posts',
				total_pages: '2',
				token: 'sometoken',
			},
		});

		await revalidateHandler(req, res);

		expect(revalidateArchive).toHaveBeenCalledTimes(1);
		expect(revalidateArchive).toHaveBeenCalledWith(req, res);
		expect(revalidatePost).not.toHaveBeenCalled();
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
		expect(revalidateArchive).not.toHaveBeenCalled();
	});

	it('should return 401 if missing required params', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {},
		});

		await revalidateHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: ERROR_MESSAGE.MISSING_PARAMS,
		});
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
		expect(JSON.parse(res._getData())).toMatchObject({ message: ERROR_MESSAGE.INVALID_PARAMS });
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

	it('should return a 401 response when token mismatch', async () => {
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
		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: ERROR_MESSAGE.INVALID_TOKEN });
	});

	it('should return a 500 response when error', async () => {
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

		res.revalidate = jest.fn(() => {
			throw new Error('Revalidate error');
		});

		await revalidatePost(req, res);

		expect(mockedFetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).toHaveBeenCalledTimes(1);
		expect(res._getStatusCode()).toBe(500);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Revalidate error' });
	});
});

describe('revalidateArchive', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 401 if invalid params', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {},
		});

		await revalidateArchive(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: ERROR_MESSAGE.INVALID_PARAMS });
	});

	it('should revalidate the existing archive paths', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_type: 'post',
				path: '/posts',
				total_pages: '2',
				token: 'sometoken',
			},
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					post_type: 'post',
					path: '/posts',
				},
			},
		});

		res.revalidate = jest.fn(() => Promise.resolve());

		await revalidateArchive(req, res);

		expect(fetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).toHaveBeenCalledTimes(2);
		expect(res.revalidate).toHaveBeenNthCalledWith(1, '/posts');
		expect(res.revalidate).toHaveBeenNthCalledWith(2, '/posts/page/2');
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			paths: ['/posts', '/posts/page/2'],
		});
	});

	it('should revalidate the existing archive paths for a multisite request', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_type: 'post',
				path: '/posts',
				total_pages: '2',
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
					post_type: 'post',
					path: '/posts',
				},
			},
		});

		res.revalidate = jest.fn(() => Promise.resolve());

		await revalidateArchive(req, res);

		expect(fetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).toHaveBeenCalledTimes(2);
		expect(res.revalidate).toHaveBeenNthCalledWith(1, '/_sites/site1.localhost:3001/posts');
		expect(res.revalidate).toHaveBeenNthCalledWith(
			2,
			'/_sites/site1.localhost:3001/posts/page/2',
		);
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			paths: [
				'/_sites/site1.localhost:3001/posts',
				'/_sites/site1.localhost:3001/posts/page/2',
			],
		});
	});

	it('should revalidate the existing archive paths for a multisite request with locale', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_type: 'post',
				path: '/posts',
				locale: 'es',
				total_pages: '2',
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
					post_type: 'post',
					path: '/posts',
				},
			},
		});

		res.revalidate = jest.fn(() => Promise.resolve());

		await revalidateArchive(req, res);

		expect(fetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).toHaveBeenCalledTimes(2);
		expect(res.revalidate).toHaveBeenNthCalledWith(1, '/_sites/site1.localhost:3001/es/posts');
		expect(res.revalidate).toHaveBeenNthCalledWith(
			2,
			'/_sites/site1.localhost:3001/es/posts/page/2',
		);
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			paths: [
				'/_sites/site1.localhost:3001/es/posts',
				'/_sites/site1.localhost:3001/es/posts/page/2',
			],
		});
	});

	it('should return a 401 response when token mismatch', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_type: 'post',
				path: '/posts',
				total_pages: '2',
				token: 'invalidtoken',
			},
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					post_type: 'book',
					path: '/posts',
				},
			},
		});

		res.revalidate = jest.fn();

		await revalidateArchive(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: ERROR_MESSAGE.INVALID_TOKEN });
	});

	it('should return a 500 response when error', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				post_type: 'post',
				path: '/posts',
				total_pages: '2',
				token: 'sometoken',
			},
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					post_type: 'post',
					path: '/posts',
				},
			},
		});

		res.revalidate = jest.fn(() => {
			throw new Error('Revalidate error');
		});

		await revalidateArchive(req, res);

		expect(res._getStatusCode()).toBe(500);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Revalidate error' });
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
		expect(JSON.parse(res._getData())).toMatchObject({ message: ERROR_MESSAGE.INVALID_PARAMS });
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

	it('should revalidate the existing terms paths for a multisite request', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				terms_ids: '1,2',
				paths: '/category/test,/tag/test',
				total_pages: '2',
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
					terms_ids: [1, 2],
					paths: ['/category/test', '/tag/test'],
				},
			},
		});

		res.revalidate = jest.fn((path) => Promise.resolve(path));

		await revalidateTerms(req, res);

		expect(res.revalidate).toHaveBeenCalledTimes(4);
		expect(res.revalidate).toHaveBeenNthCalledWith(
			1,
			'/_sites/site1.localhost:3001/category/test',
		);
		expect(res.revalidate).toHaveBeenNthCalledWith(
			2,
			'/_sites/site1.localhost:3001/category/test/page/2',
		);
		expect(res.revalidate).toHaveBeenNthCalledWith(3, '/_sites/site1.localhost:3001/tag/test');
		expect(res.revalidate).toHaveBeenNthCalledWith(
			4,
			'/_sites/site1.localhost:3001/tag/test/page/2',
		);
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			paths: [
				'/_sites/site1.localhost:3001/category/test',
				'/_sites/site1.localhost:3001/category/test/page/2',
				'/_sites/site1.localhost:3001/tag/test',
				'/_sites/site1.localhost:3001/tag/test/page/2',
			],
		});
	});

	it('should revalidate the existing terms paths for a multisite request with locale', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				terms_ids: '1,2',
				paths: '/category/test,/tag/test',
				total_pages: '2',
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
					terms_ids: [1, 2],
					paths: ['/category/test', '/tag/test'],
				},
			},
		});

		res.revalidate = jest.fn((path) => Promise.resolve(path));

		await revalidateTerms(req, res);

		expect(res.revalidate).toHaveBeenCalledTimes(4);
		expect(res.revalidate).toHaveBeenNthCalledWith(
			1,
			'/_sites/site1.localhost:3001/es/category/test',
		);
		expect(res.revalidate).toHaveBeenNthCalledWith(
			2,
			'/_sites/site1.localhost:3001/es/category/test/page/2',
		);
		expect(res.revalidate).toHaveBeenNthCalledWith(
			3,
			'/_sites/site1.localhost:3001/es/tag/test',
		);
		expect(res.revalidate).toHaveBeenNthCalledWith(
			4,
			'/_sites/site1.localhost:3001/es/tag/test/page/2',
		);
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toMatchObject({
			message: 'success',
			paths: [
				'/_sites/site1.localhost:3001/es/category/test',
				'/_sites/site1.localhost:3001/es/category/test/page/2',
				'/_sites/site1.localhost:3001/es/tag/test',
				'/_sites/site1.localhost:3001/es/tag/test/page/2',
			],
		});
	});

	it('should return a 401 response when token mismatch', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				terms_ids: '1,2',
				paths: '/category/test,/tag/test',
				total_pages: '2',
				token: 'invalidtoken',
			},
		});

		mockedFetchHookData.mockReturnValueOnce({
			data: {
				result: {
					terms_ids: [1, 3],
					paths: ['/category/test', '/tag/test'],
				},
			},
		});

		res.revalidate = jest.fn();

		await revalidateTerms(req, res);

		expect(mockedFetchHookData).toHaveBeenCalledTimes(1);
		expect(res.revalidate).not.toHaveBeenCalled();
		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: ERROR_MESSAGE.INVALID_TOKEN });
	});

	it('should return a 500 response when error', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				terms_ids: '1,2',
				paths: '/category/test,/tag/test',
				total_pages: '2',
				token: 'sometoken',
			},
		});

		mockedFetchHookData.mockImplementationOnce(() => {
			throw new Error('Error on fetch');
		});

		await revalidateTerms(req, res);

		expect(mockedFetchHookData).toHaveBeenCalledTimes(1);
		expect(res._getStatusCode()).toBe(500);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Error on fetch' });
	});
});
