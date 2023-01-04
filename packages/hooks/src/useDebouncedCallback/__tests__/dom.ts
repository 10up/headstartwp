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

	it('should return new callback if delay is changed', () => {
		const { result, rerender } = renderHook(
			({ delay }) => useDebouncedCallback(() => {}, [], delay),
			{
				initialProps: { delay: 100 },
			},
		);

		const cb1 = result.current;
		rerender({ delay: 123 });

		expect(cb1).not.toBe(result.current);
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
		const cb = jest.fn(() => {});
		const { result } = renderHook(() => useDebouncedCallback(cb, [], 100));

		result.current(1, 'foo');
		jest.advanceTimersByTime(100);
		expect(cb).toHaveBeenCalledWith(1, 'foo');
	});

	it('should cancel previously scheduled call even if parameters changed', () => {
		const cb1 = jest.fn(() => {});
		const cb2 = jest.fn(() => {});

		const { result, rerender } = renderHook(
			({ i }) => useDebouncedCallback(() => (i === 1 ? cb1() : cb2()), [i], 100),
			{ initialProps: { i: 1 } },
		);

		result.current();
		jest.advanceTimersByTime(50);

		rerender({ i: 2 });
		result.current();
		jest.advanceTimersByTime(100);

		expect(cb1).not.toHaveBeenCalled();
		expect(cb2).toHaveBeenCalledTimes(1);
	});
});
