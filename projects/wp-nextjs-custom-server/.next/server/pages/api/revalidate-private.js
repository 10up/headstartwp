"use strict";
(() => {
var exports = {};
exports.id = 439;
exports.ids = [439];
exports.modules = {

/***/ 4879:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/**
 * The revalidate endpoint just needs to proxy the default revalidate handler
 *
 * @param {*} req Next.js request object
 * @param {*} res  Next.js response object
 *
 * @returns
 */
async function handler(req, res) {
  console.log('I am being called');
  res.revalidate('/');
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4879));
module.exports = __webpack_exports__;

})();