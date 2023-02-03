import type { PostEntity, PostsArchiveParams } from '@10up/headless-core';
import { expectTypeOf } from 'expect-type';
import { useSearch } from '../useSearch';

describe('useSearch types', () => {
	it('allows overriding types', () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		expectTypeOf(useSearch<Book, BookParams>({ isbn: 'sdasd' }).data?.posts).toMatchTypeOf<
			| Array<{
					isbn: string;
			  }>
			| undefined
		>();
	});
});
