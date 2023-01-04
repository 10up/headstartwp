import { createMocks } from 'node-mocks-http';
import { revalidateHandler } from '../revalidateHandler';

describe('revalidateHandler', () => {
	it('does not accepts POST requests', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			query: {},
		});

		await revalidateHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Invalid method' });
	});

	it('rejects requests missing params', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: { post_id: 1 },
		});

		await revalidateHandler(req, res);

		expect(res._getStatusCode()).toBe(401);
		expect(JSON.parse(res._getData())).toMatchObject({ message: 'Missing required params' });
	});
});
