import { TaxonomyTermsStrategy } from '../TaxonomyTermsStrategy';
import { apiGet } from '../../api';
import { setHeadlessConfig } from '../../../utils';

jest.mock('../../api');

const apiGetMock = jest.mocked(apiGet);

describe('TaxonomyTermsStrategy', () => {
	let fetchStrategy: TaxonomyTermsStrategy;

	beforeEach(() => {
		fetchStrategy = new TaxonomyTermsStrategy();

		setHeadlessConfig({});
		apiGetMock.mockReset();
		apiGetMock.mockClear();
	});

	it('does not parse anything from url', async () => {
		expect(fetchStrategy.getParamsFromURL('/')).toEqual({});

		expect(fetchStrategy.getParamsFromURL('/tag/tag-test')).toEqual({});

		expect(fetchStrategy.getParamsFromURL('/category/cat-test/tag/tag-test')).toEqual({});
	});

	it('bulds the endpoint url properly', () => {
		// category should not be included directly in the url
		expect(fetchStrategy.buildEndpointURL({ taxonomy: 'category' })).toBe(
			'/wp-json/wp/v2/categories',
		);

		// first test that it throws if it's an unkown taxonomy
		expect(() => fetchStrategy.buildEndpointURL({ taxonomy: 'book' })).toThrow(
			'Unkown taxonomy, did you forget to add it to headless.config.js?',
		);

		setHeadlessConfig({
			customTaxonomies: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
				},
			],
		});

		expect(fetchStrategy.buildEndpointURL({ taxonomy: 'book' })).toBe('/wp-json/wp/v2/book');
	});

	it('allows overriding default params', () => {
		const defaultParams = { taxonomy: 'genre' };
		const fetcher = new TaxonomyTermsStrategy('http://sourceurl.com', defaultParams);
		expect(fetcher.getDefaultParams()).toMatchObject(defaultParams);
	});
});
