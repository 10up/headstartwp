'use client';

import { useCallback, useEffect } from 'react';
import { useElasticPress } from '../components/provider/ep-provider';
import { setSearchTerm, setLoading, setResults, setOffset } from '../components/provider/actions';
import { runEPQuery } from '../utils';
import type { EPSearchParams, EPOrderBy, EPOrder, EPContextValue } from '../types';

export function useSearch() {
	const {
		dispatch,
		searchTerm,
		search,
		results,
		hitMap,
		loadInitialData,
		getEndpoint,
		onSearch,
	} = useElasticPress();

	const refine = useCallback(
		async (
			value: string | null,
			options: EPContextValue['search'] & {
				append?: boolean;
				minSearchCharacters?: number;
			} = {},
		) => {
			const minSearchCharacters = options?.minSearchCharacters ?? 3;
			const offset = options?.offset ?? 0;
			const append = options?.append ?? false;
			const orderby = options?.orderby ?? search.orderby;
			const order = options?.order ?? search.order;
			const per_page = options?.per_page ?? search.per_page;

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

			try {
				const { results, totalResults } = await runEPQuery(
					searchState, // we've already checked that searchTerm is not null
					getEndpoint(),
					hitMap,
				);

				onSearch(searchState);

				dispatch(setResults({ results, totalResults, append }));
				dispatch(setOffset(offset));
			} catch (exception) {
				// setError();
			}

			dispatch(setLoading(false));
		},
		[dispatch, onSearch, search, hitMap, loadInitialData, getEndpoint],
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

	// loadInitialData
	useEffect(() => {
		if (results.totalResults === null && loadInitialData) {
			refine(null);
		}
	}, [refine, results.totalResults, loadInitialData]);

	return { refine, search, results, loadMore, setOrderBy, setOrder, setPerPage };
}
