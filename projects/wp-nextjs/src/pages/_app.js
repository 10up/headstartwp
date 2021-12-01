import { SettingsProvider, getWPUrl } from '@10up/headless-core';
import { SWRConfig } from 'swr';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	// eslint-disable-next-line react/prop-types
	const { fallback, ...props } = pageProps;
	return (
		<SettingsProvider settings={{ url: getWPUrl() }}>
			<SWRConfig value={{ fallback }}>
				<Component {...props} />
			</SWRConfig>
		</SettingsProvider>
	);
};

export default MyApp;
