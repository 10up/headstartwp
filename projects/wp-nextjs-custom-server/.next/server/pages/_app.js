(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 4674:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ HeadlessApp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4137);
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5635);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5941);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Yoast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1591);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_1__]);
swr__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





/**
 * The HeadlessApp component is the top level component for the Headless framework.
 *
 * Should be used in `pages/_app.js`
 *
 * ## Usage
 *
 * ```tsx
 * import { HeadlessApp } from "@10up/headless-next";
 *
 * const MyApp = ({ Component, pageProps }) => {
 *	const { fallback = {}, themeJson = {}, ...props } = pageProps;
 *
 *	return (
 *		<HeadlessApp
 *			pageProps={pageProps}
 *			settings={{
 *				// Pass your own link components here
 *				linkComponent: Link,
 *			}}
 *		>
 *			<Layout>
 *				<Component {...props} />
 *			</Layout>
 *		</HeadlessApp>
 *	);
 * };
 *
 * export default MyApp;
 * ```
 *
 * @param props Component props. See {@link HeadlessAppProps}
 *
 * @category React Components
 */
function HeadlessApp({ settings, children, pageProps, swrConfig = {} }) {
    const { fallback = {}, seo = {}, themeJSON = { settings: {}, styles: {} } } = pageProps;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    // if preview mode disable revalidating
    if (router.isPreview && router.asPath.includes('-preview=true')) {
        swrConfig.revalidateOnFocus = false;
        swrConfig.revalidateOnReconnect = false;
        swrConfig.revalidateOnMount = false;
    }
    return (react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_3__/* .SettingsProvider */ .m, { settings: settings, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(swr__WEBPACK_IMPORTED_MODULE_1__.SWRConfig, { value: {
                fallback,
                ...swrConfig,
            }, children: [react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Yoast__WEBPACK_IMPORTED_MODULE_4__/* .Yoast */ .D, { seo: seo }), react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_5__/* .ThemeSettingsProvider */ .r, { data: themeJSON, children: children })] }) }));
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "D": () => (/* binding */ Yoast)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ../../packages/next/dist/mjs/components/Yoast.js


/**
 * The Yoast component renders the Yoast SEO meta tags.
 * This component is automatically rendered by {@link HeadlessApp} so you don't have to manually render it.
 *
 * @param props Component props. Expects a single `seo` prop
 *
 * @category React Components
 */
function Yoast({ seo }) {
    return ((0,jsx_runtime_.jsxs)((head_default()), { children: [seo?.yoast_head_json?.title && jsx_runtime_.jsx("title", { children: seo.yoast_head_json.title }), seo?.yoast_head_json?.description && (jsx_runtime_.jsx("meta", { name: "description", content: seo.yoast_head_json.description })), seo?.yoast_head_json?.canonical && (jsx_runtime_.jsx("link", { rel: "canonical", href: seo.yoast_head_json.canonical })), seo && seo.yoast_head_json && seo.yoast_head_json.robots && ((0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, { children: [jsx_runtime_.jsx("meta", { name: "robots", content: `${seo.yoast_head_json.robots.index}, ${seo.yoast_head_json.robots.follow}` }), seo.hide_on_google_news ? (jsx_runtime_.jsx("meta", { name: "Googlebot-News", content: "noindex" })) : null] })), seo && seo.yoast_head_json && seo.yoast_head_json.og_locale && (jsx_runtime_.jsx("meta", { property: "og:locale", content: seo.yoast_head_json.og_locale })), seo && seo.yoast_head_json && seo.yoast_head_json.og_type && (jsx_runtime_.jsx("meta", { property: "og:type", content: seo.yoast_head_json.og_type })), seo && seo.yoast_head_json && seo.yoast_head_json.og_title && (jsx_runtime_.jsx("meta", { property: "og:title", content: seo.yoast_head_json.og_title })), seo && seo.yoast_head_json && seo.yoast_head_json.og_description && (jsx_runtime_.jsx("meta", { property: "og:description", content: seo.yoast_head_json.og_description })), seo && seo.yoast_head_json && seo.yoast_head_json.og_url && (jsx_runtime_.jsx("meta", { property: "og:url", content: seo.yoast_head_json.og_url })), seo && seo.yoast_head_json && seo.yoast_head_json.og_site_name && (jsx_runtime_.jsx("meta", { property: "og:site_name", content: seo.yoast_head_json.og_site_name })), seo && seo.yoast_head_json && seo.yoast_head_json.og_image && ((0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, { children: [jsx_runtime_.jsx("meta", { property: "og:image", content: seo.yoast_head_json.og_image[0].url }), jsx_runtime_.jsx("meta", { property: "og:image:secure_url", content: seo.yoast_head_json.og_image[0].url }), jsx_runtime_.jsx("meta", { property: "og:image:width", content: seo.yoast_head_json.og_image[0].width }), jsx_runtime_.jsx("meta", { property: "og:image:height", content: seo.yoast_head_json.og_image[0].height })] })), seo && seo.yoast_head_json && seo.yoast_head_json.twitter_card && (jsx_runtime_.jsx("meta", { name: "twitter:card", content: seo.yoast_head_json.twitter_card })), seo && seo.yoast_head_json && seo.yoast_head_json.twitter_title && (jsx_runtime_.jsx("meta", { name: "twitter:title", content: seo.yoast_head_json.twitter_title })), seo && seo.yoast_head_json && seo.yoast_head_json.twitter_description && (jsx_runtime_.jsx("meta", { name: "twitter:description", content: seo.yoast_head_json.twitter_description })), seo && seo.yoast_head_json && seo.yoast_head_json.twitter_image && (jsx_runtime_.jsx("meta", { name: "twitter:image", content: seo.yoast_head_json.twitter_image })), seo && seo.yoast_head_json && seo.yoast_head_json.schema && (jsx_runtime_.jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
                    __html: JSON.stringify(seo.yoast_head_json.schema),
                } }))] }));
}


