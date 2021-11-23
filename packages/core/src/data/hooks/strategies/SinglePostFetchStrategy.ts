import { PostEntity } from '../../types';
import { postMatchers } from '../../utils/matchers';
import { parsePath } from '../../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface PostParams extends EndpointParams {
	slug?: string;
}

export class SinglePostFetchStrategy extends AbstractFetchStrategy<PostEntity, PostParams> {
	getParamsFromURL(params: { args?: string[] } | undefined): PostParams {
		if (!params?.args) {
			return {};
		}

		const { args } = params;

		return parsePath(postMatchers, this.createPathFromArgs(args));
	}
}
