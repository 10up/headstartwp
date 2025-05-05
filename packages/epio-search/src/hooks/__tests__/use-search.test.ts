import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../use-search';
import { useElasticPress } from '../../components/provider/ep-provider';
import { runEPQuery } from '../../utils';

jest.mock('../../components/provider/ep-provider');
jest.mock('../../utils');

describe('useSearch', () => {
	const mockDispatch = jest.fn();
	const mockOnSearch = jest.fn();
	const mockGetEndpoint = jest.fn();
	beforeEach(() => {
		jest.clearAllMocks();
		(useElasticPress as jest.Mock).mockReturnValue({
			dispatch: mockDispatch,
			searchTerm: null,
			search: {
				offset: 0,
				per_page: 10,
				orderby: 'relevance',
				order: 'desc',
			},
			results: { totalResults: null },
			hitMap: {},
			loadInitialData: false,
			getEndpoint: mockGetEndpoint,
			onSearch: mockOnSearch,
		});
		(runEPQuery as jest.Mock).mockResolvedValue({
			results: [],
			totalResults: 0,
		});
	});

	it('should not search if search term is less than minSearchCharacters', async () => {
		const { result } = renderHook(() => useSearch());
		await act(async () => {
			await result.current.refine('ab');
		});

		expect(mockDispatch).toHaveBeenCalledTimes(1);
		expect(runEPQuery).not.toHaveBeenCalled();
	});

	it('should search when term meets minimum length', async () => {
		const { result } = renderHook(() => useSearch());

		await act(async () => {
			await result.current.refine('abc');
		});

		expect(mockDispatch).toHaveBeenCalledTimes(5);
		expect(runEPQuery).toHaveBeenCalled();
		expect(mockOnSearch).toHaveBeenCalled();
	});

	it('should load more results', async () => {
		const { result } = renderHook(() => useSearch());

		await act(async () => {
			await result.current.loadMore();
		});

		expect(mockDispatch).toHaveBeenCalled();
		expect(runEPQuery).toHaveBeenCalled();
	});

	it('should update order by', async () => {
		const { result } = renderHook(() => useSearch());

		await act(async () => {
			await result.current.setOrderBy('date');
		});

		expect(mockDispatch).toHaveBeenCalled();
		expect(runEPQuery).toHaveBeenCalled();
	});

	it('should load initial data when enabled', async () => {
		(useElasticPress as jest.Mock).mockReturnValue({
			...useElasticPress(),
			loadInitialData: true,
			results: { totalResults: null },
		});

		renderHook(() => useSearch());

		expect(runEPQuery).toHaveBeenCalled();
	});
});
