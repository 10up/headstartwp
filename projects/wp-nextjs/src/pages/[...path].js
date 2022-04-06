import {
	usePost,
	fetchHookData,
	addHookData,
	handleError,
	usePosts,
	useAppSettings,
} from '@10up/headless-next';
import { PageContent } from '../components/PageContent';
import { singleParams } from '../params';

const SinglePostsPage = () => {
	const { loading, error } = usePost(singleParams);

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<PageContent params={singleParams} />
		</div>
	);
};

export default SinglePostsPage;

/**
 * This is an example of pre-rendering a set of pages at build times.
 * In this specific example, we are pre-rendering the first 50 posts (withn dates in the URL) and the first 50 pages.
 *
 * @returns {Promise<*>}
 */
export async function getStaticPaths() {
	const postsData = await usePosts.fetcher().get({ postType: 'post', per_page: 50 });

	const postsPath = postsData.result.map(({ date, slug }) => {
		const dateString = new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});

		const datePath = dateString.split('/');

		return {
			// path is the catch all route, so it must be array with url segments
			// if you don't want to support date urls just remove the date from the path
			params: { path: [...datePath, slug] },
		};
	});

	const pagesData = await usePosts.fetcher().get({ postType: 'page', per_page: 50 });

	const pagePaths = pagesData.result.map(({ slug }) => {
		return {
			// path is the catch all route, so it must be array with url segments
			params: { path: [slug] },
		};
	});

	return {
		paths: [...postsPath, ...pagePaths],
		fallback: 'blocking',
	};
}

export async function getStaticProps(context) {
	try {
		// using allSettled bc we still want to proceed if fetching appSettings fails
		const promises = await Promise.allSettled([
			fetchHookData(usePost.fetcher(), context, { params: singleParams }),
			fetchHookData(useAppSettings.fetcher(), context),
		]);

		const [data] = promises;

		// allSettled will never reject so we must re-throw the error ourselves if the post is not found
		if (data.status === 'rejected') {
			throw data.reason;
		}

		const fulfilledPromises = promises
			.filter(({ status }) => status === 'fulfilled')
			.map(({ value }) => value);

		return addHookData(fulfilledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
