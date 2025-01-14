import { EPPost } from '../../../types';
import { setSearchTerm, setLoading, setResults, setOffset, setSearchParams } from '../actions';
import { SET_SEARCH_TERMS, SET_LOADING, SET_RESULTS, SET_OFFSET, SET_SEARCH_PARAMS } from '../actions';

describe('search actions', () => {
	test('setSearchTerm creates correct action', () => {
		const term = 'test search';
		expect(setSearchTerm(term)).toEqual({
			type: SET_SEARCH_TERMS,
			payload: term
		});
	});

	test('setLoading creates correct action', () => {
		expect(setLoading(true)).toEqual({
			type: SET_LOADING, 
			payload: true
		});
	});

	test('setResults creates correct action', () => {
		const results = [{post_id: 1, post_title: 'Test Post'}] as EPPost[];
		const totalResults = 1;
		expect(setResults({results, totalResults, append: true})).toEqual({
			type: SET_RESULTS,
			payload: {
				results,
				totalResults,
				append: true
			}
		});
	});

	test('setOffset creates correct action', () => {
		expect(setOffset(10)).toEqual({
			type: SET_OFFSET,
			payload: 10
		});
	});

	test('setSearchParams creates correct action', () => {
		const params = {
			term: 'test',
			offset: 0
		};
		expect(setSearchParams(params)).toEqual({
			type: SET_SEARCH_PARAMS,
			payload: params
		});
	});
});