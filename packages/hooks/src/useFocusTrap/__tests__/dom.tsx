import { useRef } from 'react';
import { renderHook } from '@testing-library/react-hooks/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useFocusTrap } from '../..';

const TestableComponent = ({ isTrapped = false }: { isTrapped?: boolean }) => {
	const ref = useFocusTrap(isTrapped);

	return (
		<div>
			<input data-testid="element" />
			<div ref={ref}>
				<a href="https://10up.com" data-testid="element">
					Anchor
				</a>
				<button data-testid="element" type="button">
					My Button
				</button>
			</div>
		</div>
	);
};

const TestableComponentSecondFocus = ({ isTrapped = false }: { isTrapped?: boolean }) => {
	const buttonRef = useRef(null);
	const ref = useFocusTrap(isTrapped, buttonRef);

	return (
		<div>
			<input data-testid="element" />
			<div ref={ref}>
				<a href="https://10up.com" data-testid="element">
					Anchor
				</a>
				<button data-testid="element" type="button" ref={buttonRef}>
					My Button
				</button>
			</div>
		</div>
	);
};

TestableComponent.defaultProps = { isTrapped: false };
TestableComponentSecondFocus.defaultProps = { isTrapped: false };

describe('useFocusTrap', () => {
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
		expect(useFocusTrap).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useFocusTrap(false));
		expect(result.error).toBeUndefined();
	});

	it('should not handle focus if is not active', () => {
		render(<TestableComponent />);
		const [input, anchor, button] = screen.getAllByTestId('element');
		expect(document.body).toHaveFocus();

		userEvent.tab();
		expect(input).toHaveFocus();

		userEvent.tab();
		expect(anchor).toHaveFocus();

		userEvent.tab();

		expect(button).toHaveFocus();

		userEvent.tab();

		// cycle goes back to the body element
		expect(document.body).toHaveFocus();

		userEvent.tab();
		expect(input).toHaveFocus();
	});

	it('should set focus to first focusable element upon activation', () => {
		const { rerender } = render(<TestableComponent isTrapped={false} />);
		const [, anchor] = screen.getAllByTestId('element');

		expect(document.body).toHaveFocus();
		rerender(<TestableComponent isTrapped />);
		jest.runOnlyPendingTimers();
		expect(anchor).toHaveFocus();
	});

	it('should trap focus within the element', () => {
		const { rerender } = render(<TestableComponent isTrapped={false} />);
		const [, anchor, button] = screen.getAllByTestId('element');

		expect(document.body).toHaveFocus();
		rerender(<TestableComponent isTrapped />);
		jest.runOnlyPendingTimers();
		expect(anchor).toHaveFocus();

		userEvent.tab();
		expect(button).toHaveFocus();

		// Should return to anchor after button if it's trapped
		userEvent.tab();
		expect(anchor).toHaveFocus();
	});

	it('should be possible to set another focusable element to focus first upon activation', () => {
		const { rerender } = render(<TestableComponentSecondFocus isTrapped={false} />);
		const [, , button] = screen.getAllByTestId('element');

		expect(document.body).toHaveFocus();
		rerender(<TestableComponentSecondFocus isTrapped />);
		jest.runOnlyPendingTimers();
		expect(button).toHaveFocus();
	});

	it('should return focus to previous element', () => {
		const { rerender } = render(<TestableComponent isTrapped={false} />);
		const [input, anchor] = screen.getAllByTestId('element');

		userEvent.tab();
		expect(input).toHaveFocus();
		rerender(<TestableComponent isTrapped />);
		jest.runOnlyPendingTimers();
		expect(anchor).toHaveFocus();

		rerender(<TestableComponent isTrapped={false} />);
		jest.runOnlyPendingTimers();
		expect(input).toHaveFocus();
	});
});
