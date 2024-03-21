import { renderHook, waitFor } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import { SWRConfig } from 'swr';
import * as React from 'react';
import { AppEntity, EndpointParams, PageInfo, QueriedObject } from '../../../data';
import { useFetchAppSettings } from '../useFetchAppSettings';
import * as useFetchModule from '../useFetch';
import { mockUseFetchErrorResponse } from '../mocks';
import { SettingsProvider } from '../../provider';

describe('useFetchAppSettings types', () => {
	const wrapper = ({ children }) => {
		return (
			<SWRConfig value={{ provider: () => new Map() }}>
				<SettingsProvider settings={{ sourceUrl: '' }}>{children}</SettingsProvider>
			</SWRConfig>
		);
	};

	it('allows overriding types', () => {
		interface MyAppEntity extends AppEntity {
			myCustomSetting: string;
		}

		interface Params extends EndpointParams {
			includeCustomSettings: boolean;
		}

		const { result } = renderHook(() =>
			useFetchAppSettings<MyAppEntity, Params>({ includeCustomSettings: true }),
		);
		expectTypeOf(result.current.data).toMatchTypeOf<
			| {
					myCustomSetting: string;
			  }
			| undefined
		>();
	});

	it('handles response if has error or there is no data', async () => {
		const spyUseFetch = jest
			.spyOn(useFetchModule, 'useFetch')
			.mockReturnValueOnce(mockUseFetchErrorResponse);
		const { result } = renderHook(() => useFetchAppSettings({ includeCustomSettings: true }));

		const expectedKeys = ['error', 'loading', 'data', 'isMainQuery', 'mutate'];
		const returnedKeys = Object.keys(result.current);
		const missingKeys = returnedKeys.filter((key) => !expectedKeys.includes(key));

		await waitFor(() => {
			expect(missingKeys).toHaveLength(0);
			expect(spyUseFetch).toHaveBeenCalledTimes(1);
			expect(result.current.error).toBe('Not found');
			expect(result.current.loading).toBe(true);
			expect(() => result.current.data).not.toThrow();
			expect(() => result.current.data?.posts).toThrow();
			expect(result.current.isMainQuery).toBe(true);
		});

		spyUseFetch.mockRestore();
	});

	it('mutates data properly', async () => {
		const { result } = renderHook(() => useFetchAppSettings(), { wrapper });

		await waitFor(() => expect(result.current.data?.home.id).toBe(1));

		await waitFor(() => {
			result.current.mutate({
				result: { ...result.current.data, home: { id: 2, slug: 'new-slug' } } as AppEntity,
				pageInfo: result.current.data?.pageInfo as PageInfo,
				queriedObject: result.current.data?.queriedObject as QueriedObject,
			});
		});

		await waitFor(() => {
			expect(result.current.data?.home.id).not.toBe(1);
			expect(result.current.data?.home.id).toBe(2);
			expect(result.current.data?.home.slug).toBe('new-slug');
		});
	});
});
