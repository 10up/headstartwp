import { executeFetchStrategy, PostParams, SinglePostFetchStrategy } from '../strategies';
import { HeadlessConfig } from '../../types';
import { getHeadstartWPConfig, getWPUrl } from '../../utils';
import { PostEntity } from '../types';
import { getPostAuthor, getPostTerms } from '../utils';
import { QueryProps } from './types';

/**
 * The useFetchPost hook. Returns a single post entity
 *
 * See {@link usePost} for usage instructions.
 *
 * @param config
 * @param HeadlessConfig
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @param query
 * @param _config
 * @module useFetchPost
 * @category Data Fetching Hooks
 */
export async function fetchPost<
	T extends PostEntity = PostEntity,
	P extends PostParams = PostParams,
>(query: QueryProps<P>, _config: HeadlessConfig | undefined = undefined) {
	const { params = {}, options, path = '' } = query;

	const config = _config ?? getHeadstartWPConfig();

	const { data, isMainQuery } = await executeFetchStrategy<T[], P, T>(
		fetchPost.fetcher<T, P>(),
		config,
		params,
		options,
		path,
	);

	const post = {
		...data.result,
		author: getPostAuthor(data.result),
		terms: getPostTerms(data.result),
	};

	return {
		data: { post, pageInfo: data.pageInfo, queriedObject: data.queriedObject },
		isMainQuery,
	};
}

fetchPost.fetcher = <T extends PostEntity = PostEntity, P extends PostParams = PostParams>(
	sourceUrl?: string,
	defaultParams?: P,
) => new SinglePostFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
