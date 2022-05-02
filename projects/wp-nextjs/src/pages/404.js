import { addHookData, fetchHookData, handleError, useAppSettings } from '@10up/headless-next';
import { resolveBatch } from '../utils/promises';

const NotFoundPage = () => {
	return <h1>404 - Page Not Found</h1>;
};

export async function getStaticProps(context) {
	try {
		// fetch batch of promises and throws errors selectively
		// passing `throw:false` will prevent errors from being thrown for that promise
		const settledPromises = await resolveBatch([
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
export default NotFoundPage;
