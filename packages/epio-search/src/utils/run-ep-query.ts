import { get } from '../api';
import { EPSearchParams, EPHitMap, EPPost } from '../types';

export async function runEPQuery(
	searchState: EPSearchParams,
	endpoint: string,
	hitMap: EPHitMap,
): Promise<{ results: EPPost[]; totalResults: number }> {
	const { searchTerm, ...rest } = searchState;
	const data = {
		...rest,
		search: searchTerm,
	};

	// filter undefined values from data
	Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

	const response = await get(data, endpoint);

	let results: EPPost[] = [];
	let totalResults = 0;

	if (response.hits && response.hits.hits) {
		if (response.hits.total) {
			totalResults = Number(response.hits.total.value);
		}

		results = response.hits.hits.map(hitMap);
	}

	return { results, totalResults };
}
