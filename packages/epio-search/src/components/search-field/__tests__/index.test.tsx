import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { useSearch } from '../../../hooks/use-search';
import { useDebounce } from '../../../hooks/use-debounce';
import SearchField from '../index';

// Mock the hooks
jest.mock('../../../hooks/use-search');
jest.mock('../../../hooks/use-debounce');

describe('SearchField', () => {
	const mockRefine = jest.fn();
	const mockDebouncedFn = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useSearch as jest.Mock).mockReturnValue({ refine: mockRefine });
		(useDebounce as jest.Mock).mockImplementation(() => mockDebouncedFn);
	});

	it('renders with default props', () => {
		const { container } = render(<SearchField />);
		const input = container.querySelector('input');
		expect(input).toHaveAttribute('type', 'search');
		expect(input).toHaveAttribute('name', 's');
		expect(input).toHaveClass('search-field');
	});

	it('renders with custom name', () => {
		const { container } = render(<SearchField name="custom" />);
		const input = container.querySelector('input');
		expect(input).toHaveAttribute('name', 'custom');
	});

	it('renders with initial search term', () => {
		const { container } = render(<SearchField searchTerm="test" />);
		const input = container.querySelector('input');
		expect(input).toHaveValue('test');
	});

	it('calls debouncedSearch on input change', () => {
		const { container } = render(<SearchField />);
		const input = container.querySelector('input');

		fireEvent.change(input!, { target: { value: 'test query' } });

		expect(mockDebouncedFn).toHaveBeenCalledWith('test query');
	});

	it('performs search with initial value if provided', () => {
		render(<SearchField initialValue="initial test" />);

		expect(mockDebouncedFn).toHaveBeenCalledWith('initial test');
	});

	it('spreads additional props to input', () => {
		const { container } = render(<SearchField aria-label="Search" />);
		const input = container.querySelector('input');

		expect(input).toHaveAttribute('aria-label', 'Search');
	});
});
