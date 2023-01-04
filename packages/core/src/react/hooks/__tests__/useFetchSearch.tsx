import { renderHook, waitFor } from '@testing-library/react';
import * as React from 'react';
import { setHeadlessConfig } from '../../../../test/utils';
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

		waitFor(() => {
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

		waitFor(() => {
			expect(result.current.data?.posts.length).toBe(2);
			expect(result.current.data?.queriedObject.search?.subtype).toBe('post');
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('ipsum');
		});
	});

	it('reads param from the url and sets isMainQuery flag', async () => {
		let { result } = renderHook(() => useFetchSearch({}, {}, '/ipsum'), {
			wrapper,
		});

		waitFor(() => {
			expect(result.current.error).toBeFalsy();
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('ipsum');
			expect(result.current.isMainQuery).toBe(true);
		});

		({ result } = renderHook(() => useFetchSearch({ search: 'lorem' }), {
			wrapper,
		}));

		waitFor(() => {
			expect(result.current.error).toBeFalsy();
			expect(result.current.data?.queriedObject.search?.searchedValue).toBe('lorem');
			expect(result.current.isMainQuery).toBe(false);
		});
	});
});
