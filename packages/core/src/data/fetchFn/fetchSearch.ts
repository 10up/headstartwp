import { executeFetchStrategy, SearchNativeFetchStrategy, SearchParams } from '../strategies';
import { HeadlessConfig } from '../../types';
import { getHeadstartWPConfig, getWPUrl } from '../../utils';
import { PostSearchEntity, TermSearchEntity } from '../types';
import { QueryProps } from './types';
import { getPostAuthor, getPostTerms } from '../utils';

export async function fetchSearch<
	T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
	P extends SearchParams = SearchParams,
>(
	query: QueryProps<P> = {},
	_config: HeadlessConfig | undefined = undefined,
	fetcher: SearchNativeFetchStrategy<T, P> | undefined = undefined,
) {
	const { params = {}, options, path = '' } = query;

	const config = _config ?? getHeadstartWPConfig();

	const { data, isMainQuery } = await executeFetchStrategy<T[], P>(
		fetcher ?? fetchSearch.fetcher<T, P>(),
		config,
		params,
		options,
		path,
	);

	const { result, pageInfo, queriedObject } = data;

	const searchResults = result.map((post) => {
		if ('subtype' in post) {
			const postSearchEntity = post as PostSearchEntity;
			post.author = getPostAuthor(postSearchEntity);
			post.terms = getPostTerms(postSearchEntity);
		}

		return post;
	});

	return {
		data: { searchResults, pageInfo, queriedObject },
		isMainQuery,
	};
}

fetchSearch.fetcher = <
	T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
	P extends SearchParams = SearchParams,
>(
	sourceUrl?: string,
	defaultParams?: P,
) => new SearchNativeFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
