import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { querySearch } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';

async function query({ params }: HeadstartWPRoute) {
	return querySearch({
		routeParams: params,
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const {
		seo: { metatada },
		isMainQuery,
	} = await query({ params });

	if (isMainQuery) {
		return metatada;
	}

	// If this is not the main query, nothing is being searched on, so build up the metadata manually
	return {
		...metatada,
		title: 'Search Page',
	};
}

const Search = async ({ params }: HeadstartWPRoute) => {
	const { data } = await query({ params });

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
