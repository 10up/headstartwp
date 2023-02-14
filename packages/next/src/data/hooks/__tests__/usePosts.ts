import type { PostEntity, PostsArchiveParams } from '@10up/headless-core';
import { renderHook } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import { usePosts } from '../usePosts';

describe('useAuthorArchive types', () => {
	it('allows overriding types', () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		const { result } = renderHook(() => usePosts<Book, BookParams>({ isbn: 'sdasd' }));

		expectTypeOf(result.current.data?.posts).toMatchTypeOf<
			| Array<{
					isbn: string;
			  }>
			| undefined
		>();
	});
});
