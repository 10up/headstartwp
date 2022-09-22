"use strict";
(() => {
var exports = {};
exports.id = 139;
exports.ids = [139];
exports.modules = {

/***/ 359:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4030);
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6996);
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(754);
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(439);
/* harmony import */ var _components_PageContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8313);
/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(892);
/* harmony import */ var _utils_promises__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1556);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_PageContent__WEBPACK_IMPORTED_MODULE_0__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_3__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_4__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_6__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_7__]);
([_components_PageContent__WEBPACK_IMPORTED_MODULE_0__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_3__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_4__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_6__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const SinglePostsPage = () => {
  const {
    loading,
    error
  } = (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_3__/* .usePost */ .u)(_params__WEBPACK_IMPORTED_MODULE_1__/* .singleParams */ .Or);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return 'error...';
  }

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_components_PageContent__WEBPACK_IMPORTED_MODULE_0__/* .PageContent */ .J, {
      params: _params__WEBPACK_IMPORTED_MODULE_1__/* .singleParams */ .Or
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SinglePostsPage);
/**
 * This is an example of pre-rendering a set of pages at build times.
 * In this specific example, we are pre-rendering the first 50 posts (withn dates in the URL) and the first 50 pages.
 *
 * @returns {Promise<*>}
 */

async function getStaticPaths() {
  const postsData = await _10up_headless_next__WEBPACK_IMPORTED_MODULE_4__/* .usePosts.fetcher */ .k.fetcher().get({
    postType: 'post',
    per_page: 50
  });
  const postsPath = postsData.result.map(({
    date,
    slug
  }) => {
    const dateString = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const datePath = dateString.split('/');
    return {
      // path is the catch all route, so it must be array with url segments
      // if you don't want to support date urls just remove the date from the path
      params: {
        path: [...datePath, slug]
      }
    };
  });
  const pagesData = await _10up_headless_next__WEBPACK_IMPORTED_MODULE_4__/* .usePosts.fetcher */ .k.fetcher().get({
    postType: 'page',
    per_page: 50
  });
  const pagePaths = pagesData.result.map(({
    slug
  }) => {
    return {
      // path is the catch all route, so it must be array with url segments
      params: {
        path: [slug]
      }
    };
  });
  return {
    paths: [...postsPath, ...pagePaths],
    fallback: 'blocking'
  };
}
async function getStaticProps(context) {
  try {
    // fetch batch of promises and throws errors selectively
    // passing `throw:false` will prevent errors from being thrown for that promise
    const settledPromises = await (0,_utils_promises__WEBPACK_IMPORTED_MODULE_5__/* .resolveBatch */ .Q)([{
      func: (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_6__/* .fetchHookData */ .uI)(_10up_headless_next__WEBPACK_IMPORTED_MODULE_3__/* .usePost.fetcher */ .u.fetcher(), context, {
        params: _params__WEBPACK_IMPORTED_MODULE_1__/* .singleParams */ .Or
      })
    }, {
      func: (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_6__/* .fetchHookData */ .uI)(_10up_headless_next__WEBPACK_IMPORTED_MODULE_7__/* .useAppSettings.fetcher */ .H.fetcher(), context),
      throw: false
    }]);
    return (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_6__/* .addHookData */ .sF)(settledPromises, {
      revalidate: 5 * 60
    });
  } catch (e) {
    return (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_6__/* .handleError */ .S3)(e, context);
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2594:
/***/ ((module) => {

module.exports = require("@justinribeiro/lite-youtube");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 99:
/***/ ((module) => {

module.exports = require("path-to-regexp");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9314:
/***/ ((module) => {

module.exports = require("xss");

/***/ }),

/***/ 2905:
/***/ ((module) => {

module.exports = import("html-react-parser");;

/***/ }),

/***/ 5941:
/***/ ((module) => {

module.exports = import("swr");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [237,683,754,556,185], () => (__webpack_exec__(359)));
module.exports = __webpack_exports__;

})();