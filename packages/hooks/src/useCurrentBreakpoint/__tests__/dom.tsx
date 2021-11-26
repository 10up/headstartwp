import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks/dom';
import { useCurrentBreakpoint, BreakpointsProvider } from '../..';

describe('useCurrentBreakpoint', () => {
	const matchMediaMock = jest.fn();
	let originalMatchMedia: typeof window.matchMedia;
	const originalInnerWidth = window.innerWidth;
	const resizeScreen = () => {
		// Randomly decreasing/increasing width
		const amount = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
		const newInnerWidth = window.innerWidth + amount;
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: newInnerWidth,
		});
		global.dispatchEvent(new Event('resize'));
	};

	beforeAll(() => {
		jest.useFakeTimers();
		originalMatchMedia = window.matchMedia;
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: matchMediaMock,
		});
	});

	afterAll(() => {
		window.matchMedia = originalMatchMedia;
		jest.useRealTimers();
	});

	beforeEach(() => {
		// Don't match anything
		matchMediaMock.mockImplementation(() => ({
			matches: false,
		}));
	});

	afterEach(() => {
		jest.clearAllTimers();
		matchMediaMock.mockClear();
		// Restoring
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: originalInnerWidth,
		});
	});

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

	it('should check the media queries debounced', () => {
		const { result } = renderHook(() => useCurrentBreakpoint(), { wrapper });
		const { breakpoints } = result.current;

		// On render it gets called
		expect(matchMediaMock).toHaveBeenCalled();
		expect(matchMediaMock.mock.calls[0][0]).toBe('(min-width: 80.9375em)'); // First is longest
		matchMediaMock.mockClear();
		resizeScreen();
		expect(matchMediaMock).not.toHaveBeenCalled();

		jest.advanceTimersByTime(250);
		expect(matchMediaMock).not.toHaveBeenCalled();
		jest.advanceTimersByTime(50);
		// Should have been called once per breakpoint
		expect(matchMediaMock).toHaveBeenCalledTimes(Object.keys(breakpoints).length);
	});

	it('should be possible to override every option', () => {
		const overridden = ({ children }: { children: ReactNode }) => (
			<BreakpointsProvider
				breakpoints={{
					mobile: 320,
					tablet: 768,
				}}
				debounceDelay={50}
				breakpointUnit="px"
				defaultBreakpoint={320}
			>
				{children}
			</BreakpointsProvider>
		);
		const { result } = renderHook(() => useCurrentBreakpoint(), { wrapper: overridden });
		const { breakpoints, currentBreakpoint } = result.current;
		expect(currentBreakpoint).toBe(320);
		expect(breakpoints.mobile).toBe(320);
		expect(breakpoints.tablet).toBe(768);

		// On render it gets called
		expect(matchMediaMock).toHaveBeenCalled();
		expect(matchMediaMock.mock.calls[0][0]).toBe('(min-width: 768px)'); // First is longest
		matchMediaMock.mockClear();
		resizeScreen();
		expect(matchMediaMock).not.toHaveBeenCalled();
		jest.advanceTimersByTime(50);
		// Should have been called once per breakpoint
		expect(matchMediaMock).toHaveBeenCalledTimes(Object.keys(breakpoints).length);
	});

	it('should change current breakpoint if matchmedia returns true', () => {
		const { result } = renderHook(() => useCurrentBreakpoint(), { wrapper });
		const { breakpoints } = result.current;

		expect(result.current.currentBreakpoint).toBe(breakpoints.sm);

		matchMediaMock.mockImplementation((query: string) => ({
			matches: query.includes(breakpoints.md.toString()),
		}));

		resizeScreen();
		act(() => {
			jest.advanceTimersByTime(300);
		});

		expect(result.current.currentBreakpoint).toBe(breakpoints.md);
	});
});
