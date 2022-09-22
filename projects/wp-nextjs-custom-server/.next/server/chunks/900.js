"use strict";
exports.id = 900;
exports.ids = [900];
exports.modules = {

/***/ 5635:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ ThemeSettingsContext),
/* harmony export */   "r": () => (/* binding */ ThemeSettingsProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const ThemeSettingsContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
const ThemeSettingsProvider = ({ data, children }) => {
    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ThemeSettingsContext.Provider, { value: data, children: children });
};


/***/ }),

/***/ 5442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* binding */ removeSourceUrl)
/* harmony export */ });
/**
 * Make the link relative if it belongs to the backend, to force client-side
 * navigation.
 *
 * Inspired on the Frontity implementation
 *
 * @see https://github.com/frontity/frontity/blob/dev/packages/components/link/utils.ts
 *
 * @returns The URL without the Source URL.
 */
function removeSourceUrl({ link, backendUrl, publicUrl = '/' }) {
    // Ensure `sourceUrl` and `frontityUrl` always include a trailing slash. All
    // the logic below is based on those variables fulfilling that condition.
    const sourceUrl = backendUrl.replace(/\/?$/, '/');
    const appUrl = publicUrl.replace(/\/?$/, '/');
    const { host: sourceHost, pathname: sourcePath } = new URL(sourceUrl);
    const { pathname: appPath } = new URL(appUrl, sourceUrl);
    const linkUrl = new URL(link, sourceUrl);
    // Compare just the host and the pathname. This way we ignore the protocol if
    // it doesn't match.
    if (linkUrl.host === sourceHost && linkUrl.pathname.startsWith(sourcePath)) {
        return linkUrl.pathname.replace(sourcePath, appPath) + linkUrl.search + linkUrl.hash;
    }
    // Do not change the link for other cases.
    return link;
}


/***/ })

};
;