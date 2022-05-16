import { PropsWithChildren } from 'react';
import { SettingsProvider } from '@10up/headless-core/react';
import { SWRConfig } from 'swr';
import type { SettingsContextProps } from '@10up/headless-core/react';
import type { SWRConfiguration } from 'swr';

import { useRouter } from 'next/router';
import { ThemeProvider } from '@emotion/react';
import { Yoast } from './Yoast';

export type HeadlessAppProps = PropsWithChildren<{
	settings: SettingsContextProps;
	swrConfig: SWRConfiguration;
	pageProps: any;
}>;

export const HeadlessApp = ({
	settings,
	children,
	pageProps,
	swrConfig = {},
}: HeadlessAppProps) => {
	const { fallback = {}, seo = {}, themeJSON = { settings: {}, styles: {} } } = pageProps;
	const router = useRouter();

	// if preview mode disable revalidating
	if (router.isPreview && router.asPath.includes('-preview=true')) {
		swrConfig.revalidateOnFocus = false;
		swrConfig.revalidateOnReconnect = false;
		swrConfig.revalidateOnMount = false;
	}

	return (
		<SettingsProvider settings={settings}>
			<SWRConfig
				value={{
					fallback,
					...swrConfig,
				}}
			>
				<Yoast seo={seo} />
				<ThemeProvider theme={themeJSON}>{children}</ThemeProvider>
			</SWRConfig>
		</SettingsProvider>
	);
};
