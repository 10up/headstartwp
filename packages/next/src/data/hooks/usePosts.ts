import {
	PostEntity,
	PostsArchiveParams,
	PostsArchiveFetchStrategy,
	getCustomTaxonomySlugs,
	getPostAuthor,
	getPostTerms,
	PageInfo,
	getWPUrl,
	FetchResponse,
} from '@10up/headless-core';
import { SWRConfiguration } from 'swr';
import { useFetch } from './useFetch';
import { HookResponse } from './types';

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

export interface usePostsResponse extends HookResponse {
	data?: { posts: PostEntity[]; pageInfo: PageInfo };
	pageType: PageType;
}

/**
 * The usePost hook. Returns a collection of post entities
 *
 * @param params - Supported params
 *
 * @returns
 */
export function usePosts(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>>,
): usePostsResponse {
	const {
		data,
		error,
		params: queryParams,
	} = useFetch<PostEntity, PostsArchiveParams>(
		{ _embed: true, ...params },
		usePosts.fetcher(),
		options,
	);

	const pageType: PageType = {
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
		pageType.isPostArchive = true;
		pageType.isAuthorArchive = true;
	}

	if (queryParams.category) {
		pageType.isPostArchive = true;
		pageType.isCategoryArchive = true;
	}

	if (queryParams.tag) {
		pageType.isPostArchive = true;
		pageType.isTagArchive = true;
	}

	if (queryParams.postType) {
		pageType.isPostArchive = false;
		pageType.isPostTypeArchive = true;
		pageType.postType = queryParams.postType;
	} else {
		pageType.isPostArchive = true;
	}

	const taxonomies = getCustomTaxonomySlugs();
	taxonomies.forEach((taxonmy) => {
		if (queryParams[taxonmy]) {
			pageType.isTaxonomyArchive = true;
			pageType.taxonomy = taxonmy;
		}
	});

	if (error) {
		return { error, loading: false, pageType };
	}

	if (!data) {
		return { loading: true, pageType };
	}

	const { result, pageInfo } = data;

	// TODO: fix types
	const posts = (result as unknown as PostEntity[]).map((post) => {
		post.author = getPostAuthor(post);
		post.terms = getPostTerms(post);

		return post;
	});

	return { data: { posts, pageInfo }, loading: false, pageType };
}

usePosts.fetcher = () => new PostsArchiveFetchStrategy(getWPUrl());
