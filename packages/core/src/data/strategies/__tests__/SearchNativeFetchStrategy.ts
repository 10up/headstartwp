import { SearchNativeFetchStrategy } from '../SearchNativeFetchStrategy';
import { setHeadstartWPConfig } from '../../../utils';

describe('SearchNativeFetchStrategy', () => {
	let fetchStrategy: SearchNativeFetchStrategy;

	beforeEach(() => {
		fetchStrategy = new SearchNativeFetchStrategy();

		setHeadstartWPConfig({});
	});

	it('parse url properly', async () => {
		expect(fetchStrategy.getParamsFromURL('/')).toEqual({});

		expect(fetchStrategy.getParamsFromURL('/searched-term')).toEqual({
			search: 'searched-term',
		});

		expect(fetchStrategy.getParamsFromURL('/searched-term/page/2')).toEqual({
			search: 'searched-term',
			page: '2',
		});
		expect(fetchStrategy.getParamsFromURL('/searched-term/page/2/')).toEqual({
			search: 'searched-term',
			page: '2',
		});
	});

	it('builds the endpoint url properly', () => {
		expect(fetchStrategy.buildEndpointURL({})).toBe('/wp-json/wp/v2/search');
	});

	it('allows overriding default params', () => {
		const defaultParams = { taxonomy: 'genre' };
		const fetcher = new SearchNativeFetchStrategy('http://sourceurl.com', defaultParams);
		expect(fetcher.getDefaultParams()).toMatchObject(defaultParams);
	});
});
