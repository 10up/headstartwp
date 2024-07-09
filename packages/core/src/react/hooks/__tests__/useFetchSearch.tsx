import { renderHook, waitFor } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import * as React from 'react';

import { SWRConfig } from 'swr';
import { PostEntity, PostsArchiveParams } from '../../../data';
import { SettingsProvider } from '../../provider';
import { useFetchSearch } from '../useFetchSearch';
import { setHeadstartWPConfig } from '../../../utils';
import * as useFetchModule from '../useFetch';
import { mockUseFetchErrorResponse } from '../mocks';

describe('useFetchSearch', () => {
	beforeAll(() => {
		setHeadstartWPConfig({ sourceUrl: 'https://js1.10up.com', useWordPressPlugin: true });
	});

	const wrapper = ({ children }) => {
		return (
			<SWRConfig value={{ provider: () => new Map() }}>
				<SettingsProvider settings={{ sourceUrl: 'https://js1.10up.com' }}>
					{children}
				</SettingsProvider>
			</SWRConfig>
		);
	};

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

	it('handles response if has error or there is no data', async () => {
		const spyUseFetch = jest
			.spyOn(useFetchModule, 'useFetch')
			.mockReturnValueOnce(mockUseFetchErrorResponse);
		const { result } = renderHook(() => useFetchSearch({}), {
			wrapper,
		});

		const expectedKeys = ['error', 'loading', 'data', 'isMainQuery', 'mutate'];
		const returnedKeys = Object.keys(result.current);
		const missingKeys = returnedKeys.filter((key) => !expectedKeys.includes(key));

		await waitFor(() => {
			expect(missingKeys).toHaveLength(0);
			expect(spyUseFetch).toHaveBeenCalledTimes(1);
			expect(result.current.error).toBe('Not found');
			expect(result.current.loading).toBe(true);
			expect(() => result.current.data).not.toThrow();
			expect(() => result.current.data?.posts[0].title).toThrow();
			expect(() => result.current.data?.pageInfo[0].title).toThrow();
			expect(() => result.current.data?.queriedObject[0].title).toThrow();
			expect(result.current.isMainQuery).toBe(true);
		});

		spyUseFetch.mockRestore();
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
