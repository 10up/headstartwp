import { ConfigError, getCustomTaxonomy } from '../../utils';
import { endpoints } from '../utils';
import { TermEntity } from '../types';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

/**
 * The endpoint params supported by [[TaxonomyTermsStrategy]]
 */
export interface TaxonomyArchiveParams extends EndpointParams {
	/**
	 * The taxonomy the terms are to be fetched from.
	 */
	taxonomy?: string;

	/**
	 * Current page of the collection.
	 *
	 * @default 1
	 */
	page?: string;

	/**
	 * Maximum number of items to be returned in result set.
	 *
	 * @default 10
	 */
	per_page?: string;

	/**
	 * Limit results to those matching a string
	 */
	search?: string;

	/**
	 * Limit result set to specific IDs.
	 */
	include?: number | number[];

	/**
	 * Ensure result set excludes specific IDs.
	 */
	exclude?: number | number[];

	/**
	 * Order sort attribute ascending or descending.
	 *
	 * @default 'asc'
	 */
	order?: 'asc' | 'desc';

	/**
	 * Sort collection by term attribute.
	 *
	 * @default 'name'
	 */
	orderby?:
		| 'id'
		| 'include'
		| 'name'
		| 'slug'
		| 'include_slugs'
		| 'term_group'
		| 'description'
		| 'count';

	/**
	 * Whether to hide terms not assigned to any posts.
	 */
	hide_empty?: string;

	/**
	 * Limit result set to terms assigned to a specific parent.
	 */
	parent?: number;

	/**
	 * Limit result set to terms assigned to a specific post.
	 */
	post?: number;

	/**
	 * Limit result set to terms with one or more specific slugs.
	 */
	slug: string | string[];
}

/**
 * This fetch strategy does not support extracting url params from the url
 *
 * @category Data Fetching
 */
export class TaxonomyTermsStrategy extends AbstractFetchStrategy<
	TermEntity,
	TaxonomyArchiveParams
> {
	defaultTaxonmy = 'category';

	getDefaultEndpoint(): string {
		return endpoints.category;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(path: string): Partial<TaxonomyArchiveParams> {
		return { _embed: true };
	}

	buildEndpointURL(params: Partial<TaxonomyArchiveParams>) {
		const { taxonomy = this.defaultTaxonmy, ...endpointParams } = params;

		const taxonomyObj = getCustomTaxonomy(taxonomy);

		if (!taxonomyObj) {
			throw new ConfigError(
				'Unkown taxonomy, did you forget to add it to headless.config.js?',
			);
		}

		this.setEndpoint(taxonomyObj.endpoint);

		return super.buildEndpointURL(endpointParams);
	}
}
