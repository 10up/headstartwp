import type { AbstractFetchStrategy, EndpointParams, FetchOptions, FetchResponse } from './data';

export type CustomPostType = {
	slug: string;
	endpoint: string;
	single?: string;
	archive?: string;

	/**
	 * Whether this custom post type should match the archive path
	 *
	 * If set to true, then when querying a post type archive page such as `/[post-type]/[post-name]` the
	 * `post.link` property should match the current path. This will avoid matching nested posts/pages that doesn't exist for instance:
	 * `/[post-type]/fake-parent-page/[post-name]` will not match if this option is set to true even though `post-name` exists.
	 *
	 * It is strongly recommended to set this option to true, otherwise hierarchical post types (such as pages) will not work properly.
	 *
	 * @default true
	 */
	matchSinglePath?: boolean;
};

export type CustomPostTypes = Array<CustomPostType>;

export type RedirectStrategy = '404' | 'none' | 'always';

export type CustomTaxonomy = {
	slug: string;
	endpoint: string;
	rewrite?: string;
	restParam?: string;

	/**
	 * Whether this custom taxonomy should match the archive path
	 *
	 * If set to true, then when querying a taxonomy archive page such as `/[taxonmy-slug]/[term-slug]` the
	 * `term.link` property should match the current path. This will avoid matching nested categories that doesn't exist for instance:
	 * `/[taxonmy-slug]/fake-parent-term/[term-slug]` will not match if this option is set to true even though `term-slug` exists.
	 *
	 * @default false
	 */
	matchArchivePath?: boolean;
};

export type CustomTaxonomies = Array<CustomTaxonomy>;

export interface Integration {
	enable: boolean;
}

export interface YoastSEOIntegration extends Integration {}

export interface PolylangIntegration extends Integration {}

export type Integrations = {
	yoastSEO?: YoastSEOIntegration;
	polylang?: PolylangIntegration;
};

export type PreviewConfig = {
	/**
	 * Flag to enable using the alternative authorization header.
	 *
	 * This can be useful if you have separate JWT-based authentication on your project.
	 */
	alternativeAuthorizationHeader?: boolean;

	/**
	 * If enabled, it will use the `post.link` property of the REST response
	 * to redirect to the appropriate route for previewing
	 */
	usePostLinkForRedirect?: boolean;
};

export type FetchStrategyCacheHandler = {
	set: <T extends any = any>(key: string, data: T, ttl: number) => Promise<void>;
	get: <T extends any = any>(key: string) => Promise<T>;
};

export type FetchStrategyCacheHandlerOptions<E, P extends EndpointParams, R> = {
	fetchStrategy: AbstractFetchStrategy<E, P, R>;
	params: Partial<P>;
	fetchStrategyOptions?: Partial<FetchOptions>;
	path: string;
	cacheHandler: FetchStrategyCacheHandler;
};

export type FetchStrategyCacheConfig = {
	/**
	 * TTL in seconds
	 */
	ttl?:
		| number
		| (<E, P extends EndpointParams, R>(
				options: FetchStrategyCacheHandlerOptions<E, P, R>,
		  ) => number);

	/**
	 * Whether the cache should be enable globably or for a given fetchStrategy
	 */
	enabled?:
		| boolean
		| (<E, P extends EndpointParams, R>(
				options: FetchStrategyCacheHandlerOptions<E, P, R>,
		  ) => boolean);

	/**
	 * If set, this function will be executed before calling the cache.set method
	 * It's useful if you want to remove things from the data before caching.
	 *
	 * @param fetcbStrategy The fetch strategy instance
	 *
	 * @returns
	 */
	beforeSet?: <E, P extends EndpointParams, R>(
		options: FetchStrategyCacheHandlerOptions<E, P, R>,
		data: FetchResponse<R>,
	) => Promise<FetchResponse<R>>;

	/**
	 * If set, this function will be executed after restoring data from cache (cache.get) and can be used
	 * to reconstruct things that were removed in beforeSet.
	 *
	 * @param fetcbStrategy The fetch strategy instnace
	 * @returns
	 */
	afterGet?: <E, P extends EndpointParams, R>(
		options: FetchStrategyCacheHandlerOptions<E, P, R>,
		data: FetchResponse<R>,
	) => Promise<FetchResponse<R>>;

	/**
	 * A custom cache handler implementation
	 *
	 * If set will override the default in-memory cache handler
	 */
	cacheHandler?: FetchStrategyCacheHandler;
};

export type HeadlessConfig = {
	host?: string;
	locale?: string;
	sourceUrl?: string;
	hostUrl?: string;
	customPostTypes?: CustomPostTypes | ((defaultPostTypes: CustomPostTypes) => CustomPostTypes);
	customTaxonomies?:
		| CustomTaxonomies
		| ((defaultTaxonomies: CustomTaxonomies) => CustomTaxonomies);
	redirectStrategy?: RedirectStrategy;
	useWordPressPlugin?: boolean;
	integrations?: Integrations;
	sites?: HeadlessConfig[];
	preview?: PreviewConfig;
	debug?: {
		requests?: boolean;
		redirects?: boolean;
		devMode?: boolean;
	};
	cache?: FetchStrategyCacheConfig;
};
