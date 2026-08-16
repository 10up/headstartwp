import { http, HttpResponse } from 'msw';
import { redirect } from './mocks/redirect';
import posts from './__fixtures__/posts/posts.json';
import pages from './__fixtures__/posts/pages.json';
import categories from './__fixtures__/terms/categories.json';
import tags from './__fixtures__/terms/tags.json';

export const VALID_AUTH_TOKEN = 'this is a valid auth';
export const DRAFT_POST_ID = 57;
export const VALID_REVALIDATE_AUTH_TOKEN = 'this is a valid revalidate auth token';
export const REVALIDATE_PATH = '/revalidate-path';
export const REVALIDATE_POST_ID = 57;

/** msw 2 hands the resolver a real `Request`; the query string comes off its URL. */
const searchParams = (request: Request) => new URL(request.url).searchParams;

/**
 * Both header names are accepted everywhere a bearer token is checked, because the library
 * sends `X-HeadstartWP-Authorization` when a host strips `Authorization`.
 */
const hasBearer = (request: Request, token: string) =>
	request.headers.get('Authorization') === `Bearer ${token}` ||
	request.headers.get('X-HeadstartWP-Authorization') === `Bearer ${token}`;

const handlers = [
	http.head('http://example.com/redirect-test', () =>
		redirect('http://example.com/redirected-page', 301),
	),

	http.head('http://example.com/infinite-loop', () =>
		redirect('http://example.com/infinite-loop', 301),
	),

	http.head('http://example.com/rsa-blocked-page', () =>
		redirect('http://example.com/wp-login.php', 301),
	),

	http.head('http://example.com/redirect-test-missing-slash', () =>
		redirect('http://example.com/redirect-test-missing-slash/', 301),
	),

	http.head('http://example.com/redirect-test-missing-slash/', () =>
		redirect('http://example.com/redirect-test-missing-slash', 301),
	),

	// Cross-domain redirect with same pathname
	http.head('http://example.com/recipe/my-recipe/', () =>
		redirect('https://www.external-domain.com/recipe/my-recipe/', 302),
	),

	// Cross-domain redirect with different pathname
	http.head('http://example.com/old-recipe/', () =>
		redirect('https://www.external-domain.com/new-recipe/', 301),
	),

	http.get(/\/test-endpoint/, () => HttpResponse.json({ ok: true })),

	http.get('https://js1.10up.com/wp-json/wp/v2/categories', () => HttpResponse.json({ ok: true })),

	http.get('https://js1.10up.com/wp-json/headless-wp/v1/app', () =>
		HttpResponse.json({ ok: true, home: { id: 1 } }),
	),

	http.get('https://js1.10up.com/wp-json/wp/v2/posts', ({ request }) => {
		const query = searchParams(request);
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
			return HttpResponse.json({
				code: 'rest_post_invalid_page_number',
				message: 'The page number requested is larger than the number of pages available.',
				data: {
					status: 400,
				},
			});
		}

		if (perPage) {
			results = results.slice((page - 1) * perPage, perPage);
		}

		return HttpResponse.json(results, {
			headers: {
				'x-wp-totalpages': Math.ceil(totalResults / perPage).toString(),
				'x-wp-total': results.length.toString(),
			},
		});
	}),

	http.get('https://js1.10up.com/wp-json/wp/v2/posts/:id/revisions', ({ request, params }) => {
		let results = [...posts];
		const id = Number(params.id);

		// revisions always requires Authorization
		if (
			!request.headers.has('Authorization') ||
			!request.headers.has('X-HeadstartWP-Authorization')
		) {
			return HttpResponse.json({ code: 'rest_unauthorized', data: { status: 500 } });
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

		return HttpResponse.json(results);
	}),

	http.get('https://js1.10up.com/wp-json/yoast/v1/get_head', () =>
		HttpResponse.json({
			html: '',
			json: {
				title: 'mocked yoast response',
			},
		}),
	),

	http.get('https://js1.10up.com/wp-json/wp/v2/posts/:id', ({ request, params }) => {
		const query = searchParams(request);
		const embed = query.get('_embed');

		let results = [...posts];

		if (!embed) {
			// @ts-expect-error
			results = results.map((post) => ({ ...post, _embedded: {} }));
		}
		const id = Number(params.id);

		if (id) {
			results = results.filter((post) => post.id === id);
		}

		// hardcode 57 as a draft post
		if (id === DRAFT_POST_ID) {
			if (hasBearer(request, VALID_AUTH_TOKEN)) {
				return HttpResponse.json(results);
			}

			return HttpResponse.json({
				code: 'rest_cannot_read',
				message: 'Sorry, you are not allowed to view this post.',
				data: {
					status: 401,
				},
			});
		}

		return HttpResponse.json(results);
	}),

	http.get('https://js1.10up.com/wp-json/wp/v2/search', ({ request }) => {
		const query = searchParams(request);
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
				return HttpResponse.json({
					code: 'rest_search_invalid_page_number',
					message:
						'The page number requested is larger than the number of pages available.',
					data: {
						status: 400,
					},
				});
			}

			if (perPage) {
				results = results.slice((page - 1) * perPage, perPage);
			}

			return HttpResponse.json(
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
			);
		}

		if (type === 'term') {
			let results: typeof categories = [];

			if (subtype.includes('category')) {
				results = [...categories];
			}

			if (subtype.includes('post_tag')) {
				// @ts-expect-error
				results = [...results, ...tags];
			}

			if (search) {
				results = results.filter((p) => {
					return (
						p.name.toLowerCase().includes(search.toLowerCase()) ||
						p.description.toLowerCase().includes(search.toLowerCase())
					);
				});
			}

			const totalResults = results.length;

			if ((page - 1) * perPage > totalResults) {
				return HttpResponse.json({
					code: 'rest_search_invalid_page_number',
					message:
						'The page number requested is larger than the number of pages available.',
					data: {
						status: 400,
					},
				});
			}

			if (perPage) {
				results = results.slice((page - 1) * perPage, perPage);
			}

			return HttpResponse.json(
				results.map((r) => {
					const result = {
						id: Number(r.id),
						title: r.name,
						url: r.link,
						type,
						subtype: r.taxonomy,
						_embedded: {
							_self: { ...r },
						},
					};

					return result;
				}),
			);
		}

		return HttpResponse.json([]);
	}),

	http.get('https://js1.10up.com/wp-json/headless-wp/v1/token', ({ request }) => {
		if (hasBearer(request, VALID_REVALIDATE_AUTH_TOKEN)) {
			return HttpResponse.json({ post_id: REVALIDATE_POST_ID, path: REVALIDATE_PATH });
		}

		return HttpResponse.json({
			code: 'rest_cannot_read',
			message: 'Sorry, you are not allowed to do this.',
			data: {
				status: 401,
			},
		});
	}),
];

export { handlers };
