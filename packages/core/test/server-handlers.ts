import { rest, DefaultRequestBody } from 'msw';

interface TestEndpointResponse {
	ok: boolean;
}

const handlers = [
	rest.get<DefaultRequestBody, TestEndpointResponse>('/test-endpoint', (req, res, ctx) => {
		return res(ctx.json({ ok: true }));
	}),
];

export { handlers };
