import type { AppEntity, EndpointParams } from '@10up/headless-core';
import { expectTypeOf } from 'expect-type';
import { useAppSettings } from '../useAppSettings';

describe('useAppSettings types', () => {
	it('allows overriding types', () => {
		interface MyAppEntity extends AppEntity {
			myCustomSetting: string;
		}

		interface Params extends EndpointParams {
			includeCustomSettings: boolean;
		}

		expectTypeOf(
			useAppSettings<MyAppEntity, Params>({ includeCustomSettings: true }).data,
		).toMatchTypeOf<
			| {
					myCustomSetting: string;
			  }
			| undefined
		>();
	});
});
