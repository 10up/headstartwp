import { expectTypeOf } from 'expect-type';
import { PostParams } from '../..';
import { DRAFT_POST_ID, VALID_AUTH_TOKEN } from '../../../../test/server-handlers';
import { PostEntity } from '../../types';
import { fetchPost } from '../fetchPost';

describe('fetchPost', () => {
	it('fetches data properly', async () => {
		const { data } = await fetchPost({
			params: { slug: 'modi-qui-dignissimos-sed-assumenda-sint-iusto' },
		});

		expect(data.post.slug).toBe('modi-qui-dignissimos-sed-assumenda-sint-iusto');
	});

	it('fetch by id', async () => {
		const { data } = await fetchPost({ params: { id: 64 } });

		expect(data.post.id).toBe(64);
		expect(data.post.slug).toBe('ipsum-repudiandae-est-nam');
	});

	it('throws error if not found', async () => {
		await expect(fetchPost({ params: { id: 123123123 } })).rejects.toThrow();
	});

	it('errors if fetches draft posts without authToken', async () => {
		await expect(fetchPost({ params: { id: DRAFT_POST_ID } })).rejects.toThrow();
	});

	it('fetches draft posts with authToken', async () => {
		const { data } = await fetchPost({
			params: { id: DRAFT_POST_ID, authToken: VALID_AUTH_TOKEN },
		});

		expect(data?.post.id).toBe(57);
	});

	it('fetches draft posts with authToken and alternativePreviewAuthorizationHeader', async () => {
		const { data } = await fetchPost({
			params: { id: DRAFT_POST_ID, authToken: VALID_AUTH_TOKEN },
			options: {
				alternativePreviewAuthorizationHeader: true,
			},
		});

		expect(data?.post.id).toBe(57);
	});

	it('errors if fetches revisions without authToken', async () => {
		await expect(
			fetchPost({ params: { id: DRAFT_POST_ID, revision: true } }),
		).rejects.toThrow();
	});

	it('fetches revisions with authToken', async () => {
		const { data } = await fetchPost({
			params: { id: 64, revision: true, authToken: 'Fake Auth Token' },
		});

		expect(data.post.id).toBe(64);
		expect(data.post.slug).toBe('ipsum-repudiandae-est-nam');
		// ensure fields that don't exists in revisions are returned
		expect(data.post.format).toBe('standard');
		expect(data.post?.terms?.category[0]?.slug).toBe('news');
	});

	it('fetches revisions with authToken and alternativePreviewAuthorizationHeader', async () => {
		const { data } = await fetchPost({
			params: {
				id: 64,
				revision: true,
				authToken: 'Fake Auth Token',
			},
			options: {
				alternativePreviewAuthorizationHeader: true,
			},
		});

		expect(data.post.id).toBe(64);
		expect(data.post.slug).toBe('ipsum-repudiandae-est-nam');
		// ensure fields that don't exists in revisions are returned
		expect(data.post.format).toBe('standard');
		expect(data.post?.terms?.category[0]?.slug).toBe('news');
	});

	it('reads param from the url and sets isMainQuery flag', async () => {
		const result = await fetchPost({
			path: '/modi-qui-dignissimos-sed-assumenda-sint-iusto/',
			params: {
				fullPath:
					'https://js1.10up.com/2020/05/07/modi-qui-dignissimos-sed-assumenda-sint-iusto/',
			},
		});

		expect(result.data.post.slug).toBe('modi-qui-dignissimos-sed-assumenda-sint-iusto');
		expect(result.isMainQuery).toBe(true);

		const result2 = await fetchPost({
			params: { slug: 'modi-qui-dignissimos-sed-assumenda-sint-iusto' },
		});

		expect(result2.data.post.slug).toBe('modi-qui-dignissimos-sed-assumenda-sint-iusto');
		expect(result2.isMainQuery).toBe(false);
	});

	it('matches post.link with current path when matchCurrentPath is set', async () => {
		await expect(
			fetchPost({
				path: '/another-path',
				params: {
					slug: 'modi-qui-dignissimos-sed-assumenda-sint-iusto',
					matchCurrentPath: true,
				},
			}),
		).rejects.toThrow();

		const { data } = await fetchPost({
			path: '/another-path',
			params: { slug: 'modi-qui-dignissimos-sed-assumenda-sint-iusto' },
		});

		expect(data.post.slug).toBe('modi-qui-dignissimos-sed-assumenda-sint-iusto');
	});

	it('matches post.link with fullPath when set', async () => {
		const { data } = await fetchPost({
			path: '/modi-qui-dignissimos-sed-assumenda-sint-iusto',
			params: {
				// force post path mapping against this path
				fullPath:
					'https://js1.10up.com/2020/05/07/modi-qui-dignissimos-sed-assumenda-sint-iusto',
			},
		});

		expect(data.post.slug).toBe('modi-qui-dignissimos-sed-assumenda-sint-iusto');
	});
});

describe('fetchPost types', () => {
	it('allows overriding types', async () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostParams {
			isbn: string;
		}

		const { data } = await fetchPost<Book, BookParams>({ params: { isbn: 'sdasd' } });

		expectTypeOf(data.post).toMatchTypeOf<
			| {
					isbn: string;
			  }
			| undefined
		>();
	});
});
