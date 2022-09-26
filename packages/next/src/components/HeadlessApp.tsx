import { ReactNode, useMemo } from 'react';
import { SettingsProvider, ThemeSettingsProvider } from '@10up/headless-core/react';
import { SWRConfig } from 'swr';
import type { SettingsContextProps } from '@10up/headless-core/react';
import type { SWRConfiguration } from 'swr';

import { NextRouter, useRouter } from 'next/router';
import { getHeadlessConfig, getSite } from '@10up/headless-core';
import { Yoast } from './Yoast';

function getSiteFromRouter(router: NextRouter) {
	const currentSite = router?.query?.site;
	const settings = getHeadlessConfig();
	const site =
		settings.sites &&
		settings.sites.find(({ host, locale }) => {
			if (router.locale) {
				return host === currentSite && locale === router.locale;
			}

			return host === currentSite;
		});

	return getSite(site);
}

/**
 * The props supported by {@link HeadlessApp}.
 */
export type HeadlessAppProps = {
	/**
	 * Supported settings by the framework. Such as custom image component, custom link component etc.
	 *
	 * @see {@link SettingsContextProps}
	 */
	settings: SettingsContextProps;

	/**
	 * Pass any configuration to the SWR library. Globally.
	 *
	 * These settings can be overriden at the hook level.
	 */
	swrConfig: SWRConfiguration;

	/**
	 * The page props from next.js. It should contain `fallback`, `themeJson` and other props.
	 *
	 * Those props are added when using `fetchHookData` and `addHookData`
	 *
	 * @see {@link fetchHookData}
	 * @see {@link addHookData}
	 */
	pageProps: any;

	children?: ReactNode;
};

/**
 * The HeadlessApp component is the top level component for the Headless framework.
 *
 * Should be used in `pages/_app.js`
 *
 * ## Usage
 *
 * ```tsx
 * import { HeadlessApp } from "@10up/headless-next";
 *
 * const MyApp = ({ Component, pageProps }) => {
 *	const { fallback = {}, themeJson = {}, ...props } = pageProps;
 *
 *	return (
 *		<HeadlessApp
 *			pageProps={pageProps}
 *			settings={{
 *				// Pass your own link components here
 *				linkComponent: Link,
 *			}}
 *		>
 *			<Layout>
 *				<Component {...props} />
 *			</Layout>
 *		</HeadlessApp>
 *	);
 * };
 *
 * export default MyApp;
 * ```
 *
 * @param props Component props. See {@link HeadlessAppProps}
 *
 * @category React Components
 */
export function HeadlessApp({ settings, children, pageProps, swrConfig = {} }: HeadlessAppProps) {
	const { fallback = {}, seo = {}, themeJSON = { settings: {}, styles: {} } } = pageProps;
	const router = useRouter();

	// if preview mode disable revalidating
	if (router.isPreview && router.asPath.includes('-preview=true')) {
		swrConfig.revalidateOnFocus = false;
		swrConfig.revalidateOnReconnect = false;
		swrConfig.revalidateOnMount = false;
	}

	const siteSettings = useMemo(
		() => (router?.query?.site ? { ...settings, ...getSiteFromRouter(router) } : settings),
		[settings, router],
	);

	return (
		<SettingsProvider settings={siteSettings}>
			<SWRConfig
				value={{
					fallback,
					...swrConfig,
				}}
			>
				<Yoast seo={seo} />
				<ThemeSettingsProvider data={themeJSON}>{children}</ThemeSettingsProvider>
			</SWRConfig>
		</SettingsProvider>
	);
}
