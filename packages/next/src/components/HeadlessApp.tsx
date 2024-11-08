import { ReactNode, useMemo } from 'react';
import {
	DataFetchingProviderProps,
	DataFetchingProvider,
	SettingsProvider,
	ThemeSettingsProvider,
} from '@headstartwp/core/react';
import type { SettingsContextProps } from '@headstartwp/core/react';

import { useRouter } from 'next/router.js';
import { getSiteByHost } from '@headstartwp/core';
import { Yoast } from './Yoast';
import { seoKey } from '../data/hooks/useSeo';

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
	 * These settings can be overridden at the hook level.
	 */
	swrConfig: DataFetchingProviderProps['swrConfig'];

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

	/**
	 * If true, will automatically load yoast seo metadata into the head
	 *
	 * @default true
	 */
	handleYoast?: boolean;

	children?: ReactNode;
};

/**
 * The HeadlessApp component is the top level component for the Headless framework.
 *
 * Should be used in `pages/_app.js`
 *
 * #### Usage
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
	handleYoast = true,
}: HeadlessAppProps) {
	const {
		fallback = {},
		seo = {},
		themeJSON = { settings: {}, styles: {} },
		__headstartwp_site = '',
	} = pageProps;
	const router = useRouter();

	// if preview mode disable revalidating
	if (router.isPreview && router.asPath.includes('-preview=true')) {
		swrConfig.revalidateOnFocus = false;
		swrConfig.revalidateOnReconnect = false;
		swrConfig.revalidateOnMount = false;
	}

	if (typeof seo?.yoast_head_json !== 'undefined' || typeof seo?.yoast_head !== 'undefined') {
		fallback[seoKey] = seo;
	}

	const currentSite = useMemo(() => {
		if (__headstartwp_site) {
			return getSiteByHost(__headstartwp_site, router.locale);
		}
		if (router.query?.site && !Array.isArray(router.query.site)) {
			return getSiteByHost(router.query.site, router.locale);
		}

		return {};
	}, [router, __headstartwp_site]);

	const siteSettings = useMemo(() => ({ ...settings, ...currentSite }), [settings, currentSite]);

	return (
		<SettingsProvider settings={siteSettings}>
			<DataFetchingProvider
				swrConfig={swrConfig}
				data={fallback as DataFetchingProviderProps['swrConfig']['fallback']}
			>
				{handleYoast ? <Yoast seo={seo} useHtml={useYoastHtml} /> : null}
				<ThemeSettingsProvider data={themeJSON}>{children}</ThemeSettingsProvider>
			</DataFetchingProvider>
		</SettingsProvider>
	);
}
