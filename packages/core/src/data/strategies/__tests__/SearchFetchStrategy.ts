import { SearchFetchStrategy } from '../SearchFetchStrategy';

describe('SearchFetchStrategy', () => {
	const fetchStrategy = new SearchFetchStrategy();

	fetchStrategy.setBaseURL('http:://example.com');
	fetchStrategy.setEndpoint('/wp-json/wp/v2/search');

	it('parses the url properly', async () => {
		// search type
		expect(fetchStrategy.getParamsFromURL({ path: ['search', 'modi'] })).toEqual({
			search: 'modi',
		});

		// search pagination
		expect(fetchStrategy.getParamsFromURL({ path: ['search', 'modi', 'page', '3'] })).toEqual({
			search: 'modi',
			page: '3',
		});

		// doesn't match anything
		expect(fetchStrategy.getParamsFromURL({ path: ['page', '3'] })).toEqual({});
	});
});
