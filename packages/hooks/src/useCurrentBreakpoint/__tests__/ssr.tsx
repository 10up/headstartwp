import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks/server';
import { useCurrentBreakpoint } from '../..';
import { BreakpointsProvider } from '../../context';

describe('useCurrentBreakpoint', () => {
	const wrapper = ({ children }: { children: ReactNode }) => (
		<BreakpointsProvider>{children}</BreakpointsProvider>
	);

	it('should be defined', () => {
		expect(useCurrentBreakpoint).toBeDefined();
	});

	it('should error without context', () => {
		const { result } = renderHook(() => useCurrentBreakpoint());
		expect(result.error).toEqual(
			Error('useCurrentBreakpoint needs to be used within BreakpointsContext'),
		);
	});

	it('should not error with context', () => {
		const { result } = renderHook(() => useCurrentBreakpoint(), { wrapper });
		expect(result.error).toBeUndefined();
	});

	it('should return sensible defaults', () => {
		const { result } = renderHook(() => useCurrentBreakpoint(), { wrapper });
		expect(result.current.currentBreakpoint).toBe(result.current.breakpoints.sm);
	});

	it('should be possible to override', () => {
		const overridden = ({ children }: { children: ReactNode }) => (
			<BreakpointsProvider
				breakpoints={{
					mobile: 320,
					tablet: 768,
				}}
				defaultBreakpoint={320}
			>
				{children}
			</BreakpointsProvider>
		);
		const { result } = renderHook(() => useCurrentBreakpoint(), { wrapper: overridden });
		expect(result.current.currentBreakpoint).toBe(320);
		expect(result.current.breakpoints.mobile).toBe(320);
		expect(result.current.breakpoints.tablet).toBe(768);
	});
});
