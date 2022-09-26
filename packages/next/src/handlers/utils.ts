import { getHeadlessConfig, getSite } from '@10up/headless-core';
import { NextApiRequest } from 'next';

export function isMultisiteRequest(req: NextApiRequest) {
	const { sites } = getHeadlessConfig();
	const hostname = req.headers?.host || '';

	return sites && Boolean(sites.find((site) => site.host === hostname));
}

export function getSiteFromApiRequest(req: NextApiRequest) {
	const currentSite = req.headers?.host || '';
	const settings = getHeadlessConfig();
	const site = settings.sites && settings.sites.find(({ host }) => host === currentSite);

	return getSite(site);
}
