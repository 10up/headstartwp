import { NextRequest, NextResponse } from 'next/server';
import { fetchRedirect, getHeadlessConfig, getSite } from '@10up/headless-core/utils';

const ALLOWED_STATIC_PATHS = /^\/.*\.(ico|png|jpg|jpeg)$/g;

function isStaticAssetRequest(req: NextRequest) {
	return req.nextUrl.pathname.match(ALLOWED_STATIC_PATHS);
}

function isInternalRequest(req: NextRequest) {
	return req.nextUrl.pathname.startsWith('/_next');
}

function isMultisiteRequest(req: NextRequest) {
	const { sites } = getHeadlessConfig();
	const hostname = req.headers.get('host') || '';

	return sites && Boolean(sites.find((site) => site.host === hostname));
}

export function getSiteFromRequest(req: NextRequest) {
	const currentSite = req.headers.get('host') || '';
	const settings = getHeadlessConfig();
	const site =
		settings.sites &&
		settings.sites.find(({ host, locale }) => {
			if (req.nextUrl.locale) {
				return host === currentSite && locale === req.nextUrl.locale;
			}

			return host === currentSite;
		});

	return getSite(site);
}

export async function AppMiddleware(req: NextRequest) {
	if (isStaticAssetRequest(req) || isInternalRequest(req)) {
		return NextResponse.next();
	}

	const { redirectStrategy, sourceUrl } = isMultisiteRequest(req)
		? getSiteFromRequest(req)
		: getHeadlessConfig();

	if (!sourceUrl) {
		throw new Error('Site not found.');
	}

	const { pathname } = req.nextUrl;

	if (redirectStrategy === 'always') {
		const redirect = await fetchRedirect(pathname, sourceUrl || '');

		if (redirect.location) {
			return NextResponse.redirect(redirect.location, redirect.status);
		}
	}

	if (isMultisiteRequest(req)) {
		const url = req.nextUrl;
		const hostname = req.headers.get('host') || '';
		url.pathname = `/_sites/${hostname}${url.pathname}`;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
}
