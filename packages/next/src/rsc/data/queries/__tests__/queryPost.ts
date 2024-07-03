import nextHeaders from 'next/headers';
import { DRAFT_POST_ID, VALID_AUTH_TOKEN } from '@headstartwp/core/test';
import { queryPost } from '../queryPost';
import { COOKIE_NAME } from '../../../handlers/previewRouteHandler';

jest.mock('next/headers', () => ({
	draftMode: jest.fn(() => ({ isEnabled: false })),
	cookies: jest.fn(() => ({
		get: jest.fn(),
		has: jest.fn(),
	})),
}));

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

		// should check draft mode
		expect(nextHeaders.draftMode).toHaveBeenCalled();
	});

	it('issues not found', async () => {
		await expect(
			queryPost({
				routeParams: {
					path: ['2020', '05', '07', 'not-found-post'],
				},
			}),
		).rejects.toThrow();
	});

	it('previews post', async () => {
		// set cookies

		// @ts-expect-error
		nextHeaders.draftMode.mockReturnValueOnce({ isEnabled: true });

		const previewDataPayload = JSON.stringify({
			id: DRAFT_POST_ID,
			authToken: VALID_AUTH_TOKEN,
			revision: false,
			postType: 'post',
		});

		// @ts-expect-error
		nextHeaders.cookies.mockReturnValue({
			get: jest.fn(() => ({ value: previewDataPayload, name: COOKIE_NAME })),
			has: jest.fn(() => true),
		});

		// when draft mode is enabled, the query should return the draft post based on the preview payload, i.e the id in the preview cookie
		const { data } = await queryPost({
			routeParams: {
				path: ['ipsum-repudiandae-est-nam'],
			},
			params: {
				matchCurrentPath: false,
			},
		});

		expect(nextHeaders.draftMode).toHaveBeenCalled();
		expect(nextHeaders.draftMode).toHaveReturnedWith({ isEnabled: true });
		expect(nextHeaders.cookies).toHaveBeenCalled();
		expect(nextHeaders.cookies().has).toHaveBeenCalledWith(COOKIE_NAME);
		expect(nextHeaders.cookies().get).toHaveReturnedWith({
			value: previewDataPayload,
			name: COOKIE_NAME,
		});

		expect(data.post.id).toBe(DRAFT_POST_ID);
	});
});
