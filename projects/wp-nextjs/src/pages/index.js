import {
	usePost,
	fetchHookData,
	useAppSettings,
	addHookData,
	handleError,
	usePosts,
} from '@10up/headless-next';
import PropTypes from 'prop-types';
import { PageContent } from '../components/PageContent';
import { indexParams } from '../params';

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
	const { loading, data } = usePosts({ per_page: 5, _fields: ['title', 'id'] });

	return (
		<>
			<PageContent params={params} />
			<h2>Recent Posts</h2>
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
			revalidate: 10,
		});
	} catch (e) {
		return handleError(e, context);
	}
}
