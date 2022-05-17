import {
	getHeadlessConfig,
	getCustomTaxonomySlugs,
	getCustomTaxonomies,
	asyncForEach,
	getCustomPostType,
	ConfigError,
	NotFoundError,
	addQueryArgs,
} from '../../utils';
import { endpoints } from '../utils';
import { apiGet } from '../api';
import { PostEntity } from '../types';
import { postsMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { FetchOptions, AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

const authorsEndpoint = '/wp-json/wp/v2/users';

export interface PostsArchiveParams extends EndpointParams {
	page: number;
	category: string;
	tag: string;
	year: string;
	month: string;
	day: string;
	per_page: number;
	search: string;
	author: number | number[] | string;
	author_exclude: number | number[];
	exclude: number[];
	include: number[];
	offset: number;
	order: 'asc' | 'desc';
	postType: string;
	slug: string | string[];
	orderby:
		| 'author'
		| 'date'
		| 'id'
		| 'include'
		| 'modified'
		| 'parent'
		| 'relevance'
		| 'slug'
		| 'include_slugs'
		| 'title';
	status: string | string[];
	tax_relation: 'AND' | 'OR';
	categories: number | number[];
	categories_exclude: number | number[];
	tags: number | number[];
	tags_exclude: number | number[];
	sticky: boolean;
}

export class PostsArchiveFetchStrategy extends AbstractFetchStrategy<
	PostEntity,
	PostsArchiveParams
> {
	getDefaultEndpoint(): string {
		return endpoints.posts;
	}

	getParamsFromURL(path: string): Partial<PostsArchiveParams> {
		const matchers = [...postsMatchers];

		const customTaxonomies = getCustomTaxonomies();
		customTaxonomies?.forEach((taxonomy) => {
			const slug = taxonomy?.rewrite ?? taxonomy.slug;
			matchers.push({
				name: taxonomy.slug,
				priority: 30,
				pattern: `/${slug}/:${slug}`,
			});

			matchers.push({
				name: `${taxonomy.slug}-with-pagination`,
				priority: 30,
				pattern: `/${slug}/:${slug}/page/:page`,
			});
		});

		return parsePath(matchers, path);
	}

	buildEndpointURL(params: Partial<PostsArchiveParams>) {
		const settings = getHeadlessConfig();

		// don't use the category slug to build out the URL endpoint
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { category, tag, postType, ...endpointParams } = params;

		const taxonomies = getCustomTaxonomySlugs();

		taxonomies.forEach((taxonomy) => {
			if (endpointParams[taxonomy]) {
				delete endpointParams[taxonomy];
			}
		});

		if (params.postType) {
			const postType = getCustomPostType(params.postType);

			if (!postType) {
				throw new ConfigError(
					'Unkown post type, did you forget to add it to headless.config.js?',
				);
			}

			this.setEndpoint(postType.endpoint);
		}

		// if an author slug was passed
		// and we're not using the WordPress plugin
		// we don't want to include it in the endpoint as is as we need to fetch the author id first.
		if (params.author && typeof params.author === 'string' && !settings.useWordPressPlugin) {
			delete endpointParams.author;
		}

		return super.buildEndpointURL(endpointParams);
	}

	async fetcher(
		url: string,
		params: Partial<PostsArchiveParams>,
		options: Partial<FetchOptions> = {},
	) {
		let finalUrl = url;
		const settings = getHeadlessConfig();

		const customTaxonomies = getCustomTaxonomies();
		if (customTaxonomies) {
			await asyncForEach(customTaxonomies, async (taxonomy) => {
				const paramSlug = taxonomy?.rewrite ?? taxonomy.slug;
				const restParam = taxonomy?.restParam ?? taxonomy.slug;

				if (!params[paramSlug]) {
					return;
				}

				if (settings.useWordPressPlugin) {
					// WordPress plugin extends the REST API to accept a category slug instead of just an id
					finalUrl = addQueryArgs(finalUrl, { [restParam]: params[paramSlug] });
				} else {
					const terms = await apiGet(
						`${this.baseURL}${taxonomy.endpoint}?slug=${params[paramSlug]}`,
					);

					if (terms.json.length > 0) {
						finalUrl = addQueryArgs(finalUrl, {
							[restParam]: terms.json[0].id,
						});
					} else {
						throw new NotFoundError(
							`Term "${params[paramSlug]}" from "${taxonomy.slug}" has not been found`,
						);
					}
				}
			});
		}

		// check if we need to fetch author id
		// we need to fetch author id if
		// 1 - params.author is a string
		// 2 - We're not using the WP Plugin
		if (params.author && typeof params.author === 'string' && !settings.useWordPressPlugin) {
			const authors = await apiGet(`${this.baseURL}${authorsEndpoint}?slug=${params.author}`);

			if (authors.json.length > 0) {
				finalUrl = addQueryArgs(finalUrl, {
					author: authors.json[0].id,
				});
			} else {
				throw new NotFoundError(`Author "${params.author}" not found`);
			}
		}

		return super.fetcher(finalUrl, params, options);
	}
}