/***/ }),

/***/ 9226:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ useMenu)
/* harmony export */ });
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8481);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__]);
_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * The useMenu hooks. Returns a Menu object.
 *
 * **Important**: This hook depends on {@link useAppSettings}. If you want to enable SSR;SSG for
 * this hook you will need to fetch app settings on the server side.
 *
 * ## Usage
 *
 * ### Basic usage
 *
 * ```tsx
 * export const Nav = () => {
 * 	const { data, loading, error } = useMenu('primary-menu');
 *
 * 	// handle loading, error states
 *
 * 	return <Menu items={data} css={navStyles} />;
 * }
 * ```
 *
 * ### Re-fetching client-side on focus and/or mount
 * If you are fetching app settings on the server, you can enable re-fetching on focus and/or mount
 * to ensure menus are always up-to date even when using SSG/ISR.
 *
 * ```tsx
 * export const Nav = () => {
 * 	const { data, loading, error } = useMenu('primary-menu', {
 *		revalidateOnFocus: true,
 *		revalidateOnMount: true,
 * 	});
 *
 *	// handle loading, error states
 *
 * 	return <Menu items={data} css={navStyles} />;
 * }
 * ```
 *
 * @param menuLocation The slug of the menu location you want to fetch
 * @param options SWR configuration options
 *
 * @category Data Fetching Hooks
 */
function useMenu(menuLocation, options = {}) {
    return (0,_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_0__/* .useFetchMenu */ .z)(menuLocation, options);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9419:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.Z = _extends;
function _extends() {
    return extends_.apply(this, arguments);
}
function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return extends_.apply(this, arguments);
}


/***/ }),

/***/ 3903:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.Z = _interopRequireDefault;
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}


/***/ }),

/***/ 7306:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ FooterLinks)
/* harmony export */ });
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(439);
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9442);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Link__WEBPACK_IMPORTED_MODULE_0__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_2__]);
([_Link__WEBPACK_IMPORTED_MODULE_0__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const footerLinksStyles = "fbf2vhz";
const FooterLinks = () => {
  const {
    data,
    loading
  } = (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__/* .useAppSettings */ .H)();

  if (loading) {
    return null;
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul", {
    className: footerLinksStyles,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_Link__WEBPACK_IMPORTED_MODULE_0__/* .Link */ .r, {
        href: data?.settings?.privacy_policy_url || '/',
        children: "Privacy Policy"
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_Link__WEBPACK_IMPORTED_MODULE_0__/* .Link */ .r, {
        href: "/",
        children: "Terms of Use"
      })
    })]
  });
};

__webpack_require__(6213);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4107:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4707);
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_linaria_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FooterLinks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7306);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_FooterLinks__WEBPACK_IMPORTED_MODULE_1__]);
_FooterLinks__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const _exp = /*#__PURE__*/() => "footer";

const StyledFooter =
/*#__PURE__*/

/*#__PURE__*/
(0,_linaria_react__WEBPACK_IMPORTED_MODULE_0__.styled)(_exp())({
  name: "StyledFooter",
  class: "s6pr2w8"
});

const Footer = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(StyledFooter, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_FooterLinks__WEBPACK_IMPORTED_MODULE_1__/* .FooterLinks */ .q, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
        children: ["Copyright \xA9 10up ", new Date().getFullYear(), ". All Rights Reserved"]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {})]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

