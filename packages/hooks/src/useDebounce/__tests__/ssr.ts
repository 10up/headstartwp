import { renderHook } from '@testing-library/react-hooks/server';
import { useDebounce } from '../..';

describe('useDebounce', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(useDebounce).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useDebounce(1, 100));
		expect(result.error).toBeUndefined();
	});
});
