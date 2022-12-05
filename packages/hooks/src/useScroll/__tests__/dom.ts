import { renderHook } from '@testing-library/react-hooks';
import { useScroll } from '../..';

describe('useScroll', () => {
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
		expect(useScroll).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useScroll(() => {}, []));
		expect(result.error).toBeUndefined();
	});

	it('should bind window scroll and unbind on unmount', () => {
		let scrollBinds = 0;
		let scrollRemoves = 0;
		// There are inner events being listened, we just care about scroll
		jest.spyOn(window, 'addEventListener').mockImplementation((eventName) => {
			if (eventName === 'scroll') {
				scrollBinds++;
			}
		});
		jest.spyOn(window, 'removeEventListener').mockImplementation((eventName) => {
			if (eventName === 'scroll') {
				scrollRemoves++;
			}
		});

		const { rerender, unmount } = renderHook(() => useScroll(() => {}, []));

		expect(scrollBinds).toBe(1);
		expect(scrollRemoves).toBe(0);

		rerender();
		expect(scrollBinds).toBe(1);
		expect(scrollRemoves).toBe(0);

		unmount();
		expect(scrollBinds).toBe(1);
		expect(scrollRemoves).toBe(1);

		jest.restoreAllMocks();
	});

	it('should call a handler on scroll', () => {
		const handler = jest.fn();
		renderHook(() => useScroll(handler, []));

		window.dispatchEvent(new Event('scroll'));
		expect(handler).toHaveBeenCalled();
	});

	it('should be possible to debounce the call', () => {
		const handler = jest.fn();
		renderHook(() => useScroll(handler, [], 300));

		window.dispatchEvent(new Event('scroll'));
		expect(handler).not.toHaveBeenCalled();
		jest.runAllTimers();
		expect(handler).toHaveBeenCalled();
	});

	it('should receive useful information', () => {
		const handler = jest.fn();
		renderHook(() => useScroll(handler, []));

		window.dispatchEvent(new Event('scroll'));
		const [scrollInformation] = handler.mock.calls[0];
		expect(typeof scrollInformation.prevPos).toBe('number');
		expect(typeof scrollInformation.currPos).toBe('number');
	});
});
