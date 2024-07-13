import { getHeadstartWPConfig, getSiteByHost } from '@headstartwp/core';
import { NextRequest } from 'next/server';

/**
 * Gets the host and config from Next Request
 *
 * @param request The Next Request
 * @returns
 */
export function getHostAndConfigFromRequest(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const locale = searchParams.get('locale');

	const host = request.headers.get('host') ?? '';
	const site = getSiteByHost(host, typeof locale === 'string' ? locale : undefined);
	const isMultisiteRequest = site !== null && typeof site.sourceUrl === 'string';
	const config = isMultisiteRequest ? site : getHeadstartWPConfig();

	return { host, config, isMultisiteRequest };
}
