import type { ReactNode } from 'react';
import type { WP_Post } from 'wp-types';

export type EPPost = WP_Post & {
	post_id: number;
	post_author: {
		raw: string;
		login: string;
		display_name: string;
		id: number;
	};
	permalink: string;
	terms: Record<string, unknown>;
	meta: Record<string, string | string[] | { value: unknown }[] | undefined>;
	date_terms: Record<string, number | undefined>;
	[key: string]: unknown;
};

export interface EPConfig {
	node: string;
	indexName?: string;
}

export type EPHit =
	| {
			_index: string;
			_id: string;
			_score: number;
			_source: EPPost;
			hightlight:
				| {
						post_title?: string[];
						post_content_plain?: string[];
				  }
				| undefined;
	  }
	| Record<string, unknown>;

export type EPHitMap = (value: EPHit) => EPPost;

type SearchOrSearchTerm = { search?: null | string; searchTerm?: null | string };
export type EPSearchParams = EPState['search'] & SearchOrSearchTerm;

export interface EPProviderProps {
	searchTerm?: string;
	children: ReactNode;
	hitMap?: EPHitMap;
	indexName: string | undefined;
	loadInitialData?: boolean;
	node: string | undefined;
	searchState?: EPSearchParams;
	resultsState?: Pick<EPState, 'results'>;
	endpoint?: string;
	onSSR?: (contextValue: EPContextValue) => void;
	onSearch?: (searchState: EPSearchParams) => void;
	onNavigation?: (result: EPPost) => void;
}

export type EPOrderBy = 'date' | 'price' | 'relevance';
export type EPOrder = 'asc' | 'desc';
export interface EPState {
	searchTerm: null | string;
	search: {
		per_page?: number;
		highlight?: string;
		max_price?: number;
		min_price?: number;
		offset?: number;
		orderby?: EPOrderBy;
		order?: EPOrder;
		post_type?: string;
		term_relations?: string;
		terms?: number[];
		relation?: 'and' | 'or';
		template_name?: string | null;
	};
	results: {
		items: EPPost[] | null;
		totalResults: null | number;
	};
	loading: boolean;
}

export interface EPContextValue
	extends EPState,
		Omit<EPProviderProps, 'children' | 'searchState' | 'resultsState' | 'searchTerm'> {
	getEndpoint: () => string;
	dispatch: React.Dispatch<any>;
	hitMap: EPHitMap;
	onSearch: (searchState: EPSearchParams) => void;
}

export interface EPResponse {
	took: number;
	timed_out: boolean;
	_shards: {
		total: number;
		successful: number;
		skipped: number;
		failed: number;
	};
	hits: {
		hits: EPHit[];
		total: {
			value: number;
		};
		max_score: number;
	};
}

export interface SearchFieldProps {
	initialValue?: string;
	name?: string;
	minSearchCharacters?: number;
	searchTerm?: string;
	debounceMs?: number;
}
