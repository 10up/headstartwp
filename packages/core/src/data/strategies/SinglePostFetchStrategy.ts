import { getCustomPostType } from '../../utils';
import { PostEntity } from '../types';
import { postMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface PostParams extends EndpointParams {
	slug: string;
	postType?: string;
}

export class SinglePostFetchStrategy extends AbstractFetchStrategy<PostEntity, PostParams> {
	getParamsFromURL(params: { path?: string[] } | undefined): Partial<PostParams> {
		if (!params?.path) {
			return {};
		}

		const { path } = params;

		return parsePath(postMatchers, this.createPathFromArgs(path));
	}

	buildEndpointURL(params: PostParams) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { postType, ...endpointParams } = params;

		if (params.postType) {
			const postType = getCustomPostType(params.postType);

			if (!postType) {
				throw new Error(
					'Unkown post type, did you forget to add it to headless.config.js?',
				);
			}

			this.setEndpoint(postType.endpoint);
		}

		return super.buildEndpointURL(endpointParams);
	}

	/* async fetcher(url: string, params: PostParams) {
		const finalUrl = url;

		if (params.postType) {
			const postType = getCustomPostType(params.postType);

			if (!postType) {
				throw new Error(
					'Unkown post type, did you forget to add it to headless.config.js?',
				);
			}
		}

		return super.fetcher(finalUrl, params);
	} */
}
