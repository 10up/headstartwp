import { disableRequestInterception } from '@headstartwp/core/test';
import { fetchBlockLibraryStyles } from '../fetchBlockLibraryStyles';
import { prepareQuery } from '../../data/queries/prepareQuery';

// Mock the prepareQuery function
jest.mock('../../data/queries/prepareQuery');
const mockPrepareQuery = prepareQuery as jest.MockedFunction<typeof prepareQuery>;

// Mock the global fetch function
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof global.fetch>;

describe('fetchBlockLibraryStyles', () => {
	// These tests assert on the Next.js `fetch` options (`cache`, `next.revalidate`), which msw
	// cannot observe, so they need the raw `global.fetch` mock above rather than a handler.
	disableRequestInterception();

	const mockParams = { site: 'example.com' };

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns empty string when sourceUrl is not provided', async () => {
		mockPrepareQuery.mockReturnValue({
			config: {},
			params: {},
			options: {},
			path: '',
			handleError: true,
		} as any);

		const result = await fetchBlockLibraryStyles({ params: mockParams });

		expect(result).toBe('');
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it('returns empty string when sourceUrl is empty string', async () => {
		mockPrepareQuery.mockReturnValue({
			config: { sourceUrl: '' },
			params: {},
			options: {},
			path: '',
			handleError: true,
		} as any);

		const result = await fetchBlockLibraryStyles({ params: mockParams });

		expect(result).toBe('');
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it('successfully fetches and returns block library CSS', async () => {
		const mockCssContent = '/* Mock CSS content */\n.wp-block { margin: 1em 0; }';
		const mockSourceUrl = 'https://example.com';

		mockPrepareQuery.mockReturnValue({
			config: { sourceUrl: mockSourceUrl },
			params: {},
			options: {},
			path: '',
			handleError: true,
		} as any);

		mockFetch.mockResolvedValue({
			text: jest.fn().mockResolvedValue(mockCssContent),
		} as any);

		const result = await fetchBlockLibraryStyles({ params: mockParams });

		expect(mockFetch).toHaveBeenCalledWith(
			`${mockSourceUrl}/wp-includes/css/dist/block-library/style.min.css`,
			{ cache: 'force-cache', next: { revalidate: 60 * 60 * 24 } },
		);
		expect(result).toBe(mockCssContent);
	});

	it('returns empty string when fetch throws an error', async () => {
		const mockSourceUrl = 'https://example.com';

		mockPrepareQuery.mockReturnValue({
			config: { sourceUrl: mockSourceUrl },
			params: {},
			options: {},
			path: '',
			handleError: true,
		} as any);

		mockFetch.mockRejectedValue(new Error('Network error'));

		const result = await fetchBlockLibraryStyles({ params: mockParams });

		expect(mockFetch).toHaveBeenCalledWith(
			`${mockSourceUrl}/wp-includes/css/dist/block-library/style.min.css`,
			{ cache: 'force-cache', next: { revalidate: 60 * 60 * 24 } },
		);
		expect(result).toBe('');
	});

	it('returns empty string when fetch response.text() throws an error', async () => {
		const mockSourceUrl = 'https://example.com';

		mockPrepareQuery.mockReturnValue({
			config: { sourceUrl: mockSourceUrl },
			params: {},
			options: {},
			path: '',
			handleError: true,
		} as any);

		mockFetch.mockResolvedValue({
			text: jest.fn().mockRejectedValue(new Error('Text parsing error')),
		} as any);

		const result = await fetchBlockLibraryStyles({ params: mockParams });

		expect(mockFetch).toHaveBeenCalledWith(
			`${mockSourceUrl}/wp-includes/css/dist/block-library/style.min.css`,
			{ cache: 'force-cache', next: { revalidate: 60 * 60 * 24 } },
		);
		expect(result).toBe('');
	});

	it('uses correct cache configuration', async () => {
		const mockSourceUrl = 'https://example.com';

		mockPrepareQuery.mockReturnValue({
			config: { sourceUrl: mockSourceUrl },
			params: {},
			options: {},
			path: '',
			handleError: true,
		} as any);

		mockFetch.mockResolvedValue({
			text: jest.fn().mockResolvedValue('css content'),
		} as any);

		await fetchBlockLibraryStyles({ params: mockParams });

		// Verify that the correct cache options are passed
		expect(mockFetch).toHaveBeenCalledWith(
			`${mockSourceUrl}/wp-includes/css/dist/block-library/style.min.css`,
			{
				cache: 'force-cache',
				next: { revalidate: 60 * 60 * 24 }, // 24 hours in seconds
			},
		);
	});

	it('passes params correctly to prepareQuery', async () => {
		const testParams = { site: 'example.com', lang: 'en' };

		mockPrepareQuery.mockReturnValue({
			config: {},
			params: {},
			options: {},
			path: '',
			handleError: true,
		} as any);

		await fetchBlockLibraryStyles({ params: testParams });

		expect(mockPrepareQuery).toHaveBeenCalledWith({
			routeParams: testParams,
		});
	});
});
