"use strict";
(() => {
var exports = {};
exports.id = 573;
exports.ids = [573];
exports.modules = {

/***/ 1682:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(754);
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(439);
/* harmony import */ var _utils_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1556);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_3__]);
([_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const ServerErrorPage = () => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
    children: "500 - Internal Server Error"
  });
};

async function getStaticProps(context) {
  try {
    // fetch batch of promises and throws errors selectively
    // passing `throw:false` will prevent errors from being thrown for that promise
    const settledPromises = await (0,_utils_promises__WEBPACK_IMPORTED_MODULE_1__/* .resolveBatch */ .Q)([{
      func: (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__/* .fetchHookData */ .uI)(_10up_headless_next__WEBPACK_IMPORTED_MODULE_3__/* .useAppSettings.fetcher */ .H.fetcher(), context),
      throw: false
    }]);
    return (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__/* .addHookData */ .sF)(settledPromises, {
      revalidate: 60
    });
  } catch (e) {
    return (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__/* .handleError */ .S3)(e, context);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServerErrorPage);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

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
var __webpack_exports__ = __webpack_require__.X(0, [683,754,556], () => (__webpack_exec__(1682)));
module.exports = __webpack_exports__;

})();