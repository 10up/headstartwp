import { SWRConfiguration } from 'swr';
import { useFetch } from './useFetch';

import type { HookResponse } from './types';
import {
	AuthorEntity,
	FetchResponse,
	getPostAuthor,
	getPostTerms,
	PageInfo,
	PostEntity,
	PostsArchiveFetchStrategy,
	PostsArchiveParams,
	TermEntity,
} from '../../data';
import { getCustomTaxonomies } from '../../utils/getHeadlessConfig';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';

export type PageType = {
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

/**
 * The QueriedObject represents the object that the current requests is subjected to.
 *
 * Quering by taxonomy and/or author will set the queried object.
 */
export type QueriedObject = {
	/**
	 * If the request is an author query, this will be populated with the author object
	 */
	author?: AuthorEntity;

	/**
	 * If the request is an term query, this will be populated with the term object
	 */
	term?: TermEntity;
};

export interface usePostsResponse extends HookResponse {
	data?: {
		posts: PostEntity[];
		pageInfo: PageInfo;
		queriedObject: QueriedObject;
	};
	pageType: PageType;
}

/**
 * The useFetchPosts hook. Returns a collection of post entities
 *
 * See {@link usePosts} for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 * @param fetcher The fetch strategy to use. If none is passed, the default one is used
 *
 * @category Data Fetching Hooks
 */
export function useFetchPosts(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
	path = '',
	fetcher: PostsArchiveFetchStrategy | undefined = undefined,
): usePostsResponse {
	const {
		data,
		error,
		params: queryParams,
	} = useFetch<PostEntity, PostsArchiveParams>(
		{ _embed: true, ...params },
		fetcher ?? useFetchPosts.fetcher(),
		options,
		path,
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

	const queriedObject: QueriedObject = { author: undefined, term: undefined };

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

	// TODO...
	const taxonomies = getCustomTaxonomies(/* Needs base url */);
	taxonomies.forEach((taxonomy) => {
		const { slug } = taxonomy;
		if (queryParams[slug]) {
			pageType.isTaxonomyArchive = true;
			pageType.taxonomy = slug;
		}
	});

	if (error || !data) {
		const fakeData = {
			posts: makeErrorCatchProxy<PostEntity[]>('posts'),
			pageInfo: makeErrorCatchProxy<PageInfo>('pageInfo'),
			queriedObject: makeErrorCatchProxy<QueriedObject>('queriedObject'),
		};

		return { error, loading: !data, pageType, data: fakeData };
	}

	const { result, pageInfo } = data;

	// TODO: fix types
	const posts = (result as unknown as PostEntity[]).map((post) => {
		post.author = getPostAuthor(post);
		post.terms = getPostTerms(post);

		return post;
	});

	if (queryParams.author && posts[0].author) {
		queriedObject.author = posts[0].author[0];
	}

	if (queryParams.category && posts[0].terms?.category) {
		queriedObject.term = posts[0].terms?.category[0];
	}

	if (queryParams.tag && posts[0].terms?.post_tag) {
		queriedObject.term = posts[0].terms?.post_tag[0];
	}

	taxonomies.forEach((taxonomy) => {
		const { slug } = taxonomy;
		if (queryParams[slug] && posts[0]?.terms?.[slug]) {
			queriedObject.term = posts[0]?.terms?.[slug][0];
		}
	});

	return { data: { posts, pageInfo, queriedObject }, loading: false, pageType };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchPosts {
	export const fetcher = () => new PostsArchiveFetchStrategy(getWPUrl());
}
