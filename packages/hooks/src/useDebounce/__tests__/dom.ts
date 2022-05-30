import { renderHook, act } from '@testing-library/react-hooks/dom';
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

	it('should debounce the value', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
			initialProps: {
				value: 1,
			},
		});
		expect(result.current).toBe(1);

		rerender({ value: 10 });
		expect(result.current).toBe(1);
		jest.advanceTimersByTime(50);
		rerender({ value: 15 });
		expect(result.current).toBe(1);

		act(() => {
			jest.runAllTimers();
		});
		expect(result.current).toBe(15);
	});
});
