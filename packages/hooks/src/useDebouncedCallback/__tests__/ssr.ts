import { renderHook } from '@testing-library/react-hooks';
import { useDebouncedCallback } from '../..';

describe('useDebouncedCallback', () => {
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
		expect(useDebouncedCallback).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useDebouncedCallback(() => {}, [], 100);
		});
		expect(result.error).toBeUndefined();
	});

	it('should run given callback only after specified delay since last call', () => {
		const cb = jest.fn();
		const { result } = renderHook(() => useDebouncedCallback(cb, [], 100));

		result.current();
		expect(cb).not.toHaveBeenCalled();

		jest.advanceTimersByTime(50);
		result.current();

		jest.advanceTimersByTime(99);
		expect(cb).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('should pass parameters to callback', () => {
		const cb = jest.fn();
		const { result } = renderHook(() => useDebouncedCallback(cb, [], 100));

		result.current(1, 'foo');
		jest.advanceTimersByTime(100);
		expect(cb).toHaveBeenCalledWith(1, 'foo');
	});
});
