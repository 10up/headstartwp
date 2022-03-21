import { AppSettingsStrategy } from '../AppSettingsStrategy';
import { apiGet } from '../../api';

jest.mock('../../api');

const apiGetMock = jest.mocked(apiGet);

describe('AppSettingsStrategy', () => {
	let fetchStrategy: AppSettingsStrategy;

	beforeEach(() => {
		fetchStrategy = new AppSettingsStrategy();
		apiGetMock.mockReset();
		apiGetMock.mockClear();
	});

	it('ever returns any params from the url', async () => {
		expect(fetchStrategy.getParamsFromURL('/modi')).toEqual({ _embed: true });
		expect(fetchStrategy.getParamsFromURL('/modi/page/3')).toEqual({ _embed: true });
		expect(fetchStrategy.getParamsFromURL('/page/3')).toEqual({ _embed: true });
	});

	it('throws error if wp returns a rest_no_route', async () => {
		apiGetMock.mockResolvedValue({ headers: {}, json: { code: 'rest_no_route' } });
		const params = {};
		const url = fetchStrategy.buildEndpointURL(params);
		const results = fetchStrategy.fetcher(url, params);

		await expect(results).rejects.toThrow(
			"You need to install 10up's Headless WordPress plugin.\n WordPress returned a 'rest_no_route' error for the endpoint '/wp-json/headless-wp/v1/app'.",
		);
	});
});
