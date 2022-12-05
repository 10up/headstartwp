import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useOnClickOutside } from '../..';

describe('useOnClickOutside', () => {
	it('should be defined', () => {
		expect(useOnClickOutside).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useOnClickOutside({ current: null }, () => {}));
		expect(result.error).toBeUndefined();
	});

	it('should listen on mount and remove on unmount', () => {
		const div = document.createElement('div');
		const addSpy = jest.spyOn(document.body, 'addEventListener');
		const removeSpy = jest.spyOn(document.body, 'removeEventListener');
		const handler = () => {};

		const { rerender, unmount } = renderHook(() =>
			useOnClickOutside({ current: div }, handler),
		);

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).not.toHaveBeenCalled();

		rerender();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).not.toHaveBeenCalled();

		unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});

	it('should execute the callback if clicked element is outside of target', () => {
		const div = document.createElement('div');
		const button = document.createElement('button');
		const handler = jest.fn();

		renderHook(() => useOnClickOutside({ current: div }, handler));

		document.body.append(div, button);
		expect(handler).not.toHaveBeenCalled();
		userEvent.click(button);
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it('should not execute the callback if clicked element is inside of target', () => {
		const div = document.createElement('div');
		const button = document.createElement('button');
		const handler = jest.fn();

		renderHook(() => useOnClickOutside({ current: div }, handler));

		document.body.append(div);
		div.append(button);
		expect(handler).not.toHaveBeenCalled();
		userEvent.click(button);
		expect(handler).not.toHaveBeenCalled();
	});

	it('should not execute the callback if element is unmounted', () => {
		const div = document.createElement('div');
		const button = document.createElement('button');
		const handler = jest.fn();

		const ref: {
			current: HTMLDivElement | null;
		} = { current: div };
		renderHook(() => useOnClickOutside(ref, handler));

		document.body.append(div, button);
		expect(handler).not.toHaveBeenCalled();

		ref.current = null;
		userEvent.click(button);
		expect(handler).not.toHaveBeenCalled();
	});
});
