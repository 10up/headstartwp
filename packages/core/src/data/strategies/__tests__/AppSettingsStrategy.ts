import { AppSettingsStrategy } from '../AppSettingsStrategy';

describe('AppSettingsStrategy', () => {
	const fetchStrategy = new AppSettingsStrategy();

	fetchStrategy.setBaseURL('');
	fetchStrategy.setEndpoint('/wp-json/wp/v2/posts');

	it('ever returns any params from the url', async () => {
		expect(fetchStrategy.getParamsFromURL('/modi')).toEqual({});
		expect(fetchStrategy.getParamsFromURL('/modi/page/3')).toEqual({});
		expect(fetchStrategy.getParamsFromURL('/page/3')).toEqual({});
	});
});