__webpack_require__(2602);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7582:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const logoStyles = "l1wzalr7";
const Logo = () => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
    className: logoStyles,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
      children: "Brand Logo"
    })
  });
};

__webpack_require__(7758);

/***/ }),

/***/ 9275:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ Nav)
/* harmony export */ });
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6663);
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9226);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_next__WEBPACK_IMPORTED_MODULE_1__]);
_10up_headless_next__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const navStyles = "n1jbbs8v";
const Nav = () => {
  const {
    data,
    loading,
    error
  } = (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_1__/* .useMenu */ .H)('primary', {
    // these settings will re-render menu client side to ensure
    // it always have the latest items
    revalidateOnMount: true,
    revalidateOnFocus: true
  });

  if (loading || error) {
    return null;
  }

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_2__/* .Menu */ .v, {
    items: data,
    className: navStyles
  });
};

__webpack_require__(9569);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ Search)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




const buttonStyles = "b1lj4na6";
const searchInputStyles = "s500ydi";
const Search = () => {
  const {
    0: searchTerm,
    1: setSearchTerm
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();

  const goToSearch = () => {
    router.push(`/search/${searchTerm}`);
  };

  const onKeyDown = e => {
    if (e.code === 'Enter') {
      goToSearch();
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("input", {
      type: "text",
      placeholder: "Search",
      value: searchTerm,
      onChange: e => setSearchTerm(e.target.value),
      className: searchInputStyles,
      onKeyDown: onKeyDown
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
      type: "button",
      className: buttonStyles,
      onClick: goToSearch,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        x: "0px",
        y: "0px",
        width: 20,
        height: 20,
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("path", {
          d: "M9 2C5.146 2 2 5.146 2 9s3.146 7 7 7a6.959 6.959 0 004.574-1.719l.426.426V16l6 6 2-2-6-6h-1.293l-.426-.426A6.959 6.959 0 0016 9c0-3.854-3.146-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5z"
        })
      })
    })]
  });
};

__webpack_require__(8083);

/***/ }),

/***/ 7993:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7582);
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9275);
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7178);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Nav__WEBPACK_IMPORTED_MODULE_1__]);
_Nav__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const headerStyles = "h1ynvwvd";

const Header = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("header", {
    role: "banner",
    className: headerStyles,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_Nav__WEBPACK_IMPORTED_MODULE_1__/* .Nav */ .J, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_Logo__WEBPACK_IMPORTED_MODULE_0__/* .Logo */ .T, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_Search__WEBPACK_IMPORTED_MODULE_2__/* .Search */ .o, {})]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

__webpack_require__(4449);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8869:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4107);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7993);
/* harmony import */ var _MainContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4482);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Footer__WEBPACK_IMPORTED_MODULE_0__, _Header__WEBPACK_IMPORTED_MODULE_1__]);
([_Footer__WEBPACK_IMPORTED_MODULE_0__, _Header__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const Layout = ({
  children
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_Header__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_MainContent__WEBPACK_IMPORTED_MODULE_2__/* .MainContent */ .M, {
      children: children
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_Footer__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z, {})]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9442:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5442);
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9528);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9097);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




const Link = ({
  href,
  rel,
  children
}) => {
  const settings = (0,_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_2__/* .useSettings */ .r)();
  const link = (0,_10up_headless_core__WEBPACK_IMPORTED_MODULE_3__/* .removeSourceUrl */ .V)({
    link: href,
    backendUrl: settings.sourceUrl || ''
  });
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
    href: link,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("a", {
      rel: rel,
      children: children
    })
  });
};
Link.defaultProps = {
  rel: ''
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4482:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ MainContent)
/* harmony export */ });
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4707);
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_linaria_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



const _exp = /*#__PURE__*/() => "main";

const StyledMain =
/*#__PURE__*/

/*#__PURE__*/
(0,_linaria_react__WEBPACK_IMPORTED_MODULE_0__.styled)(_exp())({
  name: "StyledMain",
  class: "s2pu3yl"
});
const MainContent = ({
  children
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("section", {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(StyledMain, {
        role: "main",
        children: children
      })
    })
  });
};

__webpack_require__(6271);

/***/ }),

