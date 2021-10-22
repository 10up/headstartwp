import { Entity } from '../../types';
import { postMatchers } from '../../utils/matchers';
import { parsePath } from '../../utils/parsePath';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface PostParams extends EndpointParams {
	slug?: string;
}

export class SinglePostFetchStrategy extends AbstractFetchStrategy<Entity, PostParams> {
	getParamsFromURL(params: { args?: string[] }): PostParams {
		const { args } = params;

		if (!args) {
			return {};
		}

		return parsePath(postMatchers, this.createPathFromArgs(args));
	}
}
