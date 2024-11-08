import {
	HeadlessGetStaticProps,
	addHookData,
	fetchHookData,
	handleError,
	useAppSettings,
} from '@headstartwp/next';
import Head from 'next/head';
import { resolveBatch } from '../utils/promises';

const NotFoundPage = () => {
	const { data } = useAppSettings();

	return (
		<>
			<Head>
				<title>{`Page Not Found - ${data.settings.site_name}`}</title>
				<meta name="description" content={data.settings.site_desc} />
			</Head>
			<h1>404 - Page Not Found</h1>
		</>
	);
};

export const getStaticProps = (async (context) => {
	try {
		// fetch batch of promises and throws errors selectively
		// passing `throw:false` will prevent errors from being thrown for that promise
		const settledPromises = await resolveBatch([
			{ func: fetchHookData(useAppSettings.fetcher(), context) },
		]);

		return addHookData(settledPromises, { revalidate: 60 });
	} catch (e) {
		return handleError(e, context);
	}
}) satisfies HeadlessGetStaticProps;

export default NotFoundPage;
