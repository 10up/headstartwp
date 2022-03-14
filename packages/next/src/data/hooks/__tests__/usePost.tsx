import { renderHook } from '@testing-library/react-hooks';
import { FC } from 'react';
// eslint-disable-next-line
import { SettingsProvider } from '@10up/headless-core';

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

const wrapper: FC = ({ children }) => (
	<SettingsProvider
		settings={{
			url: 'https://js1.10up.com',
			customPostTypes: [],
			redirectStrategy: 'none',
		}}
	>
		{children}
	</SettingsProvider>
);

describe('usePost', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('fetches a post', async () => {
		const { result, waitForNextUpdate } = renderHook(() => usePost({ slug: 'test' }), {
			wrapper,
		});
		expect(result.current.data).toBeUndefined();
		expect(result.current.loading).toBe(true);
		await waitForNextUpdate();
		expect(result.current.loading).toBe(false);
		expect(result.current.data).toMatchSnapshot();
	});
});
