import type { NextApiRequest, NextApiResponse } from 'next';
import { getHeadlessConfig, getSiteByHost, VerifyTokenFetchStrategy } from '@headstartwp/core';
import { fetchHookData } from '../../data';
import { ERROR_MESSAGE } from './constants';

/**
 * This handler is used by `revalidateHandler` when the query includes the
 * params needed to revalidate a post.
 *
 * @param req The request object
 * @param res The response object
 *
 * @returns A reponse object
 */
export async function revalidatePost(req: NextApiRequest, res: NextApiResponse) {
	const { post_id, path, token, locale } = req.query;

	if (typeof path !== 'string' || typeof post_id !== 'string' || typeof token !== 'string') {
		return res.status(401).json({ message: ERROR_MESSAGE.INVALID_PARAMS });
	}

	try {
		const host = req.headers.host ?? '';
		const site = getSiteByHost(host, typeof locale === 'string' ? locale : undefined);
		const isMultisiteRequest = site !== null && typeof site.sourceUrl === 'string';
		const { sourceUrl } = isMultisiteRequest ? site : getHeadlessConfig();

		const { data } = await fetchHookData(
			new VerifyTokenFetchStrategy(sourceUrl),
			{
				params: {
					path: [],
					site: host,
				},
				locale: typeof locale === 'string' ? locale : undefined,
			},
			{
				params: {
					authToken: token,
				},
			},
		);

		const result = data.result as any;
		const verifiedPath = result.path ?? '';
		const verifiedPostId = result.post_id ?? 0;

		// make sure the path and post_id matches with what was encoded in the token
		if (verifiedPath !== path || Number(verifiedPostId) !== Number(post_id)) {
			throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
		}

		let pathToRevalidate = path;

		if (isMultisiteRequest) {
			if (locale) {
				pathToRevalidate = `/_sites/${host}/${locale}${path}`;
			} else {
				pathToRevalidate = `/_sites/${host}${path}`;
			}
		}

		await res.revalidate(pathToRevalidate);
		return res.status(200).json({ message: 'success', path: pathToRevalidate });
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === ERROR_MESSAGE.INVALID_TOKEN) {
				return res.status(401).json({ message: error.message });
			}

			return res.status(500).json({ message: error.message });
		}

		return res.status(500).json({ message: ERROR_MESSAGE.GENERIC_SERVER_ERROR });
	}
}
