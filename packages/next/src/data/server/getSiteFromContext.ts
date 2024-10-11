import { getHeadlessConfig, getSite, getSiteByHost } from '@headstartwp/core';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

/**
 * Get site using context
 *
 * @param ctx
 * @returns HeadlessConfig
 */
export function getSiteFromContext(ctx: GetServerSidePropsContext | GetStaticPropsContext) {
	const currentSite = ctx?.params?.site;
	const settings = getHeadlessConfig();

	const site = getSiteByHost(currentSite as string);

	if (site) {
		return getSite(site);
	}

	return settings;
}
