import { object, string, mixed, number, array, boolean, lazy } from 'yup';

const headlessConfigSchema = object({
	host: string(),
	locale: string(),
	sourceUrl: string(),
	hostUrl: string(),
	customPostTypes: lazy((value: any) => {
		if (typeof value === 'function') {
			return mixed();
		}

		return array().of(
			object({
				slug: string().required(),
				endpoint: string().required(),
				single: string(),
				archive: string(),
				matchSinglePath: boolean(),
			}),
		);
	}),
	customTaxonomies: lazy((value: any) => {
		if (typeof value === 'function') {
			return mixed();
		}

		return array().of(
			object({
				slug: string().required(),
				endpoint: string().required(),
				rewrite: string(),
				restParam: string(),
				matchArchivePath: boolean(),
			}),
		);
	}),
	redirectStrategy: string().oneOf(['404', 'none', 'always']),
	useWordPressPlugin: boolean(),
	integrations: object({
		yoastSEO: object({
			enabled: boolean(),
		}),
		polylang: object({
			enabled: boolean(),
		}),
	}),
	i18n: object({
		locales: array(string()).required(),
		defaultLocale: string().required(),
		localeDetection: boolean(),
	}).default(undefined),
	preview: object({
		alternativeAuthorizationHeader: boolean(),
		usePostLinkForRedirect: boolean(),
	}),
	debug: object({
		requests: boolean(),
		redirects: boolean(),
		devMode: boolean(),
	}),
	cache: object({
		ttl: lazy((value: any) => {
			if (typeof value === 'function') {
				return mixed();
			}

			return number();
		}),
		enabled: lazy((value: any) => {
			if (typeof value === 'function') {
				return mixed();
			}

			return boolean();
		}),
		beforeSet: mixed(),
		afterGet: mixed(),
		cacheHandler: object({
			set: mixed(),
			get: mixed(),
		}),
	}),
	sites: array(lazy(() => headlessConfigSchema.default(undefined))),
}).noUnknown();

export default headlessConfigSchema;
