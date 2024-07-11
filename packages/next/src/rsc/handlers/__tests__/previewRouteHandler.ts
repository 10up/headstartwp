import nextHeaders from 'next/headers';
import { NextRequest } from 'next/server';
import { setHeadstartWPConfig } from '@headstartwp/core';
import { DRAFT_POST_ID, VALID_AUTH_TOKEN } from '@headstartwp/core/test';
import { redirect } from 'next/navigation';
import { COOKIE_NAME, previewRouteHandler } from '../previewRouteHandler';

jest.mock('next/headers', () => ({
	draftMode: () => ({ isEnabled: false, enable: jest.fn() }),
	cookies: jest.fn(() => ({
		get: jest.fn(),
		has: jest.fn(),
	})),
}));

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('previewRouteHandler', () => {
	beforeEach(() => {
		setHeadstartWPConfig(config);
	});

	it('does not accepts POST requests', async () => {
		const req = new NextRequest('http://test.com', {
			method: 'POST',
			body: JSON.stringify({}),
		});

		const res = await previewRouteHandler(req);

		expect(res.status).toBe(401);
	});

	it('does not accepts invalid params', async () => {
		const req = new NextRequest('http://test.com');

		const res = await previewRouteHandler(req);

		expect(res.status).toBe(401);
	});

	it('fails if a valid auth token is not provided', async () => {
		const searchParams = new URLSearchParams({
			post_id: DRAFT_POST_ID.toString(),
			token: 'test',
			post_type: 'post',
		});

		const req = new NextRequest(`https://js1.10up.com?${searchParams.toString()}`);

		await expect(() => previewRouteHandler(req)).rejects.toThrow(
			'Sorry, you are not allowed to view this post.',
		);
	});

	it('works if a valid auth token is provided', async () => {
		const searchParams = new URLSearchParams({
			post_id: DRAFT_POST_ID.toString(),
			token: VALID_AUTH_TOKEN.toString(),
			post_type: 'post',
		});

		const req = new NextRequest(`https://js1.10up.com?${searchParams.toString()}`);

		const previewDataPayload = JSON.stringify({
			id: DRAFT_POST_ID,
			postType: 'post',
			revision: false,
			authToken: VALID_AUTH_TOKEN,
		});

		// @ts-expect-error
		nextHeaders.cookies.mockReturnValue({
			set: jest.fn(),
			get: jest.fn(() => ({ value: previewDataPayload, name: COOKIE_NAME })),
			has: jest.fn(() => true),
		});

		await expect(() => previewRouteHandler(req)).rejects.toThrow('NEXT_REDIRECT');

		expect(nextHeaders.cookies().set).toHaveBeenCalledWith(COOKIE_NAME, previewDataPayload, {
			httpOnly: true,
			maxAge: 300,
			path: '/modi-qui-dignissimos-sed-assumenda-sint-iusto',
		});
	});

	it('works for custom post types', async () => {
		setHeadstartWPConfig({
			...config,
			customPostTypes: [
				{
					slug: 'book',
					// reuse existing posts endpoint
					endpoint: '/wp-json/wp/v2/posts',
					// these should match your file-system routing
					single: '/book',
					archive: '/books',
				},
			],
		});

		const searchParams = new URLSearchParams({
			post_id: DRAFT_POST_ID.toString(),
			token: VALID_AUTH_TOKEN.toString(),
			post_type: 'book',
		});

		const previewDataPayload = JSON.stringify({
			id: DRAFT_POST_ID,
			postType: 'book',
			revision: false,
			authToken: VALID_AUTH_TOKEN,
		});

		const req = new NextRequest(`https://js1.10up.com?${searchParams.toString()}`);

		await expect(() => previewRouteHandler(req)).rejects.toThrow('NEXT_REDIRECT');
		expect(nextHeaders.cookies().set).toHaveBeenCalledWith(COOKIE_NAME, previewDataPayload, {
			httpOnly: true,
			maxAge: 300,
			path: '/book/modi-qui-dignissimos-sed-assumenda-sint-iusto',
		});
	});

	it('works for custom post types with locale', async () => {
		setHeadstartWPConfig({
			...config,
			customPostTypes: [
				{
					slug: 'book',
					// reuse existing posts endpoint
					endpoint: '/wp-json/wp/v2/posts',
					// these should match your file-system routing
					single: '/book',
					archive: '/books',
				},
			],
		});

		const searchParams = new URLSearchParams({
			post_id: DRAFT_POST_ID.toString(),
			token: VALID_AUTH_TOKEN.toString(),
			post_type: 'book',
			locale: 'es',
		});

		const previewDataPayload = JSON.stringify({
			id: DRAFT_POST_ID,
			postType: 'book',
			revision: false,
			authToken: VALID_AUTH_TOKEN,
		});

		const req = new NextRequest(`https://js1.10up.com?${searchParams.toString()}`);

		await expect(() => previewRouteHandler(req)).rejects.toThrow('NEXT_REDIRECT');

		expect(nextHeaders.cookies().set).toHaveBeenCalledWith(COOKIE_NAME, previewDataPayload, {
			httpOnly: true,
			maxAge: 300,
			path: '/es/book/modi-qui-dignissimos-sed-assumenda-sint-iusto',
		});
	});

	it('correctly takes into account `options`', async () => {
		const searchParams = new URLSearchParams({
			post_id: DRAFT_POST_ID.toString(),
			token: VALID_AUTH_TOKEN.toString(),
			post_type: 'post',
		});

		const req = new NextRequest(`https://js1.10up.com?${searchParams.toString()}`);

		const onRedirect = jest.fn(() => {
			redirect('/');
		});

		await expect(() =>
			previewRouteHandler(req, {
				preparePreviewData({ previewData }) {
					return { ...previewData, myCustomData: true };
				},
				getRedirectPath({ defaultRedirectPath }) {
					return `${defaultRedirectPath}-preview=true`;
				},
				onRedirect,
			}),
		).rejects.toThrow('NEXT_REDIRECT');

		expect(nextHeaders.cookies().set).toHaveBeenCalledWith(
			COOKIE_NAME,
			JSON.stringify({
				id: DRAFT_POST_ID,
				postType: 'post',
				revision: false,
				authToken: VALID_AUTH_TOKEN,
				myCustomData: true,
			}),
			{
				httpOnly: true,
				maxAge: 300,
				path: '/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
			},
		);

		expect(onRedirect).toHaveBeenCalledWith({
			redirectPath: '/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
			post: expect.any(Object),
			postTypeDef: expect.any(Object),
			previewData: expect.any(Object),
			req,
		});
	});
});
