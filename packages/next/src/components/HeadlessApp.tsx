import { getWPUrl, SettingsProvider } from '@10up/headless-core';
import { SWRConfig } from 'swr';
import { Yoast } from './Yoast';

export const HeadlessApp = ({ settings, children, pageProps }) => {
	const { fallback = {}, seo = {} } = pageProps;
	return (
		<SettingsProvider settings={settings || { url: getWPUrl() }}>
			<SWRConfig
				value={{
					fallback,
				}}
			>
				<Yoast seo={seo} />
				{children}
			</SWRConfig>
		</SettingsProvider>
	);
};
