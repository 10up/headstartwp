import { NextRequest, NextResponse } from 'next/server';
// eslint-disable-next-line
import { parsePath, postMatchers } from '@10up/headless-core/data';

function isSinglePostRequest(pathname: string) {
	const parsedPath = parsePath(postMatchers, pathname);

	return typeof parsedPath.slug !== 'undefined';
}

function isStaticAssetRequest(req: NextRequest) {
	return req.nextUrl.pathname === '/favicon.ico';
}

export function AppMiddleware(req: NextRequest) {
	const res = NextResponse.next();

	if (isStaticAssetRequest(req)) {
		return res;
	}

	const { pathname } = req.nextUrl;

	if (isSinglePostRequest(pathname)) {
		return NextResponse.rewrite('/post/[...args]');
	}

	return res;
}
