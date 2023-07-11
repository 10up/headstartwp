import { createMocks } from 'node-mocks-http';
import { DRAFT_POST_ID, VALID_AUTH_TOKEN } from '@headstartwp/core/test';
import { previewHandler } from '../previewHandler';

describe('previewHandler', () => {
	it('does not accepts POST requests', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			query: {},
		});

		await previewHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Invalid method' });
	});

	it('rejects requests missing params', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: { post_id: 1 },
		});

		await previewHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Missing required params' });
	});

	it('fails if a valid auth token is not provided', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: 'test', post_type: 'post' },
		});

		await previewHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(res._getData()).toBe('Sorry, you are not allowed to view this post.');
	});

	it('works if a valid auth token is provided', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res);

		expect(res.setPreviewData).toHaveBeenCalled();
		expect(res._getStatusCode()).toBe(302);
	});

	it('sets preview cookie path', async () => {
		const { req, res } = createMocks({
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
	});

	it('set preview cookie path to all paths if onRedirect is passed without getRedirectPath', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res, {
			onRedirect(req, res) {
				return res.redirect('/');
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
	});

	it('set preview cookie path redirectPath if getRedirectPath is passed', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: { post_id: DRAFT_POST_ID, token: VALID_AUTH_TOKEN, post_type: 'post' },
		});

		res.setPreviewData = jest.fn();
		await previewHandler(req, res, {
			getRedirectPath() {
				return '/custom-redirect-path/';
			},
			onRedirect(req, res) {
				return res.redirect('/');
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
	});
});
