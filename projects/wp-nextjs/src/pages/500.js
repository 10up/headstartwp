import { addHookData, fetchHookData, handleError, useAppSettings } from '@10up/headless-next';
import { resolveBatch } from '../utils/promises';

const ServerErrorPage = () => {
	return <h1>500 - Internal Server Error</h1>;
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
export default ServerErrorPage;
