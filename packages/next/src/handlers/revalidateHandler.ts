import type { NextApiRequest, NextApiResponse } from 'next';
import { VerifyTokenFetchStrategy } from '@10up/headless-core';
import { fetchHookData } from '../data';

/**
 * The RevalidateHandler is responsible for handling revalidate requests.
 *
 * Handling revalidate requires the Headless WordPress Plugin.
 *
 * **Important**: This function is meant to be used in a api route at `/pages/api/revalidate`.
 *
 * ### Usage
 *
 * ```ts
 * // pages/api/revalidate.js
 * import { revalidateHandler } from '@10up/headless-next';
 *
 * export default async function handler(req, res) {
 * 	return revalidateHandler(req, res);
 * }
 * ```
 *
 * @param req The request object,
 * @param res The response object.
 *
 * @returns A response object.
 *
 * @category API handlers
 */
export async function revalidateHandler(req: NextApiRequest, res: NextApiResponse) {
	const { post_id, path, token } = req.query;

	if (req.method !== 'GET') {
		return res.status(401).json({ message: 'Invalid method' });
	}

	if (!path || !post_id || !token) {
		return res.status(401).json({ message: 'Missing required params' });
	}

	if (typeof path !== 'string' || typeof post_id !== 'string' || typeof token !== 'string') {
		return res.status(401).json({ message: 'Invalid params' });
	}

	// call WordPress API to check token
	try {
		const { data } = await fetchHookData(
			new VerifyTokenFetchStrategy(),
			{
				params: { path: [] },
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

		if (verifiedPath !== path || Number(verifitedPostId) !== Number(post_id)) {
			throw new Error('Token mismatch');
		}

		await res.revalidate(path);
		return res.status(200).json({ revalidated: true });
	} catch (err) {
		let errorMessage = 'Error verifying the token';
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		return res.status(500).json({ message: errorMessage });
	}
}
