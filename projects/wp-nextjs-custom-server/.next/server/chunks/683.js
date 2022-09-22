"use strict";
exports.id = 683;
exports.ids = [683];
exports.modules = {

/***/ 439:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ useAppSettings)
/* harmony export */ });
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5959);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__]);
_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * The useAppSettings hook
 *
 * ## Usage
 *
 * ```tsx
 * const { data, loading, error } = useAppSettings();
 *
 * // check loading and error states
 * ```
 *
 * ### Server-Side-Rendering or Static-Site-Generation
 *
 * ```tsx
 * export async function getServerSideProps(context) {
 * 	const useAppSettingsData = await fetchHookData(useAppSettings.fetcher(), context);
 * 	return addHookData([useAppSettingsData], {});
 * }
 * ```
 *
 * **Important**: You most likely want to fetch app settings on every route so
 * that you can access global settings and menus in your pages & components
 *
 * @param params The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
function useAppSettings(params = {}, options = {}) {
    return (0,_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__/* .useFetchAppSettings */ .i)(params, options);
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (useAppSettings) {
    useAppSettings.fetcher = _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__/* .useFetchAppSettings.fetcher */ .i.fetcher;
})(useAppSettings || (useAppSettings = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R1": () => (/* binding */ apiGet)
/* harmony export */ });
/* unused harmony exports getAuthHeader, apiPost */
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9682);

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
    const data = await fetch((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .addQueryArgs */ .f_)(url, queryArgs), args);
    const receivedHeaders = [
        ...Array.from(data.headers.entries()),
    ].reduce((collection, pair) => ({
        ...collection,
        [pair[0]]: pair[1],
    }), {});
    const json = await data.json();
    return { headers: receivedHeaders, json };
};


/***/ }),

/***/ 8804:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ AbstractFetchStrategy)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3391);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9682);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6778);


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
        const url = (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .addQueryArgs */ .f_)(this.getEndpoint(), { ...endpointParams });
        if (_embed) {
            return (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .addQueryArgs */ .f_)(url, { _embed });
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
        const result = await (0,_api__WEBPACK_IMPORTED_MODULE_1__/* .apiGet */ .R1)(`${this.baseURL}${url}`, args);
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
            throw new _utils__WEBPACK_IMPORTED_MODULE_2__/* .EndpointError */ .iM(errorMsg);
        }
        const throwIfNotFound = typeof options?.throwIfNotFound !== 'undefined' ? options?.throwIfNotFound : true;
        if (throwIfNotFound && (result.json.length === 0 || data?.status === 400)) {
            throw new _utils__WEBPACK_IMPORTED_MODULE_2__/* .NotFoundError */ .dR(`The request to ${url} returned no data`);
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

/***/ 991:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ AppSettingsStrategy)
/* harmony export */ });
/* harmony import */ var _AbstractFetchStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8804);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9047);


/**
 * The App Settings strategy is used to fetch the app settings endpoints exposed by the
 * headless wp plugin
 *
 * @category Data Fetching
 */
class AppSettingsStrategy extends _AbstractFetchStrategy__WEBPACK_IMPORTED_MODULE_0__/* .AbstractFetchStrategy */ .L {
    getDefaultEndpoint() {
        return _utils__WEBPACK_IMPORTED_MODULE_1__/* .endpoints.appSettings */ .H.appSettings;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getParamsFromURL(path, params = {}) {
        return { _embed: true };
    }
}


/***/ }),

/***/ 9047:
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

/***/ 6699:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ useFetch)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9528);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__]);
swr__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


/**
 * The use Fetch Hook is the foundation for most hooks in the headless framework. It is a wrapper around
 * `useSWR` and provides a consistent API for fetching data from the API. It requires a fetch strategy which implements
 * the actual data fetching logic
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param fetchStrategy The fetch strategy.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @category Data Fetching Hooks
 *
 */
function useFetch(params, fetchStrategy, options = {}, path = '') {
    const { sourceUrl } = (0,_provider__WEBPACK_IMPORTED_MODULE_1__/* .useSettings */ .r)();
    fetchStrategy.setBaseURL(sourceUrl);
    const urlParams = fetchStrategy.getParamsFromURL(path, params);
    const finalParams = { ...urlParams, ...params };
    const result = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(fetchStrategy.buildEndpointURL(finalParams), (url) => fetchStrategy.fetcher(url, finalParams), options);
    return { ...result, params: finalParams };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5959:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ useFetchAppSettings)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(991);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5300);
