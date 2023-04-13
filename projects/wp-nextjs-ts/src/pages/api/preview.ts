import { previewHandler } from '@10up/headless-next';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * The Preview endpoint just needs to proxy the default preview handler
 *
 * @param {*} req Next.js request object
 * @param {*} res  Next.js response object
 *
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	return previewHandler(req, res);
}
