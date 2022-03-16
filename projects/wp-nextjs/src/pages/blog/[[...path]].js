import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
} from '@10up/headless-next';

const BlogPage = () => {
	const { loading, error, data } = usePosts();

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
	}

	return (
		<ul>
			{data.posts.map((post) => (
				<li key={post.id}>{post.title.rendered}</li>
			))}
		</ul>
	);
};

export default BlogPage;

export async function getServerSideProps(context) {
	try {
		const postsData = await fetchHookData(usePosts.fetcher(), context, {
			// filtering is recommended for performance reasons to reduce the ammount of props that Next.js has to send via the HTML payload
			// You can either ALLOW especific fields or REMOVE especific fields.
			filterData: { method: 'ALLOW', fields: ['id', 'title'] },
		});
		const appData = await fetchHookData(useAppSettings.fetcher(), context);
		return addHookData([postsData, appData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
