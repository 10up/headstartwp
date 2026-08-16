import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { PreviewData } from '../../handlers/types';
import { warnDeprecatedPagesRouter } from '../../utils/deprecation';

/**
 * Narrows a pages-router data-fetching context to a specific site in a multisite setup.
 *
 * @param ctx The Next.js context, from either `getServerSideProps` or `getStaticProps`
 * @param site The site slug to scope the context to
 *
 * @deprecated Since v2. Supports the Next.js pages router, which is legacy. It still works in
 * v2 and is scheduled for removal in v3. Use the app router, where the site is resolved from
 * route params, instead.
 *
 * @returns The context with `params.site` set
 */
export function withSiteContext(
	ctx: GetServerSidePropsContext<any, PreviewData> | GetStaticPropsContext<any, PreviewData>,
	site: string,
) {
	warnDeprecatedPagesRouter(
		'withSiteContext',
		'the app router, where the site is resolved from route params',
	);

	return {
		...ctx,
		params: {
			...(ctx.params ?? {}),
			site,
		},
	};
}
