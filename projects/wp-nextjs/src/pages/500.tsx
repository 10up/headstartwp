import { addHookData, fetchHookData, handleError, useAppSettings } from '@headstartwp/next';
import Head from 'next/head';
import { resolveBatch } from '../utils/promises';

const ServerErrorPage = () => {
	const { data } = useAppSettings();

	return (
		<>
			<Head>
				<title>Error - {data.settings.site_name} </title>
				<meta name="description" content={data.settings.site_desc} />
			</Head>
			<h1>500 - Internal Server Error</h1>
		</>
	);
};

export async function getStaticProps(context) {
	try {
		// fetch batch of promises and throws errors selectively
		// passing `throw:false` will prevent errors from being thrown for that promise
		const settledPromises = await resolveBatch([
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, { revalidate: 60 });
	} catch (e) {
		return handleError(e, context);
	}
}
export default ServerErrorPage;
