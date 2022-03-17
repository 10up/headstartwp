import {
	usePost,
	fetchHookData,
	useAppSettings,
	addHookData,
	handleError,
} from '@10up/headless-next';
import PropTypes from 'prop-types';
import { PageContent } from '../components/PageContent';
import { indexParams } from '../params';

const Homepage = ({ homePageSlug }) => {
	const params = { ...indexParams, slug: homePageSlug };
	const { error, loading } = usePost(params);

	if (error) {
		return 'Error...';
	}

	if (loading) {
		return 'Loading...';
	}

	return (
		<div>
			<PageContent params={params} />
		</div>
	);
};

Homepage.propTypes = {
	homePageSlug: PropTypes.string.isRequired,
};

export default Homepage;

export async function getStaticProps(context) {
	try {
		const appSettings = await fetchHookData(useAppSettings.fetcher(), context);
		const slug = appSettings.data.result?.home?.slug || 'front-page';
		const hookData = await fetchHookData(usePost.fetcher(), context, {
			params: {
				...indexParams,
				slug,
			},
		});

		return addHookData([hookData, appSettings], { props: { homePageSlug: slug } });
	} catch (e) {
		return handleError(e, context);
	}
}
