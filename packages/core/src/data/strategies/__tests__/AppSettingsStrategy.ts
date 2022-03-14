import { AppSettingsStrategy } from '../AppSettingsStrategy';

describe('AppSettingsStrategy', () => {
	let fetchStrategy: AppSettingsStrategy;

	beforeEach(() => {
		fetchStrategy = new AppSettingsStrategy();
	});

	it('ever returns any params from the url', async () => {
		expect(fetchStrategy.getParamsFromURL('/modi')).toEqual({});
		expect(fetchStrategy.getParamsFromURL('/modi/page/3')).toEqual({});
		expect(fetchStrategy.getParamsFromURL('/page/3')).toEqual({});
	});
});
