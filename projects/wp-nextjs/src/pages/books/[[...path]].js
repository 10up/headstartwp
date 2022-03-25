/**
 * This is just an example of a archive page route for a CPT called 'book'
 */
import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
} from '@10up/headless-next';
import { booksParams } from '../../params';

const BooksPage = () => {
	const { data, error, loading } = usePosts(booksParams);

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

export default BooksPage;

export async function getServerSideProps(context) {
	try {
		const [hookData, appSettings] = await Promise.all([
			fetchHookData(usePosts.fetcher(), context, { params: booksParams }),
			fetchHookData(useAppSettings.fetcher(), context),
		]);

		return addHookData([hookData, appSettings], {});
	} catch (e) {
		return handleError(e, context);
	}
}
