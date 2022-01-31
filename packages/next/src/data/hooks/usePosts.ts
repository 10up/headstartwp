import {
	PostEntity,
	PostsArchiveParams,
	PostsArchiveFetchStrategy,
	getCustomTaxonomySlugs,
} from '@10up/headless-core';
import { getPostAuthor, getPostTerms } from '@10up/headless-core/data';
import { useFetch } from './useFetch';
import { HookResponse } from './types';

const endpoint = '/wp-json/wp/v2/posts';

type PageType = {
	/**
	 * Regular post archive
	 */
	isPostArchive: boolean;
	/**
	 * Search route
	 */
	isSearch: boolean;
	/**
	 * Author Archive
	 */
	isAuthorArchive: boolean;
	/**
	 * Custom Post Type Archive
	 */
	isPostTypeArchive: boolean;
	/**
	 * Which post type this archive is for
	 */
	postType: string;
	/**
	 * Category Archive
	 */
	isCategoryArchive: boolean;
	/**
	 * Tag Archive
	 */
	isTagArchive: boolean;
	/**
	 * Custom Taxonomy Archive
	 */
	isTaxonomyArchive: boolean;
	/**
	 * Which taxonomy this archive is for
	 */
	taxonomy: string;
};
interface usePostsResponse extends HookResponse {
	data?: { posts: PostEntity[] };
	page: PageType;
}

const fetchStrategy = new PostsArchiveFetchStrategy();

/**
 * The usePost hook. Returns a collection of post entities
 *
 * @param params - Supported params
 *
 * @returns
 */
export function usePosts(params: PostsArchiveParams): usePostsResponse {
	const {
		data,
		error,
		params: queryParams,
	} = useFetch<PostEntity, PostsArchiveParams>(
		endpoint,
		{ _embed: true, ...params },
		fetchStrategy,
	);

	const page: PageType = {
		isPostArchive: false,
		isSearch: false,
		isAuthorArchive: false,
		isPostTypeArchive: false,
		postType: '',
		isCategoryArchive: false,
		isTagArchive: false,
		isTaxonomyArchive: false,
		taxonomy: '',
	};

	if (queryParams.author) {
		page.isPostArchive = true;
		page.isAuthorArchive = true;
	}

	if (queryParams.category) {
		page.isPostArchive = true;
		page.isCategoryArchive = true;
	}

	if (queryParams.tag) {
		page.isPostArchive = true;
		page.isTagArchive = true;
	}

	if (queryParams.postType) {
		page.isPostArchive = false;
		page.isPostArchive = true;
		page.postType = queryParams.postType;
	}

	const taxonomies = getCustomTaxonomySlugs();
	taxonomies.forEach((taxonmy) => {
		if (queryParams[taxonmy]) {
			page.isTaxonomyArchive = true;
			page.taxonomy = taxonmy;
		}
	});

	if (error) {
		return { error, loading: false, page };
	}

	if (!data) {
		return { loading: true, page };
	}

	const posts = (data as unknown as PostEntity[]).map((post) => {
		post.author = getPostAuthor(post);
		post.terms = getPostTerms(post);

		return post;
	});

	// TODO: fix types
	// TODO: add flags indicating route
	return { data: { posts }, loading: false, page };
}
