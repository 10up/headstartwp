import { getSiteByHost, PostEntity } from '@10up/headless-core';
import { getCustomPostType, getHeadlessConfig } from '@10up/headless-core/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchHookData, usePost } from '../data';
import { PreviewData } from './types';

/**
 * The options supported by {@link previewHandler}
 */
export type PreviewHandlerOptions = {
	/**
	 * If passed will override the behavior of redirecting to the previewed post.
	 *
	 * If set you should handle the redirect yourself by calling `res.redirect`.
	 *
	 * **Important**: You should not need to override this but if you do, uou must append `-preview=true` to the end of the redirected url.
	 *
	 * This can be used to customize the preview url.
	 *
	 * ```ts
	 * // pages/api/preview.js
	 * import { previewHandler } from '@10up/headless-next';
	 *
	 * export default async function handler(req, res) {
	 * 	return previewHandler(req, res, {
	 * 		onRedirect(req, res, previewData) => {
	 *			res.redirect(`/my-custom-preview-route/${previewData.id}-preview=true`);
	 * 		}
	 * 	});
	 * }
	 * ```
	 */
	onRedirect?: (
		req: NextApiRequest,
		res: NextApiResponse,
		previewData: PreviewData,
		defaultRedirect?: PreviewHandlerOptions['onRedirect'],
	) => NextApiResponse;

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

/**
 * The PreviewHandler is responsible for handling preview requests.
 *
 * Handling Previews requires the Headless WordPress Plugin.
 *
 * **Important**: This function is meant to be used in a api route at `/pages/api/preview`.
 *
 * ### Usage
 *
 * ```ts
 * // pages/api/preview.js
 * import { previewHandler } from '@10up/headless-next';
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
) {
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

	const { sourceUrl } = isMultisiteRequest ? site : getHeadlessConfig();

	const revision = is_revision === '1';
	try {
		const { data } = await fetchHookData(
			usePost.fetcher(sourceUrl),
			{
				params: {
					path: [],
					site: req.headers.host,
				},
			},
			{
				params: {
					id: Number(post_id),
					postType: post_type,
					revision,
					authToken: token as string,
				},
			},
		);

		const id = Number(post_id);

		const result = Array.isArray(data?.result) ? data.result[0] : data.result;

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

			res.setPreviewData(previewData);

			const postTypeDef = getCustomPostType(post_type as string, sourceUrl);

			if (!postTypeDef) {
				return res.end('Cannot preview an unkown post type');
			}

			const defaultRedirect: PreviewHandlerOptions['onRedirect'] = (req, res) => {
				const singleRoute = postTypeDef.single || '/';
				const prefixRoute = singleRoute === '/' ? '' : singleRoute;
				const slugOrId = revision ? post_id : slug || post_id;

				return res.redirect(`${prefixRoute}/${slugOrId}-preview=true`);
			};

			if (options?.onRedirect) {
				return options.onRedirect(req, res, previewData, defaultRedirect);
			}

			return defaultRedirect(req, res, previewData);
		}
	} catch (e) {
		if (e instanceof Error) {
			return res.status(401).end(e.message);
		}
	}

	return res.status(401).end('Unable to set preview mode');
}
