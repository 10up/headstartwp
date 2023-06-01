import { LOGTYPE, fetchRedirect, log } from '@headstartwp/core';
import { GetServerSidePropsResult } from 'next';
import { HeadlessGetServerSidePropsContext, HeadlessGetStaticPropsPropsContext } from '../types';
import { getSiteFromContext } from './getSiteFromContext';

function isStringArray(el): el is string[] {
	return Array.isArray(el);
}

function isGetServerSide(
	ctx: HeadlessGetServerSidePropsContext | HeadlessGetStaticPropsPropsContext,
): ctx is HeadlessGetServerSidePropsContext {
	return typeof (ctx as HeadlessGetServerSidePropsContext).resolvedUrl !== 'undefined';
}

/**
 * Extracts the path name out of the Next.js resolvedUrl
 *
 * @param resolvedUrl The full resolved URL
 *
 * @returns
 */
export function getPathName(resolvedUrl: string) {
	// /_sites/:site/:rest(.*)
	const matches = resolvedUrl.match(/^\/_sites\/((?:[^\/]+?))\/((?:.*))(?:\/(?=$))?$/i); // eslint-disable-line no-useless-escape

	if (matches) {
		return `/${matches[2]}`;
	}

	return resolvedUrl;
}

/**
 * The `handleError` function is responsible for handling errors that occur during
 * data fetching in `getServerSideProps` or `getStaticProps`.
 *
 * It also handles redirects if `redirectStrategy` is set to `404` in `headless.config.js`
 *
 * If `error` is of type {@link NotFoundError} it will redirect to the 404 page. Otherwise it will
 * return a server error (500) page
 * ## Usage
 *
 * ```ts
 * export async function getServerSideProps(context) {
 *	try {
 * 		const usePostsHook = await fetchHookData(usePosts.fetcher(),context);
 *		return addHookData([usePostsHook], {});
 *	} catch (e) {
 *		return handleError(e, context);
 *	}
 * }
 * ```
 *
 * @param error The error object
 * @param ctx The Next.js context
 * @param rootRoute The root route (deprecated/unnecessary). This needs to be revisited
 *
 * @category Next.js Data Fetching Utilities
 */
export async function handleError(
	error: Error,
	ctx: HeadlessGetServerSidePropsContext | HeadlessGetStaticPropsPropsContext,
	rootRoute: string = '',
): Promise<GetServerSidePropsResult<{}>> {
	const { redirectStrategy, sourceUrl, debug } = getSiteFromContext(ctx);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, '[handleError] error', error.name, error.message);
	}

	if (error.name === 'NotFoundError') {
		let pathname = '';
		if (isGetServerSide(ctx)) {
			pathname = getPathName(ctx.resolvedUrl);
		} else {
			// build out the url from params.path
			pathname =
				typeof ctx?.params !== 'undefined' && isStringArray(ctx.params?.path)
					? `${rootRoute}/${ctx.params.path.join('/')}`
					: `${rootRoute}/${ctx.params?.path as string}`;

			// if there's a locale and it isn't the default locale append the locale to pathname
			if (ctx.locale && ctx.defaultLocale && ctx.defaultLocale !== ctx.locale) {
				pathname = `/${ctx.locale}${pathname}`;
			}
		}

		if (redirectStrategy === '404' && pathname) {
			const redirect = await fetchRedirect(pathname, sourceUrl || '');

			if (redirect.location) {
				return {
					redirect: {
						destination: redirect.location,
						permanent: false,
					},
				};
			}
		}

		return { notFound: true };
	}

	throw error;
}
