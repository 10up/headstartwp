import { PostEntity } from '../types';
import { postsMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface PostsArchiveParams extends EndpointParams {
	page: number;
	category: string;
	tag: string;
	year: string;
	month: string;
	day: string;
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

export class PostsArchiveFetchStrategy extends AbstractFetchStrategy<
	PostEntity,
	PostsArchiveParams
> {
	getParamsFromURL(params: { path?: string[] } | undefined): Partial<PostsArchiveParams> {
		if (!params?.path) {
			return {};
		}

		const { path } = params;

		return parsePath(postsMatchers, this.createPathFromArgs(path));
	}
}
