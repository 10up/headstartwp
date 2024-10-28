import { NextResponse, NextRequest } from 'next/server';
import { fetchRedirect, getHeadstartWPConfig, getSiteByHost } from '@headstartwp/core/utils';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';

const ALLOWED_STATIC_PATHS = /^\/.*\.(ico|png|jpg|jpeg)$/g;

function isStaticAssetRequest(req: NextRequest) {
	return req.nextUrl.pathname.match(ALLOWED_STATIC_PATHS);
}

function isInternalRequest(req: NextRequest) {
	return req.nextUrl.pathname.startsWith('/_next');
}

function hasMultisiteConfig() {
	const config = getHeadstartWPConfig();
	return (config.sites?.length ?? 0) > 0;
}

function isPolylangIntegrationEnabled() {
	const config = getHeadstartWPConfig();
	return config.integrations?.polylang?.enable ?? false;
}

function getAppRouterSupportedLocales() {
	const config = getHeadstartWPConfig();

	const { defaultLocale, locales = [], localeDetection = true } = config.i18n ?? {};

	return {
		defaultLocale,
		supportedLocales: [...new Set(locales)],
		localeDetection,
	};
}

function isValidLocale(locale: string) {
	const { supportedLocales } = getAppRouterSupportedLocales();

	return supportedLocales.includes(locale);
}

/**
 * On App Router it returns a tuple with defaultLocale and locale
 *
 * @param request Next Request
 * @returns A tuple [defaultLocale, locale]
 */
export function getAppRouterLocale(request: NextRequest): [string, string] | undefined {
	const { defaultLocale, supportedLocales, localeDetection } = getAppRouterSupportedLocales();

	if (typeof defaultLocale === 'undefined') {
		return undefined;
	}

	if (supportedLocales.length === 0) {
		return undefined;
	}

	// if there's a locale in the URL and it's a supported or valid locale, use it
	const urlLocale = request.nextUrl.pathname.split('/')[1];
	if (isValidLocale(urlLocale)) {
		return [defaultLocale, urlLocale];
	}

	if (localeDetection) {
		// Negotiator expects plain object so we need to transform headers
		const negotiatorHeaders: Record<string, string> = {};
		request.headers.forEach((value, key) => {
			negotiatorHeaders[key] = value;
		});

		const locales: readonly string[] = [defaultLocale, ...(supportedLocales ?? [])];

		// Use negotiator and intl-localematcher to get best locale
		const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

		const locale = matchLocale(languages, locales, defaultLocale);

		return [defaultLocale, locale];
	}

	return [defaultLocale, defaultLocale];
}

type AppMidlewareOptions = {
	appRouter: boolean;
};

export async function AppMiddleware(
	req: NextRequest,
	options: AppMidlewareOptions = { appRouter: false },
) {
	let response = NextResponse.next();
	const { pathname } = req.nextUrl;

	if (isStaticAssetRequest(req) || isInternalRequest(req)) {
		return response;
	}

	const isPotentiallyMultisite = hasMultisiteConfig();
	const hasPolylangIntegration = isPolylangIntegrationEnabled();

	if (hasPolylangIntegration && isPotentiallyMultisite && options.appRouter) {
		// potentially conflicting set up
		// will figure out later if we need to support this
		throw new Error('Polylang and multisite are not supported together');
	}

	const [defaultAppRouterLocale, appRouterLocale] = options.appRouter
		? getAppRouterLocale(req) ?? []
		: [];

	const locale = options.appRouter && appRouterLocale ? appRouterLocale : req.nextUrl.locale;
	const firstPathSlice = pathname.split('/')[1];
	const hostname = req.headers.get('host') || '';

	// if it's polylang integration, we should not be using locale to get site
	const site = getSiteByHost(hostname, !hasPolylangIntegration ? locale : undefined);
	const isMultisiteRequest = site !== null && typeof site.sourceUrl !== 'undefined';

	const {
		redirectStrategy,
		sourceUrl,
		hostUrl = '/',
	} = isMultisiteRequest ? site : getHeadstartWPConfig();

	if (!sourceUrl) {
		// todo: should we 404 instead?
		throw new Error('Site not found.');
	}

	if (redirectStrategy === 'always') {
		const redirect = await fetchRedirect(pathname, sourceUrl || '');

		if (redirect.location) {
			return NextResponse.redirect(
				`${hostUrl.replace(/\/$/, '')}${redirect.location}`,
				redirect.status,
			);
		}
	}

	if (pathname.endsWith('/page/1') || pathname.endsWith('/page/1/')) {
		return NextResponse.redirect(req.url.replace('/page/1', ''));
	}

	let shouldRedirect = false;

	if (locale && options.appRouter) {
		const { supportedLocales } = getAppRouterSupportedLocales();

		const pathnameIsMissingLocale = supportedLocales.every(
			(loc) => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`,
		);

		// redirect default locale in the URL to a version without the locale
		// e.g /en/about-us -> /about-us where en is the default locale
		if (locale === defaultAppRouterLocale && firstPathSlice === locale) {
			shouldRedirect = true;
			const pathNameWithoutLocale = pathname.replace(`/${locale}`, '');
			response = NextResponse.redirect(
				new URL(pathNameWithoutLocale, req.url.replace(`/${locale}`, '')),
			);
		}
		// if we detected a non-default locale, there isn't a supported locale in the URL already
		// but the first part of pathname (what is assumed to be a locale) is not a valid locale
		// then we should redirect to add the locale
		// e.g /about-us -> /en/about-us
		else if (
			locale !== defaultAppRouterLocale &&
			pathnameIsMissingLocale &&
			!isValidLocale(firstPathSlice)
		) {
			shouldRedirect = true;
			response = NextResponse.redirect(
				new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url),
			);
		}
		// nothing else and there's not a locale in path then rewrite to add default locale
		else if (pathnameIsMissingLocale && !isValidLocale(firstPathSlice)) {
			response = NextResponse.rewrite(
				new URL(
					`/${defaultAppRouterLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
					req.url,
				),
			);
		}
	}

	if (isMultisiteRequest && !shouldRedirect) {
		const hostNameOrSlug = site.slug || hostname;
		const pagesRouterRewrite = `/_sites/${hostNameOrSlug}${pathname}`;
		const appRouterRewrite = locale
			? `/${locale}/${hostNameOrSlug}${pathname.replace(`/${locale}`, '')}`
			: `/${hostNameOrSlug}${pathname}`;

		response = NextResponse.rewrite(
			new URL(options.appRouter ? appRouterRewrite : pagesRouterRewrite, req.nextUrl),
		);

		response.headers.set('x-headstartwp-site', hostNameOrSlug);
	}

	if (locale) {
		response.headers.set('x-headstartwp-locale', locale);
	}

	response.headers.set('x-headstartwp-current-url', pathname);

	return response;
}
