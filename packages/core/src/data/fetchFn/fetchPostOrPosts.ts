import {
	executeFetchStrategy,
	PostOrPostsFetchStrategy,
	PostOrPostsFetchStrategyResult,
	PostOrPostsParams,
} from '../strategies';
import { HeadlessConfig } from '../../types';
import { getHeadstartWPConfig, getWPUrl } from '../../utils';
import { PageInfo, PostEntity, QueriedObject } from '../types';
import { getPostAuthor, getPostTerms } from '../utils';
import { QueryProps } from './types';
import { getPageTypeForQuery, PageType } from './fetchPosts';

export type FetchPostsOrPostsReturnType<T> = {
	isArchive: boolean;
	isSingle: boolean;
	pageType?: PageType;
	isMainQuery: boolean;
	data: {
		posts?: T[];
		post?: T;
		pageInfo: PageInfo;
		queriedObject: QueriedObject;
	};
};

export async function fetchPostOrPosts<
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
>(
	query: QueryProps<P> = {},
	_config: HeadlessConfig | undefined = undefined,
	fetcher: PostOrPostsFetchStrategy<T, P> | undefined = undefined,
): Promise<FetchPostsOrPostsReturnType<T>> {
	const { params = {}, options, path = '' } = query;

	const config = _config ?? getHeadstartWPConfig();

	const {
		data: { result, pageInfo, queriedObject },
		isMainQuery,
	} = await executeFetchStrategy<T[], P, PostOrPostsFetchStrategyResult<T>>(
		fetcher ?? fetchPostOrPosts.fetcher<T, P, PostOrPostsFetchStrategyResult<T>>(),
		config,
		params,
		options,
		path,
	);

	if (result.isArchive && Array.isArray(result.data)) {
		const pageType = getPageTypeForQuery(query.params?.archive ?? {}, config);

		const posts = result.data.map((post) => {
			return { ...post, author: getPostAuthor(post), terms: getPostTerms(post) };
		});

		return {
			data: { posts, pageInfo, queriedObject: queriedObject ?? {} },
			isArchive: result.isArchive,
			isSingle: result.isSingle,
			pageType,
			isMainQuery,
		};
	}

	if (result.isSingle && !Array.isArray(result.data)) {
		const post = {
			...result.data,
			author: getPostAuthor(result.data),
			terms: getPostTerms(result.data),
		};

		return {
			// TODO do we need pageInfo and queriedObject here?
			data: { post, pageInfo, queriedObject },
			isArchive: result.isArchive,
			isSingle: result.isSingle,
			isMainQuery,
		};
	}

	throw new Error('Unrecognized error');
}

fetchPostOrPosts.fetcher = <
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
	R extends PostOrPostsFetchStrategyResult<T> = PostOrPostsFetchStrategyResult<T>,
>(
	sourceUrl?: string,
	defaultParams?: P,
) => new PostOrPostsFetchStrategy<T, P, R>(sourceUrl ?? getWPUrl(), defaultParams);
