import { expectTypeOf } from 'expect-type';
import { AppEntity, EndpointParams } from '../../../data';
import { useFetchAppSettings } from '../useFetchAppSettings';

describe('useFetchAppSettings types', () => {
	it('allows overriding types', () => {
		interface MyAppEntity extends AppEntity {
			myCustomSetting: string;
		}

		interface Params extends EndpointParams {
			includeCustomSettings: boolean;
		}

		expectTypeOf(
			useFetchAppSettings<MyAppEntity, Params>({ includeCustomSettings: true }).data,
		).toMatchTypeOf<
			| {
					myCustomSetting: string;
			  }
			| undefined
		>();
	});
});
