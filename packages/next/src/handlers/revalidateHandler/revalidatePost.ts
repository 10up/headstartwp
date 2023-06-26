import type { NextApiRequest, NextApiResponse } from 'next';
import { getHeadlessConfig, getSiteByHost, VerifyTokenFetchStrategy } from '@headstartwp/core';
import { fetchHookData } from '../../data';

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
		return res.status(401).json({ message: 'Invalid params' });
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
		const verifitedPostId = result.post_id ?? 0;

		// make sure the path and post_id matches with what was encoded in the token
		if (verifiedPath !== path || Number(verifitedPostId) !== Number(post_id)) {
			throw new Error('Token mismatch');
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
	} catch (err) {
		let errorMessage = 'Error verifying the token';
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		return res.status(500).json({ message: errorMessage });
	}
}
