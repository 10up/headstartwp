import { PostsArchiveFetchStrategy } from '../PostsArchiveFetchStrategy';

describe('PostsArchiveFetchStrategy', () => {
	const fetchStrategy = new PostsArchiveFetchStrategy();

	fetchStrategy.setBaseURL('http:://example.com');
	fetchStrategy.setEndpoint('/wp-json/wp/v2/posts');

	it('parses the url properly', async () => {
		// category archives
		expect(fetchStrategy.getParamsFromURL({ args: ['category', 'cat-test'] })).toEqual({
			category: 'cat-test',
		});

		// tag archives
		expect(fetchStrategy.getParamsFromURL({ args: ['tag', 'tag-test'] })).toEqual({
			tag: 'tag-test',
		});

		// doesn't match anything
		expect(
			fetchStrategy.getParamsFromURL({ args: ['category', 'cat-test', 'tag', 'tag-test'] }),
		).toEqual({});

		// date archives
		expect(fetchStrategy.getParamsFromURL({ args: ['2021'] })).toEqual({
			year: '2021',
		});

		expect(fetchStrategy.getParamsFromURL({ args: ['2021', '10'] })).toEqual({
			year: '2021',
			month: '10',
		});

		expect(fetchStrategy.getParamsFromURL({ args: ['2021', '10', '30'] })).toEqual({
			year: '2021',
			month: '10',
			day: '30',
		});

		// pagination
		expect(fetchStrategy.getParamsFromURL({ args: ['page', '1'] })).toEqual({
			page: '1',
		});

		expect(fetchStrategy.getParamsFromURL({ args: ['page', '10'] })).toEqual({
			page: '10',
		});
	});
});
