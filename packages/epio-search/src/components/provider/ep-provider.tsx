'use client';

import { useReducer, createContext, useCallback, useContext, useMemo, ReactElement } from 'react';
import { reducer, initialState } from './reducer';
import { getESEndpoint } from '../../utils';
import { EPContextValue, EPPost, EPProviderProps, EPState } from '../../types';

const ElasticPressContext = createContext(initialState);

const merge = (provided: Record<string, unknown>, defaultValues: Record<string, unknown>) => ({
	...defaultValues,
	...provided,
});

const defaultHitMap = (hit) => {
	return hit._source as EPPost;
};

export default function ElasticPressProvider({
	children,
	node,
	indexName,
	hitMap,
	loadInitialData = true,
	searchTerm = '',
	searchState,
	resultsState,
	onSSR,
	onSearch,
	onNavigation,
}: EPProviderProps): ReactElement {
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
			hitMap: hitMap ?? defaultHitMap,
			getEndpoint,
			dispatch,
			onSearch: onSearch ?? (() => {}),
			onNavigation: onNavigation ?? (() => {}),
		};
	}, [
		node,
		indexName,
		loadInitialData,
		state.searchTerm,
		state.search,
		state.results,
		state.loading,
		hitMap,
		getEndpoint,
		onSearch,
		onNavigation,
	]);

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
