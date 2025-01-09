import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../use-debounce';

jest.useFakeTimers();

describe('useDebounce', () => {
	it('should debounce the callback function', () => {
		const callback = jest.fn();
		const delay = 500;
		const { result } = renderHook(() => useDebounce(callback, delay));

		act(() => {
			result.current('arg1');
			result.current('arg2');
		});

		expect(callback).not.toHaveBeenCalled();

		act(() => {
			jest.advanceTimersByTime(delay);
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith('arg2');
	});

	it('should reset the timer if called again within the delay', () => {
		const callback = jest.fn();
		const delay = 500;
		const { result } = renderHook(() => useDebounce(callback, delay));

		act(() => {
			result.current('arg1');
		});

		act(() => {
			jest.advanceTimersByTime(delay / 2);
		});

		act(() => {
			result.current('arg2');
		});

		act(() => {
			jest.advanceTimersByTime(delay / 2);
		});

		expect(callback).not.toHaveBeenCalled();

		act(() => {
			jest.advanceTimersByTime(delay / 2);
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith('arg2');
	});

	it('should use the latest callback', () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();
		const delay = 500;
		const { result, rerender } = renderHook(({ cb }) => useDebounce(cb, delay), {
			initialProps: { cb: callback1 },
		});

		act(() => {
			result.current('arg1');
		});

		rerender({ cb: callback2 });

		act(() => {
			jest.advanceTimersByTime(delay);
		});

		expect(callback1).not.toHaveBeenCalled();
		expect(callback2).toHaveBeenCalledTimes(1);
		expect(callback2).toHaveBeenCalledWith('arg1');
	});
});
