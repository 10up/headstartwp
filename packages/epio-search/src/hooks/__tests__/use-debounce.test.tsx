import { render, act, fireEvent } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { useDebounce } from '../use-debounce';

jest.useFakeTimers();

const TestComponent = ({ callback, delay }) => {
	const debouncedCallback = useDebounce(callback, delay);
	const [value, setValue] = useState('');

	useEffect(() => {
		if (value) {
			debouncedCallback(value);
		}
	}, [value, debouncedCallback]);

	return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />;
};

describe('useDebounce', () => {
	it('should debounce the callback', () => {
		const callback = jest.fn();
		const delay = 500;
		const { getByRole } = render(<TestComponent callback={callback} delay={delay} />);

		act(() => {
			const input = getByRole('textbox') as HTMLInputElement;
			fireEvent.change(input, { target: { value: 'first call' } });
		});

		expect(callback).not.toHaveBeenCalled();

		act(() => {
			jest.advanceTimersByTime(delay);
		});

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should update the callback reference', () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();
		const delay = 500;
		const { rerender, getByRole } = render(
			<TestComponent callback={callback1} delay={delay} />,
		);

		act(() => {
			const input = getByRole('textbox') as HTMLInputElement;
			fireEvent.change(input, { target: { value: 'first call' } });
		});

		rerender(<TestComponent callback={callback2} delay={delay} />);

		act(() => {
			jest.advanceTimersByTime(delay);
		});

		expect(callback1).not.toHaveBeenCalled();
		expect(callback2).toHaveBeenCalledTimes(1);
		expect(callback2).toHaveBeenCalledWith('first call');
	});

	it('should clear timeout on unmount', () => {
		const callback = jest.fn();
		const delay = 500;
		const { unmount, getByRole } = render(<TestComponent callback={callback} delay={delay} />);

		act(() => {
			const input = getByRole('textbox') as HTMLInputElement;
			input.value = 'first call';
			input.dispatchEvent(new Event('input'));
		});

		unmount();

		act(() => {
			jest.advanceTimersByTime(delay);
		});

		expect(callback).not.toHaveBeenCalled();
	});
});
