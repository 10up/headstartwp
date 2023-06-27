import type { NextApiRequest, NextApiResponse } from 'next';
import { getHeadlessConfig, getSiteByHost, VerifyTokenFetchStrategy } from '@headstartwp/core';
import { fetchHookData } from '../../data';
import { ERROR_MESSAGE } from './constants';

/**
 * This handler is used by `revalidateHandler` when the query includes the
 * params needed to revalidate an archive.
 *
 * @param req The request object
 * @param res The response object
 *
 * @returns A reponse object
 */
export async function revalidateArchive(req: NextApiRequest, res: NextApiResponse) {
	const { post_type, path, locale, token } = req.query;
	const total_pages = parseInt(req.query.total_pages as string, 10);

	if (
		typeof post_type !== 'string' ||
		typeof path !== 'string' ||
		isNaN(total_pages) ||
		typeof token !== 'string'
	) {
		return res.status(401).json({ message: ERROR_MESSAGE.INVALID_PARAMS });
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
		const verifiedPostType = result.post_type ?? '';

		// make sure the path and post_type matches with what was encoded in the token
		if (verifiedPath !== path || verifiedPostType !== post_type) {
			throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
		}

		const pathsToRevalidate = [path]
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
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === ERROR_MESSAGE.INVALID_TOKEN) {
				return res.status(401).json({ message: error.message });
			}

			return res.status(500).json({ message: error.message });
		}

		return res.status(500).json({ message: ERROR_MESSAGE.GENERIC_SERVER_ERROR });
	}
}
