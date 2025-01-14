import { renderHook, act } from '@testing-library/react-hooks';
import { useRoveFocus } from '../use-rove-focus';

describe('useRoveFocus', () => {
	it('should initialize with correct values', () => {
		const { result } = renderHook(() => useRoveFocus(5, false));
		expect(result.current.focus).toBe(-1);
		expect(result.current.isCollapsed).toBe(false);
	});

	it('should handle ArrowDown key press', () => {
		const { result } = renderHook(() => useRoveFocus(5, false));

		act(() => {
			result.current.setFocus(0);
		});

		act(() => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
			document.dispatchEvent(event);
		});

		expect(result.current.focus).toBe(1);
	});

	it('should handle ArrowUp key press', () => {
		const { result } = renderHook(() => useRoveFocus(5, false));

		act(() => {
			result.current.setFocus(1);
		});

		act(() => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
			document.dispatchEvent(event);
		});

		expect(result.current.focus).toBe(0);
	});

	it('should handle Escape key press', () => {
		const { result } = renderHook(() => useRoveFocus(5, false));

		act(() => {
			const event = new KeyboardEvent('keydown', { key: 'Escape' });
			document.dispatchEvent(event);
		});

		expect(result.current.isCollapsed).toBe(true);
	});

	it('should wrap focus to start when ArrowDown is pressed at end', () => {
		const { result } = renderHook(() => useRoveFocus(5, false));

		act(() => {
			result.current.setFocus(4);
		});

		act(() => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
			document.dispatchEvent(event);
		});

		expect(result.current.focus).toBe(-1);
	});

	it('should wrap focus to end when ArrowUp is pressed at start', () => {
		const { result } = renderHook(() => useRoveFocus(5, false));

		act(() => {
			result.current.setFocus(-1);
		});

		act(() => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
			document.dispatchEvent(event);
		});

		expect(result.current.focus).toBe(4);
	});
});