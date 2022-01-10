import { PostEntity } from '../types';
import { postMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface PostParams extends EndpointParams {
	id?: number;
	slug?: string;
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
		const { postType, id, ...endpointParams } = params;

		if (id) {
			return `${this.endpoint}/${id}`;
		}

		return super.buildEndpointURL(endpointParams);
	}

	async fetcher(url: string, params: PostParams) {
		let finalUrl = url;
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
