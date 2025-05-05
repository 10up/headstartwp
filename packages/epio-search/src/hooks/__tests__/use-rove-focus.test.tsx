import { render, act, fireEvent } from '@testing-library/react';
import { useEffect } from 'react';
import { useRoveFocus } from '../use-rove-focus';

declare global {
	interface Window {
		hookState: {
			focus: number;
			setFocus: (focus: number) => void;
			isCollapsed: boolean;
		};
	}
}

function TestComponent({ size, collapsed }) {
	const { focus, setFocus, isCollapsed } = useRoveFocus(size, collapsed);

	useEffect(() => {
		if (process.env.NODE_ENV === 'test') {
			// Expose the hook's state for testing
			window.hookState = { focus, setFocus, isCollapsed };
		}
	}, [focus, setFocus, isCollapsed]);

	return null;
}

describe('useRoveFocus', () => {
	it('should initialize with correct values', () => {
		render(<TestComponent size={5} collapsed />);
		expect(window.hookState.focus).toBe(-1);
		expect(window.hookState.isCollapsed).toBe(true);
	});

	it('should handle ArrowDown key press', () => {
		render(<TestComponent size={5} collapsed={false} />);

		act(() => {
			window.hookState.setFocus(0);
		});

		act(() => {
			fireEvent.keyDown(document, { key: 'ArrowDown' });
		});

		expect(window.hookState.focus).toBe(1);
	});

	it('should handle ArrowUp key press', () => {
		render(<TestComponent size={5} collapsed={false} />);

		act(() => {
			window.hookState.setFocus(1);
		});

		act(() => {
			fireEvent.keyDown(document, { key: 'ArrowUp' });
		});

		expect(window.hookState.focus).toBe(0);
	});

	it('should handle Escape key press', () => {
		render(<TestComponent size={5} collapsed={false} />);

		act(() => {
			fireEvent.keyDown(document, { key: 'Escape' });
		});

		expect(window.hookState.isCollapsed).toBe(true);
	});

	it('should wrap focus from last to first with ArrowDown', () => {
		render(<TestComponent size={5} collapsed={false} />);

		act(() => {
			window.hookState.setFocus(4);
		});

		act(() => {
			fireEvent.keyDown(document, { key: 'ArrowDown' });
		});

		expect(window.hookState.focus).toBe(0);
	});

	it('should wrap focus from first to last with ArrowUp', () => {
		render(<TestComponent size={5} collapsed={false} />);

		act(() => {
			window.hookState.setFocus(0);
		});

		act(() => {
			fireEvent.keyDown(document, { key: 'ArrowUp' });
		});

		expect(window.hookState.focus).toBe(4);
	});

	it('should not change focus when size is 0', () => {
		render(<TestComponent size={0} collapsed={false} />);

		act(() => {
			window.hookState.setFocus(-1);
		});

		act(() => {
			fireEvent.keyDown(document, { key: 'ArrowDown' });
		});

		expect(window.hookState.focus).toBe(0);

		act(() => {
			fireEvent.keyDown(document, { key: 'ArrowUp' });
		});

		expect(window.hookState.focus).toBe(-1);
	});

	it('should not change focus when collapsed is true', () => {
		render(<TestComponent size={5} collapsed />);

		act(() => {
			window.hookState.setFocus(0);
		});

		act(() => {
			fireEvent.keyDown(document, { key: 'ArrowDown' });
		});

		expect(window.hookState.focus).toBe(0);

		act(() => {
			fireEvent.keyDown(document, { key: 'ArrowUp' });
		});

		expect(window.hookState.focus).toBe(0);
	});
});
