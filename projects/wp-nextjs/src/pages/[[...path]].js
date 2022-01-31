import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
	// useAppSettings,
	// useMenu,
} from '@10up/headless-next';

const Home = () => {
	const { loading, error, data } = usePosts();
	// const appSettings = useAppSettings();
	// console.log(appSettings);
	// const primaryMenu = useMenu('primary');
	// console.log(primaryMenu);
	// const { loading, data } = usePosts({ postType: 'book' });

	if (error) {
		return 'error';
	}

	return loading ? (
		'Loading...'
	) : (
		<ul>
			{data.posts.map((post) => (
				<li key={post.id}>{post.title.rendered}</li>
			))}
		</ul>
	);
};

export default Home;

export async function getServerSideProps(context) {
	try {
		const postsData = await fetchHookData('usePosts', context);
		const appData = await fetchHookData('useAppSettings', context);
		// const hookData = await fetchHookData('usePosts', context, { postType: 'book' });
		// const hookData = await fetchHookData('usePosts', context, {
		// 	postType: { slug: 'books', endpoint: '/book' },
		// });
		return addHookData([postsData, appData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
