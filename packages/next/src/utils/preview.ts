import { getWPUrl, SinglePostFetchStrategy } from '@10up/headless-core';
import type { NextApiRequest, NextApiResponse } from 'next';

const wpURL = getWPUrl();
const endpoint = '/wp-json/wp/v2/posts';

export async function previewHandler(req: NextApiRequest, res: NextApiResponse) {
	const { id, token } = req.query;

	// Fetch the headless CMS to check if the provided `slug` exists
	const fetchStrategy = new SinglePostFetchStrategy();
	fetchStrategy.setBaseURL(wpURL);
	fetchStrategy.setEndpoint(endpoint);
	const params = { id: Number(id) };
	const endpointUrl = fetchStrategy.buildEndpointURL(params);
	console.log(params, endpointUrl);
	const post = await fetchStrategy.fetcher(endpointUrl, params);

	// If the slug doesn't exist prevent preview mode from being enabled
	if (!post) {
		return res.status(401).json({ message: 'Invalid slug' });
	}

	// Enable Preview Mode by setting the cookies
	res.setPreviewData({ token });

	// Redirect to the path from the fetched post
	// We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
	return res.json(post);
}
