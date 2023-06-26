import type { NextApiRequest, NextApiResponse } from 'next';
import { getHeadlessConfig, getSiteByHost, VerifyTokenFetchStrategy } from '@headstartwp/core';
import { fetchHookData } from '../../data';

/**
 * This handler is used by `revalidateHandler` when the query includes the
 * params needed to revalidate terms.
 *
 * @param req The request object
 * @param res The response object
 *
 * @returns A reponse object
 */
export async function revalidateTerms(req: NextApiRequest, res: NextApiResponse) {
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
			pathsToRevalidate.map(async (path) =>
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
