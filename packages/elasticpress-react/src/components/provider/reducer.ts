import { EPState } from '../../types';
import {
	SET_RESULTS,
	SET_LOADING,
	SET_SEARCH_TERMS,
	SET_OFFSET,
	SET_SEARCH_PARAMS,
} from './actions';

export const initialState: EPState = {
	searchTerm: null,
	search: {
		per_page: 6,
		offset: 0,
		highlight: undefined,
		max_price: undefined,
		min_price: undefined,
		orderby: 'relevance',
		order: 'desc',
		post_type: undefined,
		term_relations: undefined,
		terms: undefined,
		relation: 'and',
	},
	results: {
		items: null,
		totalResults: null,
	},
	loading: false,
};

export function reducer(state, action) {
	switch (action.type) {
		case SET_RESULTS: {
			const { append, totalResults, results } = action.payload;
			return {
				...state,
				results: {
					...state.results,
					totalResults,
					items: append ? state.results.items.concat(results) : results,
				},
			};
		}
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case SET_SEARCH_TERMS:
			return {
				...state,
				searchTerm: action.payload,
			};
		case SET_OFFSET:
			return {
				...state,
				search: {
					...state.search,
					offset: action.payload,
				},
			};
		case SET_SEARCH_PARAMS:
			return {
				...state,
				search: {
					...state.search,
					...action.payload,
				},
			};
		default:
			return state;
	}
}
