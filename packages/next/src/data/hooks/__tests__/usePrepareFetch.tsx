import { SettingsProvider } from '@headstartwp/core/react';
import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { usePrepareFetch } from '../usePrepareFetch';

const useRouterMock = jest.fn();

jest.mock('next/router', () => ({
	useRouter: () => useRouterMock(),
}));

describe('usePrepareFetch', () => {
	it('injects locale if locale is set and polylang integration is enabled', () => {
		const wrapper = ({ children }) => {
			return (
				<SettingsProvider
					settings={{ sourceUrl: '', integrations: { polylang: { enable: true } } }}
				>
					{children}
				</SettingsProvider>
			);
		};

		useRouterMock.mockReturnValue({ query: { path: [] }, locale: 'en' });
		const { result } = renderHook(() => usePrepareFetch({ per_page: 2 }, {}), {
			wrapper,
		});

		expect(result.current.params).toMatchObject({
			per_page: 2,
			lang: 'en',
		});
	});

	it('converts path to a string pathname', () => {
		const wrapper = ({ children }) => {
			return (
				<SettingsProvider
					settings={{ sourceUrl: '', integrations: { polylang: { enable: true } } }}
				>
					{children}
				</SettingsProvider>
			);
		};

		useRouterMock.mockReturnValue({ query: { path: ['parent', 'post'] }, locale: 'en' });
		const { result } = renderHook(() => usePrepareFetch({ per_page: 2 }, {}), {
			wrapper,
		});

		expect(result.current.params).toMatchObject({
			per_page: 2,
			lang: 'en',
		});
		expect(result.current.path).toBe('/parent/post');
	});
});
