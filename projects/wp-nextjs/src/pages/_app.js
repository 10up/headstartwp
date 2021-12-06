import { SettingsProvider, getWPUrl, apiGet } from '@10up/headless-core';
import { SWRConfig } from 'swr';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	// eslint-disable-next-line react/prop-types
	const { fallback = {}, ...props } = pageProps;
	return (
		<SettingsProvider settings={{ url: getWPUrl() }}>
			<SWRConfig
				value={{
					fallback,
					fetcher: (url) => apiGet(`${getWPUrl()}/${url}`).then((res) => res.json),
				}}
			>
				<Component {...props} />
			</SWRConfig>
		</SettingsProvider>
	);
};

export default MyApp;
