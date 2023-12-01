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
	debug?: {
		requests?: boolean;
		redirects?: boolean;
		devMode?: boolean;
	};
	filters?: {
		fetch?: (
			method: 'POST' | 'GET',
			url: string,
			args: Record<string, any>,
			burstCache?: boolean,
		) => {
			url: string;
			args: Record<string, any>;
		};
	};
};
