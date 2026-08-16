import { getHeadstartWPConfig, getSite, getSiteByHost } from '@headstartwp/core';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

/**
 * Get site using context
 *
 * @param ctx
 * @returns HeadlessConfig
 * @deprecated Since v2. Supports the Next.js pages router, which is legacy. It still works in
 * v2 and is scheduled for removal in v3. Use getSiteFromParams from @headstartwp/next/app instead.
 *
 */
export function getSiteFromContext(ctx: GetServerSidePropsContext | GetStaticPropsContext) {
	// No runtime warning here on purpose: fetchHookData and handleError both call this
	// internally, so it would fire on the library's own calls and blame the consumer for an
	// API they never used. The @deprecated tag above still marks it for direct callers.
	const currentSite = ctx?.params?.site;
	const settings = getHeadstartWPConfig();

	if (currentSite && typeof currentSite === 'string') {
		const site = getSiteByHost(currentSite);

		if (site) {
			return getSite(site);
		}
	}

	return settings;
}
