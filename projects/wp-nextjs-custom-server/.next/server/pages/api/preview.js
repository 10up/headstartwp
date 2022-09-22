"use strict";
(() => {
var exports = {};
exports.id = 157;
exports.ids = [157];
exports.modules = {

/***/ 5465:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ previewHandler)
/* harmony export */ });
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8438);
/* harmony import */ var _10up_headless_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4461);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8242);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_data__WEBPACK_IMPORTED_MODULE_0__]);
_data__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * The PreviewHandler is responsible for handling preview requests.
 *
 * Handling Previews requires the Headless WordPress Plugin.
 *
 * **Important**: This function is meant to be used in a api route at `/pages/api/preview`.
 *
 * ### Usage
 *
 * ```ts
 * // pages/api/preview.js
 * import { previewHandler } from '@10up/headless-next';
 *
 * export default async function handler(req, res) {
 * 	return previewHandler(req, res);
 * }
 * ```
 *
 * @param req The request object,
 * @param res The response object.
 * @param options The PreviewHandlerOptions {@link PreviewHandlerOptions}
 *
 * @returns A response object.
 *
 * @category API handlers
 */
async function previewHandler(req, res, options = {}) {
    const { post_id, post_type, is_revision, token } = req.query;
    const revision = is_revision === '1';
    const { data } = await (0,_data__WEBPACK_IMPORTED_MODULE_0__/* .fetchHookData */ .uI)(new _10up_headless_core__WEBPACK_IMPORTED_MODULE_1__/* .SinglePostFetchStrategy */ .a(), {
        params: { path: [] },
    }, {
        params: {
            id: post_id,
            postType: post_type,
            revision,
            authToken: token,
        },
    });
    const id = Number(post_id);
    const result = Array.isArray(data?.result) ? data.result[0] : data.result;
    if (result?.id === id || result?.parent === id) {
        const { slug } = result;
        let previewData = {
            id,
            postType: post_type,
            revision,
            authToken: token,
        };
        if (options.preparePreviewData) {
            previewData = options.preparePreviewData(req, res, result, previewData);
        }
        res.setPreviewData(previewData);
        const postTypeDef = (0,_10up_headless_core_utils__WEBPACK_IMPORTED_MODULE_2__/* .getCustomPostType */ .KS)(post_type);
        if (!postTypeDef) {
            return res.end('Cannot preview an unkown post type');
        }
        const singleRoute = postTypeDef.single || '/';
        const prefixRoute = singleRoute === '/' ? '' : singleRoute;
        const slugOrId = revision ? post_id : slug || post_id;
        if (options?.onRedirect) {
            return options.onRedirect(req, res, previewData);
        }
        return res.redirect(`${prefixRoute}/${slugOrId}-preview=true`);
    }
    return res.end('preview mode not enabled');
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4675:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5465);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_next__WEBPACK_IMPORTED_MODULE_0__]);
_10up_headless_next__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * The Preview endpoint just needs to proxy the default preview handler
 *
 * @param {*} req Next.js request object
 * @param {*} res  Next.js response object
 *
 * @returns
 */

async function handler(req, res) {
  return (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_0__/* .previewHandler */ .q)(req, res);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8438:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "a": () => (/* binding */ SinglePostFetchStrategy)
});

// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/getHeadlessConfig.js
var getHeadlessConfig = __webpack_require__(4461);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/errors.js
var errors = __webpack_require__(9685);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/data/utils/matchers.js
const postMatchers = [
    {
        name: 'date',
        priority: 20,
        pattern: '/:year(\\d+)/:month(\\d+)?/:day(\\d+)?/:slug',
    },
    {
        name: 'post type',
        priority: 30,
        pattern: '/(.*)?/:slug',
    },
];
const postsMatchers = [
    {
        name: 'date',
        priority: 20,
        pattern: '/:year(\\d+)/:month(\\d+)?/:day(\\d+)?',
    },
    {
        name: 'pagination',
        priority: 30,
        pattern: '/page/:page',
    },
    {
        name: 'author',
        priority: 30,
        pattern: '/author/:author',
    },
    {
        name: 'author-with-pagination',
        priority: 30,
        pattern: '/author/:author/page/:page',
    },
];
const authorArchivesMatchers = [
    {
        name: 'author-archive',
        priority: 30,
        pattern: '/:author',
    },
    {
        name: 'author-with-pagination',
        priority: 30,
        pattern: '/:author/page/:page',
    },
];
const searchMatchers = [
    {
        name: 'search type',
        priority: 30,
        pattern: '/:search?',
    },
    {
        name: 'search-pagination',
        priority: 30,
        pattern: '/:search/page/:page',
    },
];

;// CONCATENATED MODULE: external "path-to-regexp"
const external_path_to_regexp_namespaceObject = require("path-to-regexp");
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/data/utils/parsePath.js

/**
 * Extract the parameters of the `path-to-regexp` pattern from the path.
 *
 * @param path - The link that was matched.
 * @param regexp - The regexp from `path-to-regexp` that will be used.
 * @param keys - The array with keys generated by `path-to-regexp`.
 *
 * @returns An object with the parameter names and its corresponding values
 * from the path.
 */
