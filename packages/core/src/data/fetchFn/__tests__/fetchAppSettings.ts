import { expectTypeOf } from 'expect-type';
import { AppEntity, EndpointParams } from '../..';
import { fetchAppSettings } from '../fetchAppSettings';
import { setHeadstartWPConfig } from '../../../utils';

describe('fetchAppSettings', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sourceUrl: 'https://js1.10up.com',
			useWordPressPlugin: true,
		});
	});

	it('allows overriding types', async () => {
		interface MyAppEntity extends AppEntity {
			myCustomSetting: string;
		}

		interface Params extends EndpointParams {
			includeCustomSettings: boolean;
		}

		const { data } = await fetchAppSettings<MyAppEntity, Params>({
			params: {
				includeCustomSettings: true,
			},
		});

		expectTypeOf(data).toMatchTypeOf<
			| {
					myCustomSetting: string;
			  }
			| undefined
		>();
	});
});
