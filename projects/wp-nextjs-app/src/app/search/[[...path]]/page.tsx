import { HeadstartWPRoute, querySearch } from '@headstartwp/next/app';
import { Metadata } from 'next';
import Link from 'next/link';

async function query({ params }: HeadstartWPRoute) {
	return querySearch({
		routeParams: params,
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await query({ params });

	return seo.metatada;
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
