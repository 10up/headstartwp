"use strict";
exports.id = 917;
exports.ids = [917];
exports.modules = {

/***/ 8242:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uI": () => (/* binding */ fetchHookData)
/* harmony export */ });
/* unused harmony exports convertToPath, addHookData, handleError */
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4461);


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
    const { redirectStrategy } = getHeadlessConfig();
    if (error instanceof NotFoundError) {
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
            const redirect = await fetchRedirect(pathname);
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

/***/ 3292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* binding */ AbstractFetchStrategy)
});

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/utils/url.js
/** This code has been extracted from the @wordpress/url package */
/**
 * Sets a value in object deeply by a given array of path segments. Mutates the
 * object reference.
 *
 * @param {Record<string,*>} object Object in which to assign.
 * @param {string[]}         path   Path segment at which to set value.
 * @param {*}                value  Value to set.
 */
function setPath(object, path, value) {
    const { length } = path;
    const lastIndex = length - 1;
    for (let i = 0; i < length; i++) {
        let key = path[i];
        if (!key && Array.isArray(object)) {
            // If key is empty string and next value is array, derive key from
            // the current length of the array.
            key = object.length.toString();
        }
        key = ['__proto__', 'constructor', 'prototype'].includes(key) ? key.toUpperCase() : key;
        // If the next key in the path is numeric (or empty string), it will be
        // created as an array. Otherwise, it will be created as an object.
        const isNextKeyArrayIndex = !isNaN(Number(path[i + 1]));
        object[key] =
            i === lastIndex
                ? // If at end of path, assign the intended value.
                    value
                : // Otherwise, advance to the next object in the path, creating
                    // it if it does not yet exist.
                    object[key] || (isNextKeyArrayIndex ? [] : {});
        if (Array.isArray(object[key]) && !isNextKeyArrayIndex) {
            // If we current key is non-numeric, but the next value is an
            // array, coerce the value to an object.
            object[key] = { ...object[key] };
        }
        // Update working reference object to the next in the path.
        // eslint-disable-next-line no-param-reassign
        object = object[key];
    }
}
function getQueryString(url) {
    let query;
    try {
        query = new URL(url, 'http://example.com').search.substring(1);
    }
    catch (error) {
        // do nothing
    }
    if (query) {
        return query;
    }
    return '';
}
/**
 * Returns an object of query arguments of the given URL. If the given URL is
 * invalid or has no querystring, an empty object is returned.
 *
 * @param {string} url URL.
 *
 * @example
 * ```js
 * const foo = getQueryArgs( 'https://wordpress.org?foo=bar&bar=baz' );
 * // { "foo": "bar", "bar": "baz" }
 * ```
 *
 * @returns Query args object.
 */
function getQueryArgs(url) {
    return ((getQueryString(url) || '')
        // Normalize space encoding, accounting for PHP URL encoding
        // corresponding to `application/x-www-form-urlencoded`.
        //
        // See: https://tools.ietf.org/html/rfc1866#section-8.2.1
        .replace(/\+/g, '%20')
        .split('&')
        .reduce((accumulator, keyValue) => {
        const [key, value = ''] = keyValue
            .split('=')
            // Filtering avoids decoding as `undefined` for value, where
            // default is restored in destructuring assignment.
            .filter(Boolean)
            .map(decodeURIComponent);
        if (key) {
            const segments = key.replace(/\]/g, '').split('[');
            setPath(accumulator, segments, value);
        }
        return accumulator;
    }, Object.create(null)));
}
/**
 * Generates URL-encoded query string using input query data.
 *
 * It is intended to behave equivalent as PHP's `http_build_query`, configured
 * with encoding type PHP_QUERY_RFC3986 (spaces as `%20`).
 *
 * @example
 * ```js
 * const queryString = buildQueryString( {
 *    simple: 'is ok',
 *    arrays: [ 'are', 'fine', 'too' ],
 *    objects: {
 *       evenNested: {
 *          ok: 'yes',
 *       },
 *    },
 * } );
 * // "simple=is%20ok&arrays%5B0%5D=are&arrays%5B1%5D=fine&arrays%5B2%5D=too&objects%5BevenNested%5D%5Bok%5D=yes"
 * ```
 *
 * @param {Record<string,*>} data Data to encode.
 *
 * @returns {string} Query string.
 */
