import { setHeadstartWPConfig, type AppEntity, type EndpointParams } from '@headstartwp/core';
import { expectTypeOf } from 'expect-type';
import { renderHook } from '@testing-library/react';
import { useAppSettings } from '../useAppSettings';

describe('useAppSettings types', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sourceUrl: 'https://js1.10up.com',
			useWordPressPlugin: true,
		});
	});

	it('allows overriding types', () => {
		interface MyAppEntity extends AppEntity {
			myCustomSetting: string;
		}

		interface Params extends EndpointParams {
			includeCustomSettings: boolean;
		}

		const { result } = renderHook(() =>
			useAppSettings<MyAppEntity, Params>({ includeCustomSettings: true }),
		);

		expectTypeOf(result.current.data).toMatchTypeOf<
			| {
					myCustomSetting: string;
			  }
			| undefined
		>();
	});
});
