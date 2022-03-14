import { useSearch, fetchHookData, addHookData, handleError } from '@10up/headless-next';

const params = {
	postType: 'book',
};

const SearchTemplate = () => {
	const { loading, data } = useSearch(params);

	if (loading) {
		return 'Loading...';
	}

	if (data.pageInfo.totalItems === 0) {
		return 'nothing found';
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

export default SearchTemplate;

export async function getServerSideProps(context) {
	try {
		const hookData = await fetchHookData('useSearch', context, { params });

		return addHookData([hookData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
