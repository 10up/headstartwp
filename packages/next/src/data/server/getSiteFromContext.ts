import { getHeadlessConfig, getSite } from '@10up/headless-core';
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

	const site =
		settings.sites &&
		settings.sites.find(({ host, locale }) => {
			if (ctx.locale) {
				return host === currentSite && locale === ctx.locale;
			}

			return host === currentSite;
		});

	if (site) {
		return getSite(site);
	}

	return settings;
}
