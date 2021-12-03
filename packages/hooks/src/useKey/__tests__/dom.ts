import { renderHook } from '@testing-library/react-hooks/dom';
import { fireEvent } from '@testing-library/react';
import { useKey } from '../..';

describe('useKey', () => {
	it('should be defined', () => {
		expect(useKey).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useKey({ current: null }, 'Escape', () => {}));
		expect(result.error).toBeUndefined();
	});

	it('should listen to keydown on mount and remove it on unmount', () => {
		const button = document.createElement('button');
		const addSpy = jest.spyOn(button, 'addEventListener');
		const removeSpy = jest.spyOn(button, 'removeEventListener');

		const { rerender, unmount } = renderHook(() => {
			useKey({ current: button }, 'Escape', () => {});
		});

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(addSpy.mock.calls[0][0]).toBe('keydown');
		expect(removeSpy).toHaveBeenCalledTimes(0);

		rerender();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);
	});

	it('should be possible to pass a key', () => {
		const button = document.createElement('button');
		const mock = jest.fn();

		renderHook(() => useKey({ current: button }, 'Escape', mock));

		fireEvent.keyDown(button, { key: 'Enter' });
		expect(mock).not.toHaveBeenCalled();

		fireEvent.keyDown(button, { key: 'Escape' });
		expect(mock).toHaveBeenCalled();
	});

	it('should be possible to pass a truthy/falsy value', () => {
		const button = document.createElement('button');
		const mock = jest.fn();

		const { rerender } = renderHook(({ pass }) => useKey({ current: button }, pass, mock), {
			initialProps: { pass: true },
		});

		fireEvent.keyDown(button, { key: 'Enter' });
		expect(mock).toHaveBeenCalledTimes(1);

		fireEvent.keyDown(button, { key: 'Escape' });
		expect(mock).toHaveBeenCalledTimes(2);

		rerender({ pass: false });
		mock.mockClear();

		fireEvent.keyDown(button, { key: 'Enter' });
		fireEvent.keyDown(button, { key: 'Escape' });
		fireEvent.keyDown(button, { key: 'A' });
		expect(mock).not.toHaveBeenCalled();
	});

	it('should be possible to pass a function that determines if the handler is invoked', () => {
		let pass = false;
		const button = document.createElement('button');
		const mock = jest.fn();
		const functionDecider = jest.fn(() => pass);

		renderHook(() => useKey({ current: button }, functionDecider, mock));

		fireEvent.keyDown(button, { key: 'Enter' });
		// @ts-ignore
		const keydownEvent = functionDecider.mock.calls[0][0] as unknown as KeyboardEvent;
		expect(keydownEvent.key).toBe('Enter');
		expect(mock).not.toHaveBeenCalled();

		pass = true;
		fireEvent.keyDown(button, { key: 'Enter' });
		expect(mock).toHaveBeenCalled();
	});
});
