import { rest, DefaultRequestBody } from 'msw';
import postBySlug from './__fixtures__/posts/posts-slug.json';

interface TestEndpointResponse {
	ok: boolean;
}

const handlers = [
	rest.get<DefaultRequestBody, TestEndpointResponse>(/\/test-endpoint/, (req, res, ctx) => {
		return res(ctx.json({ ok: true }));
	}),

	rest.get(/\/wp-json\/wp\/v2\/posts/, (req, res, ctx) => {
		return res(ctx.json(postBySlug));
	}),
];

export { handlers };
