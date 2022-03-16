import { HeadlessApp } from '@10up/headless-next';

// css
import '../styles.css';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	// eslint-disable-next-line react/prop-types, no-unused-vars
	const { fallback = {}, ...props } = pageProps;

	return (
		<HeadlessApp
			pageProps={pageProps}
			swrConfig={{
				/**
				 * Setting this to true will refetch content whethenever the tab is refocused
				 */
				revalidateOnFocus: false,
				/**
				 * Settings this to true will refetch content whenever the connection is restablished
				 */
				revalidateOnReconnect: false,
				/**
				 * Setting this to true will refetch content after initial load
				 */
				revalidateOnMount: false,
			}}
		>
			<Component {...props} />
		</HeadlessApp>
	);
};

export default MyApp;
