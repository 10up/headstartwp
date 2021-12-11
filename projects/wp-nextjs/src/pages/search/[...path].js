import { useSearch, fetchHookData, addHookData, handleError } from '@10up/headless-next';

const SearchTemplate = () => {
	const { loading, data } = useSearch();

	if (loading) {
		return 'Loading...';
	}

	return (
		<ul>
			{data.items.map((item) => (
				<li key={item.id}>
					{item.id} - {item.title}
				</li>
			))}
		</ul>
	);
};

export default SearchTemplate;

export async function getServerSideProps(context) {
	try {
		const hookData = await fetchHookData('useSearch', context);

		return addHookData(hookData, {});
	} catch (e) {
		return handleError(e, context);
	}
}
