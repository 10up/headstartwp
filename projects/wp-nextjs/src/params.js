/**
 * @type {import('@headstartwp/core').PostParams}
 */
export const singleParams = { postType: ['page', 'post'] };

/**
 * @type {import('@headstartwp/core').PostParams}
 */
export const indexParams = { postType: ['page'] };

/**
 * @type {import('@headstartwp/core').PostsArchiveParams}
 */
export const searchParams = { postType: 'post' };

/**
 * @type {import('@headstartwp/core').PostOrPostsParams}
 */
export const blogParams = {
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

/**
 * @type {import('@headstartwp/core').TaxonomyArchiveParams}
 */
export const indexTermsParams = { order: 'asc', orderby: 'count' };
