import { PropsWithChildren } from 'react';
import { getWPUrl, SettingsProvider } from '@10up/headless-core';
import { SWRConfig } from 'swr';

import type { SettingsContextProps } from '@10up/headless-core';
import type { SWRConfiguration } from 'swr';

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
	const { fallback = {}, seo = {} } = pageProps;

	return (
		<SettingsProvider settings={settings || { url: getWPUrl() }}>
			<SWRConfig
				value={{
					fallback,
					...swrConfig,
				}}
			>
				<Yoast seo={seo} />
				{children}
			</SWRConfig>
		</SettingsProvider>
	);
};
