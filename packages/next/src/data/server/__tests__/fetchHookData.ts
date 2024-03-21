import { PostEntity, PostOrPostsParams, TermEntity, setHeadstartWPConfig } from '@headstartwp/core';
import { expectTypeOf } from 'expect-type';
import { useAuthorArchive } from '../../hooks/useAuthorArchive';
import { usePosts } from '../../hooks/usePosts';
import { useSearch } from '../../hooks/useSearch';
import { useTerms } from '../../hooks/useTerms';
import { usePost } from '../../hooks/usePost';
import { usePostOrPosts } from '../../hooks/usePostOrPosts';
import { fetchHookData, prepareFetchHookData } from '../fetchHookData';
import { addHookData } from '../addHookData';

test('fetchHookData types', async () => {
	expectTypeOf((await fetchHookData(usePosts.fetcher(), {})).data.result).toMatchTypeOf<
		PostEntity[]
	>();

	expectTypeOf((await fetchHookData(useSearch.fetcher(), {})).data.result).toMatchTypeOf<
		PostEntity[]
	>();

	expectTypeOf((await fetchHookData(useAuthorArchive.fetcher(), {})).data.result).toMatchTypeOf<
		PostEntity[]
	>();

	expectTypeOf((await fetchHookData(useTerms.fetcher(), {})).data.result).toMatchTypeOf<
		TermEntity[]
	>();

	expectTypeOf(
		(await fetchHookData(usePost.fetcher(), {})).data.result,
	).toMatchTypeOf<PostEntity>();
});

describe('prepareFetchHookData', () => {
	it('builds path correctly', () => {
		const { path } = prepareFetchHookData(usePosts.fetcher(), {
			params: {
				path: ['2024', '01', '02', 'page-name'],
			},
		});

		expect(path).toBe('/2024/01/02/page-name');

		const { path: path2 } = prepareFetchHookData(usePosts.fetcher(), {
			params: {
				path: ['2024', '01', '02', 'page-name', '', ''],
			},
		});

		expect(path2).toBe('/2024/01/02/page-name');
	});

	it('returns url params properly', () => {
		const { urlParams } = prepareFetchHookData(usePost.fetcher(), {
			params: {
				path: ['2024', '01', '02', 'page-name'],
			},
		});

		expect(urlParams).toMatchObject({ slug: 'page-name' });

		const { urlParams: urlParams2 } = prepareFetchHookData(usePosts.fetcher(), {
			params: {
				path: ['category', 'news'],
			},
		});

		expect(urlParams2).toMatchObject({ category: 'news' });
	});

	it('returns params properly', () => {
		setHeadstartWPConfig({
			useWordPressPlugin: true,
			integrations: {
				polylang: {
					enable: true,
				},
			},
		});

		const { params } = prepareFetchHookData(
			usePost.fetcher(),
			{
				// params from next.js ctx
				params: {
					path: ['2024', '01', '02', 'page-name'],
				},
				locale: 'pt',
			},
			{
				// user passed params
				params: {
					id: 1,
				},
			},
		);

		expect(params).toEqual({ slug: 'page-name', _embed: true, id: 1, lang: 'pt' });

		setHeadstartWPConfig({
			useWordPressPlugin: true,
		});
	});

	it('returns cacheKey properly', () => {
		const { cacheKey } = prepareFetchHookData(
			usePost.fetcher(),
			{
				// params from next.js ctx
				params: {
					path: ['2024', '01', '02', 'page-name'],
				},
			},
			{
				// user passed params
				params: {
					id: 1,
				},
			},
		);

		expect(cacheKey).toMatchObject({
			args: { _embed: true, id: 1, slug: 'page-name', sourceUrl: '' },
			url: '/wp-json/wp/v2/posts',
		});
	});
});

describe('fetchHookData', () => {
	it('handles additionalCacheObjects', async () => {
		setHeadstartWPConfig({
			useWordPressPlugin: true,
		});

		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: {},
			priority: 'archive',
			routeMatchStrategy: 'archive',
		};

		const result = await fetchHookData(
			usePostOrPosts.fetcher(),
			{
				params: {
					path: ['/category/uncategorized'],
				},
			},
			{ params: p },
		);

		expect(addHookData([result], {})).toMatchObject({
			props: {
				fallback: {
					'#url:"/wp-json/wp/v2/posts",args:#taxonomy:"category",sourceUrl:"",category:"uncategorized",_embed:true,,':
						{
							pageInfo: {
								page: 1,
								totalItems: 8,
								totalPages: 1,
							},
						},
					'#url:"@postOrPosts",args:#sourceUrl:"",single:#slug:"uncategorized",,routeMatchStrategy:"archive",priority:"archive",archive:#taxonomy:"category",category:"uncategorized",,,':
						{
							pageInfo: {
								page: 1,
								totalItems: 8,
								totalPages: 1,
							},
							result: { isArchive: true, isSingle: false },
						},
				},
			},
		});
	});
});
