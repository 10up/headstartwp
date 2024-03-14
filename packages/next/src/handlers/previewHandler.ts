/* eslint-disable consistent-return */
import { CustomPostType, getSiteByHost, PostEntity, removeSourceUrl } from '@headstartwp/core';
import { getCustomPostType, getHeadstartWPConfig } from '@headstartwp/core/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchHookData, usePost } from '../data';
import { PreviewData } from './types';

/**
 * The options supported by {@link previewHandler}
 */
export type PreviewHandlerOptions = {
	/**
	 * If passed will override the behavior of redirecting to the previewed post. We recommend implementing `getRedirectPath` instead. If you
	 * absolutely need to implement a custom redirect handler, we also suggest you implement `getRedirectPath` so that the preview cookie only
	 * applies to the specific path.
	 *
	 * If set you should handle the redirect yourself by calling `res.redirect`.
	 *
	 * **Important**: You should not need to override this but if you do, uou must append `-preview=true` to the end of the redirected url.
	 *
	 * This can be used to customize the preview url.
	 *
	 * ```ts
	 * // pages/api/preview.js
	 * import { previewHandler } from '@headstartwp/next';
	 *
	 * export default async function handler(req, res) {
	 * 	return previewHandler(req, res, {
	 * 		onRedirect(req, res, previewData) => {
	 *			res.redirect(`/my-custom-preview-route/${previewData.id}-preview=true`);
	 * 		}
	 * 	});
	 * }
	 * ```
	 *
	 * @param req The NextApiRequest object
	 * @param res The NextApiResponse object
	 * @param previewData The previewData object
	 * @param defaultRedirect The default redirect function
	 * @param redirectPath The default redirect path or the one implemented in {@link PreviewHandlerOptions['getRedirectPath']}
	 */
	onRedirect?: (
		req: NextApiRequest,
		res: NextApiResponse,
		previewData: PreviewData,
		defaultRedirect?: PreviewHandlerOptions['onRedirect'],
		redirectpath?: string,
	) => void;

	/**
	 * If passed will override the default redirect path
	 *
	 * **Important**: You should not need to override this but if you do, uou must append `-preview=true` to the end of the redirecte path.
	 *
	 * @param defaultRedirectPath the default redirect path
	 * @param post PostEntity
	 * @param postTypeDef The object describing a post type
	 *
	 * @returns the new redirect path
	 */
	getRedirectPath?: (
		defaultRedirectPath: string,
		post: any,
		postTypeDef: CustomPostType,
	) => string;

	/**
	 * If passed, this function will be called when the preview data is fetched and allows
	 * for additional preview data to be set.
	 *
	 * The preview data is then passed to `res.setPreviewData`. Be mindful of limitations of this function.
	 * You should not pass full post objects, just ids and other data that can be used to fetch the post.
	 */
	preparePreviewData?: (
		req: NextApiRequest,
		res: NextApiResponse,
		post: PostEntity,
		previewData: PreviewData,
	) => PreviewData;
};

function withPreviewSuffix(path: string) {
	const suffix = '-preview=true';
	// remove trailing slash
	const normalizePath = path.replace(/\/+$/, '');

	if (normalizePath.endsWith(suffix)) {
		return normalizePath;
	}

	return `${[normalizePath]}${suffix}`;
}

/**
 * The PreviewHandler is responsible for handling preview requests.
 *
 * Handling Previews requires the Headless WordPress Plugin.
 *
 * **Important**: This function is meant to be used in a api route at `/pages/api/preview`.
 *
 * #### Usage
 *
 * ```ts
 * // pages/api/preview.js
 * import { previewHandler } from '@headstartwp/next';
 *
 * export default async function handler(req, res) {
 * 	return previewHandler(req, res);
 * }
 * ```
 *
 * @param req The request object,
 * @param res The response object.
 * @param options The PreviewHandlerOptions {@link PreviewHandlerOptions}
 *
 * @returns A response object.
 *
 * @category API handlers
 */
