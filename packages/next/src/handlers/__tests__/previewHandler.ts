import { createMocks } from 'node-mocks-http';
import { DRAFT_POST_ID, VALID_AUTH_TOKEN } from '@10up/headless-core/test';
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
		expect(res._getData()).toEqual('Sorry, you are not allowed to view this post.');
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
});
