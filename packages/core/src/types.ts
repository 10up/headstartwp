export type CustomPostTypes = Array<{
	slug: string;
	endpoint: string;
	single?: string;
	archive?: string;
}>;
export type RedirectStrategy = '404' | 'none' | 'always';
export type CustomTaxonomies = Array<{
	slug: string;
	endpoint: string;
	rewrite?: string;
	restParam?: string;
}>;

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
	customPostTypes?: CustomPostTypes;
	customTaxonomies?: CustomTaxonomies;
	redirectStrategy?: RedirectStrategy;
	useWordPressPlugin?: boolean;
	integrations?: Integrations;
	sites?: HeadlessConfig[];
	debug?: {
		requests?: boolean;
		redirects?: boolean;
		devMode?: boolean;
	};
};
