import { renderHook } from '@testing-library/react-hooks';
import { useIsTransitioning } from '../..';

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
});
