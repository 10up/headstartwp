import { HeadlessApp } from '@headstartwp/next';
import type { AppProps } from 'next/app';
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

type MyAppProps = {
	themeJson: Record<string, unknown>;
	fallback: Record<string, unknown>;
};

const MyApp = ({ Component, pageProps }: AppProps<MyAppProps>) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
