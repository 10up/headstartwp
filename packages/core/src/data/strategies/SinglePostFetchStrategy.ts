import { getCustomPostType, ConfigError } from '../../utils';
import { PostEntity } from '../types';
import { postMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams, FetchOptions } from './AbstractFetchStrategy';
import { endpoints } from '../utils';

/**
 * The EndpointParams supported by the [[SinglePostFetchStrategy]]
 */
export interface PostParams extends EndpointParams {
	/**
	 * The slug of the post to fetch
	 */
	slug?: string;

	/**
	 * Post Types where we should look for
	 *
	 * If multiple post types are specified
	 * multiple requests will be issued to each post type until a matching post is found
	 */
	postType?: string | string[];

	/**
	 * Fetch post by id
	 */
	id?: Number;

	/**
	 * If set will fetch the latest post revision
	 */
	revision?: Boolean;

	/**
	 * The authToken, required to fetch revisions or non-published posts
	 */
	authToken?: string;
}

/**
 * The SinglePostFetchStrategy is used to fetch a single post entity from any post type.
 * Note that custom post types should be defined in `headless.config.js`
 *
 * This strategy supports extracting endpoint params from url E.g:
 * - `/post-name` maps to `{ slug: 'post-name'}`
 * - `/2021/10/20/post-name` maps to `{ year: 2021, month: 10, day: 20, slug: 'post-name }`
 * - `/2021/` maps to `{ year: 2021, slug: 'post-name' }`
 *
 * @see [[getParamsFromURL]] to learn about url param mapping
 *
 * @category Data Fetching
 */
export class SinglePostFetchStrategy extends AbstractFetchStrategy<PostEntity, PostParams> {
	getDefaultEndpoint(): string {
		return endpoints.posts;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(path: string, nonUrlParams: Partial<PostParams> = {}): Partial<PostParams> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { year, day, month, ...params } = parsePath(postMatchers, path);

		return params;
	}

	/**
	 * Handlers post types, revisions and fetching by id
	 *
	 * @param params The params to build the endpoint url
	 */
	buildEndpointURL(params: PostParams) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, authToken, revision, postType, ...endpointParams } = params;

		if (params.postType) {
			// if postType is a array of slugs, start off with the first post type
			const postTypeSlug = Array.isArray(params.postType)
				? params.postType[0]
				: params.postType;

			const postType = getCustomPostType(postTypeSlug);

			if (!postType) {
				throw new ConfigError(
					'Unkown post type, did you forget to add it to headless.config.js?',
				);
			}

			this.setEndpoint(postType.endpoint);
		}

		if (id) {
			this.setEndpoint(`${this.getEndpoint()}/${id}`);
			if (endpointParams.slug) {
				delete endpointParams.slug;
			}
		}

		if (revision) {
			this.setEndpoint(`${this.getEndpoint()}/revisions`);
		}

		return super.buildEndpointURL(endpointParams);
	}

	/**
	 * Handles fetching by multiple post types, authToken and revisions
	 *
	 * @param url The url to fetch
	 * @param params The params to build the endpoint url
	 * @param options FetchOptions
	 */
	async fetcher(url: string, params: PostParams, options: Partial<FetchOptions> = {}) {
		if (params.authToken) {
			options.bearerToken = params.authToken;
		}

		let error;
		try {
			const result = await super.fetcher(url, params, options);

			return result;
		} catch (e) {
			error = e;
		}

		// should throw error if didn't find anything and params.postType is not an array.
		if (!Array.isArray(params.postType)) {
			throw error;
		}

		// skip first post type as it has already been feteched
		const [, ...postTypes] = params.postType;

		let result;
		for await (const postType of postTypes) {
			try {
				const newParams = { ...params, postType };
				const endpointUrl = this.buildEndpointURL({ ...newParams, postType });

				result = await super.fetcher(endpointUrl, newParams, options);
			} catch (e) {
				error = e;
			}
		}

		if (!result) {
			throw error;
		}

		return result;
	}
}
