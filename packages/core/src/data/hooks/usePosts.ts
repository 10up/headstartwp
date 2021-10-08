import { postsMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { EndpointParams, GetParamsFromURL } from './types';
import { useFetch } from './useFetch';

const endpoint = '/wp-json/wp/v2/posts';

interface PostsParams extends EndpointParams {
	page: number;
	per_page: number;
	search: string;
	author: number | number[];
	author_exclude: number | number[];
	exclude: number[];
	include: number[];
	offset: number;
	order: 'asc' | 'desc';
	slug: string | string[];
	orderby:
		| 'author'
		| 'date'
		| 'id'
		| 'include'
		| 'modified'
		| 'parent'
		| 'relevance'
		| 'slug'
		| 'include_slugs'
		| 'title';
	status: string | string[];
	tax_relation: 'AND' | 'OR';
	categories: number | number[];
	categories_exclude: number | number[];
	tags: number | number[];
	tags_exclude: number | number[];
	sticky: boolean;
}

const getParamsFromURL: GetParamsFromURL = (params) => {
	const { args } = params;

	if (!args) {
		return {};
	}

	const path = `/${args.join('/')}`;

	return parsePath(postsMatchers, path);
};

export function usePosts(params: PostsParams) {
	const { data, error } = useFetch(endpoint, params, getParamsFromURL);

	if (!data || error) {
		return { data, error };
	}

	return { data: data[0] };
}
