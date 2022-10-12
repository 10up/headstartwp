import { SearchFetchStrategy } from '../SearchFetchStrategy';

describe('SearchFetchStrategy', () => {
	let fetchStrategy: SearchFetchStrategy;

	beforeEach(() => {
		fetchStrategy = new SearchFetchStrategy();
	});

	it('parses the url properly', async () => {
		// search type
		expect(fetchStrategy.getParamsFromURL('/modi')).toEqual({
			search: 'modi',
		});

		// search pagination
		expect(fetchStrategy.getParamsFromURL('/modi/page/3')).toEqual({
			search: 'modi',
			page: '3',
		});

		// doesn't match anything
		expect(fetchStrategy.getParamsFromURL('/page/3')).toEqual({});
	});

	it('return data properly', async () => {
		const params = fetchStrategy.getParamsFromURL('/ipsum');
		const url = fetchStrategy.buildEndpointURL(params);
		const results = await fetchStrategy.fetcher(url, params);

		// should contain result and pageInfo
		expect(results).toMatchObject({
			result: {},
			pageInfo: {},
		});

		// should contain actual results
		expect(results.result.length).toBeGreaterThan(0);
	});

	it('does not throw 404 error if can not find results', async () => {
		const params = fetchStrategy.getParamsFromURL('/not-found');
		const url = fetchStrategy.buildEndpointURL(params);
		const results = fetchStrategy.fetcher(url, params);

		// asset it does not throw and resolve even if not found
		await expect(results).resolves.toMatchObject({
			result: [],
			pageInfo: {},
		});
	});
});
