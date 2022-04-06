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
import { fetchBatch } from '../../utils/promises';

const BookPage = () => {
	const { data } = usePost(bookParams);

	return <div>{data ? <PageContent params={bookParams} /> : 'loading...'}</div>;
};

export default BookPage;

export async function getServerSideProps(context) {
	try {
		const settledPromises = await fetchBatch([
			{
				func: fetchHookData(usePost.fetcher(), context, { params: bookParams }),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
