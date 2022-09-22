"use strict";
(() => {
var exports = {};
exports.id = 753;
exports.ids = [753];
exports.modules = {

/***/ 3951:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/**
 * Some hosting requires a health-check endpoint to monitor site avaliabiliy
 *
 * @param {*} req Next.js request
 * @param {*} res Next.js response
 */
function handler(req, res) {
  res.status(200).send('Ok');
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3951));
module.exports = __webpack_exports__;

})();