import { setHeadstartWPConfig } from '@headstartwp/core';
import { NextRequest } from 'next/server';
import { revalidateRouteHandler } from '../revalidateRouterHandler';

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('revalidateRouteHandler', () => {
	beforeAll(() => {
		setHeadstartWPConfig(config);
	});

	it('does not accepts POST requests', async () => {
		const req = new NextRequest('http://test.com', {
			method: 'POST',
			body: JSON.stringify({}),
		});

		const res = await revalidateRouteHandler(req);

		expect(res.status).toBe(401);
	});

	it('does not accepts invalid params', async () => {
		const req = new NextRequest('http://test.com');

		const res = await revalidateRouteHandler(req);

		expect(res.status).toBe(401);
	});
});
