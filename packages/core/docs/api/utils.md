# Utilities functions

## fetchRedirect

The `fetchRedirect` function makes a HEAD request to origin (the WordPress site) and checks for a redirect response.

This can be integrated into framework to check for redirects. As an example one could run this check before every request in Next.js middleware.

```javascript
const { pathname } = req.nextUrl;

const redirect = await fetchRedirect(pathname);

if (redirect.location) {
    return NextResponse.redirect(redirect.location, redirect.status);
}
```

**Important**: Be aware of the perfomance implications of making this request before every request. Doing a redirect check before each request can have a big perfomance impact. A better alternative is only checking redirects if a page is not found.

## getWPUrl

The `getWPUrl` returns the WordPress URL defined in the `headless.config.js` object.

Loading the `headless.cofig.js` object is framework-dependent. To see how it's loaded in the Next.js integration take a look at [`withHeadlessConfig`](../../../next/src/config/withHeadlessConfig.ts).

There's also a `setHeadlessConfig` that can be used to set/override the headless config object at runtime.

## removeSourceUrl

The `removeSourceUrl` takes an URL and the WordPress URL and removes the WordPress URL. The goal is to return relative links which are required for client-side navigation in most frameworks.

```javascript
const relativeUrl = removeSourceUrl({ link: 'http://sourceurl.com/page-name', backendUrl: 'http://sourceurl.com' });
// returns '/page-name'
```

## isExternalUrl

This function simply checks if the URL is for an external link.

**Note**: This function basically checks if the URL is an absolute URL. If you pass an internal link before running the link through `removeSourceUrl` this function will still return true. If you want to check if a URL is an internal link, use `isInternalLink`.

## isInternalLink

This function simply checks if the URL is for an internal link.