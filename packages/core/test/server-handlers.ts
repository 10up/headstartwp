import { rest, DefaultRequestBody } from 'msw';
import posts from './__fixtures__/posts/posts.json';

interface TestEndpointResponse {
	ok: boolean;
}

export const VALID_AUTH_TOKEN = 'this is a valid auth';
export const DRAFT_POST_ID = 57;

const handlers = [
	rest.get<DefaultRequestBody, TestEndpointResponse>(/\/test-endpoint/, (req, res, ctx) => {
		return res(ctx.json({ ok: true }));
	}),

	rest.get('/wp-json/wp/v2/posts', (req, res, ctx) => {
		const query = req.url.searchParams;
		const search = query.get('search');
		const slug = query.get('slug');
		const perPage = Number(query.get('per_page'));
		const category = query.get('categories');
		const author = query.get('author');

		let results = [...posts];

		if (slug && slug.length > 0) {
			results = results.filter((post) => post.slug === slug);
		}

		if (search) {
			results = results.filter((post) => {
				return (
					post.title.rendered.includes(search) || post.content.rendered.includes(search)
				);
			});
		}

		if (category) {
			results = results.filter((post) => {
				return post._embedded['wp:term'].flat().find((term) => {
					if (!isNaN(category as unknown as number)) {
						return Number(category) === term.id && term.taxonomy === 'category';
					}

					if (typeof category === 'string') {
						return (
							term.taxonomy === 'category' &&
							decodeURIComponent(term.slug) === decodeURIComponent(category)
						);
					}

					return false;
				});
			});
		}

		if (author) {
			results = results.filter((post) => {
				return post._embedded.author.find((a) => {
					if (!isNaN(author as unknown as number)) {
						return a.id === Number(author);
					}

					if (typeof author === 'string') {
						return decodeURIComponent(a.slug) === decodeURIComponent(author);
					}

					return false;
				});
			});
		}

		if (perPage) {
			results = results.slice(0, perPage);
		}

		return res(ctx.json(results));
	}),

	rest.get('/wp-json/wp/v2/posts/:id/revisions', (req, res, ctx) => {
		let results = [...posts];
		const id = Number(req.params.id);

		// revisions always requires Authorization
		if (!req.headers.has('Authorization')) {
			return res(ctx.json({ code: 'rest_unauthorized', data: { status: 500 } }));
		}

		if (id) {
			// @ts-expect-error
			results = results
				.filter((post) => post.id === id)
				.map((revision) => ({
					...revision,
					// these things are not included in revisions
					_embedded: undefined,
					format: undefined,
				}));
		}

		return res(ctx.json(results));
	}),

	rest.get('/wp-json/yoast/v1/get_head', (req, res, ctx) => {
		return res(
			ctx.json({
				html: '',
				json: {
					title: 'mocked yoast respose',
				},
			}),
		);
	}),

	rest.get('/wp-json/wp/v2/posts/:id', (req, res, ctx) => {
		let results = [...posts];
		const id = Number(req.params.id);

		if (id) {
			results = results.filter((post) => post.id === id);
		}

		// harcode 57 as a draft post
		if (id === DRAFT_POST_ID) {
			if (
				req.headers.has('Authorization') &&
				req.headers.get('Authorization') === `Bearer ${VALID_AUTH_TOKEN}`
			) {
				return res(ctx.json(results));
			}

			return res(
				ctx.json({
					code: 'rest_cannot_read',
					message: 'Sorry, you are not allowed to view this post.',
					data: {
						status: 401,
					},
				}),
			);
		}

		return res(ctx.json(results));
	}),
];

export { handlers };
