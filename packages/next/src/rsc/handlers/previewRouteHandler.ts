import {
	CustomPostType,
	PostEntity,
	fetchPost,
	getCustomPostType,
	removeSourceUrl,
} from '@headstartwp/core';
import type { NextRequest } from 'next/server';
import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { PreviewData } from '../../handlers';
import { getHostAndConfigFromRequest } from './utils';

export const COOKIE_NAME = 'headstartwp_preview';

/**
 * The options supported by {@link previewRouteHandler}
 */
export type PreviewRouteHandlerOptions = {
	/**
	 * If passed will override the default redirect path
	 *
	 * @param options The options object
	 */
	getRedirectPath?: (options: {
		req: NextRequest;
		defaultRedirectPath: string;
		post: PostEntity;
		postTypeDef: CustomPostType;
		previewData: PreviewData;
	}) => string;

	/**
	 * If passed, this function will be called when the preview data is fetched and allows
	 * for additional preview data to be set and stored in the cookie.
	 *
	 * The preview data is stored serialized in a cookie
	 */
	preparePreviewData?: (options: {
		req: NextRequest;
		post: PostEntity;
		postTypeDef: CustomPostType;
		previewData: PreviewData;
	}) => PreviewData;

	/**
	 * If passed will override the behavior of redirecting to the previewed post. We recommend implementing `getRedirectPath` instead.
	 *
	 * If set you should handle the redirect yourself by calling `redirect` or permanentRedirect.
	 *
	 * This can be used to customize the preview url.
	 *
	 * ```ts
	 * // app/api/preview/route.ts
	 * import { previewRouteHandler } from '@headstartwp/next/app';
	 * import type { NextRequest } from 'next/server';
	 *
	 * export async function GET(request: NextRequest) {
	 *  return previewRouteHandler(
	 * 		request, {
	 * 			onRedirect(options) {
	 * 				// custom redirect logic
	 * 			}
	 * 		}
	 *  });
	 * }
	 *
	 * @param options The options object
	 */
	onRedirect?: (options: {
		req: NextRequest;
		redirectPath?: string;
		previewData: PreviewData;
		postTypeDef: CustomPostType;
		post: PostEntity;
	}) => void;
};

/**
 * The previewRouteHandler is responsible for handling preview requests in the app router
 *
 * Handling Previews requires the Headless WordPress Plugin.
 *
 * **Important**: This function is meant to be used in a api route at `/app/api/preview/route.ts`.
 *
 * #### Usage
 *
 * ```ts
 * // app/api/preview/route.ts
 * import { previewRouteHandler } from '@headstartwp/next/app';
 * import type { NextRequest } from 'next/server';
 *
 * export async function GET(request: NextRequest) {
 *  return previewRouteHandler(request);
 * }
 * ```
 *
 * @param request The request object,
 * @param options The PreviewRouteHandlerOptions {@link PreviewRouteHandlerOptions}
 *
 * @returns A response object.
 *
 * @category Route handlers
 */
export async function previewRouteHandler(
	request: NextRequest,
	options: PreviewRouteHandlerOptions = {},
) {
	const { searchParams } = request.nextUrl;
	const post_id = Number(searchParams.get('post_id') ?? 0);
	const post_type = searchParams.get('post_type');
	const is_revision = searchParams.get('is_revision');
	const token = searchParams.get('token');
	const locale = searchParams.get('locale');

	// check if post_id, post_type and token is set
	if (!post_id || !token || !post_type) {
		return new Response('Missing required params', { status: 401 });
	}

	const { config } = getHostAndConfigFromRequest(request);

	const { sourceUrl, preview } = config;

	const revision = is_revision === '1';

	const postTypeDef = getCustomPostType(post_type, sourceUrl);

	if (!postTypeDef) {
		return new Response(
			'Cannot preview an unknown post type, did you forget to add it to headstarwp.config.js?',
			{ status: 401 },
		);
	}

	const {
		data: { post },
	} = await fetchPost(
		{
			params: {
				id: Number(post_id),
				postType: post_type,
				revision,
				authToken: token as string,
				lang: typeof locale === 'string' ? locale : undefined,
			},
			options: {
				alternativePreviewAuthorizationHeader:
					preview?.alternativeAuthorizationHeader ?? false,
			},
		},
		config,
	);

	const id = Number(post_id);

	if (post?.id === id || post?.parent === id) {
		const { slug } = post;

		let previewData: PreviewData = {
			id,
			postType: post_type as string,
			revision,
			authToken: token as string,
		};

		previewData =
			typeof options.preparePreviewData === 'function'
				? options.preparePreviewData({
						req: request,
						post,
						previewData,
						postTypeDef,
					})
				: previewData;

		/**
		 * Builds the default redirect path
		 *
		 * @returns the default redirec tpath
		 */
		const getDefaultRedirectPath = () => {
			if (preview?.usePostLinkForRedirect) {
				if (
					post.status === 'draft' &&
					typeof post._headless_wp_preview_link === 'undefined'
				) {
					throw new Error(
						'You are using usePostLinkForRedirect setting but your rest response does not have _headless_wp_preview_link, ensure you are running the latest version of the plugin',
					);
				}
				const link = post._headless_wp_preview_link ?? post.link;
				return removeSourceUrl({ link: link as string, backendUrl: sourceUrl ?? '' });
			}

			const singleRoute = postTypeDef.single || '/';
			// remove leading slashes
			const prefixRoute = singleRoute.replace(/^\/+/, '');
			const slugOrId = revision ? post_id : slug || post_id;
			const path = [locale, prefixRoute, slugOrId].filter((n) => n).join('/');
			return `/${path}`;
		};

		const defaultRedirectPath = getDefaultRedirectPath();
		const redirectPath =
			typeof options.getRedirectPath === 'function'
				? options.getRedirectPath({
						req: request,
						defaultRedirectPath,
						post,
						postTypeDef,
						previewData,
					})
				: defaultRedirectPath;

		cookies().set(COOKIE_NAME, JSON.stringify(previewData), {
			maxAge: 5 * 60,
			// remove trailing slash
			path: redirectPath.replace(/\/$/, ''),
			httpOnly: true,
		});

		draftMode().enable();

		if (typeof options.onRedirect === 'function') {
			options.onRedirect({
				req: request,
				previewData,
				postTypeDef,
				post,
				redirectPath,
			});
		} else {
			redirect(redirectPath);
		}
	}

	return new Response('There was an error setting up preview', { status: 500 });
}
