import {
	useSearch,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
} from '@10up/headless-next';
import { Link } from '../../components/Link';
import { searchParams } from '../../params';
import { fetchBatch } from '../../utils/promises';

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
		const settledPromises = await fetchBatch([
			{
				func: fetchHookData(useSearch.fetcher(), context, { params: searchParams }),
			},
			{
				func: fetchHookData(useAppSettings.fetcher(), context),
				throw: false,
			},
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
