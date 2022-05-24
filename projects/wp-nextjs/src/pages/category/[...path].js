import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
} from '@10up/headless-next';
import { Link } from '../../components/Link';
import { resolveBatch } from '../../utils/promises';

const CategoryPage = () => {
	const { loading, error, data } = usePosts({ taxonomy: 'category' });

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
	}

	return (
		<>
			<h1>Category Page</h1>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						<Link href={post.link}>{post.title.rendered}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default CategoryPage;

export async function getServerSideProps(context) {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePosts.fetcher(), context, {
					// filtering is recommended for performance reasons to reduce the ammount of props that Next.js has to send via the HTML payload
					// You can either ALLOW especific fields or REMOVE especific fields.
					filterData: { method: 'ALLOW', fields: ['id', 'title', 'link'] },
					params: { taxonomy: 'category' },
				}),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
