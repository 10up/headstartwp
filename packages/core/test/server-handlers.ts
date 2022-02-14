import { rest, DefaultRequestBody } from 'msw';
import postBySlug from './__fixtures__/posts/posts-slug.json';

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

		// simulate a not found search
		if (search === 'not-found') {
			return res(ctx.json({ data: [], status: 400 }));
		}
		return res(ctx.json(postBySlug));
	}),
];

export { handlers };
