import { ReactNode, useMemo } from 'react';
import { SettingsProvider, ThemeSettingsProvider } from '@headstartwp/react';
import { SWRConfig } from 'swr';
import type { SettingsContextProps } from '@headstartwp/react';
import type { SWRConfiguration } from 'swr';

import { useRouter } from 'next/router';
import { getSiteByHost } from '@headstartwp/core';
import { Yoast } from './Yoast';

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

	/**
	 * If true, will make the Yoast component use the `yoast_head` raw html to populate meta tags
	 * instead of `yoast_head_json`.
	 *
	 * `yoast_head` is the default and preferable option.
	 */
	useYoastHtml?: boolean;

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
 * import { HeadlessApp } from "@headstartwp/next";
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
export function HeadlessApp({
	settings,
	children,
	pageProps,
	swrConfig = {},
	useYoastHtml = false,
}: HeadlessAppProps) {
	const { fallback = {}, seo = {}, themeJSON = { settings: {}, styles: {} } } = pageProps;
	const router = useRouter();

	// if preview mode disable revalidating
	if (router.isPreview && router.asPath.includes('-preview=true')) {
		swrConfig.revalidateOnFocus = false;
		swrConfig.revalidateOnReconnect = false;
		swrConfig.revalidateOnMount = false;
	}

	const currentSite = useMemo(() => {
		if (router.query?.site && !Array.isArray(router.query.site)) {
			return getSiteByHost(router.query.site, router.locale);
		}

		return {};
	}, [router]);

	const siteSettings = useMemo(() => ({ ...settings, ...currentSite }), [settings, currentSite]);

	return (
		<SettingsProvider settings={siteSettings}>
			<SWRConfig
				value={{
					fallback,
					...swrConfig,
				}}
			>
				<Yoast seo={seo} useHtml={useYoastHtml} />
				<ThemeSettingsProvider data={themeJSON}>{children}</ThemeSettingsProvider>
			</SWRConfig>
		</SettingsProvider>
	);
}
