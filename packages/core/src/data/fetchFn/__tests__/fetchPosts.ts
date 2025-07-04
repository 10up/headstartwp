import { expectTypeOf } from 'expect-type';

import { PostEntity, PostsArchiveParams, fetchPosts } from '../..';
import { setHeadstartWPConfig } from '../../../utils';

describe('fetchPosts', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sourceUrl: 'https://js1.10up.com',
			useWordPressPlugin: true,
		});
	});

	it('fetches data properly', async () => {
		const { data } = await fetchPosts({ params: { per_page: 2 } });

		expect(data.posts).toHaveLength(2);
	});

	it('returns queried object for category archives', async () => {
		const { data, pageType } = await fetchPosts({
			params: { category: 'uncategorized', per_page: 1 },
		});

		expect(data.posts).toHaveLength(1);
		expect(data.queriedObject.term?.slug).toBe('uncategorized');
		expect(pageType.isAuthorArchive).toBe(false);
		expect(pageType.isCategoryArchive).toBe(true);
		expect(pageType.isSearch).toBe(false);
		expect(pageType.isTaxonomyArchive).toBe(true);
		expect(pageType.isTagArchive).toBe(false);
	});

	it('returns queried objects for utf8 encoded slugs', async () => {
		const { data } = await fetchPosts({ params: { category: 'الأخبار-المالية', per_page: 1 } });

		expect(data.posts).toHaveLength(1);
		expect(data.queriedObject.term?.slug).toBe('الأخبار-المالية');
	});

	it('returns queried object for author archives', async () => {
		const { data, pageType } = await fetchPosts({ params: { author: 'jane', per_page: 1 } });

		expect(data.posts).toHaveLength(1);
		expect(data.queriedObject.author?.slug).toBe('jane');
		expect(pageType.isAuthorArchive).toBe(true);
		expect(pageType.isCategoryArchive).toBe(false);
		expect(pageType.isSearch).toBe(false);
		expect(pageType.isTaxonomyArchive).toBe(false);
		expect(pageType.isTagArchive).toBe(false);
	});

	it('returns queried object when querying by id', async () => {
		const { data } = await fetchPosts({ params: { author: 3 } });

		expect(data?.queriedObject.author?.id).toBe(3);
		expect(data?.queriedObject.author?.slug).toBe('jane');

		const result2 = await fetchPosts({ params: { category: 5 } });

		expect(result2.data.queriedObject.term?.id).toBe(5);
		expect(result2.data.queriedObject.term?.slug).toBe('news');
	});

	it('does not throw error if throwIfNotFound is passed', async () => {
		const { data } = await fetchPosts({
			params: { category: 'random category that does not exist' },
			options: {
				throwIfNotFound: false,
			},
		});

		expect(data).toMatchObject({
			posts: [],
		});
	});

	it('reads param from the url and sets isMainQuery flag', async () => {
		let result = await fetchPosts({ path: '/author/jane' });

		expect(result.data.queriedObject.author?.slug).toBe('jane');
		expect(result.isMainQuery).toBe(true);

		result = await fetchPosts({ params: { author: 'jane' } });

		expect(result.data.queriedObject.author?.slug).toBe('jane');
		expect(result.isMainQuery).toBe(false);

		result = await fetchPosts({ params: { taxonomy: 'category' }, path: '/news' });

		expect(result.data.queriedObject.term?.slug).toBe('news');
		expect(result.isMainQuery).toBe(true);
	});

	it('works with nested taxonomy', async () => {
		const { data, isMainQuery } = await fetchPosts({
			path: '/parent-category/news',
			params: { taxonomy: 'category' },
		});

		expect(data.queriedObject.term?.slug).toBe('news');
		expect(isMainQuery).toBe(true);
	});

	it('does not crash when not found but throwIfNotFound is set to false', async () => {
		const { data } = await fetchPosts({
			path: '/i-do-not-exist',
			params: { taxonomy: 'category' },
			options: {
				throwIfNotFound: false,
			},
		});

		expect(data.posts).toHaveLength(0);
	});

	it('does not crash when invalid page param when throwIfNotFound is set to false', async () => {
		const { data } = await fetchPosts({
			path: '/news/page/10',
			params: { taxonomy: 'category' },
			options: {
				throwIfNotFound: false,
			},
		});

		expect(data.posts).toHaveLength(0);
	});

	it('throws params.matchArchivepath is true and path does not match', async () => {
		await expect(
			fetchPosts({
				path: '/category/asdasd/uncategorized',
				params: { category: 'uncategorized', per_page: 1, matchArchivePath: true },
			}),
		).rejects.toThrow(
			`Posts were found but did not match current path: "/category/asdasd/uncategorized"`,
		);
	});

	it('throws matchArchivepath config option is true and path does not match', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'https://js1.10up.com',
			useWordPressPlugin: true,
			customTaxonomies: (defaultTaxonomies) => {
				return defaultTaxonomies.map((taxonomy) => ({
					...taxonomy,
					matchArchivePath: true,
				}));
			},
		});

		await expect(
			fetchPosts({
				path: '/category/asdasd/uncategorized',
				params: { category: 'uncategorized', per_page: 2 },
			}),
		).rejects.toThrow(
			`Posts were found but did not match current path: "/category/asdasd/uncategorized"`,
		);
	});

	it('does not throws when matchArchivepath config option is true and path matches', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'https://js1.10up.com',
			useWordPressPlugin: true,
			customTaxonomies: (defaultTaxonomies) => {
				return defaultTaxonomies.map((taxonomy) => ({
					...taxonomy,
					matchArchivePath: true,
				}));
			},
		});

		const { data } = await fetchPosts({
			path: '/category/uncategorized',
			params: {
				category: 'uncategorized',
				per_page: 1,
			},
		});

		expect(data.queriedObject.term?.slug).toBe('uncategorized');
	});
});

describe('fetcPosts types', () => {
	it('allows overriding types', async () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		const { data } = await fetchPosts<Book, BookParams>({ params: { isbn: 'sdasd' } });

		expectTypeOf(data?.posts).toMatchTypeOf<
			| Array<{
					isbn: string;
			  }>
			| undefined
		>();
	});
});
