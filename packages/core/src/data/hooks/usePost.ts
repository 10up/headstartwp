import { PostParams, SinglePostFetchStrategy } from './strategies/SinglePostFetchStrategy';
import { useFetch } from './useFetch';

const endpoint = '/wp-json/wp/v2/posts';

const fetchStrategy = new SinglePostFetchStrategy();

export function usePost(params: PostParams) {
	const { data, error } = useFetch(endpoint, params, fetchStrategy);

	if (!data || error) {
		return { data, error };
	}

	return { data: data[0] };
}
