/**
 * This is just an example of a archive page route for a CPT called 'book'
 */
import { usePosts, fetchHookData, addHookData, handleError } from '@10up/headless-next';
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
		const hookData = await fetchHookData(usePosts.fetcher(), context, {
			params: booksParams,
		});

		return addHookData([hookData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
