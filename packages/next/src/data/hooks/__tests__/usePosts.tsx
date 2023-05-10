import type { PostEntity, PostsArchiveParams } from '@headstartwp/core';
import { SettingsProvider } from '@headstartwp/react';
import { renderHook, waitFor } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import * as React from 'react';
import { usePosts } from '../usePosts';

const useRouterMock = jest.fn();

jest.mock('next/router', () => ({
	useRouter: () => useRouterMock(),
}));

describe('usePosts', () => {
	const wrapper = ({ children }) => {
		return <SettingsProvider settings={{ sourceUrl: '' }}>{children}</SettingsProvider>;
	};

	beforeAll(() => {
		useRouterMock.mockReturnValue({ query: { path: '' } });
	});

	it('fetches posts', async () => {
		const { result } = renderHook(() => usePosts({ per_page: 2 }), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.data?.posts.length).toBe(2);
		});
	});
});

describe('usePosts types', () => {
	beforeAll(() => {
		useRouterMock.mockReturnValue({ query: { path: '' } });
	});

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
