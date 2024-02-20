import { renderHook, waitFor } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import * as React from 'react';

import { SWRConfig } from 'swr';
import { PostSearchEntity, SearchParams, TermSearchEntity } from '../../../data';
import { SettingsProvider } from '../../provider';
import { useFetchSearchNative } from '../useFetchSearchNative';

describe('useFetchSearch', () => {
	const wrapper = ({ children }) => {
		return (
			<SWRConfig value={{ provider: () => new Map() }}>
				<SettingsProvider settings={{ sourceUrl: '' }}>{children}</SettingsProvider>
			</SWRConfig>
		);
	};

	it('returns empty results instead of throwing if not found', async () => {
		const { result } = renderHook(() => useFetchSearchNative({ search: 'not-found' }), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.error).toBeUndefined();
			expect(result.current.loading).toBe(false);
			expect(() => result.current.data).not.toThrow();
			expect(result.current.data?.searchResults.length).toBe(0);
		});
	});

	it('no params returns default search', async () => {
		const { result } = renderHook(() => useFetchSearchNative({ per_page: 5 }), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.error).toBeUndefined();
			expect(result.current.loading).toBe(false);
			expect(() => result.current.data).not.toThrow();
			expect(result.current.data?.searchResults.length).toBe(5);
		});
	});

	it('fetches data properly', async () => {
		const { result } = renderHook(
			() =>
				useFetchSearchNative(
					{ per_page: 2, type: 'post', subtype: 'post,page' },
					{},
					'/Debug',
				),
			{
				wrapper,
			},
		);

		await waitFor(() => {
			expect(result.current.data?.searchResults.length).toBeGreaterThanOrEqual(1);
			expect(result.current.data?.queriedObject.search?.subtype).toBe('post,page');
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('Debug');
		});
	});

	it('reads param from the url and sets isMainQuery flag', async () => {
		let { result } = renderHook(() => useFetchSearchNative({}, {}, '/ipsum'), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.error).toBeFalsy();
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('ipsum');
			expect(result.current.isMainQuery).toBe(true);
		});

		({ result } = renderHook(() => useFetchSearchNative({ search: 'lorem' }), {
			wrapper,
		}));

		await waitFor(() => {
			expect(result.current.error).toBeFalsy();
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('lorem');
			expect(result.current.isMainQuery).toBe(false);
		});
	});

	describe('useFetchNative types', () => {
		it('allows overriding types', () => {
			interface MyPostSearchEntity extends PostSearchEntity {
				custom_field: string;
			}

			interface MySearchParams extends SearchParams {
				custom_field: string;
			}

			type MyPostSearchType = MyPostSearchEntity | TermSearchEntity;

			const { result } = renderHook(() =>
				useFetchSearchNative<MyPostSearchType, MySearchParams>({
					custom_field: 'sdasd',
				}),
			);

			expectTypeOf(result.current.data?.searchResults).toMatchTypeOf<
				| Array<
						| {
								custom_field: string;
						  }
						| TermSearchEntity
				  >
				| undefined
			>();
		});
	});
});
