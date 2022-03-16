import { useSearch, fetchHookData, addHookData, handleError } from '@10up/headless-next';
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
		<ul>
			{data.posts.map((item) => (
				<li key={item.id}>
					{item.id} - {item.title.rendered}
				</li>
			))}
		</ul>
	);
};

export default SearchPage;

export async function getServerSideProps(context) {
	try {
		const hookData = await fetchHookData(useSearch.fetcher(), context, {
			params: searchParams,
		});

		return addHookData([hookData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
