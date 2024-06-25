import { queryPost } from '../queryPost';

describe('queryPosts', () => {
	it('fetches posts', async () => {
		const { data } = await queryPost({
			routeParams: {
				path: ['2020', '05', '07', 'modi-qui-dignissimos-sed-assumenda-sint-iusto'],
			},
			params: {
				matchCurrentPath: false,
			},
		});

		expect(data.post.slug).toBe('modi-qui-dignissimos-sed-assumenda-sint-iusto');
	});
});
