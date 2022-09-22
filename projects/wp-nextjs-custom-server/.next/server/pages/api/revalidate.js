"use strict";
(() => {
var exports = {};
exports.id = 500;
exports.ids = [500];
exports.modules = {

/***/ 8378:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ revalidateHandler)
/* harmony export */ });
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(145);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8242);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_data__WEBPACK_IMPORTED_MODULE_0__]);
_data__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


/**
 * The RevalidateHandler is responsible for handling revalidate requests.
 *
 * Handling revalidate requires the Headless WordPress Plugin.
 *
 * **Important**: This function is meant to be used in a api route e.g: `/pages/api/revalidate`.
 *
 * ### Usage
 *
 * ```ts
 * // pages/api/revalidate.js
 * import { revalidateHandler } from '@10up/headless-next';
 *
 * export default async function handler(req, res) {
 * 	return revalidateHandler(req, res);
 * }
 * ```
 *
 * @param req The request object,
 * @param res The response object.
 *
 * @returns A response object.
 *
 * @category API handlers
 */
async function revalidateHandler(req, res) {
    const { post_id, path, token } = req.query;
    if (req.method !== 'GET') {
        return res.status(401).json({ message: 'Invalid method' });
    }
    if (!path || !post_id || !token) {
        return res.status(401).json({ message: 'Missing required params' });
    }
    if (typeof path !== 'string' || typeof post_id !== 'string' || typeof token !== 'string') {
        return res.status(401).json({ message: 'Invalid params' });
    }
    // call WordPress API to check token
    try {
        const { data } = await (0,_data__WEBPACK_IMPORTED_MODULE_0__/* .fetchHookData */ .uI)(new _10up_headless_core__WEBPACK_IMPORTED_MODULE_1__/* .VerifyTokenFetchStrategy */ .P(), {
            params: { path: [] },
        }, {
            params: {
                authToken: token,
            },
        });
        const result = data.result;
        const verifiedPath = result.path ?? '';
        const verifitedPostId = result.post_id ?? 0;
        // make sure the path and post_id matches with what was encoded in the token
        if (verifiedPath !== path || Number(verifitedPostId) !== Number(post_id)) {
            throw new Error('Token mismatch');
        }
        await res.revalidate(path);
        return res.status(200).json({ message: 'success' });
    }
    catch (err) {
        let errorMessage = 'Error verifying the token';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return res.status(500).json({ message: errorMessage });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9451:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8378);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_next__WEBPACK_IMPORTED_MODULE_0__]);
_10up_headless_next__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * The revalidate endpoint just needs to proxy the default revalidate handler
 *
 * @param {*} req Next.js request object
 * @param {*} res  Next.js response object
 *
 * @returns
 */

async function handler(req, res) {
  return (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_0__/* .revalidateHandler */ .R)(req, res);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 145:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ VerifyTokenFetchStrategy)
/* harmony export */ });
/* harmony import */ var _AbstractFetchStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3292);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6103);


/**
 * The Verify Token strategy is used to verify tokens issued by the
 * headless wp plugin
 *
 * @category Data Fetching
 */
class VerifyTokenFetchStrategy extends _AbstractFetchStrategy__WEBPACK_IMPORTED_MODULE_0__/* .AbstractFetchStrategy */ .L {
    getDefaultEndpoint() {
        return _utils__WEBPACK_IMPORTED_MODULE_1__/* .endpoints.tokenVerify */ .H.tokenVerify;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getParamsFromURL(path, params = {}) {
        return {};
    }
    buildEndpointURL(params) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { authToken, ...rest } = params;
        return super.buildEndpointURL({ ...rest, _embed: false });
    }
    async fetcher(url, params, options = {}) {
        if (params.authToken) {
            options.bearerToken = params.authToken;
        }
        return super.fetcher(url, params, options);
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [917], () => (__webpack_exec__(9451)));
module.exports = __webpack_exports__;

})();