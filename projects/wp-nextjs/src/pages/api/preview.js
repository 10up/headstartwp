import { previewHandler } from '@headstartwp/next';

/**
 * The Preview endpoint just needs to proxy the default preview handler
 *
 * @param {*} req Next.js request object
 * @param {*} res  Next.js response object
 *
 * @returns
 */
export default async function handler(req, res) {
	return previewHandler(req, res);
}
