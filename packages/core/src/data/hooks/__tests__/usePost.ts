import { renderHook } from '@testing-library/react-hooks';

import { usePost } from '../usePost';

jest.mock('next/router', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: {},
			asPath: '',
		};
	},
}));

describe('usePost', () => {
	it('fetches a post', async () => {
		const { result, waitForNextUpdate } = renderHook(() => usePost({ slug: 'test' }));
		expect(result.current.data).toBeUndefined();
		await waitForNextUpdate();
		expect(result.current.data).toMatchSnapshot();
	});

	it('fails on a 404 post', async () => {});
});
