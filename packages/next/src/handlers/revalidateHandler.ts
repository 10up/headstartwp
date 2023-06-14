import type { NextApiRequest, NextApiResponse } from 'next';
import { getHeadlessConfig, getSiteByHost, VerifyTokenFetchStrategy } from '@headstartwp/core';
import { fetchHookData } from '../data';

/**
 * Extraction of the fetching logic of the token, to be reused
 * in post and terms handlers.
 *
 * @param sourceUrl The source url.
 * @param host The host.
 * @param token The token.
 * @param locale The locale.
 *
 * @returns A data object with the parsed info from the token.
 */
async function fetchTokenData(
	sourceUrl: string | undefined,
	host: string,
	token: string,
	locale: unknown,
) {
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

	return data;
}

/**
 * This handler is used by `revalidateHandler` when the query includes the
 * params needed to revalidate a post.
 *
 * @param req The request object
 * @param res The response object
 *
 * @returns A reponse object
 */
async function revalidatePost(req: NextApiRequest, res: NextApiResponse) {
	const { post_id, path, token, locale } = req.query;

	if (typeof path !== 'string' || typeof post_id !== 'string' || typeof token !== 'string') {
		return res.status(401).json({ message: 'Invalid params' });
	}

	try {
		const host = req.headers.host ?? '';
		const site = getSiteByHost(host, typeof locale === 'string' ? locale : undefined);
		const isMultisiteRequest = site !== null && typeof site.sourceUrl === 'string';
		const { sourceUrl } = isMultisiteRequest ? site : getHeadlessConfig();

		const data = await fetchTokenData(sourceUrl, host, token, locale);

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
				pathToRevalidate = `/_sites/${host}/${locale}/${path}`;
			}
			pathToRevalidate = `/_sites/${host}${path}`;
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

/**
 * This handler is used by `revalidateHandler` when the query includes the
 * params needed to revalidate terms.
 *
 * @param req The request object
 * @param res The response object
 *
 * @returns A reponse object
 */
async function revalidateTerms(req: NextApiRequest, res: NextApiResponse) {
	const { token, locale } = req.query;
	const total_pages = parseInt(req.query.total_pages as string, 10);

	if (
		typeof req.query.terms_ids !== 'string' ||
		typeof req.query.paths !== 'string' ||
		isNaN(total_pages) ||
		typeof token !== 'string'
	) {
		return res.status(401).json({ message: 'Invalid params' });
	}

	const terms_ids = req.query.terms_ids.split(',').map((id) => parseInt(id, 10));
	const paths = req.query.paths.split(',');

	try {
		const host = req.headers.host ?? '';
		const site = getSiteByHost(host, typeof locale === 'string' ? locale : undefined);
		const isMultisiteRequest = site !== null && typeof site.sourceUrl === 'string';
		const { sourceUrl } = isMultisiteRequest ? site : getHeadlessConfig();

		const data = await fetchTokenData(sourceUrl, host, token, locale);

		const result = data.result as any;
		const verifiedPaths = result.paths ?? [];
		const verifiedTermsIds = result.terms_ids ?? [];

		// make sure the paths and terms_ids matches with what was encoded in the token
		if (
			JSON.stringify(verifiedPaths) !== JSON.stringify(paths) ||
			JSON.stringify(verifiedTermsIds) !== JSON.stringify(terms_ids)
		) {
			throw new Error('Token mismatch');
		}

		const pathsToRevalidate = paths
			.map((path) => {
				// Create an array with the numbers of total pages to revalidate.
				// If the page number is greater than 1, add the page sufix to the path.
				const pagedPaths = Array.from({ length: total_pages }, (_, i) => i + 1).map(
					(page: number) => {
						return page > 1 ? `${path}/page/${page}` : path;
					},
				);

				if (isMultisiteRequest) {
					if (locale) {
						return pagedPaths.map((path) => `/_sites/${host}/${locale}${path}`);
					}

					return pagedPaths.map((path) => `/_sites/${host}${path}`);
				}

				return pagedPaths;
			})
			.flat();

		const revalidateResults = await Promise.all(
			pathsToRevalidate.map((path) =>
				res
					.revalidate(path)
					.then(() => path)
					.catch(() => null),
			),
		);

		const pathsRevalidated = revalidateResults.filter(Boolean);

		return res.status(200).json({ message: 'success', paths: pathsRevalidated });
	} catch (err) {
		let errorMessage = 'Error verifying the token';
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		return res.status(500).json({ message: errorMessage });
	}
}

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
	const { post_id, path, terms_ids, paths, total_pages, token } = req.query;

	if (req.method !== 'GET') {
		return res.status(401).json({ message: 'Invalid method' });
	}

	if (post_id && path && token) {
		return revalidatePost(req, res);
	}

	if (terms_ids && paths && total_pages && token) {
		return revalidateTerms(req, res);
	}

	return res.status(401).json({ message: 'Missing required params' });
}
