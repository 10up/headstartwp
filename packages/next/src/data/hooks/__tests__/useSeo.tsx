import { DataFetchingProvider } from '@headstartwp/core/react';
import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { useSeo } from '../useSeo';

describe('useSeo', () => {
	it('returns seo data', () => {
		const wrapper = ({ children }) => {
			return (
				<DataFetchingProvider
					swrConfig={{}}
					data={{
						'@seo': {
							yoast_head_json: { title: 'test' },
							yoast_head: '<meta name="title" value="test" />',
						},
					}}
				>
					{children}
				</DataFetchingProvider>
			);
		};

		const { result } = renderHook(() => useSeo(), {
			wrapper,
		});

		expect(result.current).toMatchObject({ title: 'test' });

		const { result: result2 } = renderHook(() => useSeo('html'), {
			wrapper,
		});

		expect(result2.current).toBe('<meta name="title" value="test" />');

		const { result: result3 } = renderHook(() => useSeo('json'), {
			wrapper,
		});

		expect(result3.current).toMatchObject({ title: 'test' });
	});

	it('returns null if seo data is not set', () => {
		const wrapper = ({ children }) => {
			return (
				<DataFetchingProvider swrConfig={{}} data={{}}>
					{children}
				</DataFetchingProvider>
			);
		};

		const { result } = renderHook(() => useSeo(), {
			wrapper,
		});

		expect(result.current).toBeNull();

		const { result: result2 } = renderHook(() => useSeo('html'), {
			wrapper,
		});

		expect(result2.current).toBeNull();

		const { result: result3 } = renderHook(() => useSeo('json'), {
			wrapper,
		});

		expect(result3.current).toBeNull();
	});
});
