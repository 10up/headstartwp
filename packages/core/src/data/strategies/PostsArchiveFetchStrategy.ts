import { addQueryArgs } from '@wordpress/url';
import {
	getHeadlessConfig,
	getCustomTaxonomySlugs,
	getCustomTaxonomies,
	asyncForEach,
} from '../../utils';
import { apiGet } from '../api';
import { PostEntity } from '../types';
import { postsMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

const categoryEndpoint = '/wp-json/wp/v2/categories';
const tagsEndpoint = '/wp-json/wp/v2/tags';

export interface PostsArchiveParams extends EndpointParams {
	page: number;
	category: string;
	tag: string;
	year: string;
	month: string;
	day: string;
	per_page: number;
	search: string;
	author: number | number[];
	author_exclude: number | number[];
	exclude: number[];
	include: number[];
	offset: number;
	order: 'asc' | 'desc';
	postType: string | { slug: string; endpoint: string };
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
	getParamsFromURL(params: { path?: string[] } | undefined): Partial<PostsArchiveParams> {
		if (!params?.path) {
			return {};
		}

		const { path } = params;

		return parsePath(postsMatchers, this.createPathFromArgs(path));
	}

	buildEndpointURL(params: PostsArchiveParams) {
		// don't use the category slug to build out the URL endpoint
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { category, tag, postType, ...endpointParams } = params;

		const defaultTaxonomies = ['category', 'tag'];
		const taxonomies = [...defaultTaxonomies, ...getCustomTaxonomySlugs()];

		taxonomies.forEach((taxonomy) => {
			if (endpointParams[taxonomy]) {
				delete endpointParams[taxonomy];
			}
		});

		return super.buildEndpointURL(endpointParams);
	}

	async fetcher(url: string, params: PostsArchiveParams) {
		let finalUrl = url;
		const settings = getHeadlessConfig();

		if (params?.category) {
			const { category } = params;

			if (settings.useWordPressPlugin) {
				// WordPress plugin extends the REST API to accept a category slug instead of just an id
				finalUrl = addQueryArgs(finalUrl, { category });
			} else {
				const categories = await apiGet(
					`${this.baseURL}${categoryEndpoint}?slug=${category}`,
				);

				if (categories.json.length > 0) {
					finalUrl = addQueryArgs(finalUrl, { categories: categories.json[0].id });
				} else {
					throw new Error('Category not found');
				}
			}
		}

		if (params?.tag) {
			const { tag } = params;

			if (settings.useWordPressPlugin) {
				// WordPress plugin extends the REST API to accept a tag slug instead of just an id
				finalUrl = addQueryArgs(finalUrl, { post_tag: tag });
			} else {
				const tags = await apiGet(`${this.baseURL}${tagsEndpoint}?slug=${tag}`);

				if (tags.json.length > 0) {
					finalUrl = addQueryArgs(finalUrl, { tags: tags.json[0].id });
				} else {
					throw new Error('Tag not found');
				}
			}
		}

		const customTaxonomies = getCustomTaxonomies();
		if (customTaxonomies) {
			// todo: do async foeach
			await asyncForEach(customTaxonomies, async (taxonomy) => {
				if (!params[taxonomy.slug]) {
					return;
				}

				if (false /* settings.useWordPressPlugin */) {
					// WordPress plugin extends the REST API to accept a category slug instead of just an id
					finalUrl = addQueryArgs(finalUrl, { [taxonomy.slug]: params[taxonomy.slug] });
				} else {
					const terms = await apiGet(
						`${this.baseURL}${taxonomy.endpoint}?slug=${params[taxonomy.slug]}`,
					);

					if (terms.json.length > 0) {
						finalUrl = addQueryArgs(finalUrl, {
							[taxonomy.slug]: terms.json[0].id,
						});
					} else {
						throw new Error(`${taxonomy.slug} not found`);
					}
				}
			});
		}

		const { postType } = params;
		switch (typeof postType) {
			case 'string':
				finalUrl = finalUrl.replace('posts', postType);
				break;
			case 'object':
				finalUrl = finalUrl.replace('/posts', postType.endpoint);
				break;
			default:
				break;
		}

		return super.fetcher(finalUrl, params);
	}
}
