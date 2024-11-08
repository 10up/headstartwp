import { setHeadstartWPConfig } from '../../../utils';
import { PostOrPostsParams } from '../../strategies';
import { PostEntity } from '../../types';
import { fetchPostOrPosts } from '../fetchPostOrPosts';

describe('fetchPostsOrPosts', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sourceUrl: 'https://js1.10up.com',
			useWordPressPlugin: true,
		});
	});

	it('fetches data properly (archive)', async () => {
		// simulate something like /src/pages/blog/[...path].js
		// whhich would supports paths like `/blog/category-name`
		// `/blog/post-name` and even `/blog/category-name/post-name`
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: {},
			priority: 'archive',
			routeMatchStrategy: 'archive',
		};

		const { data, isArchive, isSingle } = await fetchPostOrPosts({
			params: p,
			path: '/uncategorized',
		});

		expect(isArchive).toBe(true);
		expect(isSingle).toBe(false);
		expect(data?.post).toBeUndefined();
		expect(data?.posts?.length).toBeGreaterThan(0);

		(data?.posts as PostEntity[]).forEach((post) => {
			// 1 is the id of the uncategorized category
			expect(post.categories?.flat()).toContain(1);
		});
	});

	it('fetches data properly (single)', async () => {
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: { matchCurrentPath: false },
			priority: 'single',
			routeMatchStrategy: 'both',
		};

		const { data, isArchive, isSingle } = await fetchPostOrPosts({
			params: p,
			path: '/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		});

		expect(isArchive).toBe(false);
		expect(isSingle).toBe(true);
		expect(data?.posts).toBeUndefined();
		expect(data?.post).toBeDefined();
		expect(data?.post?.slug).toBe(
			'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		);
	});
});
