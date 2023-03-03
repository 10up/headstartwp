import { renderHook, waitFor } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import * as React from 'react';
import { setHeadlessConfig } from '../../../../test/utils';
import { PostEntity, PostsArchiveParams } from '../../../data';
import { SettingsProvider } from '../../provider';
import { useFetchSearch } from '../useFetchSearch';

describe('useFetchPosts', () => {
	const wrapper = ({ children }) => {
		return <SettingsProvider settings={{ sourceUrl: '' }}>{children}</SettingsProvider>;
	};

	setHeadlessConfig({
		useWordPressPlugin: true,
	});

	it('returns empty results instead of throwing if not found', async () => {
		const { result } = renderHook(() => useFetchSearch({ search: 'not-found' }), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.error).toBeUndefined();
			expect(result.current.loading).toBe(false);
			expect(() => result.current.data).not.toThrow();
			expect(result.current.data?.posts.length).toBe(0);
		});
	});

	it('fetches data properly', async () => {
		const { result } = renderHook(() => useFetchSearch({ per_page: 2 }, {}, '/ipsum'), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.data?.posts.length).toBe(2);
			expect(result.current.data?.queriedObject.search?.subtype).toBe('post');
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('ipsum');
		});
	});

	it('reads param from the url and sets isMainQuery flag', async () => {
		let { result } = renderHook(() => useFetchSearch({}, {}, '/ipsum'), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.error).toBeFalsy();
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('ipsum');
			expect(result.current.isMainQuery).toBe(true);
		});

		({ result } = renderHook(() => useFetchSearch({ search: 'lorem' }), {
			wrapper,
		}));

		await waitFor(() => {
			expect(result.current.error).toBeFalsy();
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('lorem');
			expect(result.current.isMainQuery).toBe(false);
		});
	});

	describe('useFetchSearch types', () => {
		it('allows overriding types', () => {
			interface Book extends PostEntity {
				isbn: string;
			}

			interface BookParams extends PostsArchiveParams {
				isbn: string;
			}

			const { result } = renderHook(() =>
				useFetchSearch<Book, BookParams>({ isbn: 'sdasd' }),
			);

			expectTypeOf(result.current.data?.posts).toMatchTypeOf<
				| Array<{
						isbn: string;
				  }>
				| undefined
			>();
		});
	});
});
