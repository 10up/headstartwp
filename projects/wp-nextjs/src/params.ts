import type {
	PostOrPostsParams,
	PostParams,
	PostsArchiveParams,
	TaxonomyArchiveParams,
} from '@headstartwp/core';

export const singleParams: PostParams = { postType: ['page', 'post'] };

export const indexParams: PostParams = { postType: ['page'] };

export const searchParams: PostsArchiveParams = {
	type: 'post',
	subtype: 'page, post',
};

export const blogParams: PostOrPostsParams = {
	single: {
		postType: 'post',
	},
	archive: {
		postType: 'post',
		/**
		 * Specifying the _fields param reduces the amount of data queried and returned by the API.
		 */
		_fields: ['id', 'title', 'link'],
	},
	priority: 'single',
	routeMatchStrategy: 'single',
};

export const indexTermsParams: TaxonomyArchiveParams = { order: 'asc', orderby: 'count' };
