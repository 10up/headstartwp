import { reducer, initialState } from '../reducer';
import {
	SET_RESULTS,
	SET_LOADING,
	SET_SEARCH_TERMS,
	SET_OFFSET,
	SET_SEARCH_PARAMS,
} from '../actions';

describe('search reducer', () => {
	it('should handle SET_RESULTS with append false', () => {
		const payload = {
			append: false,
			totalResults: 10,
			results: ['result1', 'result2'],
		};
		expect(reducer(initialState, { type: SET_RESULTS, payload })).toEqual({
			...initialState,
			results: {
				totalResults: 10,
				items: ['result1', 'result2'],
			},
		});
	});

	it('should handle SET_RESULTS with append true', () => {
		const state = {
			...initialState,
			results: {
				items: ['existing'],
				totalResults: 5,
			},
		};
		const payload = {
			append: true,
			totalResults: 10,
			results: ['new'],
		};
		expect(reducer(state, { type: SET_RESULTS, payload })).toEqual({
			...state,
			results: {
				totalResults: 10,
				items: ['existing', 'new'],
			},
		});
	});

	it('should handle SET_LOADING', () => {
		expect(reducer(initialState, { type: SET_LOADING, payload: true })).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should handle SET_SEARCH_TERMS', () => {
		expect(reducer(initialState, { type: SET_SEARCH_TERMS, payload: 'test' })).toEqual({
			...initialState,
			searchTerm: 'test',
		});
	});

	it('should handle SET_OFFSET', () => {
		expect(reducer(initialState, { type: SET_OFFSET, payload: 10 })).toEqual({
			...initialState,
			search: {
				...initialState.search,
				offset: 10,
			},
		});
	});

	it('should handle SET_SEARCH_PARAMS', () => {
		expect(
			reducer(initialState, {
				type: SET_SEARCH_PARAMS,
				payload: { orderby: 'date', per_page: 12 },
			}),
		).toEqual({
			...initialState,
			search: {
				...initialState.search,
				orderby: 'date',
				per_page: 12,
			},
		});
	});
});
