/**
 * This is just an example of a single page route for a CPT called 'book'
 */
import {
	fetchHookData,
	addHookData,
	handleError,
	usePost,
	useAppSettings,
} from '@10up/headless-next';
import { PageContent } from '../../components/PageContent';
import { bookParams } from '../../params';

const BookPage = () => {
	const { data } = usePost(bookParams);

	return <div>{data ? <PageContent params={bookParams} /> : 'loading...'}</div>;
};

export default BookPage;

export async function getServerSideProps(context) {
	try {
		// using allSettled bc we still want to proceed if fetching appSettings fails
		const promises = await Promise.allSettled([
			fetchHookData(usePost.fetcher(), context, { params: bookParams }),
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