function buildQueryString(data) {
    let string = '';
    const stack = Object.entries(data);
    let pair;
    // eslint-disable-next-line no-cond-assign
    while ((pair = stack.shift())) {
        // eslint-disable-next-line prefer-const
        let [key, value] = pair;
        // Support building deeply nested data, from array or object values.
        const hasNestedData = Array.isArray(value) || (value && value.constructor === Object);
        if (hasNestedData) {
            // Push array or object values onto the stack as composed of their
            // original key and nested index or key, retaining order by a
            // combination of Array#reverse and Array#unshift onto the stack.
            const valuePairs = Object.entries(value).reverse();
            for (const [member, memberValue] of valuePairs) {
                stack.unshift([`${key}[${member}]`, memberValue]);
            }
        }
        else if (value !== undefined) {
            // Null is treated as special case, equivalent to empty string.
            if (value === null) {
                value = '';
            }
            string += `&${[key, value].map(encodeURIComponent).join('=')}`;
        }
    }
    // Loop will concatenate with leading `&`, but it's only expected for all
    // but the first query parameter. This strips the leading `&`, while still
    // accounting for the case that the string may in-fact be empty.
    return string.substr(1);
}
function addQueryArgs(url, args) {
    // If no arguments are to be appended, return original URL.
    if (!args || !Object.keys(args).length) {
        return url;
    }
    let baseUrl = url;
    let finalArgs = { ...args };
    // Determine whether URL already had query arguments.
    const queryStringIndex = url.indexOf('?');
    if (queryStringIndex !== -1) {
        // Merge into existing query arguments.
        finalArgs = Object.assign(getQueryArgs(url), finalArgs);
        // Change working base URL to omit previous query arguments.
        baseUrl = baseUrl.substring(0, queryStringIndex);
    }
    return `${baseUrl}?${buildQueryString(finalArgs)}`;
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/data/api/fetch-utils.js

const getAuthHeader = () => {
    return null;
};
/**
 * Fetch Wrapper to handle POST requests
 *
 * @param url The URL where to make the request to
 * @param args The arguments
 *
 * @category Data Fetching
 *
 * @returns {object}
 */
const apiPost = async (url, args = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    });
    return response.json();
};
/**
 * Fetch Wrapper to handle GET requests.
 *
 * @param url The URL where to make the request to
 * @param args The arguments
 * @param withMinute Whether it should burst cahcing on every minute
 *
 * @category Data Fetching
 *
 * @returns {object}
 */
const apiGet = async (url, args = {}, withMinute = false) => {
    const headers = getAuthHeader();
    if (headers) {
        args.headers = headers;
    }
    const coeff = 1000 * 60;
    const date = new Date();
    const currentMinute = new Date(Math.round(date.getTime() / coeff) * coeff).toISOString();
    const queryArgs = withMinute
        ? {
            // Busts cache every minute.
            cacheTime: currentMinute,
        }
        : {};
    const data = await fetch(addQueryArgs(url, queryArgs), args);
    const receivedHeaders = [
        ...Array.from(data.headers.entries()),
    ].reduce((collection, pair) => ({
        ...collection,
        [pair[0]]: pair[1],
    }), {});
    const json = await data.json();
    return { headers: receivedHeaders, json };
};

// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/errors.js
var errors = __webpack_require__(9685);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/data/strategies/AbstractFetchStrategy.js


/**
 * Abstract class that lays out a strategy for fetching data
 *
 * All Fetch Stategies should implement this class and it allows to share logic for fetching data both
 * on the front-end and on the back-end.
 *
 * @template E The type of entity that is fetched (e.g PostEntity, TermEntity etc)
 * @template Params The type of the params that are passed to the endpoint
 *
 * @category Data Fetching
 */
