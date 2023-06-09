import type { NextApiRequest, NextApiResponse } from 'next';
import { getHeadlessConfig, getSiteByHost, VerifyTokenFetchStrategy } from '@headstartwp/core';
import { fetchHookData } from '../data';

interface RevalidateHandlerQuery {
	post_id?: string;
	term_ids?: string;
	post_paths?: string;
	term_paths?: string;
	total_pages?: string;
	token?: string;
	locale?: string;
}

interface TokenPayload {
	post_id?: string;
	term_ids?: string;
	post_paths?: string;
	term_paths?: string;
}

/**
 * Parses and validates an id.
 *
 * @param id The id.
 *
 * @returns An id as a number.
 */
const parseId = (id?: string | number) => {
	if (id) {
		if (typeof id === 'number') return id;
		if (typeof id === 'string') return parseInt(id, 10) || null;
	}

	return null;
};

/**
 * Parses and validates a string of ids.
 *
 * @param ids The string of ids.
 *
 * @returns An array of ids as numbers.
 */
const parseIds = (ids?: string) => {
	if (ids && typeof ids === 'string') {
		const parsedIds = ids
			.split(',')
			.map(parseId)
			.filter((id) => id !== null) as number[];

		return parsedIds;
	}

	return null;
};

/**
 * Parses and validates a path.
 *
 * @param path The path.
 *
 * @returns A path or null.
 */
const parsePath = (path?: string) => {
	if (path && typeof path === 'string') return path;

	return null;
};

/**
 * Parses and validates an array of paths as a string.
 *
 * @param paths The array of paths.
 *
 * @returns An array of paths or null.
 */
const parsePaths = (paths?: string) => {
	if (paths && typeof paths === 'string') {
		const parsedPaths = paths
			.split(',')
			.map(parsePath)
			.filter((path) => path !== null) as string[];

		return parsedPaths;
	}

	return null;
};

/**
 * Parses and validates the number of pages.
 *
 * @param total_pages The number of pages.
 *
 * @returns A number of pages or null.
 */
const parseTotalPages = (total_pages?: string) => parseId(total_pages);

/**
 * Verifies that two ids are the same.
 *
 * @param id The id from the initial request.
 * @param tokenId The id from the token.
 *
 * @returns A boolean.
 */
const verifyId = (id: number, tokenId: number | null) => {
	return !!tokenId && id === tokenId;
};

/**
 * Verifies that two arrays of ids are the same.
 *
 * @param ids The ids from the initial request.
 * @param tokenIds The ids from the token.
 *
 * @returns A boolean.
 */
const verifyIds = (ids: number[], tokenIds: number[] | null) => {
	return !!tokenIds && JSON.stringify(ids) === JSON.stringify(tokenIds);
};

/**
 * Verifies that two arrays of paths are the same.
 *
 * @param paths The paths from the initial request.
 * @param tokenPaths The paths from the token.
 *
 * @returns A boolean.
 */
// const verifyPaths = (paths: string[], tokenPaths: string[] | null) => {
// 	return !!tokenPaths && JSON.stringify(paths) === JSON.stringify(tokenPaths);
// };

/**
 * Sends a request to WP to verify the token, and receives the token payload.
 *
 * @param url The source url.
 * @param host The host.
 * @param locale The locale of the initial request.
 * @param token The token of the inital request.
 *
 * @returns The token payload.
 */
const fetchTokenData = (url?: string, host?: string, locale?: string, token?: string) => {
	return fetchHookData(
		new VerifyTokenFetchStrategy(url),
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
};

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
	// Get and parse all the values from the revalidate request.
	const query = req.query as RevalidateHandlerQuery;
	const { locale, token } = query;
	const post_id = parseId(query.post_id);
	const term_ids = parseIds(query.term_ids);
	const post_paths = parsePaths(query.post_paths);
	const term_paths = parsePaths(query.term_paths);
	const total_pages = parseTotalPages(query.total_pages);

	// If the request method is different than GET return error.
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Invalid method' });
	}

	// Set all the values needed to send the token request.
	const host = req.headers.host ?? '';
	const site = getSiteByHost(host, typeof locale === 'string' ? locale : undefined);
	const isMultisiteRequest = site !== null && typeof site.sourceUrl === 'string';
	const { sourceUrl } = isMultisiteRequest ? site : getHeadlessConfig();

	try {
		if (token) {
			const { data } = await fetchTokenData(sourceUrl, host, locale, token);

			const result = data.result as TokenPayload;

			const tokenPostId = parseId(result.post_id);
			const tokenTermIds = parseIds(result.term_ids);
			// const tokenPostPaths = parsePaths(result.post_paths);
			// const tokenTermPaths = parsePaths(result.term_paths);

			if (
				post_id &&
				verifyId(post_id, tokenPostId) &&
				term_ids &&
				verifyIds(term_ids, tokenTermIds) &&
				post_paths &&
				// verifyPaths(post_paths, tokenPostPaths) &&
				term_paths
				// verifyPaths(term_paths, tokenTermPaths)
			) {
				const postPathsToRevalidate = post_paths.map((path) => {
					let pathToRevalidate = path;

					if (isMultisiteRequest) {
						if (locale) {
							pathToRevalidate = `/_sites/${host}/${locale}/${path}`;
						}
						pathToRevalidate = `/_sites/${host}${path}`;
					}

					return pathToRevalidate;
				});

				const termPathsToRevalidate = term_paths
					.map((path) => {
						// Create an array with the numbers of total pages to revalidate.
						const pages = Array.from(Array(total_pages), (_, i) => i + 1);

						// If the page number is greater than 1, add the page sufix to the path.
						const pagedPaths = pages.map((page) => {
							return page > 1 ? `${path}/page/${page}` : path;
						});

						let pathsToRevalidate: string[] = [];

						if (isMultisiteRequest) {
							if (locale) {
								pathsToRevalidate = pagedPaths.map(
									(path) => `/_sites/${host}/${locale}${path}`,
								);
							} else {
								pathsToRevalidate = pagedPaths.map(
									(path) => `/_sites/${host}${path}`,
								);
							}
						}

						return pathsToRevalidate;
					})
					.flat();

				const postPathsRevalidations = postPathsToRevalidate.map((path) =>
					res.revalidate(path),
				);
				const termPathsRevalidations = termPathsToRevalidate.map((path) =>
					res.revalidate(path),
				);

				await Promise.all(postPathsRevalidations.concat(termPathsRevalidations));

				return res.status(200).json({
					message: 'success',
					post_paths: postPathsToRevalidate,
					term_paths: termPathsToRevalidate,
				});
			}

			throw new Error('Token mismatch');
		}

		return res.status(401).json({ message: 'Invalid params' });
	} catch (error) {
		let errorMessage = 'Error verifying the token';

		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return res.status(500).json({ message: errorMessage });
	}
}
