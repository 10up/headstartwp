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
		const [hookData, appSettings] = await Promise.all([
			fetchHookData(usePost.fetcher(), context, { params: bookParams }),
			fetchHookData(useAppSettings.fetcher(), context),
		]);

		return addHookData([hookData, appSettings], {});
	} catch (e) {
		return handleError(e, context);
	}
}
