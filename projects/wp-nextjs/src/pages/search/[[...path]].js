import {
	useSearch,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
} from '@10up/headless-next';
import { Link } from '../../components/Link';
import { searchParams } from '../../params';

const SearchPage = () => {
	const { error, loading, data } = useSearch(searchParams);

	if (error) {
		return 'Error';
	}

	if (loading) {
		return 'Loading...';
	}

	if (data.pageInfo.totalItems === 0) {
		return 'Nothing found';
	}

	return (
		<>
			<h1>Search Results</h1>
			<ul>
				{data.posts.map((item) => (
					<li key={item.id}>
						<Link href={item.link}>
							{item.id} - {item.title.rendered}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default SearchPage;

export async function getServerSideProps(context) {
	try {
		// using allSettled bc we still want to proceed if fetching appSettings fails
		const promises = await Promise.allSettled([
			fetchHookData(useSearch.fetcher(), context, { params: searchParams }),
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
