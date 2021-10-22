import { SettingsProvider } from '@10up/headless-core';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	return (
		<SettingsProvider settings={{ url: 'https://js1.10up.com' }}>
			<Component {...pageProps} />
		</SettingsProvider>
	);
};

export default MyApp;
