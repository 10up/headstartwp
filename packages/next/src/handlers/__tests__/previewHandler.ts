import { createMocks } from 'node-mocks-http';
import { DRAFT_POST_ID, VALID_AUTH_TOKEN } from '@headstartwp/core/test';
import { removeSourceUrl, setHeadstartWPConfig } from '@headstartwp/core';
import { NextApiRequest, NextApiResponse } from 'next';
import { previewHandler } from '../previewHandler';

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('previewHandler', () => {
	beforeAll(() => {
		setHeadstartWPConfig(config);
	});

	it('does not accepts POST requests', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			query: {},
		});

		await previewHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Invalid method' });
	});

	it('rejects requests missing params', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: 1 },
		});

		await previewHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Missing required params' });
	});

	it('fails if a valid auth token is not provided', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: 'test', post_type: 'post' },
		});

		await previewHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(res._getData()).toBe('Sorry, you are not allowed to view this post.');
	});

	it('works if a valid auth token is provided', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res);

		expect(res.setPreviewData).toHaveBeenCalled();
		expect(res._getStatusCode()).toBe(302);
		expect(res._getRedirectUrl()).toBe(
			'/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
		);
	});

	it('sets preview cookie path', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res);

		expect(res.setPreviewData).toHaveBeenCalledWith(
			{
				authToken: 'this is a valid auth',
				id: 57,
				postType: 'post',
				revision: false,
			},
			{ maxAge: 300, path: '/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true' },
		);
		expect(res._getStatusCode()).toBe(302);
		expect(res._getRedirectUrl()).toBe(
			'/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
		);
	});

	it('preview works for custom post types', async () => {
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

		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: {
				post_id: DRAFT_POST_ID,
				token: VALID_AUTH_TOKEN,
				post_type: 'book',
			},
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res);

		expect(res.setPreviewData).toHaveBeenCalledWith(
			{
				authToken: 'this is a valid auth',
				id: 57,
				postType: 'book',
				revision: false,
			},
			{
				maxAge: 300,
				path: '/book/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
			},
		);
		expect(res._getStatusCode()).toBe(302);
		expect(res._getRedirectUrl()).toBe(
			'/book/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
		);

		const { req: reqWithLocale, res: resWithLocale } = createMocks<
			NextApiRequest,
			NextApiResponse
		>({
			method: 'GET',
			query: {
				post_id: DRAFT_POST_ID,
				token: VALID_AUTH_TOKEN,
				post_type: 'book',
				locale: 'es',
			},
		});

		resWithLocale.setPreviewData = jest.fn();
		await previewHandler(reqWithLocale, resWithLocale);

		expect(resWithLocale.setPreviewData).toHaveBeenCalledWith(
			{
				authToken: 'this is a valid auth',
				id: 57,
				postType: 'book',
				revision: false,
			},
			{
				maxAge: 300,
				path: '/es/book/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
			},
		);
		expect(resWithLocale._getStatusCode()).toBe(302);
		expect(resWithLocale._getRedirectUrl()).toBe(
			'/es/book/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
		);
	});

	it('sets preview cookie path with locale', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: {
				post_id: DRAFT_POST_ID,
				token: VALID_AUTH_TOKEN,
				post_type: 'post',
				locale: 'es',
			},
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res);

		expect(res.setPreviewData).toHaveBeenCalledWith(
			{
				authToken: 'this is a valid auth',
				id: 57,
				postType: 'post',
				revision: false,
			},
			{
				maxAge: 300,
				path: '/es/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
			},
		);
		expect(res._getStatusCode()).toBe(302);
		expect(res._getRedirectUrl()).toBe(
			'/es/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
		);
	});

	it('set preview cookie path to all paths if onRedirect is passed without getRedirectPath', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res, {
			onRedirect(req, res) {
				return res.redirect('/custom-redirect');
			},
		});

		expect(res.setPreviewData).toHaveBeenCalledWith(
			{
				authToken: 'this is a valid auth',
				id: 57,
				postType: 'post',
				revision: false,
			},
			{ maxAge: 300, path: '/' },
		);
		expect(res._getStatusCode()).toBe(302);
		expect(res._getRedirectUrl()).toBe('/custom-redirect');
	});

	it('set preview cookie path redirectPath if getRedirectPath is passed', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res, {
			getRedirectPath() {
				return '/custom-redirect-path/';
			},
		});

		expect(res.setPreviewData).toHaveBeenCalledWith(
			{
				authToken: 'this is a valid auth',
				id: 57,
				postType: 'post',
				revision: false,
			},
			{ maxAge: 300, path: '/custom-redirect-path-preview=true' },
		);
		expect(res._getStatusCode()).toBe(302);
		expect(res._getRedirectUrl()).toBe('/custom-redirect-path-preview=true');
	});

	it('correctly takes into account `options`', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res, {
			preparePreviewData(req, res, post, previewData) {
				return { ...previewData, myCustomData: true };
			},
			getRedirectPath(defaultRedirectPath) {
				// if user already added the suffix we need to make sure it is not added again
				return `${defaultRedirectPath}-preview=true`;
			},
		});

		expect(res.setPreviewData).toHaveBeenCalledWith(
			{
				authToken: 'this is a valid auth',
				id: 57,
				postType: 'post',
				revision: false,
				myCustomData: true,
			},
			{ maxAge: 300, path: '/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true' },
		);
		expect(res._getRedirectUrl()).toBe(
			'/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true',
		);
	});

	it('fails if post type is not defined', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'recipe' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(res._getData()).toBe(
			'Cannot preview an unknown post type, did you forget to add it to headless.config.js?',
		);
	});

	it('use post.link when preview.usePostLinkForRedirect is true', async () => {
		setHeadstartWPConfig({
			...config,
			preview: { usePostLinkForRedirect: true },
		});

		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res);

		expect(res.setPreviewData).toHaveBeenCalled();
		expect(res._getStatusCode()).toBe(302);

		// instead of manually building the redirect url it should just use what's coming from post.link
		// manually calling removeSourceUrl here bc currently test suite doesn't have any source url set so it can't
		// do link replacement automatically
		expect(
			removeSourceUrl({ link: res._getRedirectUrl(), backendUrl: 'https://js1.10up.com' }),
		).toBe('/2020/05/07/modi-qui-dignissimos-sed-assumenda-sint-iusto-preview=true');
	});

	setHeadstartWPConfig({
		...config,
		preview: { usePostLinkForRedirect: false },
	});
});
