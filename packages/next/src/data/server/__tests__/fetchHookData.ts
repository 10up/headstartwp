import { expectTypeOf } from 'expect-type';
import { usePosts } from '../../hooks/usePosts';
import { fetchHookData } from '../fetchHookData';

test('fetchHookData types', async () => {
	expectTypeOf(await fetchHookData(usePosts.fetcher(), {}));
});
