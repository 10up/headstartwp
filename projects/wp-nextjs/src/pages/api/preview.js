import { getCustomPostType } from '@10up/headless-core/utils';
import { fetchHookData } from '@10up/headless-next/data';

export default async function handler(req, res) {
	const { post_id, post_type, is_revision, token } = req.query;
	const revision = is_revision === '1';
	const { data } = await fetchHookData(
		'usePost',
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
		res.setPreviewData({
			id,
			postType: post_type,
			revision,
			authToken: token,
		});

		const postTypeDef = getCustomPostType(post_type);
		const singleRoute = postTypeDef.single || '/';
		const prefixRoute = singleRoute === '/' ? '' : singleRoute;
		const slugOrId = revision ? post_id : slug || post_id;
		console.log(`${prefixRoute}/${slugOrId}`);
		return res.redirect(`${prefixRoute}/${slugOrId}`);
	}

	return res.end('preview mode not enabled');
}
