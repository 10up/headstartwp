import {
	executeFetchStrategy,
	FetchOptions,
	PostsArchiveFetchStrategy,
	PostsArchiveParams,
} from '../strategies';
import { HeadlessConfig } from '../../types';
import { getCustomTaxonomies, getHeadstartWPConfig, getWPUrl } from '../../utils';
import { PostEntity } from '../types';
import { getPostAuthor, getPostTerms } from '../utils';

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
 * The fetchPosts query function.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @param _config
 * @module fetchPosts
 * @category Data Fetching Hooks
 */
export async function fetchPosts<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(
	params: P | {} = {},
	options: Partial<FetchOptions> = {},
	path = '',
	_config: HeadlessConfig | undefined = undefined,
) {
	const config = _config ?? getHeadstartWPConfig();

	const { sourceUrl } = config;

	const {
		data,
		isMainQuery,
		params: queryParams,
	} = await executeFetchStrategy<T[], P>(
		fetchPosts.fetcher<T, P>(),
		config,
		params,
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

	const taxonomies = getCustomTaxonomies(sourceUrl);

	taxonomies.forEach((taxonomy) => {
		const { slug } = taxonomy;
		if (queryParams[slug]) {
			pageType.isTaxonomyArchive = true;
			pageType.taxonomy = slug;
		}
	});

	const { result, pageInfo, queriedObject } = data;

	const posts = result.map((post) => {
		return { ...post, author: getPostAuthor(post), terms: getPostTerms(post) };
	});

	return {
		data: { posts, pageInfo, queriedObject: queriedObject ?? {} },
		pageType,
		isMainQuery,
	};
}

fetchPosts.fetcher = <
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(
	sourceUrl?: string,
	defaultParams?: P,
) => new PostsArchiveFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
