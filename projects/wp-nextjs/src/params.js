/**
 * @type {import('@10up/headless-core').PostParams}
 */
export const singleParams = { postType: ['page', 'post'] };

/**
 * @type {import('@10up/headless-core').PostParams}
 */
export const indexParams = { postType: ['page'] };

/**
 * @type {import('@10up/headless-core').PostsArchiveParams}
 */
export const searchParams = { postType: 'post' };

// The params below are just for the custom post type routes example
// remove them if you don't need them

/**
 * @type {import('@10up/headless-core').PostParams}
 */
export const bookParams = { postType: ['book'] };

/**
 * @type {import('@10up/headless-core').PostsArchiveParams}
 */
export const booksParams = { postType: 'book' };

/**
 * @type {import('@10up/headless-core').TaxonomyArchiveParams}
 */
export const indexTermsParams = { order: 'asc', orderby: 'count' };
