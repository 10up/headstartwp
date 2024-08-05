import { HeadlessConfig, PostEntity, PostOrPostsParams, fetchPostOrPosts } from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';
import { prepareSEOMetadata } from '../seo';

export async function queryPostOrPosts<
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
>(q: NextQueryProps<P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { config, handleError, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchPostOrPosts<T, P>(query, config);

		if (result.isSingle && result.data.post) {
			return {
				...result,
				seo: prepareSEOMetadata(result.data.post, config),
			};
		}

		return {
			...result,
			config,
			seo: prepareSEOMetadata(result.data.queriedObject, config),
		};
	} catch (error) {
		if (error instanceof Error && handleError) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
