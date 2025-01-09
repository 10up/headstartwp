import { EPState, EPPost } from '../../types';

export const SET_RESULTS = 'SET_RESULTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_SEARCH_TERMS = 'SET_SEARCH_TERMS';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_SEARCH_PARAMS = 'SET_SEARCH_PARAMS';

export const setSearchTerm = (value: string | null) => ({
	type: SET_SEARCH_TERMS,
	payload: value,
});

export const setLoading = (isLoading: boolean) => ({
	type: SET_LOADING,
	payload: isLoading,
});

export const setResults = ({
	results,
	totalResults,
	append = true,
}: {
	results: EPPost[];
	totalResults: number;
	append: boolean;
}) => ({
	type: SET_RESULTS,
	payload: {
		results,
		totalResults,
		append,
	},
});

export const setOffset = (offset: number) => ({
	type: SET_OFFSET,
	payload: offset,
});

export const setSearchParams = (searchParams: EPState['search']) => ({
	type: SET_SEARCH_PARAMS,
	payload: searchParams,
});