/* harmony import */ var _useFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6699);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6371);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useFetch__WEBPACK_IMPORTED_MODULE_0__]);
_useFetch__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/**
 * The useAppSettings hook
 *
 * See {@link useAppSettings}
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 *
 * @category Data Fetching Hooks
 */
function useFetchAppSettings(params = {}, options = {}) {
    const { data, error } = (0,_useFetch__WEBPACK_IMPORTED_MODULE_0__/* .useFetch */ .i)(params, useFetchAppSettings.fetcher(), options);
    if (error || !data) {
        const fakeData = (0,_util__WEBPACK_IMPORTED_MODULE_1__/* .makeErrorCatchProxy */ .q)('data');
        return { error, loading: !data, data: fakeData };
    }
    const { result } = data;
    return { data: result, loading: false };
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (useFetchAppSettings) {
    useFetchAppSettings.fetcher = () => new _data__WEBPACK_IMPORTED_MODULE_2__/* .AppSettingsStrategy */ .M((0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .getWPUrl */ .Bw)());
})(useFetchAppSettings || (useFetchAppSettings = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6371:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ isProxy),
/* harmony export */   "q": () => (/* binding */ makeErrorCatchProxy)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6778);

const isProxy = Symbol('isProxy');
function makeErrorCatchProxy(objectName = 'data') {
    return new Proxy({}, {
        get(obj, prop) {
            if (prop === isProxy) {
                return true;
            }
            throw new _utils__WEBPACK_IMPORTED_MODULE_0__/* .FrameworkError */ .Xl(`You are trying to access "${objectName}.${String(prop)}" but it is not avaliable yet. Did you forget to fetch data on the server? Otherwise, handle the loading and error states accordingly`);
        },
    });
}


/***/ }),

/***/ 4137:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ SettingsContext),
/* harmony export */   "m": () => (/* binding */ SettingsProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_getHeadlessConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5300);



const SettingsContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
const SettingsProvider = ({ settings, children }) => {
    const settingsValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
        ...(0,_utils_getHeadlessConfig__WEBPACK_IMPORTED_MODULE_2__/* .getHeadlessConfig */ .fI)(),
        ...settings,
    }), [settings]);
    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SettingsContext.Provider, { value: settingsValue, children: children });
};


/***/ }),

/***/ 9528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ useSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4137);


function useSettings() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Provider__WEBPACK_IMPORTED_MODULE_1__/* .SettingsContext */ .J);
}


/***/ }),

/***/ 6778:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Xl": () => (/* binding */ FrameworkError),
/* harmony export */   "dR": () => (/* binding */ NotFoundError),
/* harmony export */   "iM": () => (/* binding */ EndpointError),
/* harmony export */   "x1": () => (/* binding */ ConfigError)
/* harmony export */ });
/* unused harmony export FetchError */
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

/***/ 5300:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bw": () => (/* binding */ getWPUrl),
/* harmony export */   "Jh": () => (/* binding */ getCustomTaxonomies),
/* harmony export */   "KS": () => (/* binding */ getCustomPostType),
/* harmony export */   "MB": () => (/* binding */ getCustomTaxonomy),
/* harmony export */   "fI": () => (/* binding */ getHeadlessConfig)
/* harmony export */ });
/* unused harmony exports getCustomTaxonomySlugs, getCustomPostTypesSlugs, getCustomPostTypes */
/* harmony import */ var _data_utils_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9047);

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
            endpoint: _data_utils_endpoints__WEBPACK_IMPORTED_MODULE_0__/* .endpoints.category */ .H.category,
            restParam: 'categories',
        });
    }
    if (!hasTag) {
        taxonomies.push({
            slug: 'post_tag',
            endpoint: _data_utils_endpoints__WEBPACK_IMPORTED_MODULE_0__/* .endpoints.tags */ .H.tags,
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


/***/ }),

/***/ 9682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f_": () => (/* binding */ addQueryArgs)
/* harmony export */ });
/* unused harmony exports getQueryString, getQueryArgs, buildQueryString */
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


/***/ })

};
;