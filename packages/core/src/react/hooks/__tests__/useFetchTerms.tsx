import { renderHook, waitFor } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import { SWRConfig } from 'swr';
import * as React from 'react';
import { TaxonomyArchiveParams, TermEntity } from '../../../data';
import { useFetchTerms } from '../useFetchTerms';
import * as useFetchModule from '../useFetch';
import { mockUseFetchErrorResponse } from '../mocks';
import { setHeadstartWPConfig } from '../../../utils';
import { SettingsProvider } from '../../provider';

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('useFetchTerms types', () => {
	beforeAll(() => {
		setHeadstartWPConfig(config);
	});

	const wrapper = ({ children }) => {
		return (
			<SWRConfig value={{ provider: () => new Map() }}>
				<SettingsProvider settings={config}>{children}</SettingsProvider>
			</SWRConfig>
		);
	};
	it('allows overriding types', () => {
		interface Genre extends TermEntity {
			editor: string;
		}

		interface GenreParams extends TaxonomyArchiveParams {
			editor: string;
		}

		const { result } = renderHook(
			() => useFetchTerms<Genre, GenreParams>({ editor: 'sdasd' }),
			{ wrapper },
		);

		expectTypeOf(result.current.data?.terms).toMatchTypeOf<
			| Array<{
					editor: string;
			  }>
			| undefined
		>();
	});

	it('handles response if has error or there is no data', async () => {
		const spyUseFetch = jest
			.spyOn(useFetchModule, 'useFetch')
			.mockReturnValueOnce(mockUseFetchErrorResponse);
		const { result } = renderHook(() => useFetchTerms({ includeCustomSettings: true }));

		const expectedKeys = ['error', 'loading', 'data', 'isMainQuery', 'mutate'];
		const returnedKeys = Object.keys(result.current);
		const missingKeys = returnedKeys.filter((key) => !expectedKeys.includes(key));

		await waitFor(() => {
			expect(missingKeys).toHaveLength(0);
			expect(spyUseFetch).toHaveBeenCalledTimes(1);
			expect(result.current.error).toBe('Not found');
			expect(result.current.loading).toBe(true);
			expect(() => result.current.data).not.toThrow();
			expect(() => result.current.data?.terms[0].title).toThrow();
			expect(() => result.current.data?.pageInfo[0].title).toThrow();
			expect(result.current.isMainQuery).toBe(true);
		});

		spyUseFetch.mockRestore();
	});
});
