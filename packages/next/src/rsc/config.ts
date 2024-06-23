import { getHeadstartWPConfig, getSiteByHost } from '@headstartwp/core';
import { headers } from 'next/headers';

/**
 * How to make this work in edge runtimes?
 */
export async function loadHeadstartWPConfig() {
	const config = getHeadstartWPConfig();
	const headersList = headers();

	const site = headersList.get('x-headstartwp-site');

	if (site) {
		return getSiteByHost(site);
	}

	return config;
}
