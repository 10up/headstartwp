import { enableFetchMocks } from 'jest-fetch-mock';
import { HeadlessConfig, setHeadstartWPConfig } from '@headstartwp/core';

import { usePosts } from '../../hooks/usePosts';
import { usePost } from '../../hooks/usePost';

import { fetchHookData } from '../fetchHookData';
import cache from '../cache';

enableFetchMocks();

describe('fetchHookData caching', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('caches fetch calls', async () => {
		setHeadstartWPConfig({
			useWordPressPlugin: true,
			cache: {
				enabled: true,
			},
		});

		fetchMock.mockResponseOnce(JSON.stringify([{}]));

		await fetchHookData(usePosts.fetcher(), {});

		expect(fetchMock).toHaveBeenCalledTimes(1);

		// should not be called again
		await fetchHookData(usePosts.fetcher(), {});

		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it('caches fetch call with custom cache handler and enabled function', async () => {
		const config = {
			useWordPressPlugin: true,
			cache: {
				enabled: ({ fetchStrategy }) => {
					return fetchStrategy.getDefaultEndpoint() === '/wp-json/wp/v2/posts';
				},

				cacheHandler: {
					set: jest.fn(async (key, data, ttl) => {
						cache.set(key, data, ttl);
					}),
					get: jest.fn(async (key) => {
						return cache.get(key);
					}),
				},
			},
		};

		setHeadstartWPConfig(config);

		fetchMock.mockResponseOnce(JSON.stringify([{ data: {} }]));

		let result = await fetchHookData(usePosts.fetcher(), {}, { params: { slug: 'test' } });

		expect(config.cache.cacheHandler.set).toHaveBeenCalledTimes(1);
		expect(config.cache.cacheHandler.get).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(result.data.isCached).toBeFalsy();

		result = await fetchHookData(usePosts.fetcher(), {}, { params: { slug: 'test' } });
		// should not be called again
		expect(config.cache.cacheHandler.set).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(config.cache.cacheHandler.get).toHaveBeenCalledTimes(2);
		expect(result.data.isCached).toBe(true);
	});

	it('caches fetch call and runs beforeSet and afterGet', async () => {
		const config = {
			useWordPressPlugin: true,
			cache: {
				enabled: ({ fetchStrategy }) => {
					return fetchStrategy.getDefaultEndpoint() === '/wp-json/wp/v2/posts';
				},

				// @ts-expect-error
				afterGet: jest.fn(async (options, data) => {
					return data;
				}),

				// @ts-expect-error
				beforeSet: jest.fn(async (options, data) => {
					return data;
				}),

				cacheHandler: {
					set: jest.fn(async (key, data, ttl) => {
						cache.set(key, data, ttl);
					}),
					get: jest.fn(async (key) => {
						return cache.get(key);
					}),
				},
			},
		} satisfies HeadlessConfig;

		// @ts-expect-error
		setHeadstartWPConfig(config);

		fetchMock.mockResponseOnce(JSON.stringify([{ data: {} }]));

		let result = await fetchHookData(usePosts.fetcher(), {}, { params: { slug: 'test2' } });

		expect(config.cache.cacheHandler.set).toHaveBeenCalledTimes(1);
		expect(config.cache.cacheHandler.get).toHaveBeenCalledTimes(1);
		// no cache so should not call after get
		expect(config.cache.afterGet).not.toHaveBeenCalled();
		expect(config.cache.beforeSet).toHaveBeenCalledTimes(1);
		expect(result.data.isCached).toBeFalsy();
		expect(fetchMock).toHaveBeenCalledTimes(1);

		result = await fetchHookData(usePosts.fetcher(), {}, { params: { slug: 'test2' } });

		// should not be called again
		expect(config.cache.cacheHandler.set).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(config.cache.cacheHandler.get).toHaveBeenCalledTimes(2);
		expect(config.cache.afterGet).toHaveBeenCalledTimes(1);
		expect(config.cache.beforeSet).toHaveBeenCalledTimes(1);
		expect(result.data.isCached).toBe(true);
	});

	it('caches with beforeSet without mutating the fetched data', async () => {
		const config = {
			useWordPressPlugin: true,
			cache: {
				enabled: true,

				afterGet: async (options, data) => {
					return data;
				},

				beforeSet: async (options, data) => {
					return {
						...data,
						result: {
							...data.result,
							beforeSetField: true,
						},
					};
				},

				cacheHandler: {
					set: async (key, data, ttl) => {
						cache.set(key, data, ttl);
					},
					get: async (key) => {
						return cache.get(key);
					},
				},
			},
		} satisfies HeadlessConfig;

		setHeadstartWPConfig(config);

		fetchMock.mockResponseOnce(JSON.stringify([{ id: 10 }]));

		const result = await fetchHookData(usePost.fetcher(), {}, { params: { slug: 'test3' } });

		expect(result.data.result.id).toBe(10);
		expect(result.data.result.beforeSetField).toBeUndefined();
	});
});
