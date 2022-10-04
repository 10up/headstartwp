import { rest, DefaultRequestBody } from 'msw';
import posts from './__fixtures__/posts/posts.json';

interface TestEndpointResponse {
	ok: boolean;
}

const handlers = [
	rest.get<DefaultRequestBody, TestEndpointResponse>(/\/test-endpoint/, (req, res, ctx) => {
		return res(ctx.json({ ok: true }));
	}),

	rest.get('/wp-json/wp/v2/posts', (req, res, ctx) => {
		const query = req.url.searchParams;
		const search = query.get('search');
		const slug = query.get('slug');

		let results = [...posts];

		// simulate a not found search
		if (search === 'not-found') {
			return res(ctx.json({ data: [], status: 400 }));
		}

		if (slug && slug.length > 0) {
			results = results.filter((post) => post.slug === slug);
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
			results = results.filter((post) => post.id === id);
		}

		return res(ctx.json(results));
	}),

	rest.get('/wp-json/wp/v2/posts/:id', (req, res, ctx) => {
		let results = [...posts];
		const id = Number(req.params.id);

		if (id) {
			results = results.filter((post) => post.id === id);
		}

		// harcode 57 as a draft post
		if (id === 57 && !req.headers.has('Authorization')) {
			return res(ctx.json({ code: 'rest_unauthorized', data: { status: 500 } }));
		}

		return res(ctx.json(results));
	}),
];

export { handlers };
