'use client';

import { useReducer, createContext, useCallback, useContext, useMemo } from 'react';
import { reducer, initialState } from './reducer';
import { getESEndpoint } from '../../utils';
import { EPContextValue, EPPost, EPProviderProps, EPState } from '../../types';

const ElasticPressContext = createContext(initialState);

const merge = (provided: Record<string, unknown>, defaultValues: Record<string, unknown>) => ({
	...defaultValues,
	...provided,
});

export default function ElasticPressProvider({
	children,
	node,
	indexName,
	hitMap = (hit) => {
		return hit._source as EPPost;
	},
	loadInitialData = true,
	searchTerm = '',
	searchState,
	resultsState,
	onSSR,
	onSearch = () => {},
}: EPProviderProps): JSX.Element {
	if (!node) {
		throw new Error('You must specify an ElasticSearch node');
	}
	if (!indexName) {
		throw new Error('You must specify an indexName');
	}

	const [state, dispatch]: [EPState, React.Dispatch<any>] = useReducer(reducer, {
		...initialState,
		searchTerm: searchTerm ?? initialState.searchTerm,
		search: searchState ? merge(searchState, initialState.search) : initialState.search,
		results: resultsState ? merge(resultsState, initialState.results) : initialState.results,
	});

	/**
	 * Returns the ES endpoint for the desired query.
	 */
	const getEndpoint = useCallback(() => {
		return getESEndpoint({
			node,
			indexName,
		});
	}, [indexName, node]);

	const contextValue: EPContextValue = useMemo(() => {
		return {
			node,
			indexName,
			loadInitialData,
			searchTerm: state.searchTerm,
			search: state.search,
			results: state.results,
			loading: state.loading,
			hitMap,
			getEndpoint,
			dispatch,
			onSearch,
		};
	}, [state, node, indexName, loadInitialData, hitMap, getEndpoint, onSearch]);

	if (typeof window === 'undefined' && typeof onSSR === 'function') {
		onSSR(contextValue);
	}

	return (
		<ElasticPressContext.Provider value={contextValue}>{children}</ElasticPressContext.Provider>
	);
}

export function useElasticPress() {
	return useContext(ElasticPressContext) as EPContextValue;
}