class AbstractFetchStrategy {
    /**
     * Holds the current endpoint for the strategy
     */
    endpoint = '';
    /**
     * The base URL where the API is located
     */
    baseURL = '';
    /**
     * The strategy constructor
     *
     * @param baseURL The base URL of the API
     */
    constructor(baseURL) {
        if (baseURL) {
            this.setBaseURL(baseURL);
        }
    }
    /**
     * The strategy can switch endpoints at runtime if neeeded.
     *
     * E.g: The actual endpoint for a post depends on its post_type
     *
     * @param endpoint The endpoint to fetch
     */
    setEndpoint(endpoint) {
        this.endpoint = endpoint;
    }
    setBaseURL(url = '') {
        this.baseURL = url;
    }
    /**
     * Returns the endpoint of the strategy. If no endpoint has been set at runtime,
     * returns the default endpoint
     *
     * @returns The current endpoint for the strategy
     */
    getEndpoint() {
        if (!this.endpoint) {
            return this.getDefaultEndpoint();
        }
        return this.endpoint;
    }
    /**
     * Builds the final endpoint URL based on the passed parameters
     *
     * @param params The params to add to the request
     *
     * @returns The endpoint URL.
     */
    buildEndpointURL(params) {
        const { _embed, ...endpointParams } = params;
        const url = addQueryArgs(this.getEndpoint(), { ...endpointParams });
        if (_embed) {
            return addQueryArgs(url, { _embed });
        }
        return url;
    }
    /**
     * The default fetcher function
     *
     * The default fetcher function handles authentication headers and errors from the API.
     *
     * A custom strategy can override this function to run additional logic before or after the fetch call
     *
     * @param url The URL to fetch
     * @param params The request params
     *
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async fetcher(url, params, options = {}) {
        const args = {};
        if (options.bearerToken) {
            // @ts-expect-error
            args.headers = { Authorization: `Bearer ${options.bearerToken}` };
        }
        const result = await apiGet(`${this.baseURL}${url}`, args);
        const { data } = result.json;
        // if there's an error code and it's not a 4xx status code
        if (typeof result?.json?.code !== 'undefined' &&
            typeof result?.json?.code === 'string' &&
            data?.status !== 400) {
            let errorMsg = `WordPress returned a '${result?.json?.code}' error for the endpoint '${url}'.`;
            if (url.includes('/headless-wp')) {
                errorMsg = `You need to install 10up's Headless WordPress plugin.\n ${errorMsg} `;
            }
            if (result?.json?.message) {
                errorMsg = result.json.message;
            }
            throw new errors/* EndpointError */.iM(errorMsg);
        }
        const throwIfNotFound = typeof options?.throwIfNotFound !== 'undefined' ? options?.throwIfNotFound : true;
        if (throwIfNotFound && (result.json.length === 0 || data?.status === 400)) {
            throw new errors/* NotFoundError */.dR(`The request to ${url} returned no data`);
        }
        const page = Number(params.page) || 1;
        const response = {
            result: result.json,
            pageInfo: {
                totalPages: Number(result.headers['x-wp-totalpages']) || 0,
                totalItems: Number(result.headers['x-wp-total']) || 0,
                page,
            },
        };
        return response;
    }
    /**
     * Filters the data returned from the API by excluding fields that are not needed in order to reduce
     * payload size.
     *
     * @param data The data to filter
     * @param options The options for filtering
     * @returns The filtered data
     */
    filterData(data, options) {
        const fields = [...options.fields, 'yoast_head_json'];
        if (options.method === 'ALLOW') {
            if (fields[0] === '*') {
                return data;
            }
            const allowedData = Array.isArray(data.result) ? [] : {};
            if (Array.isArray(data.result)) {
                data.result.forEach((record, i) => {
                    // @ts-expect-error
                    allowedData.push({});
                    fields.forEach((field) => {
                        // @ts-expect-error
                        if (data.result[i][field]) {
                            // @ts-expect-error
                            allowedData[i][field] = data.result[i][field];
                        }
                    });
                });
            }
            else {
                fields.forEach((field) => {
                    allowedData[field] = data.result[field];
                });
            }
            return { ...data, result: allowedData };
        }
        if (options.method === 'REMOVE') {
            fields.forEach((field) => {
                if (Array.isArray(data.result)) {
                    data.result.forEach((record, i) => {
                        // @ts-expect-error
                        delete data.result[i][field];
                    });
                }
                else {
                    delete data.result[field];
                }
            });
        }
        return data;
    }
    /**
     * This is a simple wrapper to quickly fetch data from the API given a set of params
     *
     * ## Usage
     *
     * ```tsx
     * import { PostsArchiveFetchStrategy } from '@10up/headless-core';
     *
     * new PostsArchiveFetchStrategy('http://my-wp-url.com').get({perPage: 10});
     * ```
     *
     * @param params The endpoint params
     *
     * @returns
     */
    get(params) {
        return this.fetcher(this.buildEndpointURL(params), params);
    }
}


/***/ }),

/***/ 6103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ endpoints)
/* harmony export */ });
const endpoints = {
    posts: '/wp-json/wp/v2/posts',
    pages: '/wp-json/wp/v2/pages',
    appSettings: '/wp-json/headless-wp/v1/app',
    category: '/wp-json/wp/v2/categories',
    tags: '/wp-json/wp/v2/tags',
    tokenVerify: '/wp-json/headless-wp/v1/token',
};


/***/ }),

