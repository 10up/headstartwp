import { HeadlessApp } from '@headstartwp/next';
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
				 * Setting this to true will refetch content whenever the tab is refocused
				 */
				revalidateOnFocus: false,
				/**
				 * Settings this to true will refetch content whenever the connection is reestablished
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
			useYoastHtml
		>
			<Layout>
				<Component {...props} />
			</Layout>
		</HeadlessApp>
	);
};

export default MyApp;
