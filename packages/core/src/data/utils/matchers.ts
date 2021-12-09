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
		name: 'category',
		priority: 30,
		pattern: '/category/:category',
	},
	{
		name: 'category-with-pagination',
		priority: 30,
		pattern: '/category/:category/page/:page',
	},
	{
		name: 'tag',
		priority: 30,
		pattern: '/tag/:tag',
	},
];

export const searchMatchers: Matcher[] = [
	{
		name: 'search type',
		priority: 30,
		pattern: '/search/:search',
	},
	{
		name: 'pagination',
		priority: 30,
		pattern: '/search/:search/page/:page',
	},
];
