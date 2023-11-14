import { renderHook, waitFor } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import { AppEntity, EndpointParams } from '../../../data';
import { useFetchAppSettings } from '../useFetchAppSettings';
import * as useFetchModule from '../useFetch';
import { mockUseFetchErrorResponse } from '../mocks';

describe('useFetchAppSettings types', () => {
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

		const expectedKeys = ['error', 'loading', 'data', 'isMainQuery'];
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
});
