import { HeadstartWPRoute, querySearch } from '@headstartwp/next/app';
import Link from 'next/link';

const Search = async ({ params }: HeadstartWPRoute) => {
	const { data } = await querySearch({
		routeParams: params,
		options: {
			headers: {
				cache: 'no-store',
			},
		},
	});

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

export default Search;
