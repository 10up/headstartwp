import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { setHeadlessConfig } from '../../../../test/utils';
import { SettingsProvider } from '../../provider';
import { useFetchPosts } from '../useFetchPosts';

describe('useFetchPosts', () => {
	const wrapper = ({ children }) => {
		return <SettingsProvider settings={{ sourceUrl: '' }}>{children}</SettingsProvider>;
	};

	setHeadlessConfig({
		useWordPressPlugin: true,
	});

	it('throwns errors if accessing data before fetch', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useFetchPosts(), { wrapper });

		// should throw before we have any actual results
		expect(() => result.current.data?.posts.at(0)?.title).toThrow();
		expect(result.current.loading).toBe(true);

		await waitForNextUpdate();

		expect(result.current.error).toBeUndefined();
		expect(result.current.loading).toBe(false);
		expect(() => result.current.data).not.toThrow();
	});

	it('fetches data properly', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useFetchPosts({ per_page: 2 }), {
			wrapper,
		});

		await waitForNextUpdate();

		expect(result.current.data?.posts.length).toBe(2);
	});

	it('returns queried object for category archives', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() =>
				useFetchPosts({
					category: 'uncategorized',
					per_page: 1,
				}),
			{
				wrapper,
			},
		);

		await waitForNextUpdate();

		expect(result.current.data?.posts.length).toBe(1);
		expect(result.current.data?.queriedObject.term?.slug).toBe('uncategorized');
		expect(result.current.pageType.isAuthorArchive).toBe(false);
		expect(result.current.pageType.isCategoryArchive).toBe(true);
		expect(result.current.pageType.isSearch).toBe(false);
		expect(result.current.pageType.isTaxonomyArchive).toBe(true);
		expect(result.current.pageType.isTagArchive).toBe(false);
	});

	it('returns queried objects for utf8 encoded slugs', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() =>
				useFetchPosts({
					category: 'الأخبار-المالية',
					per_page: 1,
				}),
			{
				wrapper,
			},
		);

		await waitForNextUpdate();

		expect(result.current.data?.posts.length).toBe(1);
		expect(result.current.data?.queriedObject.term?.slug).toBe('الأخبار-المالية');
	});

	it('returns queried object for author archives', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => useFetchPosts({ author: 'jane', per_page: 1 }),
			{
				wrapper,
			},
		);

		await waitForNextUpdate();

		expect(result.current.data?.posts.length).toBe(1);
		expect(result.current.data?.queriedObject.author?.slug).toBe('jane');
		expect(result.current.pageType.isAuthorArchive).toBe(true);
		expect(result.current.pageType.isCategoryArchive).toBe(false);
		expect(result.current.pageType.isSearch).toBe(false);
		expect(result.current.pageType.isTaxonomyArchive).toBe(false);
		expect(result.current.pageType.isTagArchive).toBe(false);
	});

	it('does not throw error if throwIfNotFound is passed', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() =>
				useFetchPosts(
					{ category: 'random category that does not exist' },
					{
						fetchStrategyOptions: {
							throwIfNotFound: false,
						},
					},
				),
			{
				wrapper,
			},
		);

		await waitForNextUpdate();

		// if throwIfNotfound is not passed error should be not set
		expect(result.current.error).toBeFalsy();
		expect(result.current.data).toMatchObject({
			posts: [],
		});
	});

	it('reads param from the url and sets isMainQuery flag', async () => {
		let { result, waitForNextUpdate } = renderHook(
			() => useFetchPosts({}, {}, '/author/jane'),
			{
				wrapper,
			},
		);

		await waitForNextUpdate();

		expect(result.current.error).toBeFalsy();
		expect(result.current.data?.queriedObject.author?.slug).toBe('jane');
		expect(result.current.isMainQuery).toBe(true);

		({ result, waitForNextUpdate } = renderHook(() => useFetchPosts({ author: 'jane' }), {
			wrapper,
		}));

		await waitForNextUpdate();

		expect(result.current.error).toBeFalsy();
		expect(result.current.data?.queriedObject.author?.slug).toBe('jane');
		expect(result.current.isMainQuery).toBe(false);

		({ result, waitForNextUpdate } = renderHook(
			() => useFetchPosts({ taxonomy: 'category' }, {}, '/news'),
			{
				wrapper,
			},
		));

		await waitForNextUpdate();

		expect(result.current.error).toBeFalsy();
		expect(result.current.data?.queriedObject.term?.slug).toBe('news');
		expect(result.current.isMainQuery).toBe(true);
	});
});
