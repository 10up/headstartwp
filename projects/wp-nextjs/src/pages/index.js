import { usePost, fetchHookData, addHookData } from '@10up/headless-next/data';
import { handleError } from '@10up/headless-next';
import PropTypes from 'prop-types';
import { PageContent } from '../components/PageContent';

const params = {
	postType: 'page',
};

const Homepage = ({ homePageSlug }) => {
	params.slug = homePageSlug;
	const { data } = usePost(params);

	return <div>{data ? <PageContent params={params} /> : 'loading...'}</div>;
};

Homepage.propTypes = {
	homePageSlug: PropTypes.string.isRequired,
};

export default Homepage;

export async function getStaticProps(context) {
	try {
		const appSettings = await fetchHookData('useAppSettings', context);
		const slug = appSettings.data.result?.home?.slug || 'front-page';
		const hookData = await fetchHookData('usePost', context, {
			params: {
				slug,
				...params,
			},
		});

		return addHookData([hookData], { props: { homePageSlug: slug } });
	} catch (e) {
		return handleError(e, context);
	}
}
