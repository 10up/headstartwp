import { executeFetchStrategy, PostParams, SinglePostFetchStrategy } from '../strategies';
import { HeadlessConfig } from '../../types';
import { getHeadstartWPConfig, getWPUrl } from '../../utils';
import { PostEntity } from '../types';
import { getPostAuthor, getPostTerms } from '../utils';
import { QueryProps } from './types';

export async function fetchPost<
	T extends PostEntity = PostEntity,
	P extends PostParams = PostParams,
>(
	query: QueryProps<P> = {},
	_config: HeadlessConfig | undefined = undefined,
	fetcher: SinglePostFetchStrategy<T, P> | undefined = undefined,
) {
	const { params = {}, options, path = '' } = query;

	const config = _config ?? getHeadstartWPConfig();

	const { data, isMainQuery } = await executeFetchStrategy<T[], P, T>(
		fetcher ?? fetchPost.fetcher<T, P>(),
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
		data: { post },
		isMainQuery,
	};
}

fetchPost.fetcher = <T extends PostEntity = PostEntity, P extends PostParams = PostParams>(
	sourceUrl?: string,
	defaultParams?: P,
) => new SinglePostFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
