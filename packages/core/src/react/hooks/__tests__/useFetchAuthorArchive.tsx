import { expectTypeOf } from 'expect-type';
import { PostEntity, PostsArchiveParams } from '../../../data';
import { useFetchAuthorArchive } from '../useFetchAuthorArchive';

describe('useFetchAuthorArchive types', () => {
	it('allows overriding types', () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		expectTypeOf(
			useFetchAuthorArchive<Book, BookParams>({ isbn: 'sdasd' }).data?.posts,
		).toMatchTypeOf<
			| Array<{
					isbn: string;
			  }>
			| undefined
		>();
	});
});
