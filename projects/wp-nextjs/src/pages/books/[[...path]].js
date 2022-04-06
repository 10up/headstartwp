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
		// using allSettled bc we still want to proceed if fetching appSettings fails
		const promises = await Promise.allSettled([
			fetchHookData(usePosts.fetcher(), context, { params: booksParams }),
			fetchHookData(useAppSettings.fetcher(), context),
		]);

		const [data] = promises;

		// allSettled will never reject so we must re-throw the error ourselves if the post is not found
		if (data.status === 'rejected') {
			throw data.reason;
		}

		const fulfilledPromises = promises
			.filter(({ status }) => status === 'fulfilled')
			.map(({ value }) => value);

		return addHookData(fulfilledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
