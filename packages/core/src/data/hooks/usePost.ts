import { EndpointParams } from './types';
import { useFetch } from './useFetch';

const endpoint = '/wp-json/wp/v2/posts';

interface PostParams extends EndpointParams {
	slug?: string;
}

export function usePost(params: PostParams) {
	const { data, error } = useFetch(endpoint, params);

	if (!data || error) {
		return { data, error };
	}

	return { data: data[0] };
}
