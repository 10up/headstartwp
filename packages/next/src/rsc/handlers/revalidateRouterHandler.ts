import { VerifyTokenFetchStrategy } from '@headstartwp/core';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import { getHostAndConfigFromRequest } from './utils';

interface RevalidateRouteHandlerArgs {
	verifiedPath: string;
	slug: string | undefined;
	locale: string | null;
	isMultisiteRequest: boolean;
}
/**
 * Returns the path to revalidate
 *
 * @param args The arguments for revalidation
 * @returns The path to revalidate
 */
function getPathToRevalidate({
	verifiedPath,
	slug,
	locale,
	isMultisiteRequest,
}: RevalidateRouteHandlerArgs): string {
	let pathToRevalidate = verifiedPath;

	if (isMultisiteRequest && slug) {
		if (locale) {
			pathToRevalidate = `/${locale}/${slug}/${verifiedPath}`;
		} else {
			pathToRevalidate = `/${slug}/${verifiedPath}`;
		}
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
 * @param callback Optional callback function to be called after revalidation
 *
 * @returns A response object.
 *
 * @category Route handlers
 */
export async function revalidateRouteHandler(
	request: NextRequest,
	callback: ((args: RevalidateRouteHandlerArgs) => Promise<void>) | null = null,
) {
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
		config: { sourceUrl, slug },
		isMultisiteRequest,
	} = getHostAndConfigFromRequest(request);

	try {
		const verifyTokenStrategy = new VerifyTokenFetchStrategy(sourceUrl);
		const { result } = await verifyTokenStrategy.get({
			authToken: token,
			lang: typeof locale === 'string' ? locale : undefined,
			cache: 'no-store',
		});

		const verifiedPath = result.path ?? '';
		const verifiedPostId = result.post_id ?? 0;

		// make sure the path and post_id matches with what was encoded in the token
		if (verifiedPath !== path || Number(verifiedPostId) !== Number(post_id)) {
			throw new Error('Token mismatch');
		}

		const pathToRevalidate = getPathToRevalidate({
			verifiedPath,
			slug,
			locale,
			isMultisiteRequest,
		});

		revalidatePath(pathToRevalidate);

		// check if callback is set and a function before calling it
		if (callback && typeof callback === 'function') {
			await callback({ verifiedPath, slug, locale, isMultisiteRequest });
		}

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
