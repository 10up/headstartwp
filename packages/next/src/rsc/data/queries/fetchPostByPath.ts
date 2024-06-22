import { FetchOptions, HeadlessConfig, PostEntity, PostParams, fetchPost } from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { convertToPath } from '../../../data/convertToPath';

export async function fetchPostByPath<
	T extends PostEntity = PostEntity,
	P extends PostParams = PostParams,
>(
	path: string | string[],
	params: P | {} = {},
	options: Partial<FetchOptions> = {},
	_config: HeadlessConfig | undefined = undefined,
) {
	const pathname = Array.isArray(path) ? convertToPath(path) : path;

	try {
		const result = await fetchPost<T, P>(params, options, pathname, _config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			handleFetchError(error, pathname);
		}
		throw error;
	}
}
