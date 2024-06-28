import { setHeadstartWPConfig } from '@headstartwp/core';
import { queryPosts } from '../queryPosts';

describe('queryPosts', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			useWordPressPlugin: true,
		});
	});

	afterAll(() => {
		setHeadstartWPConfig({
			useWordPressPlugin: false,
		});
	});

	it('fetches posts', async () => {
		const { data } = await queryPosts({
			params: {
				per_page: 2,
			},
		});

		expect(data.posts).toHaveLength(2);
	});

	it('issues not found', async () => {
		await expect(
			queryPosts({
				routeParams: {
					path: ['category', 'not-found-category'],
				},
			}),
		).rejects.toThrow();
	});

	it('does not issue not found if throwIfNotFound is false', async () => {
		const { data } = await queryPosts({
			routeParams: {
				path: ['not-found-category'],
			},
			params: {
				taxonomy: 'category',
			},
			options: {
				throwIfNotFound: false,
			},
		});

		expect(data.posts).toHaveLength(0);
	});
});
