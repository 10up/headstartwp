import { addHookData, fetchHookData, handleError, useAppSettings } from '@10up/headless-next';

const NotFoundPage = () => {
	return <h1>404 - Page Not Found</h1>;
};

export async function getStaticProps(context) {
	try {
		const appSettings = await fetchHookData(useAppSettings.fetcher(), context);

		return addHookData([appSettings, appSettings], {});
	} catch (e) {
		return handleError(e, context);
	}
}

export default NotFoundPage;
