import { getHeadlessConfig } from '@10up/headless-core/utils';
import {
	usePost,
	fetchHookData,
	useAppSettings,
	addHookData,
	handleError,
	usePosts,
} from '@10up/headless-next';
import PropTypes from 'prop-types';
import { PageContent } from '../../../components/PageContent';
import { indexParams } from '../../../params';

const RecentPost = ({ post }) => {
	return (
		<div>
			<h3>{post.title.rendered}</h3>
		</div>
	);
};

RecentPost.propTypes = {
	post: PropTypes.shape({ title: PropTypes.shape({ rendered: PropTypes.string }) }).isRequired,
};

const Homepage = ({ homePageSlug }) => {
	const params = { ...indexParams, slug: homePageSlug };

	// the query below is a client-side-only query
	const { loading, data } = usePosts(
		{
			// you can override any defaults supported by the REST API
			per_page: 5,
			// it is recommended to only fetch the fields you need
			_fields: ['title', 'id'],
		},
		// since this is only a client-side query
		// we want to force revalidating on mount to ensure query runs on mount
		// this is required bc we have disabled revalidateOnMount globally in _app.js
		{ revalidateOnMount: true },
	);

	return (
		<>
			<PageContent params={params} />
			<h2>Recent Posts (loaded client-side)</h2>
			{loading
				? 'Loading Recent Posts...'
				: data.posts.map((post) => <RecentPost key={post.id} post={post} />)}
		</>
	);
};

Homepage.propTypes = {
	homePageSlug: PropTypes.string.isRequired,
};

export default Homepage;

export const getStaticPaths = async () => {
	const { sites } = getHeadlessConfig();

	return {
		paths: sites.map((site) => ({
			params: {
				site: site.host,
			},
		})),
		fallback: true,
	};
};

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

		return addHookData([hookData, appSettings], {
			props: { homePageSlug: slug },
			revalidate: 5 * 60,
		});
	} catch (e) {
		return handleError(e, context);
	}
}
