'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useElasticPress } from '../components/provider/ep-provider';
import { setSearchTerm, setLoading, setResults, setOffset } from '../components/provider/actions';
import { runEPQuery } from '../utils';
import type { EPSearchParams, EPOrderBy, EPOrder, EPContextValue } from '../types';

export function useSearch() {
	const abortControllerRef = useRef<AbortController | null>(null);
	const {
		dispatch,
		searchTerm,
		search,
		results,
		hitMap,
		loadInitialData,
		getEndpoint,
		onSearch,
		loading,
	} = useElasticPress();

	const refine = useCallback(
		async (
			value: string | null,
			options: EPContextValue['search'] & {
				append?: boolean;
				minSearchCharacters?: number;
			} = {},
		) => {
			if (loading && abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
			abortControllerRef.current = new AbortController();
			const { signal } = abortControllerRef.current;

			const minSearchCharacters = options?.minSearchCharacters ?? 3;
			const offset = options?.offset ?? 0;
			const append = options?.append ?? false;
			const orderby = options?.orderby ?? search.orderby;
			const order = options?.order ?? search.order;
			const per_page = options?.per_page ?? search.per_page;
			const template_name = options?.template_name ?? null;

			dispatch(setSearchTerm(value));

			// if value being searched is empty string and loadInitialData is true we need to reload initial data
			if (typeof value === 'string' && value.length === 0 && loadInitialData) {
				refine(null, options);
				return;
			}

			if (typeof value === 'string' && value.length < minSearchCharacters) {
				return;
			}

			dispatch(setLoading(true));

			const searchState: EPSearchParams = {
				...search,
				offset,
				orderby,
				order,
				per_page,
				searchTerm: value,
			};
			if (template_name) {
				searchState.template_name = template_name;
			}

			try {
				const { results, totalResults } = await runEPQuery(
					searchState, // we've already checked that searchTerm is not null
					getEndpoint(),
					hitMap,
					signal,
				);

				onSearch(searchState);

				dispatch(setResults({ results, totalResults, append }));
				dispatch(setOffset(offset));
			} catch (exception) {
				// setError();
			} finally {
				dispatch(setLoading(false));
			}
		},
		[loading, search, dispatch, loadInitialData, getEndpoint, hitMap, onSearch],
	);

	const loadMore = useCallback(() => {
		refine(searchTerm, {
			minSearchCharacters: 0,
			offset: Number(search.offset) + Number(search.per_page),
			append: true,
		});
	}, [refine, search.offset, search.per_page, searchTerm]);

	const setOrderBy = useCallback(
		(value: EPOrderBy) => {
			refine(searchTerm, {
				minSearchCharacters: 0,
				orderby: value,
			});
		},
		[refine, searchTerm],
	);

	const setOrder = useCallback(
		(value: EPOrder) => {
			refine(searchTerm, {
				minSearchCharacters: 0,
				order: value,
			});
		},
		[refine, searchTerm],
	);

	const setPerPage = useCallback(
		(value: number) => {
			refine(searchTerm, {
				minSearchCharacters: 0,
				per_page: value,
			});
		},
		[refine, searchTerm],
	);

	const setTemplateName = useCallback(
		(value: string) => {
			refine(searchTerm, {
				minSearchCharacters: 0,
				template_name: value,
			});
		},
		[refine, searchTerm],
	);

	// loadInitialData
	useEffect(() => {
		if (!loading && results.totalResults === null && loadInitialData) {
			refine(null);
		}
	}, [refine, results.totalResults, loadInitialData, loading]);

	useEffect(() => {
		return () => {
			// Abort the fetch request on cleanup
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	return { refine, search, results, loadMore, setOrderBy, setOrder, setPerPage, setTemplateName };
}
