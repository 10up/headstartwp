import { previewHandler } from '@headstartwp/next';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * The Preview endpoint just needs to proxy the default preview handler
 *
 * @param req Next.js request
 * @param res Next.js response
 *
 * @returns the preview handler
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	return previewHandler(req, res);
}
