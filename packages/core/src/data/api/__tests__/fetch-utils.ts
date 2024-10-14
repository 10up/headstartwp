import { apiGet } from '../fetch-utils';

describe('apiGet', () => {
	it('makes a fetch call', async () => {
		const result = await apiGet('https://js1.10up.com/test-endpoint');

		expect(result.json.ok).toBeTruthy();
	});
});
