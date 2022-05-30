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

export type HeadlessConfig = {
	sourceUrl?: string;
	customPostTypes?: CustomPostTypes;
	customTaxonomies?: CustomTaxonomies;
	redirectStrategy?: RedirectStrategy;
	useWordPressPlugin?: boolean;
};
