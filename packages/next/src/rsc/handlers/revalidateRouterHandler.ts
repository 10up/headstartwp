import { VerifyTokenFetchStrategy } from '@headstartwp/core';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import { getHostAndConfigFromRequest } from './utils';
/**
 * Returns the path to revalidate
 *
 * @param path The path being revalidated
 * @param host The host for which the path is being revalidated
 * @param locale The locale for which the path is being revalidated
 * @param isMultisiteRequest Whether this is a multisite request
 * @returns
 */
function getPathToRevalidate(
	path: string,
	host: string,
	locale: string | null,
	isMultisiteRequest: boolean,
) {
	let pathToRevalidate = path;

	if (isMultisiteRequest) {
		if (locale) {
			pathToRevalidate = `/_sites/${host}/${locale}/${path}`;
		}
		pathToRevalidate = `/_sites/${host}${path}`;
	}

	return pathToRevalidate;
}

/**
 * The revalidateRouteHandler is responsible for handling revalidate requests in Route Requests.
 *
 * Handling revalidate requires the Headless WordPress Plugin.
 *
 * **Important**: This function is meant to be used in a route handler route e.g: `/app/api/revalidate/route.ts`.
 *
 * #### Usage
 *
 * ```ts
 * import { revalidateRouteHandler } from '@headstartwp/next/app';
 * import type { NextRequest } from 'next/server';
 *
 * export async function GET(request: NextRequest) {
 *	return revalidateRouteHandler(request);
 * }
 * ```
 *
 * @param request The Next Request
 *
 * @returns A response object.
 *
 * @category Route handlers
 */
export async function revalidateRouteHandler(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const post_id = Number(searchParams.get('post_id') ?? 0);
	const path = searchParams.get('path');
	const token = searchParams.get('token');
	const locale = searchParams.get('locale');

	if (!path || !post_id || !token) {
		return new Response('Missing required params', { status: 401 });
	}

	if (typeof path !== 'string' || typeof token !== 'string') {
		return new Response('Invalid params', { status: 401 });
	}

	const {
		host,
		config: { sourceUrl },
		isMultisiteRequest,
	} = getHostAndConfigFromRequest(request);

	try {
		const verifyTokenStrategy = new VerifyTokenFetchStrategy(sourceUrl);
		const { result } = await verifyTokenStrategy.get({
			authToken: token,
			// TODO: check if this is correct (it's a separate github issue)
			lang: typeof locale === 'string' ? locale : undefined,
		});

		const verifiedPath = result.path ?? '';
		const verifiedPostId = result.post_id ?? 0;

		// make sure the path and post_id matches with what was encoded in the token
		if (verifiedPath !== path || Number(verifiedPostId) !== Number(post_id)) {
			throw new Error('Token mismatch');
		}

		const pathToRevalidate = getPathToRevalidate(
			verifiedPath,
			host,
			locale,
			isMultisiteRequest,
		);

		revalidatePath(pathToRevalidate);

		return new Response(JSON.stringify({ message: 'success', path: pathToRevalidate }), {
			status: 200,
		});
	} catch (err) {
		let errorMessage = 'Error verifying the token';
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		return new Response(errorMessage, { status: 500 });
	}
}
