import { PostEntity } from '../types';
import { postMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface PostParams extends EndpointParams {
	slug: string;
	postType?: string | { slug: string; endpoint: string };
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

		return super.buildEndpointURL(endpointParams);
	}

	async fetcher(url: string, params: PostParams) {
		let finalUrl = url;
		const { postType } = params;

		if (postType) {
			if (typeof postType === 'string') {
				finalUrl = finalUrl.replace('posts', postType);
			}
			if (typeof postType === 'object') {
				finalUrl = finalUrl.replace('/posts', postType.endpoint);
			}
		}

		return super.fetcher(finalUrl, params);
	}
}
