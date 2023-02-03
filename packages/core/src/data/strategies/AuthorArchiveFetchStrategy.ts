import { getCustomTaxonomies } from '../../utils';
import { PostEntity } from '../types';
import { authorArchivesMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { PostsArchiveFetchStrategy, PostsArchiveParams } from './PostsArchiveFetchStrategy';

/**
 * The AuthorArchiveFetchStrategy extends the {@link PostsArchiveFetchStrategy} and performs author archive requests
 *
 * This strategy supports extracting endpoint params from url E.g:
 * - `/author-name/` maps to `{ author: 'author-name' }`
 * - `/author-name/page/2` maps to `{ author: 'author-name', page: 2 }`
 *
 * @category Data Fetching
 */
export class AuthorArchiveFetchStrategy<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
> extends PostsArchiveFetchStrategy<T, P> {
	getParamsFromURL(
		path: string,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		nonUrlParams: Partial<P> = {},
	): Partial<P> {
		const matchers = [...authorArchivesMatchers];
		const customTaxonomies = getCustomTaxonomies(this.baseURL);

		customTaxonomies?.forEach((taxonomy) => {
			const slug = taxonomy?.rewrite ?? taxonomy.slug;
			matchers.push({
				name: `author-archive-${taxonomy.slug}`,
				priority: 30,
				pattern: `/:author/${slug}/:${slug}`,
			});

			matchers.push({
				name: `${taxonomy.slug}-with-pagination`,
				priority: 30,
				pattern: `/:author/${slug}/:${slug}/page/:page`,
			});
		});

		return parsePath(matchers, path) as Partial<P>;
	}
}
