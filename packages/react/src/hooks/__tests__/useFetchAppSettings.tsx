import { renderHook } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import { AppEntity, EndpointParams } from '@headstartwp/core';
import { useFetchAppSettings } from '../useFetchAppSettings';

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
});