/***/ 9685:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dR": () => (/* binding */ NotFoundError),
/* harmony export */   "iM": () => (/* binding */ EndpointError),
/* harmony export */   "x1": () => (/* binding */ ConfigError)
/* harmony export */ });
/* unused harmony exports FetchError, FrameworkError */
/* eslint-disable max-classes-per-file */
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
class FetchError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FetchError';
    }
}
class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConfigError';
    }
}
class EndpointError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EndpointError';
    }
}
class FrameworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FrameworkError';
    }
}


/***/ }),

/***/ 4461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bw": () => (/* binding */ getWPUrl),
/* harmony export */   "KS": () => (/* binding */ getCustomPostType)
/* harmony export */ });
/* unused harmony exports getHeadlessConfig, getCustomTaxonomySlugs, getCustomTaxonomies, getCustomTaxonomy, getCustomPostTypesSlugs, getCustomPostTypes */

/**
 * Returns the contents of headless.config.js
 *
 * This function requires framework integration in order to work. The contents of `headless.config.js`
 * needs to be injected at build time into a global variable.
 *
 * Make sure you are using one of the framework's integration (such as next) before using this function.
 *
 * @returns The contents of headless.config.js
 */
function getHeadlessConfig() {
    const { customPostTypes, redirectStrategy, useWordPressPlugin, customTaxonomies, sourceUrl } = {"sourceUrl":"https://headless.test","customPostTypes":[{"slug":"book","endpoint":"/wp-json/wp/v2/book","single":"/book","archive":"/books"}],"customTaxonomies":[{"slug":"genre","endpoint":"/wp-json/wp/v2/genre","postType":["book"]}],"redirectStrategy":"404","useWordPressPlugin":true};
    const headlessConfig = {
        sourceUrl,
        customPostTypes,
        customTaxonomies,
        redirectStrategy: redirectStrategy || 'none',
        useWordPressPlugin: useWordPressPlugin || false,
    };
    return headlessConfig;
}
/**
 * Returns the avaliable taxonomy slugs
 */
function getCustomTaxonomySlugs() {
    const { customTaxonomies } = getHeadlessConfig();
    if (!customTaxonomies) {
        return [];
    }
    return customTaxonomies.map(({ slug }) => slug);
}
/**
 * Returns the avaliable taxonomies
 */
function getCustomTaxonomies() {
    const { customTaxonomies } = getHeadlessConfig();
    const taxonomies = customTaxonomies || [];
    const hasCategory = taxonomies.find(({ slug }) => slug === 'category');
    const hasTag = taxonomies.find(({ slug }) => slug === 'post_tag');
    if (!hasCategory) {
        taxonomies.push({
            slug: 'category',
            endpoint: endpoints.category,
            restParam: 'categories',
        });
    }
    if (!hasTag) {
        taxonomies.push({
            slug: 'post_tag',
            endpoint: endpoints.tags,
            rewrite: 'tag',
            restParam: 'tags',
        });
    }
    return taxonomies;
}
/**
 * Returns a single post type by slug if defined
 *
 * @param slug post type slug
 
 */
function getCustomTaxonomy(slug) {
    const taxonomies = getCustomTaxonomies();
    return taxonomies?.find((taxonomy) => taxonomy.slug === slug);
}
/**
 * Returns the avaliable post type slugs
 *
 */
function getCustomPostTypesSlugs() {
    const { customPostTypes } = getHeadlessConfig();
    if (!customPostTypes) {
        return [];
    }
    return customPostTypes.map(({ slug }) => slug);
}
/**
 * Returns the avaliable post types
 */
function getCustomPostTypes() {
    const { customPostTypes } = getHeadlessConfig();
    const postTypes = customPostTypes || [];
    const hasPost = postTypes.find(({ slug }) => slug === 'post');
    const hasPage = postTypes.find(({ slug }) => slug === 'page');
    if (!hasPage) {
        postTypes.push({
            slug: 'page',
            endpoint: '/wp-json/wp/v2/pages',
            single: '/',
        });
    }
    if (!hasPost) {
        postTypes.push({
            slug: 'post',
            endpoint: '/wp-json/wp/v2/posts',
            single: '/',
            archive: '/blog',
        });
    }
    return postTypes;
}
/**
 * Returns a single post type by slug if defined
 *
 * @param slug post type slug
 */
function getCustomPostType(slug) {
    const postTypes = getCustomPostTypes();
    return postTypes?.find((postType) => postType.slug === slug);
}
/**
 * Returns the WP URL based on the headless config
 */
function getWPUrl() {
    const { sourceUrl } = getHeadlessConfig();
    return sourceUrl || '';
}


/***/ })

};
;