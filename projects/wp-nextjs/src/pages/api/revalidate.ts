import { revalidateHandler } from '@headstartwp/next';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * The revalidate endpoint just needs to proxy the default revalidate handler
 *
 * @param req Next.js request
 * @param res Next.js response
 *
 * @returns the revalidate handler
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	return revalidateHandler(req, res);
}
