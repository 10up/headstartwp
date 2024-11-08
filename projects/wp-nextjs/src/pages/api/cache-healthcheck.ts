import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Some hosting requires a health-check endpoint to monitor site availability
 *
 * @param req Next.js request
 * @param res Next.js response
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).send('Ok');
}
