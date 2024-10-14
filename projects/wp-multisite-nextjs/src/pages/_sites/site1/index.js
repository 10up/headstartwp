import {
	addHookData,
	fetchHookData,
	handleError,
	useAppSettings,
	usePost,
	withSiteContext,
} from '@headstartwp/next';
import { useSettings } from '@headstartwp/core/react';
import { indexParams } from '../../../params';

const Site1Homepage = () => {
	const settings = useSettings();
	return <div>{settings.slug} Homepage</div>;
};

export default Site1Homepage;

export async function getStaticProps(_context) {
	const context = withSiteContext(_context, 'site1');

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
