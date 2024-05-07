import { renderHook } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import type { PostEntity, PostsArchiveParams } from '../../../data';
import { useFetchAuthorArchive } from '../useFetchAuthorArchive';

describe('useFetchAuthorArchive types', () => {
	it('allows overriding types', () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		const { result } = renderHook(() =>
			useFetchAuthorArchive<Book, BookParams>({ isbn: 'sdasd' }),
		);

		expectTypeOf(result.current.data?.posts).toMatchTypeOf<
			| Array<{
					isbn: string;
			  }>
			| undefined
		>();
	});
});
