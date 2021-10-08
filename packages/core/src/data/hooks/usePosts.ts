import useSWR from 'swr';
import { apiGet } from '../api';

const endpoint = '/wp-json/wp/v2/posts?_embed';

/**
 * Post fetcher function
 */
export async function postFetcher(url: string) {
	const result = await apiGet(url);
	return result.json;
}

/**
 * The usePost Hook
 *
 */
export function usePosts() {
	const { data, error } = useSWR(endpoint, postFetcher);

	if (!data || error) {
		return { data, error };
	}

	return { data };
}
