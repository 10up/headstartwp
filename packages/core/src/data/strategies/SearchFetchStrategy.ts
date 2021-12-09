import { SearchEntity } from '../types';
import { searchMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface SearchParams extends EndpointParams {
	page: number;
	per_page: number;
	search: string;
	type: 'post' | 'term' | 'post-format';
	subtype: 'post' | 'page' | 'category' | 'post_tag';
}

export class SearchFetchStrategy extends AbstractFetchStrategy<SearchEntity, SearchParams> {
	getParamsFromURL(params: { path?: string[] } | undefined): Partial<SearchParams> {
		if (!params?.path) {
			return {};
		}

		const { path } = params;

		return parsePath(searchMatchers, this.createPathFromArgs(path));
	}
}
