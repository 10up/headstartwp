export type Matcher = {
	name: string;
	priority: number;
	pattern: string;
};

export const postMatchers: Matcher[] = [
	{
		name: 'date',
		priority: 20,
		pattern: '/:year(\\d+)/:month(\\d+)?/:day(\\d+)?/:slug',
	},
	{
		name: 'post type',
		priority: 30,
		pattern: '/(.*)?/:slug',
	},
];

export const postsMatchers: Matcher[] = [
	{
		name: 'date',
		priority: 20,
		pattern: '/:year(\\d+)/:month(\\d+)?/:day(\\d+)?',
	},
	{
		name: 'pagination',
		priority: 30,
		pattern: '/page/:page',
	},
	{
		name: 'author',
		priority: 20,
		pattern: '/author/:author',
	},
	{
		name: 'author-with-pagination',
		priority: 10,
		pattern: '/author/:author/page/:page',
	},
];

export const authorArchivesMatchers: Matcher[] = [
	{
		name: 'author-archive',
		priority: 30,
		pattern: '/:author',
	},
	{
		name: 'author-with-pagination',
		priority: 30,
		pattern: '/:author/page/:page',
	},
];

export const searchMatchers: Matcher[] = [
	{
		name: 'search type',
		priority: 30,
		pattern: '/:search',
	},
	{
		name: 'search-pagination',
		priority: 30,
		pattern: '/:search/page/:page',
	},
];
