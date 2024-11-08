import { setHeadstartWPConfig } from '@headstartwp/core';
import { NextRequest } from 'next/server';
import {
	REVALIDATE_PATH,
	REVALIDATE_POST_ID,
	VALID_REVALIDATE_AUTH_TOKEN,
} from '@headstartwp/core/test';
import nextCache from 'next/cache';
import { revalidateRouteHandler } from '../revalidateRouterHandler';

jest.mock('next/cache', () => ({
	revalidatePath: jest.fn(),
}));

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

	it('revalidates with auth token', async () => {
		const searchParams = new URLSearchParams({
			post_id: REVALIDATE_POST_ID.toString(),
			token: VALID_REVALIDATE_AUTH_TOKEN.toString(),
			path: REVALIDATE_PATH,
		});

		const req = new NextRequest(`https://js1.10up.com?${searchParams.toString()}`);

		const res = await revalidateRouteHandler(req);

		expect(res.status).toBe(200);
		expect(nextCache.revalidatePath).toHaveBeenCalledWith(REVALIDATE_PATH);
	});

	it('does not revalidates without auth token', async () => {
		// @ts-expect-error
		nextCache.revalidatePath.mockClear();
		const searchParams = new URLSearchParams({
			post_id: REVALIDATE_POST_ID.toString(),
			token: 'invalid token',
			path: REVALIDATE_PATH,
		});

		const req = new NextRequest(`https://js1.10up.com?${searchParams.toString()}`);

		const res = await revalidateRouteHandler(req);

		expect(res.status).toBe(500);
		expect(nextCache.revalidatePath).not.toHaveBeenCalledWith(REVALIDATE_PATH);
	});
});
