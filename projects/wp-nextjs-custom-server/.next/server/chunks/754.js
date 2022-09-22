"use strict";
exports.id = 754;
exports.ids = [754];
exports.modules = {

/***/ 754:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S3": () => (/* binding */ handleError),
/* harmony export */   "YR": () => (/* binding */ convertToPath),
/* harmony export */   "sF": () => (/* binding */ addHookData),
/* harmony export */   "uI": () => (/* binding */ fetchHookData)
/* harmony export */ });
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5300);
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6778);
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1750);


/**
 * Creates a path from array of arguments
 *
 * @param args - Array of catch-all arguments
 *
 * @category Next.js Data Fetching Utilities
 */
function convertToPath(args) {
    if (!args) {
        return '/';
    }
    return `/${args.join('/')}`;
}
/**
 * A function that implementeds data fetching on the server. This should be used in `getServerSideProps`
 * or `getStaticProps`.
 *
 * Data fetching will be perfomed by the specified strategy and URL params will be automatically extracted
 * from `context
 *
 * ## Usage
 *
 * ```ts
 * export async function getServerSideProps(context) {
 *	try {
 * 		const usePostsHook = await fetchHookData(usePosts.fetcher(),context);
 *
 *		return addHookData([usePostsHook], {});
 *	} catch (e) {
 *		return handleError(e, context);
 *	}
 * }
 * ```
 *
 * @param fetchStrategy The fetch strategy to use. Typically this is exposed by the hook e.g: `usePosts.fetcher()`
 * @param ctx The Next.js context, either the one from `getServerSideProps` or `getStaticProps`
 * @param options See {@link FetchHookDataOptions}
 *
 * @returns An object with a key of `data` and a value of the fetched data.
 *
 * @category Next.js Data Fetching Utilities
 */
async function fetchHookData(fetchStrategy, ctx, options = {}) {
    const wpURL = (0,_10up_headless_core__WEBPACK_IMPORTED_MODULE_0__/* .getWPUrl */ .Bw)();
    const params = options?.params || {};
    const filterDataOptions = options?.filterData || { method: 'ALLOW', fields: ['*'] };
    fetchStrategy.setBaseURL(wpURL);
    let path = [];
    if (ctx.params) {
        path = Array.isArray(ctx.params.path) ? ctx.params.path : [ctx.params.path || ''];
    }
    const urlParams = fetchStrategy.getParamsFromURL(convertToPath(path), params);
    const finalParams = { _embed: true, ...urlParams, ...params };
    // we don't want to include the preview params in the key
    const endpointUrlForKey = fetchStrategy.buildEndpointURL(finalParams);
    const isPreviewRequest = typeof urlParams.slug === 'string' ? urlParams.slug.includes('-preview=true') : false;
    if (ctx.preview && ctx.previewData && isPreviewRequest) {
        // @ts-expect-error (TODO: fix this)
        finalParams.id = ctx.previewData.id;
        // @ts-expect-error (TODO: fix this)
        finalParams.revision = ctx.previewData.revision;
        // @ts-expect-error (TODO: fix this)
        finalParams.postType = ctx.previewData.postType;
        // @ts-expect-error (TODO: fix this)
        finalParams.authToken = ctx.previewData.authToken;
    }
    const data = await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(finalParams), finalParams);
    return { key: endpointUrlForKey, data: fetchStrategy.filterData(data, filterDataOptions) };
}
/**
 * The `addHookData` function is responsible for collecting all of the results from the `fetchHookData` function calls
 * and prepares the shape of the data to match what the frameworks expects (such as setting initial values for SWR and collecting SEO data).
 *
 * ## Usage
 *
 * ```ts
 * export async function getServerSideProps(context) {
 *	try {
 * 		const usePostsHook = await fetchHookData(usePosts.fetcher(),context);
 *		const useAppSettingsHook = await fetchHookData(useAppSettings.fetcher(),context);
 *		return addHookData([usePostsHook, useAppSettingsHook], {});
 *	} catch (e) {
 *		return handleError(e, context);
 *	}
 * }
 * ```
 *
 * @param hookStates An array of resolved promises from {@link fetchHookData}
 * @param nextProps Any additional props to pass to Next.js page routes.
 *
 * @category Next.js Data Fetching Utilities
 */
function addHookData(hookStates, nextProps) {
    const { props = {}, ...rest } = nextProps;
    const fallback = {};
    let seo_json = {};
    let yoast_head = '';
    let themeJSON = {};
    hookStates.filter(Boolean).forEach((hookState) => {
        const { key, data } = hookState;
        // take yoast_seo data
        seo_json = data.result?.yoast_head_json || data.result?.[0]?.yoast_head_json || seo_json;
        yoast_head = data.result?.yoast_head || data.result?.[0]?.yoast_head || yoast_head;
        themeJSON = data.result?.['theme.json'] || data.result?.[0]?.['theme.json'] || themeJSON;
        fallback[key] = data;
    });
    return {
        ...rest,
        props: {
            ...props,
            seo: {
                yoast_head_json: seo_json,
                yoast_head,
            },
            themeJSON,
            fallback,
        },
    };
}
function isStringArray(el) {
    return Array.isArray(el);
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
async function handleError(error, ctx, rootRoute = '') {
    const { redirectStrategy } = (0,_10up_headless_core__WEBPACK_IMPORTED_MODULE_0__/* .getHeadlessConfig */ .fI)();
    if (error instanceof _10up_headless_core__WEBPACK_IMPORTED_MODULE_1__/* .NotFoundError */ .dR) {
        let pathname = '';
        if (typeof ctx?.req?.url !== 'undefined') {
            pathname = ctx.req.url;
        }
        else {
            // build out the url from params.path
            pathname =
                typeof ctx?.params !== 'undefined' && isStringArray(ctx.params?.path)
                    ? `${rootRoute}/${ctx.params.path.join('/')}`
                    : `${rootRoute}/${ctx.params?.path}`;
        }
        if (redirectStrategy === '404' && pathname) {
            const redirect = await (0,_10up_headless_core__WEBPACK_IMPORTED_MODULE_2__/* .fetchRedirect */ .G)(pathname);
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

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ fetchRedirect)
/* harmony export */ });
/* harmony import */ var _getHeadlessConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5300);

/**
 * Fetches a redirect from the WordPress origin by making a HEAD request and checking the response
 *
 * @param pathname The path to the page to fetch the redirect for
 *
 * @returns The redirect data
 */
async function fetchRedirect(pathname) {
    const wpURL = (0,_getHeadlessConfig__WEBPACK_IMPORTED_MODULE_0__/* .getWPUrl */ .Bw)().replace(/\/$/, '');
    // Remove the trailing slash before concatenating the link
    const redirectionURL = `${wpURL + pathname.replace(/\/$/, '')}/`;
    const response = await fetch(redirectionURL, {
        method: 'HEAD',
        redirect: 'manual',
    });
    if (response.status === 301 ||
        response.status === 302 ||
        response.status === 307 ||
        response.status === 308) {
        const location = response.headers.get('location') || '';
        try {
            const url = new URL(location);
            return {
                location: url.pathname,
                status: response.status,
            };
        }
        catch (e) {
            return { location: null, status: 0 };
        }
    }
    return { location: null, status: 0 };
}


/***/ })

};
;