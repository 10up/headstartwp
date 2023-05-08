/**
 * This is just an example of a archive page route for a CPT called 'book'
 */
import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
} from '@headstartwp/next';
import { booksParams } from '../../params';
import { resolveBatch } from '../../utils/promises';

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
		// fetch batch of promises and throws errors selectively
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePosts.fetcher(), context, { params: booksParams }),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
