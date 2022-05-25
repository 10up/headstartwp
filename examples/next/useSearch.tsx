/* eslint-disable */

// #region basic-search
// pages/seach/[[...path]].js
// will match `/search/[term]/page/[number]`, `/search/[term]` etc

import { useSearch } from '@10up/headless-next';

const searchParams = { postType: 'post' };

const BasicSearch = () => {
    // pagination and the searched term will be automatically added to the query
	const { error, loading, data } = useSearch(searchParams);

	if (error) {
		return 'Error';
	}

	if (loading || !data) {
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
							{item.id} - {item?.title?.rendered}
					</li>
				))}
			</ul>
		</>
	);
};
// #endregion basic-search

// #region ssr-ssg
import {
	useSearch,
	fetchHookData,
	addHookData,
	handleError,
} from '@10up/headless-next';

const searchParams = { postType: 'post' };

const SearchPage = () => {
	const { error, loading, data } = useSearch(searchParams);

	if (error) {
		return 'Error';
	}

	if (loading || !data) {
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
						{item.id} - {item?.title?.rendered}
					</li>
				))}
			</ul>
		</>
	);
};

export default SearchPage;

export async function getServerSideProps(context) {
	try {
        const useSearchData = await fetchHookData(useSearch.fetcher(), context, { params: searchParams })
		
		return addHookData([useSearchData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
// #endregion ssr-ssg