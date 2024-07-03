import { NextRequest } from 'next/server';
import { previewRouteHandler } from '../previewRouteHandler';

describe('previewRouteHandler', () => {
	it.skip('does not accepts POST requests', async () => {
		const req = new NextRequest('http://test.com', {
			method: 'POST',
			body: JSON.stringify({}),
		});

		const res = await previewRouteHandler(req);

		expect(res.status).toBe(401);
	});
});