/***/ 803:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4674);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(808);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9442);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8869);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Link__WEBPACK_IMPORTED_MODULE_2__, _components_Layout__WEBPACK_IMPORTED_MODULE_3__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_5__]);
([_components_Link__WEBPACK_IMPORTED_MODULE_2__, _components_Layout__WEBPACK_IMPORTED_MODULE_3__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
const _excluded = ["fallback", "themeJson"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








next_router__WEBPACK_IMPORTED_MODULE_0___default().events.on('routeChangeStart', () => nprogress__WEBPACK_IMPORTED_MODULE_1___default().start());
next_router__WEBPACK_IMPORTED_MODULE_0___default().events.on('routeChangeComplete', () => {
  nprogress__WEBPACK_IMPORTED_MODULE_1___default().done();
});
next_router__WEBPACK_IMPORTED_MODULE_0___default().events.on('routeChangeError', () => nprogress__WEBPACK_IMPORTED_MODULE_1___default().done()); // eslint-disable-next-line react/prop-types

const MyApp = ({
  Component,
  pageProps
}) => {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const {
    fallback = {},
    themeJson = {}
  } = pageProps,
        props = _objectWithoutProperties(pageProps, _excluded);

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_10up_headless_next__WEBPACK_IMPORTED_MODULE_5__/* .HeadlessApp */ .j, {
    pageProps: pageProps,
    swrConfig: {
      /**
       * Setting this to true will refetch content whethenever the tab is refocused
       */
      revalidateOnFocus: false,

      /**
       * Settings this to true will refetch content whenever the connection is restablished
       */
      revalidateOnReconnect: false,

      /**
       * Setting this to true will refetch content after initial load
       */
      revalidateOnMount: false
    },
    settings: {
      linkComponent: _components_Link__WEBPACK_IMPORTED_MODULE_2__/* .Link */ .r
    },
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(Component, _objectSpread({}, props))
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6213:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4240);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".fbf2vhz{display:block;padding:0;}.fbf2vhz li{list-style-type:none;float:left;margin-right:20px;}.fbf2vhz a{color:#f2f2f2;}.fbf2vhz a:hover{-webkit-text-decoration:none;text-decoration:none;}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 2602:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4240);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".s6pr2w8{display:flex;justify-content:space-between;align-items:center;height:60px;width:100%;background:#333;color:#fff;padding:0 20px;box-sizing:border-box;}.s6pr2w8 a{color:#fff;}.s6pr2w8 > ul,.s6pr2w8 > div{width:400px;}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 7758:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4240);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".l1wzalr7{text-align:center;}.l1wzalr7 > span{display:inline-block;color:#000;font-weight:500;background:#f2f2f2;padding:10px 20px;margin:0 20px;font-size:26px;line-height:30px;}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 9569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4240);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".n1jbbs8v{height:100%;display:flex;justify-content:space-between;align-items:center;margin:0;padding:0;}.n1jbbs8v li,.n1jbbs8v a{color:#333;text-transform:uppercase;-webkit-letter-spacing:1px;-moz-letter-spacing:1px;-ms-letter-spacing:1px;letter-spacing:1px;-webkit-text-decoration:none;text-decoration:none;cursor:pointer;}.n1jbbs8v a:hover{-webkit-text-decoration:underline;text-decoration:underline;}.n1jbbs8v > li{list-style-type:none;}.n1jbbs8v > li > ul{display:none;}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 8083:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4240);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".b1lj4na6{border:none;background:none;position:relative;top:5px;cursor:pointer;}\n.s500ydi{border:1px solid #e0e0e0;border-radius:2px;padding:10px 20px;}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 4449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4240);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".h1ynvwvd{display:flex;align-items:center;justify-content:space-between;height:75px;background-color:#fff;border-bottom:1px solid #e0e0e0;font-family:Roboto;padding:0 20px;}.h1ynvwvd > div,.h1ynvwvd > ul{width:400px;}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 6271:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4240);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".s2pu3yl{padding:20px;}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 6663:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "v": () => (/* binding */ Menu)
});

// UNUSED EXPORTS: MenuItems

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/removeSourceUrl.js
var removeSourceUrl = __webpack_require__(5442);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/react/provider/useSettings.js
var useSettings = __webpack_require__(9528);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/components/Link.js

const RawLink = ({ children, href, ...props }) => {
    return (jsx_runtime_.jsx("a", { href: href, ...props, children: children }));
};

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/components/Menu.js




const DefaultItemWrapper = ({ className, children }) => (jsx_runtime_.jsx("li", { className: className, children: children }));
const DefaultMenuWrapper = ({ className, children }) => (jsx_runtime_.jsx("ul", { className: className, children: children }));
const DefaultLinkWrapper = ({ href, children }) => {
    const settings = (0,useSettings/* useSettings */.r)();
    const LinkComponent = typeof settings.linkComponent === 'function' ? settings.linkComponent : RawLink;
    return jsx_runtime_.jsx(LinkComponent, { href: href, children: children });
};
const MenuItems = ({ items, depth, topLevelItemsClickable, itemWrapper: ItemWrapper, menuWrapper: MenuWrapper, linkWrapper: LinkWrapper, }) => {
    const settings = (0,useSettings/* useSettings */.r)();
    return (jsx_runtime_.jsx(jsx_runtime_.Fragment, { children: items.map((item) => {
            const link = (0,removeSourceUrl/* removeSourceUrl */.V)({
                link: item.url,
                backendUrl: settings.sourceUrl || '',
            });
            const shouldLink = item.children.length === 0 || topLevelItemsClickable;
            const className = `menu-item-depth-${depth}`;
            return ((0,jsx_runtime_.jsxs)(ItemWrapper, { className: className, depth: depth, item: item, children: [shouldLink ? (jsx_runtime_.jsx(LinkWrapper, { href: link, depth: depth, children: item.title })) : (item.title), item.children.length > 0 && (jsx_runtime_.jsx(Menu, { items: item.children, depth: depth + 1, menuWrapper: MenuWrapper, itemWrapper: ItemWrapper, linkWrapper: LinkWrapper }))] }, item.ID));
        }) }));
};
function Menu({ items, className, depth = 0, topLevelItemsClickable = false, itemWrapper = DefaultItemWrapper, menuWrapper = DefaultMenuWrapper, linkWrapper = DefaultLinkWrapper, }) {
    const classes = [className, `menu-depth-${depth}`];
    const MenuWrapper = menuWrapper;
    return (jsx_runtime_.jsx(MenuWrapper, { className: classes.join(' '), depth: depth, children: jsx_runtime_.jsx(MenuItems, { items: items, depth: depth, topLevelItemsClickable: topLevelItemsClickable, menuWrapper: menuWrapper, itemWrapper: itemWrapper, linkWrapper: linkWrapper }) }));
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (Menu) {
    Menu.defaultProps = {
        className: 'menu-container',
        topLevelItemsClickable: false,
        depth: 0,
        itemWrapper: DefaultItemWrapper,
        menuWrapper: DefaultMenuWrapper,
        linkWrapper: DefaultLinkWrapper,
    };
})(Menu || (Menu = {}));


/***/ }),

/***/ 8481:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ useFetchMenu)
/* harmony export */ });
/* harmony import */ var _useFetchAppSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5959);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6371);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useFetchAppSettings__WEBPACK_IMPORTED_MODULE_0__]);
_useFetchAppSettings__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function flatToHierarchical(flat) {
    const roots = [];
    const all = {};
    flat.forEach((item, index) => {
        all[item.ID] = { ...item, children: [], order: index };
    });
    Object.keys(all).forEach((key) => {
        const id = Number(key);
        const item = all[id];
        const parentId = Number(item.menu_item_parent);
        if (parentId === 0) {
            roots.push(item);
        }
        else if (item.menu_item_parent in all) {
            const p = all[item.menu_item_parent];
            if (!('children' in p)) {
                p.children = [];
            }
            p.children.push(item);
        }
    });
    roots.sort((a, b) => a.order - b.order);
    roots.forEach((root) => {
        root?.children?.sort((a, b) => a.order - b.order);
    });
    return roots;
}
/**
 * The useFetchMenu hooks. Returns a Menu object.
 *
 * @param menuLocation The slug of the menu location you want to fetch
 * @param options SWR configuration options
 *
 * @category Data Fetching Hooks
 */
function useFetchMenu(menuLocation, options = {}) {
    const { data, error } = (0,_useFetchAppSettings__WEBPACK_IMPORTED_MODULE_0__/* .useFetchAppSettings */ .i)({}, options);
    const doesNotHasData = !data || data[_util__WEBPACK_IMPORTED_MODULE_1__/* .isProxy */ .X] === true;
    if (error || doesNotHasData) {
        const fakeData = (0,_util__WEBPACK_IMPORTED_MODULE_1__/* .makeErrorCatchProxy */ .q)('data');
        return { error, loading: doesNotHasData, data: fakeData };
    }
    const { menus } = data;
    const menu = menus && menus[menuLocation] ? flatToHierarchical(menus[menuLocation]) : [];
    return { data: menu, loading: false };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4707:
/***/ ((module) => {

"use strict";
module.exports = require("@linaria/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("nprogress");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5941:
/***/ ((module) => {

"use strict";
module.exports = import("swr");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [108,341,683,900], () => (__webpack_exec__(803)));
module.exports = __webpack_exports__;

})();