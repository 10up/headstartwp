import merge from 'deepmerge';
import { NotFoundError, setHeadstartWPConfig } from '../../../utils';
import { PostOrPostsFetchStrategy, PostOrPostsParams } from '../PostOrPostsFetchStrategy';
import { PostEntity } from '../../types';

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('PostOrPostsFetchStrategy', () => {
	let fetchStrategy: PostOrPostsFetchStrategy;

	beforeEach(() => {
		setHeadstartWPConfig(config);
		fetchStrategy = new PostOrPostsFetchStrategy(config.sourceUrl);
	});

	it('returns `@postOrPosts` as the default endpoint', () => {
		expect(fetchStrategy.getDefaultEndpoint()).toBe('@postOrPosts');
	});

	it('parses params', () => {
		// TODO: look into preventing single from treating these urls as single post slugs
		// for known taxonomies
		expect(fetchStrategy.getParamsFromURL('/category/cat-test')).toEqual({
			archive: {
				category: 'cat-test',
			},
			single: {
				slug: 'cat-test',
			},
		});

		// tag archives
		expect(fetchStrategy.getParamsFromURL('/tag/tag-test')).toEqual({
			archive: {
				tag: 'tag-test',
			},
			single: {
				slug: 'tag-test',
			},
		});

		expect(fetchStrategy.getParamsFromURL('/category/cat-test/tag/tag-test')).toEqual({
			archive: {},
			single: {
				slug: 'tag-test',
			},
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10/30')).toEqual({
			archive: {
				year: '2021',
				month: '10',
				day: '30',
			},
			single: {
				slug: '30',
			},
		});

		expect(fetchStrategy.getParamsFromURL('/post-name')).toEqual({
			archive: {},
			single: {
				slug: 'post-name',
			},
		});

		expect(fetchStrategy.getParamsFromURL('/2021/post-name')).toEqual({
			archive: {},
			single: {
				slug: 'post-name',
			},
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10/post-name')).toEqual({
			archive: {},
			single: {
				slug: 'post-name',
			},
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10/30/post-name')).toEqual({
			archive: {},
			single: {
				slug: 'post-name',
			},
		});

		expect(fetchStrategy.getParamsFromURL('/parent/post-name')).toEqual({
			archive: {},
			single: {
				slug: 'post-name',
			},
		});

		expect(fetchStrategy.getParamsFromURL('/2021/10/30/parent/post-name')).toEqual({
			archive: {},
			single: {
				slug: 'post-name',
			},
		});
	});

	it('fetches the proper resource', async () => {
		let params = fetchStrategy.getParamsFromURL('/');
		let response = await fetchStrategy.fetcher('', merge(params, { priority: 'archive' }));
		expect(response.result.isArchive).toBeTruthy();

		// should not match archive if didn't match url
		params = fetchStrategy.getParamsFromURL('/');
		response = await fetchStrategy.fetcher(
			'',
			merge(params, { priority: 'single', routeMatchStrategy: 'archive' }),
		);
		expect(response.result.isArchive).toBeFalsy();

		// simulate something like /src/pages/blog/[...path].js
		// whhich would supports paths like `/blog/category-name`
		// `/blog/post-name` and even `/blog/category-name/post-name`
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: {},
			priority: 'archive',
			routeMatchStrategy: 'archive',
		};
		params = merge(fetchStrategy.getParamsFromURL('/uncategorized', p), p);

		response = await fetchStrategy.fetcher('', params);
		expect(response.result.isArchive).toBeTruthy();
		expect(response.result.data.length).toBeGreaterThan(0);

		(response.result.data as PostEntity[]).forEach((post) => {
			// 1 is the id of the uncategorized category
			expect(post.categories?.flat()).toContain(1);
		});

		// let's skip matching current path for this test
		p.single.matchCurrentPath = false;

		params = merge(
			fetchStrategy.getParamsFromURL(
				'/uncategorized/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				p,
			),
			p,
		);

		response = await fetchStrategy.fetcher('', params);
		expect(response.result.isSingle).toBeTruthy();
		expect((response.result.data as PostEntity).slug).toBe(
			'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		);

		params = merge(
			fetchStrategy.getParamsFromURL(
				'/2020/05/07/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam/',
				p,
			),
			p,
		);

		response = await fetchStrategy.fetcher('', params);
		expect(response.result.isSingle).toBeTruthy();
		expect((response.result.data as PostEntity).slug).toBe(
			'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		);

		// with this set to true it should error out if the path does not match
		p.single.matchCurrentPath = true;

		params = merge(
			fetchStrategy.getParamsFromURL(
				'/uncategorized/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				p,
			),
			p,
		);

		await expect(() => fetchStrategy.fetcher('', params)).rejects.toThrow(
			'Neither single or archive returned data: The request to /wp-json/wp/v2/posts?_embed=true&categories=distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam returned no data, Post #54 - "https://js1.10up.com/2020/05/07/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam/" was found but did not match current path: "/uncategorized/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam"',
		);

		params = merge(
			fetchStrategy.getParamsFromURL(
				'/2020/05/07/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				p,
			),
			p,
		);

		response = await fetchStrategy.fetcher('', params);
		expect(response.result.isSingle).toBeTruthy();
		expect((response.result.data as PostEntity).slug).toBe(
			'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		);
	});

	it('does not match an archive if `routeMatchStrategy` is set to `archive` and url does not match archive', async () => {
		setHeadstartWPConfig({
			sourceUrl: '',
			useWordPressPlugin: true,
		});

		let params = fetchStrategy.getParamsFromURL('/');
		let response = await fetchStrategy.fetcher(
			'',
			merge(params, { priority: 'single', routeMatchStrategy: 'archive' }),
		);
		expect(response.result.isArchive).toBeFalsy();

		params = fetchStrategy.getParamsFromURL('/');
		response = await fetchStrategy.fetcher(
			'',
			merge(params, { priority: 'archive', routeMatchStrategy: 'archive' }),
		);
		expect(response.result.isArchive).toBeFalsy();

		// this will cause a tentative request to fest a post with the random-post-name slug
		// which should throw
		params = fetchStrategy.getParamsFromURL('/random-post-name');
		await expect(
			fetchStrategy.fetcher(
				'',
				merge(params, { priority: 'archive', routeMatchStrategy: 'archive' }),
			),
		).rejects.toThrow();
	});

	it('matches an archive if `routeMatchStrategy` is set to `archive` and url matches archive', async () => {
		setHeadstartWPConfig({
			sourceUrl: '',
			useWordPressPlugin: true,
		});

		const params = fetchStrategy.getParamsFromURL('/page/1');
		const response = await fetchStrategy.fetcher(
			'',
			merge(params, { priority: 'single', routeMatchStrategy: 'archive' }),
		);
		expect(response.result.isArchive).toBeTruthy();
	});

	it('does not match a single if `routeMatchStrategy` is set to `single` and url does not match a single', async () => {
		setHeadstartWPConfig({
			sourceUrl: '',
			useWordPressPlugin: true,
		});

		let params = fetchStrategy.getParamsFromURL('/page/1');
		let response = await fetchStrategy.fetcher(
			'',
			merge(params, { priority: 'single', routeMatchStrategy: 'single' }),
		);
		expect(response.result.isSingle).toBeFalsy();
		expect(response.result.isArchive).toBeTruthy();

		params = fetchStrategy.getParamsFromURL('/page/1');
		response = await fetchStrategy.fetcher(
			'',
			merge(params, { priority: 'archive', routeMatchStrategy: 'single' }),
		);
		expect(response.result.isSingle).toBeFalsy();
		expect(response.result.isArchive).toBeTruthy();

		// this one is matches a single but returns no date so it should fallback to archive
		params = fetchStrategy.getParamsFromURL('/single-post-name');
		response = await fetchStrategy.fetcher(
			'',
			merge(params, { priority: 'archive', routeMatchStrategy: 'single' }),
		);
		expect(response.result.isSingle).toBeFalsy();
		expect(response.result.isArchive).toBeTruthy();
	});

	it('matches a single if `routeMatchStrategy` is set to `single` and url matches a single', async () => {
		setHeadstartWPConfig({
			sourceUrl: '',
			useWordPressPlugin: true,
		});

		const params = { single: { matchCurrentPath: false } };
		const urlParams = fetchStrategy.getParamsFromURL(
			'/2020/05/07/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
			params,
		);

		const response = await fetchStrategy.fetcher(
			'',
			merge(urlParams, {
				priority: 'single',
				routeMatchStrategy: 'single',
			}),
		);

		expect(response.result.isSingle).toBeTruthy();
		expect(response.result.isArchive).toBeFalsy();
		expect((response.result.data as PostEntity).slug).toBe(
			'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		);
	});

	it('throws unmatched route error when unable to match any route', async () => {
		setHeadstartWPConfig({
			sourceUrl: '',
			useWordPressPlugin: true,
		});

		// this one should actually throw a 404 since only single would match
		// and it the single strategy should return a NotFoundError
		let params = fetchStrategy.getParamsFromURL('/2020/05/07/not-found-post');

		await expect(
			fetchStrategy.fetcher(
				'',
				merge(params, {
					priority: 'single',
					routeMatchStrategy: 'both',
				}),
			),
		).rejects.toThrow(NotFoundError);

		params = fetchStrategy.getParamsFromURL('/');

		await expect(
			fetchStrategy.fetcher(
				'',
				merge(params, {
					routeMatchStrategy: 'both',
				}),
			),
		).rejects.toThrow(
			"Unmatched route with routeMatchStrategy 'both': Unable to match a route for either single or archive",
		);
	});

	it('normalizes data for caching', async () => {
		let params = merge(fetchStrategy.getParamsFromURL('/'), { priority: 'single' });
		let response = await fetchStrategy.fetcher('', params);

		let normalizedResponse = fetchStrategy.normalizeForCache(response, params);
		expect(normalizedResponse.additionalCacheObjects?.[0].key).toStrictEqual({
			args: { _embed: true, sourceUrl: config.sourceUrl },
			url: '/wp-json/wp/v2/posts',
		});

		params = merge(
			fetchStrategy.getParamsFromURL(
				'/2020/05/07/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				{ single: { matchCurrentPath: false } },
			),
			{
				single: { matchCurrentPath: false },
				priority: 'single',
			},
		);

		response = await fetchStrategy.fetcher('', params);

		normalizedResponse = fetchStrategy.normalizeForCache(response, params);

		expect(normalizedResponse.additionalCacheObjects?.[0].key).toStrictEqual({
			args: { _embed: true, ...params.single, sourceUrl: config.sourceUrl },
			url: '/wp-json/wp/v2/posts',
		});
	});
});
