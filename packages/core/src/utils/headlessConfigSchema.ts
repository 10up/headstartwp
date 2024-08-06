import { object, string, mixed, array, boolean, lazy } from 'yup';
import { CustomPostTypes, CustomTaxonomies } from '../types';

// Define the schema for CustomPostType
const customPostTypeSchema = object({
	slug: string().required(),
	endpoint: string().required(),
	single: string(),
	archive: string(),
	matchSinglePath: boolean(),
}).noUnknown();

// Define the schema for CustomPostTypes (array of CustomPostType)
const customPostTypesSchema = array().of(customPostTypeSchema);

// Define the schema for CustomTaxonomy
const customTaxonomySchema = object({
	slug: string().required(),
	endpoint: string().required(),
	rewrite: string(),
	restParam: string(),
	matchArchivePath: boolean(),
}).noUnknown();

// Define the schema for CustomTaxonomies (array of CustomTaxonomy)
const customTaxonomiesSchema = array().of(customTaxonomySchema);

export const headlessConfigSchema = object({
	host: string(),
	locale: string(),
	sourceUrl: string(),
	hostUrl: string(),

	customPostTypes: mixed<
		CustomPostTypes | ((defaultPostTypes: CustomPostTypes) => CustomPostTypes)
	>().test(
		'is-custom-post-types',
		'customPostTypes must be an array or a function that returns an array',
		(value) => {
			if (typeof value === 'function') {
				// Test the function by calling it with a dummy array
				const result = value([]);
				return customPostTypesSchema.isValidSync(result, {
					strict: true,
					abortEarly: false,
					stripUnknown: false,
				});
			}

			return customPostTypesSchema.isValidSync(value) || value === undefined;
		},
	),

	customTaxonomies: mixed<
		CustomTaxonomies | ((defaultPostTypes: CustomTaxonomies) => CustomTaxonomies)
	>().test(
		'is-custom-taxonomies',
		'customTaxonomies must be an array or a function that returns an array',
		(value) => {
			if (typeof value === 'function') {
				// Test the function by calling it with a dummy array
				const result = value([]);

				return customTaxonomiesSchema.isValidSync(result, {
					strict: true,
					abortEarly: false,
					stripUnknown: false,
				});
			}

			return customTaxonomiesSchema.isValidSync(value) || value === undefined;
		},
	),

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
		ttl: mixed().test(
			'is-valid-ttl',
			'cache.ttl must be a number or a function that returns a number',
			(value) => {
				if (typeof value === 'function') {
					return typeof value() === 'number';
				}

				return typeof value === 'number' || value === undefined;
			},
		),
		enabled: mixed().test(
			'is-valid-cache-enabled',
			'cache.enabled must be a boolean or a function that returns a boolean',
			(value) => {
				if (typeof value === 'function') {
					return typeof value() === 'boolean';
				}

				return typeof value === 'boolean' || value === undefined;
			},
		),
		beforeSet: mixed<Function>()
			.test(
				'is-function',
				'cache.beforeSet must be a function',
				(value) => typeof value === 'function' || value === undefined,
			)
			.optional(),
		afterGet: mixed<Function>()
			.test(
				'is-function',
				'cache.afterGet must be a function',
				(value) => typeof value === 'function' || value === undefined,
			)
			.optional(),
		cacheHandler: object({
			set: mixed<Function>().test(
				'is-function',
				'cacheHandler.set must be a function',
				(value) => typeof value === 'function',
			),
			get: mixed<Function>().test(
				'is-function',
				'cacheHandler.get must be a function',
				(value) => typeof value === 'function',
			),
		}),
	}),

	sites: array(lazy(() => headlessConfigSchema.default(undefined))),
}).noUnknown();
