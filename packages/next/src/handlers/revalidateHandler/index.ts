import type { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePost } from './revalidatePost';
import { revalidateArchive } from './revalidateArchive';
import { revalidateTerms } from './revalidateTerms';
import { ERROR_MESSAGE } from './constants';

/**
 * The RevalidateHandler is responsible for handling revalidate requests.
 *
 * Handling revalidate requires the Headless WordPress Plugin.
 *
 * **Important**: This function is meant to be used in a api route e.g: `/pages/api/revalidate`.
 *
 * ### Usage
 *
 * ```ts
 * // pages/api/revalidate.js
 * import { revalidateHandler } from '@headstartwp/next';
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
	const { post_id, post_type, path, terms_ids, paths, total_pages, token } = req.query;

	if (req.method !== 'GET') {
		return res.status(401).json({ message: ERROR_MESSAGE.INVALID_METHOD });
	}

	if (post_id && path && token) {
		return revalidatePost(req, res);
	}

	if (post_type && path && total_pages && token) {
		return revalidateArchive(req, res);
	}

	if (terms_ids && paths && total_pages && token) {
		return revalidateTerms(req, res);
	}

	return res.status(401).json({ message: ERROR_MESSAGE.MISSING_PARAMS });
}
