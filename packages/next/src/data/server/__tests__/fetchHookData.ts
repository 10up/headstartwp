import { PostEntity, TermEntity } from '@10up/headless-core';
import { expectTypeOf } from 'expect-type';
import { useAuthorArchive } from '../../hooks/useAuthorArchive';
import { usePosts } from '../../hooks/usePosts';
import { useSearch } from '../../hooks/useSearch';
import { useTerms } from '../../hooks/useTerms';
import { usePost } from '../../hooks/usePost';
import { fetchHookData } from '../fetchHookData';

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
