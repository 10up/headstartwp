import { searchMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { PostsArchiveFetchStrategy, PostsArchiveParams } from './PostsArchiveFetchStrategy';

export class SearchFetchStrategy extends PostsArchiveFetchStrategy {
	getParamsFromURL(params: { path?: string[] } | undefined): Partial<PostsArchiveParams> {
		if (!params?.path) {
			return {};
		}

		const { path } = params;

		return parsePath(searchMatchers, this.createPathFromArgs(path));
	}

	async fetcher(url: string, params: Partial<PostsArchiveParams>) {
		return super.fetcher(url, params, { throwIfNotFound: false });
	}
}
