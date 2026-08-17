import { SettingsProvider } from '@headstartwp/core/react';
import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { setHeadstartWPConfig } from '@headstartwp/core';
import { usePrepareFetch } from '../usePrepareFetch';

// v2 reads the route from the app router's useParams(), not the pages router's useRouter().
const useParamsMock = jest.fn();

jest.mock('next/navigation', () => ({
	useParams: () => useParamsMock(),
}));

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('usePrepareFetch', () => {
	beforeAll(() => {
		setHeadstartWPConfig(config);
	});

	it('injects locale if locale is set and polylang integration is enabled', () => {
		const wrapper = ({ children }) => {
			return (
				<SettingsProvider
					settings={{
						...config,
						integrations: { polylang: { enable: true } },
					}}
				>
					{children}
				</SettingsProvider>
			);
		};

		useParamsMock.mockReturnValue({ path: [], lang: 'en' });
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
					settings={{
						...config,
						integrations: { polylang: { enable: true } },
					}}
				>
					{children}
				</SettingsProvider>
			);
		};

		useParamsMock.mockReturnValue({ path: ['parent', 'post'], lang: 'en' });
		const { result } = renderHook(() => usePrepareFetch({ per_page: 2 }, {}), {
			wrapper,
		});

		expect(result.current.params).toMatchObject({
			per_page: 2,
			lang: 'en',
		});
		expect(result.current.path).toBe('/parent/post');
	});

	it('tolerates useParams() returning null off-route', () => {
		const wrapper = ({ children }) => (
			<SettingsProvider settings={config}>{children}</SettingsProvider>
		);

		useParamsMock.mockReturnValue(null);
		const { result } = renderHook(() => usePrepareFetch({ per_page: 2 }, {}), { wrapper });

		expect(result.current.params).toMatchObject({ per_page: 2 });
		// convertToPath(['']) is '/', which is what v1 produced for an empty route too.
		expect(result.current.path).toBe('/');
	});
});
