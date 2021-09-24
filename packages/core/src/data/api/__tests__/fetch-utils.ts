import { apiGet } from '../fetch-utils';

describe('apiGet', () => {
	it('makes a fetch call', async () => {
		const result = await apiGet('/test-endpoint');

		expect(result.json.ok).toBeTruthy();
	});
});
