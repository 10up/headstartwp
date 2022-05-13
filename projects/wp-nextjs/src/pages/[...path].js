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
import { resolveBatch } from '../utils/promises';

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
		// fetch batch of promises and throws errors selectively
		// passing `throw:false` will prevent errors from being thrown for that promise
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePost.fetcher(), context, { params: singleParams }),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
