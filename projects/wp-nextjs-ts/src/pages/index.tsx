import {
	usePost,
	fetchHookData,
	useAppSettings,
	addHookData,
	handleError,
	usePosts,
	useTerms,
	HeadlessGetStaticProps,
} from '@headstartwp/next';
import { FetchResponse, AppEntity, PostEntity } from '@headstartwp/core';
import { FC } from 'react';
import { Link } from '../components/Link';
import { PageContent } from '../components/PageContent';
import { indexParams } from '../params';
import { resolveBatch } from '../utils/promises';

const RecentPost: FC<{ post: PostEntity }> = ({ post }) => {
	return (
		<div>
			<h3>{post.title.rendered}</h3>
		</div>
	);
};

const Homepage: FC<{ homePageSlug: string }> = ({ homePageSlug }) => {
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
		{ swr: { revalidateOnMount: true } },
	);

	const {
		data: { terms },
	} = useTerms({ taxonomy: 'category' });

	return (
		<>
			<PageContent params={params} />
			<h2>Recent Posts (loaded client-side)</h2>
			{loading
				? 'Loading Recent Posts...'
				: data.posts.map((post) => <RecentPost key={post.id} post={post} />)}

			{terms.length > 0 ? (
				<>
					<h3>Categories</h3>
					<ul>
						{terms.map((term) => (
							<li key={term.id}>
								<Link href={term.link}>{term.name}</Link>
							</li>
						))}
					</ul>
				</>
			) : null}
		</>
	);
};

export default Homepage;

interface AppSettings {
	key: string;
	data: FetchResponse<AppEntity>;
	isMainQuery: boolean;
}

export const getStaticProps: HeadlessGetStaticProps = async (context) => {
	let appSettings: AppSettings;
	let slug: string;

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
		const hookData = await resolveBatch([
			{
				func: fetchHookData(usePost.fetcher(), context, {
					params: {
						...indexParams,
						slug,
					},
				}),
			},
			{
				func: fetchHookData(useTerms.fetcher(), context, {
					params: { taxonomy: 'category' },
				}),
			},
		]);

		return addHookData([...hookData, appSettings], {
			props: { homePageSlug: slug },
			revalidate: 5 * 60,
		});
	} catch (e) {
		return handleError(e, context);
	}
};
