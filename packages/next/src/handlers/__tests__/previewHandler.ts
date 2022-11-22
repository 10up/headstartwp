import { createMocks } from 'node-mocks-http';
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
});
