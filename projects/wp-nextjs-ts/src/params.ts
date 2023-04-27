import type { PostParams, PostsArchiveParams, TaxonomyArchiveParams } from '@headstartwp/core';

export const singleParams: PostParams = { postType: ['page', 'post'] };

export const indexParams: PostParams = { postType: ['page'] };

export const searchParams: PostsArchiveParams = { postType: 'post' };

export const blogParams: PostsArchiveParams = {
	postType: 'post',

	/**
	 * Specifying the _fields param reduces the amount of data queried and returned by the API.
	 */
	_fields: ['id', 'title', 'link'],
};

// The params below are just for the custom post type routes example
// remove them if you don't need them

export const bookParams: PostParams = { postType: ['book'] };

export const booksParams: PostsArchiveParams = { postType: 'book' };

export const indexTermsParams: TaxonomyArchiveParams = { order: 'asc', orderby: 'count' };
