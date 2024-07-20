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

function getAppRouterLocale(request: NextRequest) {
	const config = getHeadstartWPConfig();
	const sitesLocales = config.sites
		?.filter((site) => typeof site.locale !== 'undefined')
		.map((site) => site.locale as string);

	if (!config.locale) {
		return undefined;
	}

	if (!sitesLocales) {
		return undefined;
	}

	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => {
		negotiatorHeaders[key] = value;
	});

	const defaultLocale = config.locale ?? 'en';

	const locales: readonly string[] = [defaultLocale, ...(sitesLocales ?? [])];

	// Use negotiator and intl-localematcher to get best locale
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

	const locale = matchLocale(languages, locales, defaultLocale);

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

	const locale = options.appRouter ? getAppRouterLocale(req) : req.nextUrl.locale;
	const hostname = req.headers.get('host') || '';
	const site = getSiteByHost(hostname, locale);
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

	if (isMultisiteRequest) {
		const url = req.nextUrl;

		response = NextResponse.rewrite(
			new URL(
				options.appRouter
					? `/${hostname}${url.pathname}`
					: `/_sites/${hostname}${url.pathname}`,
				url,
			),
		);
		response.headers.set('x-headstartwp-site', hostname);
	}

	response.headers.set('x-headstartwp-current-url', currentUrl);

	return response;
}
