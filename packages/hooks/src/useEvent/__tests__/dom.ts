import { renderHook } from '@testing-library/react-hooks/dom';
import { useEvent } from '../..';

describe('useEvent', () => {
	it('should be defined', () => {
		expect(useEvent).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useEvent({ current: null }, 'click', () => {}));
		expect(result.error).toBeUndefined();
	});

	it('should add listener on mount and remove it on unmount', () => {
		const button = document.createElement('button');
		const addSpy = jest.spyOn(button, 'addEventListener');
		const removeSpy = jest.spyOn(button, 'removeEventListener');

		const { rerender, unmount } = renderHook(() => {
			useEvent({ current: button }, 'click', () => {});
		});

		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		rerender();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(0);

		unmount();
		expect(addSpy).toHaveBeenCalledTimes(1);
		expect(removeSpy).toHaveBeenCalledTimes(1);
	});

	it('should be possible to pass extra parameters to addEventListener', () => {
		const button = document.createElement('button');
		const addSpy = jest.spyOn(button, 'addEventListener');

		renderHook(() => {
			useEvent({ current: button }, 'click', () => {}, { once: true });
		});

		// @ts-ignore
		expect(addSpy.mock.calls[0][2].once).toBe(true);
	});

	it('should invoke provided function on event trigger with event and context', () => {
		const button = document.createElement('button');
		let context: any;
		const spy = jest.fn(function (this: any) {
			context = this;
		});

		renderHook(() => {
			useEvent({ current: button }, 'click', spy);
		});

		const clickEvent = new Event('click');
		button.dispatchEvent(clickEvent);

		expect(spy).toHaveBeenCalledWith(clickEvent);
		expect(context).toBe(button);
	});
});
