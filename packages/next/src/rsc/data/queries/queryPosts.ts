import { HeadlessConfig, PostEntity, PostsArchiveParams, fetchPosts } from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';

type QueryPostsReturnType<T extends PostEntity, P extends PostsArchiveParams> = Awaited<
	ReturnType<typeof fetchPosts<T, P>>
>;

export async function queryPosts<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
	Error extends boolean = true,
>(
	q: NextQueryProps<P, Error> = {},
	_config: HeadlessConfig | undefined = undefined,
): Promise<Error extends true ? QueryPostsReturnType<T, P> : Partial<QueryPostsReturnType<T, P>>> {
	const { config, handleError, ...query } = prepareQuery<P, Error>(q, _config);

	try {
		const result = await fetchPosts<T, P>(query, config);

		return result;
	} catch (error) {
		if (handleError) {
			if (error instanceof Error) {
				await handleFetchError(error, config, query.path);
			}
			throw error;
		}

		// @ts-expect-error
		return {} as unknown as Partial<QueryPostsReturnType<T, P>>;
	}
}
