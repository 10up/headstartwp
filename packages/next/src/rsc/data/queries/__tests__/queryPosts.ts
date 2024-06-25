import { queryPosts } from '../queryPosts';

describe('queryPosts', () => {
	it('fetches posts', async () => {
		const { data } = await queryPosts({
			params: {
				per_page: 2,
			},
		});

		expect(data.posts).toHaveLength(2);
	});
});
