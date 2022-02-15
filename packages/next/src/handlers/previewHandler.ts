import { PostEntity, SinglePostFetchStrategy } from '@10up/headless-core/data';
import { getCustomPostType } from '@10up/headless-core/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchHookData } from '../data';

type PreviewData = {
	id: number;
	postType: string;
	revision: boolean;
	authToken: string;
	// users might add custom preview data
	[k: string]: unknown;
};

type PreviewHandlerOptions = {
	onRedirect?: (
		req: NextApiRequest,
		res: NextApiResponse,
		previewData: PreviewData,
	) => NextApiResponse;

	preparePreviewData?: (
		req: NextApiRequest,
		res: NextApiResponse,
		post: PostEntity,
		previewData: PreviewData,
	) => PreviewData;
};

export async function previewHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	options: PreviewHandlerOptions = {},
) {
	const { post_id, post_type, is_revision, token } = req.query;
	const revision = is_revision === '1';
	const { data } = await fetchHookData(
		new SinglePostFetchStrategy(),
		{
			params: { path: [] },
		},
		{
			params: {
				id: post_id,
				postType: post_type,
				revision,
				authToken: token,
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

		const postTypeDef = getCustomPostType(post_type as string);

		if (!postTypeDef) {
			return res.end('Cannot preview an unkown post type');
		}

		const singleRoute = postTypeDef.single || '/';
		const prefixRoute = singleRoute === '/' ? '' : singleRoute;
		const slugOrId = revision ? post_id : slug || post_id;

		if (options?.onRedirect) {
			return options.onRedirect(req, res, previewData);
		}

		return res.redirect(`${prefixRoute}/${slugOrId}-preview=true`);
	}

	return res.end('preview mode not enabled');
}
