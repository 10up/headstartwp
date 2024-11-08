import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { SettingsProvider } from '../../provider';
import { setHeadstartWPConfig } from '../../../utils';
import { useFetchPostOrPosts } from '../useFetchPostOrPosts';
import { PostEntity, PostOrPostsParams } from '../../../data';
import { useFetchPost } from '../useFetchPost';
import { useFetchPosts } from '../useFetchPosts';
import * as useFetchModule from '../useFetch';
import { mockUseFetchErrorResponse } from '../mocks';

describe('useFetchPostOrPosts', () => {
	const wrapper = ({ children }) => {
		return (
			<SWRConfig value={{ provider: () => new Map() }}>
				<SettingsProvider
					settings={{ sourceUrl: 'https://js1.10up.com', useWordPressPlugin: true }}
				>
					{children}
				</SettingsProvider>
			</SWRConfig>
		);
	};

	const wrapperWithCache = ({ children }) => {
		return (
			<SettingsProvider
				settings={{ sourceUrl: 'https://js1.10up.com', useWordPressPlugin: true }}
			>
				{children}
			</SettingsProvider>
		);
	};

	setHeadstartWPConfig({
		sourceUrl: 'https://js1.10up.com',
		useWordPressPlugin: true,
	});

	it('fetches data properly (archive)', async () => {
		// simulate something like /src/pages/blog/[...path].js
		// whhich would supports paths like `/blog/category-name`
		// `/blog/post-name` and even `/blog/category-name/post-name`
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: {},
			priority: 'archive',
			routeMatchStrategy: 'archive',
		};

		const { result } = renderHook(() => useFetchPostOrPosts(p, undefined, '/uncategorized'), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.isArchive).toBe(true);
			expect(result.current.isSingle).toBe(false);
			expect(result.current.data?.post).toBeUndefined();
			expect(result.current.data?.posts?.length).toBeGreaterThan(0);

			(result.current.data?.posts as PostEntity[]).forEach((post) => {
				// 1 is the id of the uncategorized category
				expect(post.categories?.flat()).toContain(1);
			});
		});
	});

	it('fetches data properly (single)', async () => {
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: { matchCurrentPath: false },
			priority: 'single',
			routeMatchStrategy: 'both',
		};

		const { result } = renderHook(
			() =>
				useFetchPostOrPosts(
					p,
					undefined,
					'/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				),
			{
				wrapper,
			},
		);

		await waitFor(() => {
			expect(result.current.isArchive).toBe(false);
			expect(result.current.isSingle).toBe(true);
			expect(result.current.data?.posts).toBeUndefined();
			expect(result.current.data?.post).toBeDefined();
			expect(result.current.data?.post?.slug).toBe(
				'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
			);
		});
	});

	it('handles response if has error or there is no data', async () => {
		const spyUseFetch = jest
			.spyOn(useFetchModule, 'useFetch')
			.mockReturnValueOnce(mockUseFetchErrorResponse);
		const { result } = renderHook(() => useFetchPostOrPosts({}), {
			wrapper,
		});
		const expectedKeys = ['error', 'loading', 'isArchive', 'isSingle', 'data', 'isMainQuery'];
		const returnedKeys = Object.keys(result.current);
		const missingKeys = returnedKeys.filter((key) => !expectedKeys.includes(key));

		await waitFor(() => {
			expect(missingKeys).toHaveLength(0);
			expect(spyUseFetch).toHaveBeenCalledTimes(3); // #1 useFetch, #2 useFetchPost, #3 useFetchPosts
			expect(result.current.error).toBe('Not found');
			expect(result.current.loading).toBe(false);
			expect(result.current.isArchive).toBe(false);
			expect(result.current.isSingle).toBe(false);
			expect(() => result.current.data).not.toThrow();
			expect(() => result.current.data?.post!.title).toThrow();
			expect(() => result.current.data?.posts![0].title).toThrow();
			expect(result.current.isMainQuery).toBe(true);
		});

		spyUseFetch.mockRestore();
	});

	it('populates internal swr cache (single)', async () => {
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: { matchCurrentPath: false },
			priority: 'single',
			routeMatchStrategy: 'both',
		};

		const { result } = renderHook(
			() =>
				useFetchPostOrPosts(
					p,
					undefined,
					'/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				),
			{
				wrapper: wrapperWithCache,
			},
		);

		await waitFor(() => {
			expect(result.current.data?.post?.slug).toBe(
				'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
			);
		});

		const { result: result2 } = renderHook(
			() =>
				useFetchPost(
					p.single,
					undefined,
					'/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				),
			{
				wrapper: wrapperWithCache,
			},
		);

		// the data for useFetchPost should be avaliable immediatelly without a fetch
		// so this test should pass without waitFor
		expect(result2.current.data?.post.slug).toBe(
			'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		);
	});

	it('populates internal swr cache (archive)', async () => {
		// simulate something like /src/pages/blog/[...path].js
		// whhich would supports paths like `/blog/category-name`
		// `/blog/post-name` and even `/blog/category-name/post-name`
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: {},
			priority: 'archive',
			routeMatchStrategy: 'archive',
		};

		const { result } = renderHook(() => useFetchPostOrPosts(p, undefined, '/uncategorized'), {
			wrapper: wrapperWithCache,
		});

		await waitFor(() => {
			expect(result.current.data?.posts?.length).toBeGreaterThan(0);
		});

		const { result: result2 } = renderHook(
			() => useFetchPosts(p.archive, undefined, '/uncategorized'),
			{
				wrapper: wrapperWithCache,
			},
		);

		// the data for useFetchPosts should be avaliable immediatelly without a fetch
		// so this test should pass  without waitFor
		expect(result2.current.data?.posts?.length).toBeGreaterThan(0);
		(result.current.data?.posts as PostEntity[]).forEach((post) => {
			// 1 is the id of the uncategorized category
			expect(post.categories?.flat()).toContain(1);
		});
	});
});
