import { rest, DefaultRequestBody } from 'msw';
import { redirect } from './mocks/redirect';
import posts from './__fixtures__/posts/posts.json';
import pages from './__fixtures__/posts/pages.json';

interface TestEndpointResponse {
	ok: boolean;
}

export const VALID_AUTH_TOKEN = 'this is a valid auth';
export const DRAFT_POST_ID = 57;

const handlers = [
	rest.head('http://example.com/redirect-test', (req, res) => {
		return res(redirect('http://example.com/redirected-page', 301));
	}),

	rest.head('http://example.com/infinite-loop', (req, res) => {
		return res(redirect('http://example.com/infinite-loop', 301));
	}),

	rest.head('http://example.com/rsa-blocked-page', (req, res) => {
		return res(redirect('http://example.com/wp-login.php', 301));
	}),

	rest.head('http://example.com/redirect-test-missing-slash', (req, res) => {
		return res(redirect('http://example.com/redirect-test-missing-slash/', 301));
	}),

	rest.head('http://example.com/redirect-test-missing-slash/', (req, res) => {
		return res(redirect('http://example.com/redirect-test-missing-slash', 301));
	}),

	rest.get<DefaultRequestBody, TestEndpointResponse>(/\/test-endpoint/, (req, res, ctx) => {
		return res(ctx.json({ ok: true }));
	}),

	rest.get('/wp-json/wp/v2/categories', (req, res, ctx) => {
		return res(ctx.json({ ok: true }));
	}),

	rest.get('/wp-json/headless-wp/v1/app', (req, res, ctx) => {
		return res(ctx.json({ ok: true }));
	}),

	rest.get('/wp-json/wp/v2/posts', (req, res, ctx) => {
		const query = req.url.searchParams;
		const search = query.get('search');
		const slug = query.get('slug');
		const perPage = Number(query.get('per_page') || 10);
		const page = Number(query.get('page') || 1);
		const category = query.get('categories');
		const author = query.get('author');
		const embed = query.get('_embed');

		let results = [...posts];

		if (!embed) {
			// @ts-expect-error
			results = results.map((post) => ({ ...post, _embedded: {} }));
		}

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

		const totalResults = results.length;

		if ((page - 1) * perPage > totalResults) {
			return res(
				ctx.json({
					code: 'rest_post_invalid_page_number',
					message:
						'The page number requested is larger than the number of pages available.',
					data: {
						status: 400,
					},
				}),
			);
		}

		if (perPage) {
			results = results.slice((page - 1) * perPage, perPage);
		}

		return res(
			ctx.set({
				'x-wp-totalpages': Math.ceil(totalResults / perPage).toString(),
				'x-wp-total': results.length.toString(),
			}),
			ctx.json(results),
		);
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
					title: 'mocked yoast response',
				},
			}),
		);
	}),

	rest.get('/wp-json/wp/v2/posts/:id', (req, res, ctx) => {
		const query = req.url.searchParams;
		const embed = query.get('_embed');

		let results = [...posts];

		if (!embed) {
			// @ts-expect-error
			results = results.map((post) => ({ ...post, _embedded: {} }));
		}
		const id = Number(req.params.id);

		if (id) {
			results = results.filter((post) => post.id === id);
		}

		// hardcode 57 as a draft post
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

	rest.get('/wp-json/wp/v2/search', (req, res, ctx) => {
		const query = req.url.searchParams;
		const search = query.get('search');
		const type = query.get('type') ?? 'post';
		const subtype = query.get('subtype')?.split(',') ?? ['post'];
		const perPage = Number(query.get('per_page') || 10);
		const page = Number(query.get('page') || 1);

		if (type === 'post') {
			let results: typeof posts = [];

			if (subtype.includes('post')) {
				results = [...posts];
			}

			if (subtype.includes('page')) {
				// @ts-expect-error
				results = [...results, ...pages];
			}

			if (search) {
				results = results.filter((p) => {
					return (
						p.title.rendered.toLowerCase().includes(search.toLowerCase()) ||
						p.content.rendered.toLowerCase().includes(search.toLowerCase())
					);
				});
			}

			const totalResults = results.length;

			if ((page - 1) * perPage > totalResults) {
				return res(
					ctx.json({
						code: 'rest_post_invalid_page_number',
						message:
							'The page number requested is larger than the number of pages available.',
						data: {
							status: 400,
						},
					}),
				);
			}

			if (perPage) {
				results = results.slice((page - 1) * perPage, perPage);
			}

			return res(
				ctx.json(
					results.map((r) => {
						const result = {
							id: Number(r.id),
							title: r.title.rendered,
							url: r.link,
							type,
							subtype: r.type,
							_embedded: {
								_self: { ...r },
								author: { ...r._embedded.author },
								/* 'wp:term':
									r.type === 'post'
										? getPostTerms(r as unknown as PostEntity)
										: undefined, */
							},
						};

						return result;
					}),
				),
			);
		}

		return res(ctx.json([]));
	}),
];

export { handlers };
