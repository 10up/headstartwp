import type { PostEntity, PostsArchiveParams } from '@10up/headless-core';
import { expectTypeOf } from 'expect-type';
import { useAuthorArchive } from '../useAuthorArchive';

describe('useAuthorArchive types', () => {
	it('allows overriding types', () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		expectTypeOf(
			useAuthorArchive<Book, BookParams>({ isbn: 'sdasd' }).data?.posts,
		).toMatchTypeOf<
			| Array<{
					isbn: string;
			  }>
			| undefined
		>();
	});
});
