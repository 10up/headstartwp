import { usePosts, fetchHookData, addHookData, handleError } from '@10up/headless-next';
import { useAppSettings } from '@10up/headless-next/data';

const Home = () => {
	const { loading, error, data, pageType } = usePosts();
	console.log(pageType, data.pageInfo);
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
		const postsData = await fetchHookData(usePosts.fetcher(), context, {
			filterData: { method: 'ALLOW', fields: ['id', 'title'] },
		});
		const appData = await fetchHookData(useAppSettings.fetcher(), context);
		return addHookData([postsData, appData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
