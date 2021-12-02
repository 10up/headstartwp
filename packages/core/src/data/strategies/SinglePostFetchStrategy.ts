import { PostEntity } from '../types';
import { postMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface PostParams extends EndpointParams {
	slug: string;
}

export class SinglePostFetchStrategy extends AbstractFetchStrategy<PostEntity, PostParams> {
	getParamsFromURL(params: { path?: string[] } | undefined): Partial<PostParams> {
		if (!params?.path) {
			return {};
		}

		const { path } = params;

		return parsePath(postMatchers, this.createPathFromArgs(path));
	}
}
