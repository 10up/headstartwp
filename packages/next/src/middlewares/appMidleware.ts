import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
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

export function getAppRouterLocale(request: NextRequest) {
	const config = getHeadstartWPConfig();
	const isPotentiallyMultisite = hasMultisiteConfig();
	const hasPolylangIntegration = isPolylangIntegrationEnabled();

	let defaultLocale: string | undefined;
	let supportedLocales: string[] = [];

	// no polylang, the default locale is the first root locale
	if (!hasPolylangIntegration && isPotentiallyMultisite) {
		defaultLocale = config.locale ?? 'en';
		supportedLocales = [
			...new Set(
				config.sites
					?.filter((site) => typeof site.locale !== 'undefined')
					.map((site) => site.locale as string),
			),
		];
	}

	// polylang only
	if (hasPolylangIntegration && !isPotentiallyMultisite) {
		defaultLocale = config.integrations?.polylang?.defaultLocale ?? 'en';
		supportedLocales = [...new Set(config.integrations?.polylang?.locales ?? [])];
	}

	if (typeof defaultLocale === 'undefined') {
		return undefined;
	}

	if (supportedLocales.length === 0) {
		return undefined;
	}

	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => {
		negotiatorHeaders[key] = value;
	});

	const locales: readonly string[] = [defaultLocale, ...(supportedLocales ?? [])];

	// Use negotiator and intl-localematcher to get best locale
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

	const locale = matchLocale(languages, locales, defaultLocale);

	// get locale from URL

	return locale;
}

type AppMidlewareOptions = {
	appRouter: boolean;
};

export async function AppMiddleware(
	req: NextRequest,
	options: AppMidlewareOptions = { appRouter: false },
) {
	let response = NextResponse.next();
	const currentUrl = req.nextUrl.pathname;

	if (isStaticAssetRequest(req) || isInternalRequest(req)) {
		return response;
	}

	const isPotentiallyMultisite = hasMultisiteConfig();
	const hasPolylangIntegration = isPolylangIntegrationEnabled();

	if (hasPolylangIntegration && isPotentiallyMultisite) {
		// potentially conflicting set up
		// will figure out later if we need to support this
		throw new Error('Polylang and multisite are not supported together');
	}

	const locale = options.appRouter ? getAppRouterLocale(req) : req.nextUrl.locale;
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
		throw new Error('Site not found.');
	}

	const { pathname } = req.nextUrl;

	if (redirectStrategy === 'always') {
		const redirect = await fetchRedirect(pathname, sourceUrl || '');

		if (redirect.location) {
			return NextResponse.redirect(
				`${hostUrl.replace(/\/$/, '')}${redirect.location}`,
				redirect.status,
			);
		}
	}

	if (req.nextUrl.pathname.endsWith('/page/1') || req.nextUrl.pathname.endsWith('/page/1/')) {
		return NextResponse.redirect(req.url.replace('/page/1', ''));
	}

	if (locale) {
		// check to see if it needs to redirect
	}

	if (isMultisiteRequest) {
		const url = req.nextUrl;

		const pagesRouterRewrite = `/_sites/${hostname}${url.pathname}`;
		const appRouterRewrite = locale
			? `/${locale}/${hostname}${url.pathname}`
			: `/${hostname}${url.pathname}`;

		response = NextResponse.rewrite(
			new URL(options.appRouter ? appRouterRewrite : pagesRouterRewrite, url),
		);

		response.headers.set('x-headstartwp-site', hostname);
	}

	if (locale) {
		response.headers.set('x-headstartwp-locale', locale);
	}

	response.headers.set('x-headstartwp-current-url', currentUrl);

	return response;
}
