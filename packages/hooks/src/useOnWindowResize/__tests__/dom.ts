import { renderHook } from '@testing-library/react-hooks/dom';
import { useOnWindowResize } from '../..';

describe('useOnWindowResize', () => {
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
		expect(useOnWindowResize).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useOnWindowResize(() => {}));
		expect(result.error).toBeUndefined();
	});

	it('should bind window resize and unbind on unmount', () => {
		let resizeBinds = 0;
		let resizeRemoves = 0;
		// There are inner events being listened, we just care about resize
		const addSpy = jest.spyOn(window, 'addEventListener').mockImplementation((eventName) => {
			if (eventName === 'resize') {
				resizeBinds++;
			}
		});
		const removeSpy = jest
			.spyOn(window, 'removeEventListener')
			.mockImplementation((eventName) => {
				if (eventName === 'resize') {
					resizeRemoves++;
				}
			});

		const { rerender, unmount } = renderHook(() => useOnWindowResize(() => {}));

		expect(resizeBinds).toBe(1);
		expect(resizeRemoves).toBe(0);

		rerender();
		expect(resizeBinds).toBe(1);
		expect(resizeRemoves).toBe(0);

		unmount();
		expect(resizeBinds).toBe(1);
		expect(resizeRemoves).toBe(1);

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});

	it('should not call the callback upon render', () => {
		const cb = jest.fn();
		renderHook(() => useOnWindowResize(cb));

		expect(cb).not.toHaveBeenCalled();
	});

	it('should debounce the callback if window resizes', () => {
		const cb = jest.fn();
		renderHook(() => useOnWindowResize(cb));
		const originalInnerWidth = window.innerWidth;

		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: originalInnerWidth - 200,
		});
		global.dispatchEvent(new Event('resize'));

		expect(cb).not.toHaveBeenCalled();

		jest.advanceTimersByTime(250);

		expect(cb).not.toHaveBeenCalled();

		jest.advanceTimersByTime(50); // + 250 = 300 of debounced
		expect(cb).toHaveBeenCalled();

		// Restoring
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: originalInnerWidth,
		});
	});

	it('should not call the callback if window does not resize', () => {
		const cb = jest.fn();
		renderHook(() => useOnWindowResize(cb));

		global.dispatchEvent(new Event('resize'));

		expect(cb).not.toHaveBeenCalled();
	});
});
