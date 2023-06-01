/**
 * This is just an example of a single page route for a CPT called 'book'
 */
import {
	fetchHookData,
	addHookData,
	handleError,
	usePost,
	useAppSettings,
} from '@headstartwp/next';
import { PageContent } from '../../components/PageContent';
import { bookParams } from '../../params';
import { resolveBatch } from '../../utils/promises';

const BookPage = () => {
	const { data } = usePost(bookParams);

	return <div>{data ? <PageContent params={bookParams} /> : 'loading...'}</div>;
};

export default BookPage;

export async function getServerSideProps(context) {
	try {
		const settledPromises = await resolveBatch([
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
