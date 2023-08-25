import { PostEntity, PostOrPostsParams, TermEntity, setHeadstartWPConfig } from '@headstartwp/core';
import { expectTypeOf } from 'expect-type';
import { useAuthorArchive } from '../../hooks/useAuthorArchive';
import { usePosts } from '../../hooks/usePosts';
import { useSearch } from '../../hooks/useSearch';
import { useTerms } from '../../hooks/useTerms';
import { usePost } from '../../hooks/usePost';
import { usePostOrPosts } from '../../hooks/usePostOrPosts';
import { fetchHookData } from '../fetchHookData';
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
