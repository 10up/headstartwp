import { NextRequest } from 'next/server';
import { setHeadstartWPConfig } from '@headstartwp/core/utils';
import { AppMiddleware, getAppRouterLocale } from '../appMidleware';

describe('appMiddleware', () => {
	it('adds headers', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'http://testwp.com',
		});

		let req = new NextRequest('http://test.com', {
			method: 'GET',
		});

		let res = await AppMiddleware(req);

		expect(res.headers.get('x-headstartwp-site')).toBeNull();
		expect(res.headers.get('x-headstartwp-current-url')).toBe('/');

		req = new NextRequest('http://test.com/post-name', {
			method: 'GET',
		});

		res = await AppMiddleware(req);

		expect(res.headers.get('x-headstartwp-site')).toBeNull();
		expect(res.headers.get('x-headstartwp-current-url')).toBe('/post-name');

		req = new NextRequest('http://test.com/post-name', {
			method: 'GET',
		});

		res = await AppMiddleware(req);

		expect(res.headers.get('x-headstartwp-site')).toBeNull();
		expect(res.headers.get('x-headstartwp-current-url')).toBe('/post-name');
	});

	it('supports multisite', async () => {
		setHeadstartWPConfig({
			sites: [
				{
					sourceUrl: 'http://testwp.com',
					hostUrl: 'http://test.com',
				},
				{
					sourceUrl: 'http://testwp2.com',
					hostUrl: 'http://test2.com',
				},
			],
		});

		let req = new NextRequest('http://test.com/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test.com');

		let res = await AppMiddleware(req);

		expect(res.headers.get('x-headstartwp-site')).toBe('test.com');
		expect(res.headers.get('x-headstartwp-current-url')).toBe('/post-name');

		req = new NextRequest('http://test2.com/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test2.com');

		res = await AppMiddleware(req);

		expect(res.headers.get('x-middleware-rewrite')).toBe(
			'http://test2.com/_sites/test2.com/post-name',
		);
		expect(res.headers.get('x-headstartwp-site')).toBe('test2.com');
		expect(res.headers.get('x-headstartwp-current-url')).toBe('/post-name');
	});

	it('supports multisite with locale', async () => {
		setHeadstartWPConfig({
			sites: [
				{
					sourceUrl: 'http://testwp.com',
					hostUrl: 'http://test.com',
					locale: 'en',
				},
				{
					locale: 'es',
					sourceUrl: 'http://testwp.com/es',
					hostUrl: 'http://test.com',
				},
			],
		});

		const req = new NextRequest('http://test2.com/post-name', {
			method: 'GET',
			nextConfig: {
				i18n: {
					locales: ['en', 'es'],
					defaultLocale: 'en',
				},
			},
		});

		req.headers.set('host', 'test.com');

		const res = await AppMiddleware(req);

		expect(res.headers.get('x-middleware-rewrite')).toBe(
			'http://test2.com/_sites/test.com/post-name',
		);
		expect(res.headers.get('x-headstartwp-site')).toBe('test.com');
		expect(res.headers.get('x-headstartwp-current-url')).toBe('/post-name');
	});

	it('throws site not found if can not find site based on host', async () => {
		setHeadstartWPConfig({
			sites: [
				{
					sourceUrl: 'http://testwp.com',
					hostUrl: 'http://test.com',
				},
				{
					sourceUrl: 'http://testwp2.com',
					hostUrl: 'http://test2.com',
				},
			],
		});

		const req = new NextRequest('http://test4.com/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test4.com');

		await expect(() => AppMiddleware(req)).rejects.toThrow('Site not found.');
	});

	it('throws site not found if can not find site based on host and locale', async () => {
		setHeadstartWPConfig({
			sites: [
				{
					sourceUrl: 'http://testwp.com',
					hostUrl: 'http://test.com',
					locale: 'en',
				},
				{
					locale: 'es',
					sourceUrl: 'http://testwp.com/es',
					hostUrl: 'http://test.com',
				},
			],
		});

		const req = new NextRequest('http://test2.com/post-name', {
			method: 'GET',
			nextConfig: {
				i18n: {
					locales: ['zh', 'pr'],
					defaultLocale: 'pt-br',
				},
			},
		});

		req.headers.set('host', 'test.com');

		await expect(() => AppMiddleware(req)).rejects.toThrow('Site not found.');
	});

	it('supports multisite in with App Router', async () => {
		setHeadstartWPConfig({
			sites: [
				{
					sourceUrl: 'http://testwp.com',
					hostUrl: 'http://test.com',
				},
				{
					sourceUrl: 'http://testwp2.com',
					hostUrl: 'http://test2.com',
				},
			],
		});

		const req = new NextRequest('http://test2.com/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test2.com');

		const res = await AppMiddleware(req, { appRouter: true });

		expect(res.headers.get('x-middleware-rewrite')).toBe(
			'http://test2.com/test2.com/post-name',
		);
		expect(res.headers.get('x-headstartwp-site')).toBe('test2.com');
		expect(res.headers.get('x-headstartwp-current-url')).toBe('/post-name');
	});

	it('redirect /page/1 to page without 1', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'http://testwp.com',
		});

		const req = new NextRequest('http://test.com/blog/page/1', {
			method: 'GET',
		});

		const res = await AppMiddleware(req);

		expect(res.status).toBe(307);
		expect(res.headers.get('Location')).toBe('http://test.com/blog');
	});

	it('redirect at middleware if redirectStrategy is always', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'http://example.com',
			redirectStrategy: 'always',
			hostUrl: 'http://test.com',
		});

		const req = new NextRequest('http://example.com/redirect-test', {
			method: 'GET',
		});

		const res = await AppMiddleware(req);

		expect(res.status).toBe(301);
		expect(res.headers.get('Location')).toBe('http://test.com/redirected-page');
	});

	it('skips static or internal requests', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'http://example.com',
			redirectStrategy: 'always',
		});

		let req = new NextRequest('http://test.com/_next', {
			method: 'GET',
		});

		let res = await AppMiddleware(req);
		expect(res.headers.get('x-headstartwp-current-url')).toBeNull();

		req = new NextRequest('http://test.com/image.png', {
			method: 'GET',
		});

		res = await AppMiddleware(req);
		expect(res.headers.get('x-headstartwp-current-url')).toBeNull();
	});

	it('[multisite] supports locales with App Router', async () => {
		setHeadstartWPConfig({
			i18n: {
				defaultLocale: 'en',
				locales: ['en', 'pt'],
			},
			sites: [
				{
					sourceUrl: 'http://testwp.com',
					hostUrl: 'http://test.com',
					locale: 'en',
				},
				{
					sourceUrl: 'http://testwp2.com',
					hostUrl: 'http://test2.com',
					locale: 'pt',
				},
				{
					sourceUrl: 'http://testwp2.com/en',
					hostUrl: 'http://test2.com',
					locale: 'en',
				},
			],
		});

		let req = new NextRequest('http://test2.com/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test2.com');
		req.headers.set('accept-language', 'pt-BR');

		let res = await AppMiddleware(req, { appRouter: true });

		expect(getAppRouterLocale(req)).toStrictEqual(['en', 'pt']);
		expect(res.status).toBe(307);
		expect(res.headers.get('Location')).toBe('http://test2.com/pt/post-name');

		// follow the redirect
		req = new NextRequest('http://test2.com/pt/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test2.com');
		req.headers.set('accept-language', 'pt-BR');

		res = await AppMiddleware(req, { appRouter: true });

		expect(res.headers.get('x-middleware-rewrite')).toBe(
			'http://test2.com/pt/test2.com/post-name',
		);
		expect(res.headers.get('x-headstartwp-site')).toBe('test2.com');
		expect(res.headers.get('x-headstartwp-locale')).toBe('pt');
	});

	it('[polylang] supports locales and app router', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'http://testwp.com',
			hostUrl: 'http://test.com',
			integrations: {
				polylang: {
					enable: true,
				},
			},
			i18n: {
				locales: ['en', 'es'],
				defaultLocale: 'en',
			},
		});

		const req = new NextRequest('http://test.com/post-name', {
			method: 'GET',
		});

		req.headers.set('accept-language', 'es');

		expect(getAppRouterLocale(req)).toStrictEqual(['en', 'es']);

		const res = await AppMiddleware(req, { appRouter: true });

		expect(res.headers.get('x-headstartwp-locale')).toBe('es');
		// it should redirect
		expect(res.status).toBe(307);
		expect(res.headers.get('Location')).toBe('http://test.com/es/post-name');
	});

	it('throws on polylang and multisite together', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'http://testwp.com',
			hostUrl: 'http://test.com',
			integrations: {
				polylang: {
					enable: true,
				},
			},
			sites: [
				{
					sourceUrl: 'http://testwp.com',
					hostUrl: 'http://test.com',
					locale: 'en',
				},
				{
					sourceUrl: 'http://testwp2.com',
					hostUrl: 'http://test2.com',
					locale: 'pt',
				},
				{
					sourceUrl: 'http://testwp2.com/en',
					hostUrl: 'http://test2.com',
					locale: 'en',
				},
			],
		});

		const req = new NextRequest('http://test.com/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test.com');
		req.headers.set('accept-language', 'es');

		expect(getAppRouterLocale(req)).toBeUndefined();

		await expect(() => AppMiddleware(req, { appRouter: true })).rejects.toThrow(
			'Polylang and multisite are not supported together',
		);
	});

	it('[polylang] gets locale from url if set', async () => {
		setHeadstartWPConfig({
			sourceUrl: 'http://testwp.com',
			hostUrl: 'http://test.com',
			integrations: {
				polylang: {
					enable: true,
				},
			},
			i18n: {
				locales: ['en', 'es'],
				defaultLocale: 'en',
			},
		});

		let req = new NextRequest('http://test.com/en/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test.com');
		req.headers.set('accept-language', 'es');

		expect(getAppRouterLocale(req)).toStrictEqual(['en', 'en']);
		let res = await AppMiddleware(req, { appRouter: true });
		expect(res.headers.get('x-headstartwp-locale')).toBe('en');
		expect(res.headers.get('x-middleware-rewrite')).toBeNull();
		// should redirect from /en/post-name to /post-name
		expect(res.status).toBe(307);
		expect(res.headers.get('Location')).toBe('http://test.com/post-name');

		// pt is a unsuported but valid
		// the it should not redirect but just let it 404
		req = new NextRequest('http://test.com/pt/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test.com');
		req.headers.set('accept-language', 'es');

		expect(getAppRouterLocale(req)).toStrictEqual(['en', 'pt']);
		res = await AppMiddleware(req, { appRouter: true });
		expect(res.headers.get('x-headstartwp-locale')).toBe('pt');
		expect(res.headers.get('x-middleware-rewrite')).toBeNull();

		expect(res.status).toBe(200);
	});

	it('[multisite with locale] gets locale from url if set', async () => {
		setHeadstartWPConfig({
			i18n: {
				locales: ['en', 'es'],
				defaultLocale: 'en',
			},
			sites: [
				{
					sourceUrl: 'http://testwp.com',
					hostUrl: 'http://test.com',
					locale: 'en',
				},
				{
					sourceUrl: 'http://testwp2.com',
					hostUrl: 'http://test2.com',
					locale: 'pt',
				},
				{
					sourceUrl: 'http://testwp2.com/en',
					hostUrl: 'http://test2.com',
					locale: 'en',
				},
			],
		});

		// request for test2.com with en locale so should match `http://testwp2.com/en as sourceUrl`
		let req = new NextRequest('http://test2.com/en/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test2.com');
		// this locale should be skipped since it isn't supported and there's a locale in the URL
		req.headers.set('accept-language', 'es');

		expect(getAppRouterLocale(req)).toStrictEqual(['en', 'en']);
		const res = await AppMiddleware(req, { appRouter: true });
		expect(res.headers.get('x-headstartwp-locale')).toBe('en');
		expect(res.headers.get('x-middleware-rewrite')).toBeNull();
		// should redirect from /en/post-name to /post-name
		expect(res.status).toBe(307);
		expect(res.headers.get('Location')).toBe('http://test2.com/post-name');

		// es is an unsuported but valid locale
		req = new NextRequest('http://test2.com/es/post-name', {
			method: 'GET',
		});

		req.headers.set('host', 'test2.com');
		req.headers.set('accept-language', 'pt');

		expect(getAppRouterLocale(req)).toStrictEqual(['en', 'es']);
		// TODO: should we 404 instead?
		await expect(() => AppMiddleware(req, { appRouter: true })).rejects.toThrow(
			'Site not found',
		);
	});

	// TODO: add test for redirect loop
	// TODO add test for no locale in pathname and a need to redirect to add locale
});
