import { renderHook } from '@testing-library/react-hooks';
import { FC } from 'react';
import { SettingsProvider } from '../../../provider/Provider';

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
	<SettingsProvider settings={{ url: 'https://js1.10up.com' }}>{children}</SettingsProvider>
);

describe('usePost', () => {
	it('fetches a post', async () => {
		const { result, waitForNextUpdate } = renderHook(() => usePost({ slug: 'test' }), {
			wrapper,
		});
		expect(result.current.data).toBeUndefined();
		await waitForNextUpdate();
		expect(result.current.data).toMatchSnapshot();
	});

	it('fails on a 404 post', async () => {});
});