export async function previewHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	options: PreviewHandlerOptions = {},
): Promise<void> {
	const { post_id, post_type, is_revision, token, locale } = req.query;

	if (req.method !== 'GET') {
		return res.status(401).json({ message: 'Invalid method' });
	}

	if (!post_id || !token || !post_type) {
		return res.status(401).json({ message: 'Missing required params' });
	}

	const site = getSiteByHost(
		req.headers?.host ?? '',
		typeof locale === 'string' ? locale : undefined,
	);
	const isMultisiteRequest = site !== null && typeof site.sourceUrl === 'string';

	const { sourceUrl, preview } = isMultisiteRequest ? site : getHeadstartWPConfig();

	const revision = is_revision === '1';

	try {
		const postTypeDef = getCustomPostType(post_type as string, sourceUrl);

		if (!postTypeDef) {
			res.status(401).end(
				'Cannot preview an unknown post type, did you forget to add it to headless.config.js?',
			);
			return;
		}

		const { data } = await fetchHookData(
			usePost.fetcher(sourceUrl),
			{
				params: {
					path: [],
					site: req.headers?.host,
				},
				locale: typeof locale === 'string' ? locale : undefined,
			},
			{
				params: {
					id: Number(post_id),
					postType: post_type,
					revision,
					authToken: token as string,
				},
				fetchStrategyOptions: {
					alternativePreviewAuthorizationHeader:
						preview?.alternativeAuthorizationHeader ?? false,
				},
			},
		);

		const id = Number(post_id);

		const result: PostEntity = Array.isArray(data?.result) ? data.result[0] : data.result;

		if (result?.id === id || result?.parent === id) {
			const { slug } = result;

			let previewData: PreviewData = {
				id,
				postType: post_type as string,
				revision,
				authToken: token as string,
			};

			if (options.preparePreviewData) {
				previewData = options.preparePreviewData(req, res, result, previewData);
			}

			/**
			 * Builds the default redirect path
			 *
			 * @returns the default redirec tpath
			 */
			const getDefaultRedirectPath = () => {
				if (preview?.usePostLinkForRedirect) {
					if (
						result.status === 'draft' &&
						typeof result._headless_wp_preview_link === 'undefined'
					) {
						throw new Error(
							'You are using usePostLinkForRedirect setting but your rest response does not have _headless_wp_preview_link, ensure you are running the latest version of the plugin',
						);
					}
					const link = result._headless_wp_preview_link ?? result.link;
					return removeSourceUrl({ link: link as string, backendUrl: sourceUrl ?? '' });
				}

				const singleRoute = postTypeDef.single || '/';
				// remove leading slashes
				const prefixRoute = singleRoute.replace(/^\/+/, '');
				const slugOrId = revision ? post_id : slug || post_id;
				const path = [locale, prefixRoute, slugOrId].filter((n) => n).join('/');
				return `/${path}`;
			};

			const redirectPath =
				typeof options.getRedirectPath === 'function'
					? withPreviewSuffix(
							options.getRedirectPath(getDefaultRedirectPath(), result, postTypeDef),
						)
					: withPreviewSuffix(getDefaultRedirectPath());

			// we should set the path cookie if onRedirect is undefined (i.e we're just using default behasvior)
			// or if user has supplied getRedirectPath from which we can get the actual path
			const shouldSetPathInCookie =
				typeof options.onRedirect === 'undefined' ||
				typeof options.getRedirectPath === 'function';

			res.setPreviewData(previewData, {
				maxAge: 5 * 60,
				// we can only safely narrow the cookei to a path if getRedirectPath is implemented or
				// it's using the default behavior without a custom onRedirect
				path: shouldSetPathInCookie ? redirectPath : '/',
			});

			const defaultRedirect: PreviewHandlerOptions['onRedirect'] = (req, res) => {
				res.redirect(redirectPath);
			};

			if (options?.onRedirect) {
				return options.onRedirect(req, res, previewData, defaultRedirect, redirectPath);
			}

			return defaultRedirect(req, res, previewData);
		}
	} catch (e) {
		if (e instanceof Error) {
			res.status(401).end(e.message);
		}
	}

	res.status(401).end('There was an error setting up preview');
}
