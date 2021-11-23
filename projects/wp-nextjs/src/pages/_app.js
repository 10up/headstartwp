import { SettingsProvider } from '@10up/headless-core';
import { SWRConfig } from 'swr';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	return (
		<SettingsProvider settings={{ url: 'https://js1.10up.com' }}>
			<SWRConfig value={{ fallback: pageProps?.fallback }}>
				<Component {...pageProps} />
			</SWRConfig>
		</SettingsProvider>
	);
};

export default MyApp;
