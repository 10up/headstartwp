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
