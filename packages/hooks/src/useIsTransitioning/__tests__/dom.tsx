import { renderHook, act } from '@testing-library/react-hooks/dom';
import { ReactNode } from 'react';
import { useIsTransitioning, TransitionProvider } from '../..';

// Mocking bare minimals
const MockedRouter = {
	events: {
		on: jest.fn(),
		off: jest.fn(),
	},
};

jest.mock('next/router', () => ({
	useRouter() {
		return MockedRouter;
	},
}));

describe('useIsTransitioning', () => {
	const wrapper = ({ children }: { children: ReactNode }) => (
		<TransitionProvider>{children}</TransitionProvider>
	);

	beforeEach(() => {
		MockedRouter.events.on.mockReset();
		MockedRouter.events.off.mockReset();
	});

	it('should be defined', () => {
		expect(useIsTransitioning).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useIsTransitioning());
		expect(result.error).toBeUndefined();
		expect(result.current).toBe(false);
	});

	it('should have bound to events and unbound on unmount', () => {
		const { unmount } = renderHook(() => useIsTransitioning(), { wrapper });

		expect(MockedRouter.events.on).toHaveBeenCalledTimes(3);
		expect(MockedRouter.events.on.mock.calls[0][0]).toBe('routeChangeStart');
		expect(MockedRouter.events.on.mock.calls[1][0]).toBe('routeChangeComplete');
		expect(MockedRouter.events.on.mock.calls[2][0]).toBe('routeChangeError');

		expect(MockedRouter.events.off).not.toHaveBeenCalled();

		unmount();

		expect(MockedRouter.events.off).toHaveBeenCalledTimes(3);
		expect(MockedRouter.events.off.mock.calls[0][0]).toBe('routeChangeStart');
		expect(MockedRouter.events.off.mock.calls[1][0]).toBe('routeChangeComplete');
		expect(MockedRouter.events.off.mock.calls[2][0]).toBe('routeChangeError');
	});

	it('should return the correct state depending on the called function', () => {
		const { result } = renderHook(() => useIsTransitioning(), { wrapper });

		const [changeStart, changeComplete, changeError] = [
			MockedRouter.events.on.mock.calls[0][1],
			MockedRouter.events.on.mock.calls[1][1],
			MockedRouter.events.on.mock.calls[2][1],
		];

		expect(result.current).toBe(false);
		act(() => changeStart());
		expect(result.current).toBe(true);
		act(() => changeComplete());
		expect(result.current).toBe(false);
		act(() => changeStart());
		expect(result.current).toBe(true);
		act(() => changeError());
		expect(result.current).toBe(false);
	});
});
