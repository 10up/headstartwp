import { PostsArchiveFetchStrategy } from '../PostsArchiveFetchStrategy';

describe('PostsArchiveFetchStrategy', () => {
	const fetchStrategy = new PostsArchiveFetchStrategy();

	fetchStrategy.setBaseURL('http:://example.com');
	fetchStrategy.setEndpoint('/wp-json/wp/v2/posts');

	it('parses the url properly', async () => {
		// category archives
		expect(fetchStrategy.getParamsFromURL({ path: ['category', 'cat-test'] })).toEqual({
			category: 'cat-test',
		});

		// tag archives
		expect(fetchStrategy.getParamsFromURL({ path: ['tag', 'tag-test'] })).toEqual({
			tag: 'tag-test',
		});

		// doesn't match anything
		expect(
			fetchStrategy.getParamsFromURL({ path: ['category', 'cat-test', 'tag', 'tag-test'] }),
		).toEqual({});

		// date archives
		expect(fetchStrategy.getParamsFromURL({ path: ['2021'] })).toEqual({
			year: '2021',
		});

		expect(fetchStrategy.getParamsFromURL({ path: ['2021', '10'] })).toEqual({
			year: '2021',
			month: '10',
		});

		expect(fetchStrategy.getParamsFromURL({ path: ['2021', '10', '30'] })).toEqual({
			year: '2021',
			month: '10',
			day: '30',
		});

		// pagination
		expect(fetchStrategy.getParamsFromURL({ path: ['page', '1'] })).toEqual({
			page: '1',
		});

		expect(fetchStrategy.getParamsFromURL({ path: ['page', '10'] })).toEqual({
			page: '10',
		});
	});
});
