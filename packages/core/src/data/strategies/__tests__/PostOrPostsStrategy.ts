import merge from 'deepmerge';
import { setHeadstartWPConfig } from '../../../utils';
import { PostOrPostsFetchStrategy, PostOrPostsParams } from '../PostOrPostsFetchStrategy';
import { PostEntity } from '../../types';

describe('PostOrPostsFetchStrategy', () => {
	let fetchStrategy: PostOrPostsFetchStrategy;

	beforeEach(() => {
		fetchStrategy = new PostOrPostsFetchStrategy('');
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

	it('fetches the proper resource with archive priority', async () => {
		setHeadstartWPConfig({
			sourceUrl: '',
			useWordPressPlugin: true,
		});

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
			// 5 is the id of the uncategorized category
			expect(post.categories?.flat()).toContain(1);
		});
	});

	it('fetches the proper resource with single priority', async () => {
		setHeadstartWPConfig({
			sourceUrl: '',
			useWordPressPlugin: true,
		});

		const params = fetchStrategy.getParamsFromURL('/');
		const response = await fetchStrategy.fetcher('', merge(params, { priority: 'single' }));
		expect(response.result.isArchive).toBeTruthy();
	});
});
