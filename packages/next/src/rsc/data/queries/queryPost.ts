import { HeadlessConfig, PostEntity, PostParams, fetchPost } from '@headstartwp/core';
import { cookies, draftMode } from 'next/headers';
import { handleFetchError } from '../handleFetchError';
import { prepareQuery } from './prepareQuery';
import { NextQueryProps } from './types';
import { PreviewData } from '../../../handlers';
import { COOKIE_NAME } from '../../handlers/previewRouteHandler';

export async function queryPost<
	T extends PostEntity = PostEntity,
	P extends PostParams = PostParams,
>(q: NextQueryProps<P>, _config: HeadlessConfig | undefined = undefined) {
	const { config, ...query } = prepareQuery<P>(q, _config);

	try {
		const { isEnabled } = draftMode();

		if (isEnabled && cookies().has(COOKIE_NAME)) {
			const previewData: PreviewData = JSON.parse(cookies().get(COOKIE_NAME)?.value ?? '{}');

			if (!query.params) {
				query.params = {};
			}

			if (query.params) {
				query.params.id = previewData.id;
				query.params.revision = previewData.revision;
				query.params.postType = previewData.postType;
				query.params.authToken = previewData.authToken;
			}
		}

		// todo: find a way to disable preview mode
		const result = await fetchPost<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