const extractParameters = (path, regexp, keys) => {
    const matches = path.match(regexp);
    if (!matches) {
        return {};
    }
    return matches.slice(1).reduce((result, value, index) => {
        const paramName = keys[index].name;
        if (typeof paramName === 'string') {
            result[paramName] = value;
        }
        return result;
    }, {});
};
/**
 * The regular expression flag.
 */
const REGULAR_EXPRESSION = 'RegExp:';
/**
 * Parses a path and extracts the parameters from it
 *
 * @param matchers - An array of Matchers
 * @param path - The path
 *
 * @category Utility Functions
 *
 * @returns the extracted parameters
 */
function parsePath(matchers, path) {
    const result = matchers
        .sort(({ priority: p1 }, { priority: p2 }) => p1 - p2)
        .map(({ name, priority, pattern }) => {
        const keys = [];
        const regexp = pattern.startsWith(REGULAR_EXPRESSION)
            ? new RegExp(pattern.replace(REGULAR_EXPRESSION, ''))
            : (0,external_path_to_regexp_namespaceObject.pathToRegexp)(pattern, keys);
        return { name, priority, pattern, regexp, keys };
    })
        .find(({ regexp }) => regexp.test(path));
    if (!result) {
        return {};
    }
    if (result.pattern.startsWith(REGULAR_EXPRESSION)) {
        const match = result.regexp.exec(path);
        if (match?.groups) {
            return match.groups;
        }
        return {};
    }
    return extractParameters(path, result.regexp, result.keys);
}

// EXTERNAL MODULE: ../../packages/core/dist/mjs/data/strategies/AbstractFetchStrategy.js + 2 modules
var AbstractFetchStrategy = __webpack_require__(3292);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/data/utils/endpoints.js
var endpoints = __webpack_require__(6103);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/data/strategies/SinglePostFetchStrategy.js





/**
 * The SinglePostFetchStrategy is used to fetch a single post entity from any post type.
 * Note that custom post types should be defined in `headless.config.js`
 *
 * This strategy supports extracting endpoint params from url E.g:
 * - `/post-name` maps to `{ slug: 'post-name'}`
 * - `/2021/10/20/post-name` maps to `{ year: 2021, month: 10, day: 20, slug: 'post-name }`
 * - `/2021/` maps to `{ year: 2021, slug: 'post-name' }`
 *
 * @see [[getParamsFromURL]] to learn about url param mapping
 *
 * @category Data Fetching
 */
class SinglePostFetchStrategy extends AbstractFetchStrategy/* AbstractFetchStrategy */.L {
    getDefaultEndpoint() {
        return endpoints/* endpoints.posts */.H.posts;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getParamsFromURL(path, nonUrlParams = {}) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { year, day, month, ...params } = parsePath(postMatchers, path);
        return params;
    }
    /**
     * Handlers post types, revisions and fetching by id
     *
     * @param params The params to build the endpoint url
     */
    buildEndpointURL(params) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, authToken, revision, postType, ...endpointParams } = params;
        if (params.postType) {
            // if postType is a array of slugs, start off with the first post type
            const postTypeSlug = Array.isArray(params.postType)
                ? params.postType[0]
                : params.postType;
            const postType = (0,getHeadlessConfig/* getCustomPostType */.KS)(postTypeSlug);
            if (!postType) {
                throw new errors/* ConfigError */.x1('Unkown post type, did you forget to add it to headless.config.js?');
            }
            this.setEndpoint(postType.endpoint);
        }
        if (id) {
            this.setEndpoint(`${this.getEndpoint()}/${id}`);
            if (endpointParams.slug) {
                delete endpointParams.slug;
            }
        }
        if (revision) {
            this.setEndpoint(`${this.getEndpoint()}/revisions`);
        }
        return super.buildEndpointURL(endpointParams);
    }
    /**
     * Handles fetching by multiple post types, authToken and revisions
     *
     * @param url The url to fetch
     * @param params The params to build the endpoint url
     * @param options FetchOptions
     */
    async fetcher(url, params, options = {}) {
        if (params.authToken) {
            options.bearerToken = params.authToken;
        }
        let error;
        try {
            const result = await super.fetcher(url, params, options);
            return result;
        }
        catch (e) {
            error = e;
        }
        // should throw error if didn't find anything and params.postType is not an array.
        if (!Array.isArray(params.postType)) {
            throw error;
        }
        // skip first post type as it has already been feteched
        const [, ...postTypes] = params.postType;
        let result;
        for await (const postType of postTypes) {
            try {
                const newParams = { ...params, postType };
                const endpointUrl = this.buildEndpointURL({ ...newParams, postType });
                result = await super.fetcher(endpointUrl, newParams, options);
            }
            catch (e) {
                error = e;
            }
        }
        if (!result) {
            throw error;
        }
        return result;
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [917], () => (__webpack_exec__(4675)));
module.exports = __webpack_exports__;

})();