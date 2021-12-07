// eslint-disable-next-line
import { HeadlessApp } from '@10up/headless-next/components';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	// eslint-disable-next-line
	const { fallback = {}, ...props } = pageProps;

	return (
		<HeadlessApp pageProps={pageProps}>
			<Component {...props} />
		</HeadlessApp>
	);
};

export default MyApp;
