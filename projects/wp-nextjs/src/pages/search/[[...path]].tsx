import {
	useSearchNative,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
	HeadlessGetServerSideProps,
} from '@headstartwp/next';
import { Link } from '../../components/Link';
import { searchParams } from '../../params';
import { resolveBatch } from '../../utils/promises';

const SearchPage = () => {
	const { data } = useSearchNative(searchParams);

	if (data.pageInfo.totalItems === 0) {
		return 'Nothing found';
	}

	return (
		<>
			<h1>Search Results</h1>
			<ul>
				{data.searchResults.map((item) => (
					<li key={item.id}>
						<Link href={item.url}>
							{item.id} - {item.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default SearchPage;

export const getServerSideProps = (async (context) => {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(useSearchNative.fetcher(), context, { params: searchParams }),
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
}) satisfies HeadlessGetServerSideProps;
