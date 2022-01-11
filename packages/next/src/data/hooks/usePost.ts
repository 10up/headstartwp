import { PostEntity, PostParams, SinglePostFetchStrategy } from '@10up/headless-core';
import { useFetch } from './useFetch';
import { HookResponse } from './types';

const endpoint = '/wp-json/wp/v2/posts';

interface usePostResponse extends HookResponse {
	data?: { post: PostEntity };
}

const fetchStrategy = new SinglePostFetchStrategy();

/**
 * The usePost hook. Returns a single post entity
 *
 * @param params - Supported params
 *
 * @returns
 */
export function usePost(params: PostParams): usePostResponse {
	const { data, error } = useFetch<PostEntity, PostParams>(
		endpoint,
		{ _embed: true, ...params },
		fetchStrategy,
	);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	// TODO: fix types
	const post = data[0] as PostEntity;
	post.author = post._embedded.author;
	post.terms = {};
	post._embedded['wp:term'].forEach((taxonomy) => {
		taxonomy.forEach((term) => {
			const taxonomySlug = term.taxonomy;
			if (post.terms) {
				if (typeof post.terms[taxonomySlug] === 'undefined') {
					post.terms[taxonomySlug] = [];
				}

				post.terms[taxonomySlug].push(term);
			}
		});
	});

	return { data: { post }, loading: false };
}
