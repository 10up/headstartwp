import { getHeadlessConfig, removeSourceUrl } from '@10up/headless-core';
import {
	usePost,
	fetchHookData,
	addHookData,
	handleError,
	usePosts,
	useAppSettings,
} from '@10up/headless-next';
import { PageContent } from '../../../components/PageContent';
import { singleParams } from '../../../params';
import { resolveBatch } from '../../../utils/promises';

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
 * In this specific example, we are pre-rendering the first 50 posts (within dates in the URL) and the first 50 pages.
 *
 * @returns {Promise<*>}
 */
export async function getStaticPaths() {
	const { sites } = getHeadlessConfig();
	const paths = [];
	await Promise.all(
		sites.map(async (site) => {
			const settings = await useAppSettings.fetcher(site.sourceUrl).get();
			const frontPage = settings?.result?.home?.slug ?? '';

			const fetcher = usePosts.fetcher(site.sourceUrl);

			const postsData = await fetcher.get({ postType: 'post', per_page: 50 });

			const postsPath = postsData.result.map(({ link }) => {
				return {
					// path is the catch all route, so it must be array with url segments
					// if you don't want to support date urls just remove the date from the path
					params: {
						site: site.host,
						path: removeSourceUrl({ link, backendUrl: site.sourceUrl })
							.substring(1)
							.split('/'),
					},
					locale: site.locale,
				};
			});

			const pagesData = await fetcher.get({ postType: 'page', per_page: 50 });

			const pagePaths = pagesData.result
				.map(({ link }) => {
					const normalizedLink = removeSourceUrl({ link, backendUrl: site.sourceUrl });

					if (normalizedLink === '/' || normalizedLink === frontPage) {
						return false;
					}

					return {
						// path is the catch all route, so it must be array with url segments
						params: {
							site: site.host,
							path: normalizedLink.substring(1).split('/'),
						},
						locale: site.locale,
					};
				})
				.filter(Boolean);

			paths.push(...postsPath, ...pagePaths);
		}),
	);

	return {
		paths,
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

		return addHookData(settledPromises, { revalidate: 5 * 60 });
	} catch (e) {
		return handleError(e, context);
	}
}
