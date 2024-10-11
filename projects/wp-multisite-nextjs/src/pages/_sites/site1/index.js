import {
	addHookData,
	fetchHookData,
	handleError,
	useAppSettings,
	usePost,
} from '@headstartwp/next';
import { indexParams } from '../../../params';

const Site1Homepage = () => {
	return <div>Site 1 Homepage</div>;
};

export default Site1Homepage;

export async function getStaticProps(context) {
	// TODO: create a utlity function to decorate context for a specific site
	context.params = { site: 'site1' };

	let appSettings;
	let slug;
	try {
		appSettings = await fetchHookData(useAppSettings.fetcher(), context);
		/**
		 * The static front-page can be set in the WP admin. The default one will be 'front-page'
		 */
		slug = appSettings.data.result?.home?.slug ?? 'front-page';
	} catch (e) {
		if (e.name === 'EndpointError') {
			slug = 'front-page';
		}
	}

	try {
		const hookData = await fetchHookData(usePost.fetcher(), context, {
			params: {
				...indexParams,
				slug,
			},
		});

		return addHookData([hookData, appSettings], {
			props: { homePageSlug: slug },
			revalidate: 5 * 60,
		});
	} catch (e) {
		return handleError(e, context);
	}
}
