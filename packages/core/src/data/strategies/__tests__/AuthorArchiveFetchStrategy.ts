import { AuthorArchiveFetchStrategy } from '../AuthorArchiveFetchStrategy';

describe('SearchFetchStrategy', () => {
	let fetchStrategy: AuthorArchiveFetchStrategy;

	beforeEach(() => {
		fetchStrategy = new AuthorArchiveFetchStrategy();
	});

	it('parses the url properly', async () => {
		// author
		expect(fetchStrategy.getParamsFromURL('/author-name')).toEqual({
			author: 'author-name',
		});

		// author pagination
		expect(fetchStrategy.getParamsFromURL('/author-name/page/3')).toEqual({
			author: 'author-name',
			page: '3',
		});

		// doesn't match anything
		expect(fetchStrategy.getParamsFromURL('/page/3')).toEqual({});

		// taxonomies
		expect(fetchStrategy.getParamsFromURL('/author-name/category/category-name')).toEqual({
			author: 'author-name',
			category: 'category-name',
		});

		expect(
			fetchStrategy.getParamsFromURL('/author-name/category/category-name/page/3'),
		).toEqual({
			author: 'author-name',
			category: 'category-name',
			page: '3',
		});
	});
});
