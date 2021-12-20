import { getWPUrl, SettingsProvider, UserProvider } from '@10up/headless-core';
import { SWRConfig } from 'swr';
import { Yoast } from './Yoast';

export const HeadlessApp = ({ settings = { url: getWPUrl() }, children, pageProps }) => {
	const { fallback = {}, seo = {} } = pageProps;
	return (
		<SettingsProvider settings={settings}>
			<UserProvider>
				<SWRConfig
					value={{
						fallback,
					}}
				>
					<Yoast seo={seo} />
					{children}
				</SWRConfig>
			</UserProvider>
		</SettingsProvider>
	);
};
