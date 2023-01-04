import {
	getCustomPostType,
	ConfigError,
	EndpointError,
	removeSourceUrl,
	NotFoundError,
} from '../../utils';
import { PostEntity } from '../types';
import { postMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import {
	AbstractFetchStrategy,
	EndpointParams,
	FetchOptions,
	FetchResponse,
	FilterDataOptions,
} from './AbstractFetchStrategy';
import { endpoints, removeFieldsFromPostRelatedData } from '../utils';
import { removeFields } from '../utils/dataFilter';
import { apiGet } from '../api';

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
export class SinglePostFetchStrategy extends AbstractFetchStrategy<
	PostEntity[],
	PostParams,
	PostEntity
> {
	postType: string = 'post';

	revision?: PostEntity;

	path: string = '';

	shoudCheckCurrentPathAgainstPostLink: boolean = true;

	getDefaultEndpoint(): string {
		return endpoints.posts;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(path: string, nonUrlParams: Partial<PostParams> = {}): Partial<PostParams> {
		this.path = path;
		// if slug is passed, it is being manually overriden then don't check current path
		this.shoudCheckCurrentPathAgainstPostLink = typeof nonUrlParams.slug === 'undefined';

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

			const postType = getCustomPostType(postTypeSlug, this.baseURL);

			if (!postType) {
				throw new ConfigError(
					'Unkown post type, did you forget to add it to headless.config.js?',
				);
			}
			this.postType = postType.slug;
			this.setEndpoint(postType.endpoint);
		}

		if (id) {
			this.setEndpoint(`${this.getEndpoint()}/${id}`);
			if (endpointParams.slug) {
				delete endpointParams.slug;
			}
		}

		return super.buildEndpointURL(endpointParams);
	}

	/**
	 * Prepares the post response
	 *
	 * @param response
	 * @returns
	 */
	prepareResponse(
		response: FetchResponse<PostEntity[] | PostEntity>,
		params: Partial<PostParams>,
	): FetchResponse<PostEntity> {
		const { result } = response;

		if (
			typeof this.revision !== 'undefined' &&
			typeof params.id !== 'undefined' &&
			!Array.isArray(response.result)
		) {
			const revisionContent = {
				content: { ...this.revision.content },
				excerpt: { ...this.revision.excerpt },
				title: { ...this.revision.title },
			};
			return {
				...response,
				result: { ...response.result, ...revisionContent },
			};
		}

		if (params.id && !Array.isArray(result)) {
			this.setEndpoint(this.getDefaultEndpoint());
			return {
				...response,
				result,
			};
		}

		// if result is an array, prioritize the result where the
		// link property matches with the current route
		if (Array.isArray(result)) {
			const shouldCheckCurrentPath =
				this.path.length > 0 &&
				this.path !== '/' &&
				this.shoudCheckCurrentPathAgainstPostLink;

			const post = shouldCheckCurrentPath
				? result.find((post) => {
						return (
							removeSourceUrl({
								link: post.link,
								backendUrl: this.baseURL,
							})?.replace(/\/?$/, '/') === this.path.replace(/\/?$/, '/')
						);
				  })
				: result[0];

			if (!post) {
				throw new NotFoundError(
					`Post was found but did not match current path: "${this.path}"`,
				);
			}

			return {
				...response,
				result: post,
			};
		}

		return {
			...response,
			result,
		};
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
		if (params.revision && params.id) {
			try {
				const response = await apiGet(
					`${this.baseURL}${this.getEndpoint()}/revisions?per_page=1`,
					{
						headers: {
							Authorization: `Bearer ${options.bearerToken}`,
						},
					},
				);

				if (Array.isArray(response.json) && response.json.length > 0) {
					this.revision = response.json[0];
				}
			} catch (e) {
				throw new EndpointError('Unable to fetch latest revision');
			}
		}

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

		for await (const postType of postTypes) {
			try {
				this.postType = postType;
				const newParams = { ...params, postType };
				const endpointUrl = this.buildEndpointURL({ ...newParams, postType });

				const result = await super.fetcher(endpointUrl, newParams, options);
				return result;
			} catch (e) {
				error = e;
			}
		}

		// if gets to the this point then nothing was found then thrown
		throw error;
	}

	filterData(data: FetchResponse<PostEntity>, filterOptions?: FilterDataOptions<PostEntity>) {
		if (filterOptions) {
			return this.filterData(data, filterOptions);
		}

		const fieldsToRemove = ['_links'];

		const post = removeFields(fieldsToRemove, data.result) as PostEntity;

		return {
			...data,
			result: removeFieldsFromPostRelatedData(fieldsToRemove, post),
		};
	}
}
