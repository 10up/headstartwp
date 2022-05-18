import {
	usePost,
	fetchHookData,
	useAppSettings,
	addHookData,
	handleError,
	useTerms,
} from '@10up/headless-next';
import PropTypes from 'prop-types';
import { PageContent } from '../components/PageContent';
import { indexParams, indexTermsParams } from '../params';

const Homepage = ({ homePageSlug }) => {
	const params = { ...indexParams, slug: homePageSlug };
	const { error, loading } = usePost(params);
	const { loading: loadingTerms, data } = useTerms(indexTermsParams);

	if (error) {
		return 'Error...';
	}

	if (loading) {
		return 'Loading...';
	}

	return (
		<div>
			<PageContent params={params} />

			<h2>terms</h2>
			<pre>{!loadingTerms && JSON.stringify(data.terms, null, 2)}</pre>
		</div>
	);
};

Homepage.propTypes = {
	homePageSlug: PropTypes.string.isRequired,
};

export default Homepage;

export async function getStaticProps(context) {
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

		const termsData = await fetchHookData(useTerms.fetcher(), context, {
			params: indexTermsParams,
		});

		return addHookData([hookData, appSettings, termsData], { props: { homePageSlug: slug } });
	} catch (e) {
		return handleError(e, context);
	}
}
