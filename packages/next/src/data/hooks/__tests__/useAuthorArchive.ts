import { setHeadstartWPConfig, type PostEntity, type PostsArchiveParams } from '@headstartwp/core';
import { renderHook } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import { useAuthorArchive } from '../useAuthorArchive';

describe('useAuthorArchive types', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sourceUrl: 'https://js1.10up.com',
			useWordPressPlugin: true,
		});
	});

	it('allows overriding types', () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		const { result } = renderHook(() => useAuthorArchive<Book, BookParams>({ isbn: 'sdasd' }));

		expectTypeOf(result.current.data?.posts).toMatchTypeOf<
			| Array<{
					isbn: string;
			  }>
			| undefined
		>();
	});
});
