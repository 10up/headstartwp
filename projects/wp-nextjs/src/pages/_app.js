import { HeadlessApp } from '@10up/headless-next';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Link } from '../components/Link';
import Layout from '../components/Layout';

import '../styles.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	// eslint-disable-next-line react/prop-types, no-unused-vars
	const { fallback = {}, themeJson = {}, ...props } = pageProps;

	return (
		<HeadlessApp
			pageProps={pageProps}
			swrConfig={{
				/**
				 * Setting this to true will refetch content whethenever the tab is refocused
				 */
				revalidateOnFocus: true,
				/**
				 * Settings this to true will refetch content whenever the connection is restablished
				 */
				revalidateOnReconnect: false,
				/**
				 * Setting this to true will refetch content after initial load
				 */
				revalidateOnMount: false,
			}}
			settings={{
				linkComponent: Link,
			}}
		>
			<Layout>
				<Component {...props} />
			</Layout>
		</HeadlessApp>
	);
};

export default MyApp;
