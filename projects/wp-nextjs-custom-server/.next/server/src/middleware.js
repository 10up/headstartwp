(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[727],{

/***/ 550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "middleware": () => (/* binding */ middleware)
});

// EXTERNAL MODULE: ../../node_modules/next/server.js
var server = __webpack_require__(253);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/utils/getHeadlessConfig.js

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

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/utils/fetchRedirect.js

/**
 * Fetches a redirect from the WordPress origin by making a HEAD request and checking the response
 *
 * @param pathname The path to the page to fetch the redirect for
 *
 * @returns The redirect data
 */
async function fetchRedirect(pathname) {
    const wpURL = getWPUrl().replace(/\/$/, '');
    // Remove the trailing slash before concatenating the link
    const redirectionURL = `${wpURL + pathname.replace(/\/$/, '')}/`;
    const response = await fetch(redirectionURL, {
        method: 'HEAD',
        redirect: 'manual',
    });
    if (response.status === 301 ||
        response.status === 302 ||
        response.status === 307 ||
        response.status === 308) {
        const location = response.headers.get('location') || '';
        try {
            const url = new URL(location);
            return {
                location: url.pathname,
                status: response.status,
            };
        }
        catch (e) {
            return { location: null, status: 0 };
        }
    }
    return { location: null, status: 0 };
}

;// CONCATENATED MODULE: ../../packages/next/dist/mjs/middlewares/appMidleware.js


const ALLOWED_STATIC_PATHS = /^\/.*\.(ico|png|jpg|jpeg)$/g;
function isStaticAssetRequest(req) {
    return req.nextUrl.pathname.match(ALLOWED_STATIC_PATHS);
}
function isInternalRequest(req) {
    return req.nextUrl.pathname.startsWith('/_next');
}
async function AppMiddleware(req) {
    const { redirectStrategy } = getHeadlessConfig();
    if (isStaticAssetRequest(req) || isInternalRequest(req)) {
        return server.NextResponse.next();
    }
    const { pathname } = req.nextUrl;
    if (redirectStrategy === 'always') {
        const redirect = await fetchRedirect(pathname);
        if (redirect.location) {
            return server.NextResponse.redirect(redirect.location, redirect.status);
        }
    }
    return server.NextResponse.next();
}

;// CONCATENATED MODULE: ./src/middleware.js

async function middleware(...args) {
  return AppMiddleware(...args);
}

/***/ }),

/***/ 970:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getHostname = getHostname;

function getHostname(parsed, headers) {
  var ref;
  return (ref = !Array.isArray(headers == null ? void 0 : headers.host) && (headers == null ? void 0 : headers.host) || parsed.hostname) == null ? void 0 : ref.split(':')[0].toLowerCase();
}

/***/ }),

/***/ 31:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.detectDomainLocale = detectDomainLocale;

function detectDomainLocale(domainItems, hostname, detectedLocale) {
  let domainItem;

  if (domainItems) {
    if (detectedLocale) {
      detectedLocale = detectedLocale.toLowerCase();
    }

    for (const item of domainItems) {
      var ref, ref1; // remove port if present

      const domainHostname = (ref = item.domain) == null ? void 0 : ref.split(':')[0].toLowerCase();

      if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((ref1 = item.locales) == null ? void 0 : ref1.some(locale => locale.toLowerCase() === detectedLocale))) {
        domainItem = item;
        break;
      }
    }
  }

  return domainItem;
}

/***/ }),

/***/ 637:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.normalizeLocalePath = normalizeLocalePath;

function normalizeLocalePath(pathname, locales) {
  let detectedLocale; // first item will be empty string from splitting at first char

  const pathnameParts = pathname.split('/');
  (locales || []).some(locale => {
    if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join('/') || '/';
      return true;
    }

    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}

/***/ }),

/***/ 215:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addLocale = addLocale;

var _addPathPrefix = __webpack_require__(140);

var _pathHasPrefix = __webpack_require__(405);

function addLocale(path, locale, defaultLocale, ignorePrefix) {
  if (locale && locale !== defaultLocale && (ignorePrefix || !(0, _pathHasPrefix).pathHasPrefix(path.toLowerCase(), `/${locale.toLowerCase()}`) && !(0, _pathHasPrefix).pathHasPrefix(path.toLowerCase(), '/api'))) {
    return (0, _addPathPrefix).addPathPrefix(path, `/${locale}`);
  }

  return path;
}

/***/ }),

/***/ 140:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addPathPrefix = addPathPrefix;

var _parsePath = __webpack_require__(826);

function addPathPrefix(path, prefix) {
  if (!path.startsWith('/') || !prefix) {
    return path;
  }

  const {
    pathname,
    query,
    hash
  } = (0, _parsePath).parsePath(path);
  return `${prefix}${pathname}${query}${hash}`;
}

/***/ }),

/***/ 259:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addPathSuffix = addPathSuffix;

var _parsePath = __webpack_require__(826);

function addPathSuffix(path, suffix) {
  if (!path.startsWith('/') || !suffix) {
    return path;
  }

  const {
    pathname,
    query,
    hash
  } = (0, _parsePath).parsePath(path);
  return `${pathname}${suffix}${query}${hash}`;
}

/***/ }),

/***/ 671:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.formatNextPathnameInfo = formatNextPathnameInfo;

var _removeTrailingSlash = __webpack_require__(965);

var _addPathPrefix = __webpack_require__(140);

var _addPathSuffix = __webpack_require__(259);

var _addLocale = __webpack_require__(215);

function formatNextPathnameInfo(info) {
  let pathname = (0, _addLocale).addLocale(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);

  if (info.buildId) {
    pathname = (0, _addPathSuffix).addPathSuffix((0, _addPathPrefix).addPathPrefix(pathname, `/_next/data/${info.buildId}`), info.pathname === '/' ? 'index.json' : '.json');
  }

  pathname = (0, _addPathPrefix).addPathPrefix(pathname, info.basePath);
  return info.trailingSlash ? !info.buildId && !pathname.endsWith('/') ? (0, _addPathSuffix).addPathSuffix(pathname, '/') : pathname : (0, _removeTrailingSlash).removeTrailingSlash(pathname);
}

/***/ }),

/***/ 536:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getNextPathnameInfo = getNextPathnameInfo;

var _normalizeLocalePath = __webpack_require__(637);

var _removePathPrefix = __webpack_require__(477);

var _pathHasPrefix = __webpack_require__(405);

function getNextPathnameInfo(pathname, options) {
  var _nextConfig;

  const {
    basePath,
    i18n,
    trailingSlash
  } = (_nextConfig = options.nextConfig) != null ? _nextConfig : {};
  const info = {
    pathname: pathname,
    trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
  };

  if (basePath && (0, _pathHasPrefix).pathHasPrefix(info.pathname, basePath)) {
    info.pathname = (0, _removePathPrefix).removePathPrefix(info.pathname, basePath);
    info.basePath = basePath;
  }

  if (options.parseData === true && info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
    const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
    const buildId = paths[0];
    info.pathname = paths[1] !== 'index' ? `/${paths.slice(1).join('/')}` : '/';
    info.buildId = buildId;
  }

  if (i18n) {
    const pathLocale = (0, _normalizeLocalePath).normalizeLocalePath(info.pathname, i18n.locales);
    info.locale = pathLocale == null ? void 0 : pathLocale.detectedLocale;
    info.pathname = (pathLocale == null ? void 0 : pathLocale.pathname) || info.pathname;
  }

  return info;
}

/***/ }),

/***/ 826:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.parsePath = parsePath;

function parsePath(path) {
  const hashIndex = path.indexOf('#');
  const queryIndex = path.indexOf('?');
  const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);

  if (hasQuery || hashIndex > -1) {
    return {
      pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
      query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
      hash: hashIndex > -1 ? path.slice(hashIndex) : ''
    };
  }

  return {
    pathname: path,
    query: '',
    hash: ''
  };
}

/***/ }),

/***/ 405:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.pathHasPrefix = pathHasPrefix;

var _parsePath = __webpack_require__(826);

function pathHasPrefix(path, prefix) {
  if (typeof path !== 'string') {
    return false;
  }

  const {
    pathname
  } = (0, _parsePath).parsePath(path);
  return pathname === prefix || pathname.startsWith(prefix + '/');
}

/***/ }),

/***/ 972:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.relativizeURL = relativizeURL;

function relativizeURL(url, base) {
  const baseURL = typeof base === 'string' ? new URL(base) : base;
  const relative = new URL(url, base);
  const origin = `${baseURL.protocol}//${baseURL.host}`;
  return `${relative.protocol}//${relative.host}` === origin ? relative.toString().replace(origin, '') : relative.toString();
}

/***/ }),

/***/ 477:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.removePathPrefix = removePathPrefix;

var _pathHasPrefix = __webpack_require__(405);

function removePathPrefix(path, prefix) {
  if ((0, _pathHasPrefix).pathHasPrefix(path, prefix)) {
    const withoutPrefix = path.slice(prefix.length);
    return withoutPrefix.startsWith('/') ? withoutPrefix : `/${withoutPrefix}`;
  }

  return path;
}

/***/ }),

/***/ 965:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.removeTrailingSlash = removeTrailingSlash;

function removeTrailingSlash(route) {
  return route.replace(/\/$/, '') || '/';
}

/***/ }),

/***/ 102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83);

        

        (0,next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_0__/* .enhanceGlobals */ .gL)()

        var mod = __webpack_require__(550)
        var handler = mod.middleware || mod.default;

        if (typeof handler !== 'function') {
          throw new Error('The Middleware "pages/src/middleware" must export a `middleware` or a `default` function');
        }

        /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(opts) {
          return (0,next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_0__/* .blockUnallowedResponse */ .OT)((0,next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_0__/* .adapter */ .VL)({
              ...opts,
              page: "/src/middleware",
              handler,
          }))
        }
    

/***/ }),

/***/ 379:
/***/ ((module) => {

var __dirname = "/";
(()=>{"use strict";if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var e={};(()=>{var r=e;
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */r.parse=parse;r.serialize=serialize;var i=decodeURIComponent;var t=encodeURIComponent;var a=/; */;var n=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function parse(e,r){if(typeof e!=="string"){throw new TypeError("argument str must be a string")}var t={};var n=r||{};var o=e.split(a);var s=n.decode||i;for(var p=0;p<o.length;p++){var f=o[p];var u=f.indexOf("=");if(u<0){continue}var v=f.substr(0,u).trim();var c=f.substr(++u,f.length).trim();if('"'==c[0]){c=c.slice(1,-1)}if(undefined==t[v]){t[v]=tryDecode(c,s)}}return t}function serialize(e,r,i){var a=i||{};var o=a.encode||t;if(typeof o!=="function"){throw new TypeError("option encode is invalid")}if(!n.test(e)){throw new TypeError("argument name is invalid")}var s=o(r);if(s&&!n.test(s)){throw new TypeError("argument val is invalid")}var p=e+"="+s;if(null!=a.maxAge){var f=a.maxAge-0;if(isNaN(f)||!isFinite(f)){throw new TypeError("option maxAge is invalid")}p+="; Max-Age="+Math.floor(f)}if(a.domain){if(!n.test(a.domain)){throw new TypeError("option domain is invalid")}p+="; Domain="+a.domain}if(a.path){if(!n.test(a.path)){throw new TypeError("option path is invalid")}p+="; Path="+a.path}if(a.expires){if(typeof a.expires.toUTCString!=="function"){throw new TypeError("option expires is invalid")}p+="; Expires="+a.expires.toUTCString()}if(a.httpOnly){p+="; HttpOnly"}if(a.secure){p+="; Secure"}if(a.sameSite){var u=typeof a.sameSite==="string"?a.sameSite.toLowerCase():a.sameSite;switch(u){case true:p+="; SameSite=Strict";break;case"lax":p+="; SameSite=Lax";break;case"strict":p+="; SameSite=Strict";break;case"none":p+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return p}function tryDecode(e,r){try{return r(e)}catch(r){return e}}})();module.exports=e})();

/***/ }),

/***/ 372:
/***/ ((module, exports, __webpack_require__) => {

var __dirname = "/";
var __WEBPACK_AMD_DEFINE_RESULT__;(()=>{var i={613:function(i,s){
/*!@license
 * UAParser.js v0.7.28
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */
(function(e,o){"use strict";var r="0.7.28",a="",n="?",t="function",l="undefined",w="object",d="string",b="major",u="model",c="name",m="type",p="vendor",f="version",h="architecture",g="console",v="mobile",x="tablet",k="smarttv",_="wearable",y="embedded",S=255;var E={extend:function(i,s){var e={};for(var o in i){if(s[o]&&s[o].length%2===0){e[o]=s[o].concat(i[o])}else{e[o]=i[o]}}return e},has:function(i,s){return typeof i===d?s.toLowerCase().indexOf(i.toLowerCase())!==-1:false},lowerize:function(i){return i.toLowerCase()},major:function(i){return typeof i===d?i.replace(/[^\d\.]/g,"").split(".")[0]:o},trim:function(i,s){i=i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");return typeof s===l?i:i.substring(0,S)}};var A={rgx:function(i,s){var e=0,r,a,n,l,d,b;while(e<s.length&&!d){var u=s[e],c=s[e+1];r=a=0;while(r<u.length&&!d){d=u[r++].exec(i);if(!!d){for(n=0;n<c.length;n++){b=d[++a];l=c[n];if(typeof l===w&&l.length>0){if(l.length==2){if(typeof l[1]==t){this[l[0]]=l[1].call(this,b)}else{this[l[0]]=l[1]}}else if(l.length==3){if(typeof l[1]===t&&!(l[1].exec&&l[1].test)){this[l[0]]=b?l[1].call(this,b,l[2]):o}else{this[l[0]]=b?b.replace(l[1],l[2]):o}}else if(l.length==4){this[l[0]]=b?l[3].call(this,b.replace(l[1],l[2])):o}}else{this[l]=b?b:o}}}}e+=2}},str:function(i,s){for(var e in s){if(typeof s[e]===w&&s[e].length>0){for(var r=0;r<s[e].length;r++){if(E.has(s[e][r],i)){return e===n?o:e}}}else if(E.has(s[e],i)){return e===n?o:e}}return i}};var N={browser:{oldSafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}},oldEdge:{version:{.1:"12.",21:"13.",31:"14.",39:"15.",41:"16.",42:"17.",44:"18."}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}};var T={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[f,[c,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[f,[c,"Edge"]],[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i,/(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i],[c,f],[/opios[\/\s]+([\w\.]+)/i],[f,[c,"Opera Mini"]],[/\sopr\/([\w\.]+)/i],[f,[c,"Opera"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,/(ba?idubrowser)[\/\s]?([\w\.]+)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,/(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i,/(weibo)__([\d\.]+)/i],[c,f],[/(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[f,[c,"UCBrowser"]],[/(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i],[f,[c,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[f,[c,"WeChat"]],[/konqueror\/([\w\.]+)/i],[f,[c,"Konqueror"]],[/trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i],[f,[c,"IE"]],[/yabrowser\/([\w\.]+)/i],[f,[c,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[c,/(.+)/,"$1 Secure Browser"],f],[/focus\/([\w\.]+)/i],[f,[c,"Firefox Focus"]],[/opt\/([\w\.]+)/i],[f,[c,"Opera Touch"]],[/coc_coc_browser\/([\w\.]+)/i],[f,[c,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[f,[c,"Dolphin"]],[/coast\/([\w\.]+)/i],[f,[c,"Opera Coast"]],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[f,[c,"MIUI Browser"]],[/fxios\/([\w\.-]+)/i],[f,[c,"Firefox"]],[/(qihu|qhbrowser|qihoobrowser|360browser)/i],[[c,"360 Browser"]],[/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],[[c,/(.+)/,"$1 Browser"],f],[/(comodo_dragon)\/([\w\.]+)/i],[[c,/_/g," "],f],[/\s(electron)\/([\w\.]+)\ssafari/i,/(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i],[c,f],[/(MetaSr)[\/\s]?([\w\.]+)/i,/(LBBROWSER)/i],[c],[/;fbav\/([\w\.]+);/i],[f,[c,"Facebook"]],[/FBAN\/FBIOS|FB_IAB\/FB4A/i],[[c,"Facebook"]],[/safari\s(line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/\s]([\w\.-]+)/i],[c,f],[/\bgsa\/([\w\.]+)\s.*safari\//i],[f,[c,"GSA"]],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[f,[c,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[c,"Chrome WebView"],f],[/droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i],[f,[c,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[c,f],[/version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i],[f,[c,"Mobile Safari"]],[/version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i],[f,c],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[c,[f,A.str,N.browser.oldSafari.version]],[/(webkit|khtml)\/([\w\.]+)/i],[c,f],[/(navigator|netscape)\/([\w\.-]+)/i],[[c,"Netscape"],f],[/ile\svr;\srv:([\w\.]+)\).+firefox/i],[f,[c,"Firefox Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,/(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[c,f]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[h,"amd64"]],[/(ia32(?=;))/i],[[h,E.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[h,"ia32"]],[/\b(aarch64|armv?8e?l?)\b/i],[[h,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[h,"armhf"]],[/windows\s(ce|mobile);\sppc;/i],[[h,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[h,/ower/,"",E.lowerize]],[/(sun4\w)[;\)]/i],[[h,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[h,E.lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i],[u,[p,"Samsung"],[m,x]],[/\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i,/\ssamsung[\s-]([\w-]+)/i,/sec-(sgh\w+)/i],[u,[p,"Samsung"],[m,v]],[/\((ip(?:hone|od)[\s\w]*);/i],[u,[p,"Apple"],[m,v]],[/\((ipad);[\w\s\),;-]+apple/i,/applecoremedia\/[\w\.]+\s\((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[u,[p,"Apple"],[m,x]],[/\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i],[u,[p,"Huawei"],[m,x]],[/d\/huawei([\w\s-]+)[;\)]/i,/\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i,/\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i],[u,[p,"Huawei"],[m,v]],[/\b(poco[\s\w]+)(?:\sbuild|\))/i,/\b;\s(\w+)\sbuild\/hm\1/i,/\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,/\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i,/\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i],[[u,/_/g," "],[p,"Xiaomi"],[m,v]],[/\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i],[[u,/_/g," "],[p,"Xiaomi"],[m,x]],[/;\s(\w+)\sbuild.+\soppo/i,/\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i],[u,[p,"OPPO"],[m,v]],[/\svivo\s(\w+)(?:\sbuild|\))/i,/\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i],[u,[p,"Vivo"],[m,v]],[/\s(rmx[12]\d{3})(?:\sbuild|;)/i],[u,[p,"Realme"],[m,v]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i,/\smot(?:orola)?[\s-](\w*)/i,/((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i],[u,[p,"Motorola"],[m,v]],[/\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[u,[p,"Motorola"],[m,x]],[/((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i],[u,[p,"LG"],[m,x]],[/(lm-?f100[nv]?|nexus\s[45])/i,/lg[e;\s\/-]+((?!browser|netcast)\w+)/i,/\blg(\-?[\d\w]+)\sbuild/i],[u,[p,"LG"],[m,v]],[/(ideatab[\w\-\s]+)/i,/lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i],[u,[p,"Lenovo"],[m,x]],[/(?:maemo|nokia).*(n900|lumia\s\d+)/i,/nokia[\s_-]?([\w\.-]*)/i],[[u,/_/g," "],[p,"Nokia"],[m,v]],[/droid.+;\s(pixel\sc)[\s)]/i],[u,[p,"Google"],[m,x]],[/droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i],[u,[p,"Google"],[m,v]],[/droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[u,[p,"Sony"],[m,v]],[/sony\stablet\s[ps]\sbuild\//i,/(?:sony)?sgp\w+(?:\sbuild\/|\))/i],[[u,"Xperia Tablet"],[p,"Sony"],[m,x]],[/\s(kb2005|in20[12]5|be20[12][59])\b/i,/\ba000(1)\sbuild/i,/\boneplus\s(a\d{4})[\s)]/i],[u,[p,"OnePlus"],[m,v]],[/(alexa)webm/i,/(kf[a-z]{2}wi)(\sbuild\/|\))/i,/(kf[a-z]+)(\sbuild\/|\)).+silk\//i],[u,[p,"Amazon"],[m,x]],[/(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i],[[u,"Fire Phone"],[p,"Amazon"],[m,v]],[/\((playbook);[\w\s\),;-]+(rim)/i],[u,p,[m,x]],[/((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10;\s(\w+)/i],[u,[p,"BlackBerry"],[m,v]],[/(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i],[u,[p,"ASUS"],[m,x]],[/\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i],[u,[p,"ASUS"],[m,v]],[/(nexus\s9)/i],[u,[p,"HTC"],[m,x]],[/(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[p,[u,/_/g," "],[m,v]],[/droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],[u,[p,"Acer"],[m,x]],[/droid.+;\s(m[1-5]\snote)\sbuild/i,/\bmz-([\w-]{2,})/i],[u,[p,"Meizu"],[m,v]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i,/(microsoft);\s(lumia[\s\w]+)/i,/(lenovo)[_\s-]?([\w-]+)/i,/linux;.+(jolla);/i,/droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[p,u,[m,v]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i,/[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i,/[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i,/\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i,/\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i],[p,u,[m,x]],[/\s(surface\sduo)\s/i],[u,[p,"Microsoft"],[m,x]],[/droid\s[\d\.]+;\s(fp\du?)\sbuild/i],[u,[p,"Fairphone"],[m,v]],[/\s(u304aa)\sbuild/i],[u,[p,"AT&T"],[m,v]],[/sie-(\w*)/i],[u,[p,"Siemens"],[m,v]],[/[;\/]\s?(rct\w+)\sbuild/i],[u,[p,"RCA"],[m,x]],[/[;\/\s](venue[\d\s]{2,7})\sbuild/i],[u,[p,"Dell"],[m,x]],[/[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i],[u,[p,"Verizon"],[m,x]],[/[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i],[u,[p,"Barnes & Noble"],[m,x]],[/[;\/]\s(tm\d{3}\w+)\sbuild/i],[u,[p,"NuVision"],[m,x]],[/;\s(k88)\sbuild/i],[u,[p,"ZTE"],[m,x]],[/;\s(nx\d{3}j)\sbuild/i],[u,[p,"ZTE"],[m,v]],[/[;\/]\s?(gen\d{3})\sbuild.*49h/i],[u,[p,"Swiss"],[m,v]],[/[;\/]\s?(zur\d{3})\sbuild/i],[u,[p,"Swiss"],[m,x]],[/[;\/]\s?((zeki)?tb.*\b)\sbuild/i],[u,[p,"Zeki"],[m,x]],[/[;\/]\s([yr]\d{2})\sbuild/i,/[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i],[[p,"Dragon Touch"],u,[m,x]],[/[;\/]\s?(ns-?\w{0,9})\sbuild/i],[u,[p,"Insignia"],[m,x]],[/[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i],[u,[p,"NextBook"],[m,x]],[/[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i],[[p,"Voice"],u,[m,v]],[/[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i],[[p,"LvTel"],u,[m,v]],[/;\s(ph-1)\s/i],[u,[p,"Essential"],[m,v]],[/[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i],[u,[p,"Envizen"],[m,x]],[/[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i],[u,[p,"MachSpeed"],[m,x]],[/[;\/]\s?tu_(1491)\sbuild/i],[u,[p,"Rotor"],[m,x]],[/(shield[\w\s]+)\sbuild/i],[u,[p,"Nvidia"],[m,x]],[/(sprint)\s(\w+)/i],[p,u,[m,v]],[/(kin\.[onetw]{3})/i],[[u,/\./g," "],[p,"Microsoft"],[m,v]],[/droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[u,[p,"Zebra"],[m,x]],[/droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i],[u,[p,"Zebra"],[m,v]],[/\s(ouya)\s/i,/(nintendo)\s([wids3utch]+)/i],[p,u,[m,g]],[/droid.+;\s(shield)\sbuild/i],[u,[p,"Nvidia"],[m,g]],[/(playstation\s[345portablevi]+)/i],[u,[p,"Sony"],[m,g]],[/[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i],[u,[p,"Microsoft"],[m,g]],[/smart-tv.+(samsung)/i],[p,[m,k]],[/hbbtv.+maple;(\d+)/i],[[u,/^/,"SmartTV"],[p,"Samsung"],[m,k]],[/(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i],[[p,"LG"],[m,k]],[/(apple)\s?tv/i],[p,[u,"Apple TV"],[m,k]],[/crkey/i],[[u,"Chromecast"],[p,"Google"],[m,k]],[/droid.+aft([\w])(\sbuild\/|\))/i],[u,[p,"Amazon"],[m,k]],[/\(dtv[\);].+(aquos)/i],[u,[p,"Sharp"],[m,k]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[p,E.trim],[u,E.trim],[m,k]],[/[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i],[[m,k]],[/((pebble))app\/[\d\.]+\s/i],[p,u,[m,_]],[/droid.+;\s(glass)\s\d/i],[u,[p,"Google"],[m,_]],[/droid\s[\d\.]+;\s(wt63?0{2,3})\)/i],[u,[p,"Zebra"],[m,_]],[/(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i],[p,[m,y]],[/droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i],[u,[m,v]],[/droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i],[u,[m,x]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[m,E.lowerize]],[/(android[\w\.\s\-]{0,9});.+build/i],[u,[p,"Generic"]],[/(phone)/i],[[m,v]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[f,[c,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[f,[c,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[c,f],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[f,c]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[c,f],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i],[c,[f,A.str,N.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[c,"Windows"],[f,A.str,N.os.windows.version]],[/ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,/cfnetwork\/.+darwin/i],[[f,/_/g,"."],[c,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i],[[c,"Mac OS"],[f,/_/g,"."]],[/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/\s]([\w\.]+)/i,/\((series40);/i],[c,f],[/\(bb(10);/i],[f,[c,"BlackBerry"]],[/(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i],[f,[c,"Symbian"]],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[c,"Firefox OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[f,[c,"webOS"]],[/crkey\/([\d\.]+)/i],[f,[c,"Chromecast"]],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[c,"Chromium OS"],f],[/(nintendo|playstation)\s([wids345portablevuch]+)/i,/(xbox);\s+xbox\s([^\);]+)/i,/(mint)[\/\s\(\)]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i,/\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku)\s(\w+)/i],[c,f],[/(sunos)\s?([\w\.\d]*)/i],[[c,"Solaris"],f],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,/(unix)\s?([\w\.]*)/i],[c,f]]};var UAParser=function(i,s){if(typeof i==="object"){s=i;i=o}if(!(this instanceof UAParser)){return new UAParser(i,s).getResult()}var r=i||(typeof e!=="undefined"&&e.navigator&&e.navigator.userAgent?e.navigator.userAgent:a);var n=s?E.extend(T,s):T;this.getBrowser=function(){var i={name:o,version:o};A.rgx.call(i,r,n.browser);i.major=E.major(i.version);return i};this.getCPU=function(){var i={architecture:o};A.rgx.call(i,r,n.cpu);return i};this.getDevice=function(){var i={vendor:o,model:o,type:o};A.rgx.call(i,r,n.device);return i};this.getEngine=function(){var i={name:o,version:o};A.rgx.call(i,r,n.engine);return i};this.getOS=function(){var i={name:o,version:o};A.rgx.call(i,r,n.os);return i};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return r};this.setUA=function(i){r=typeof i===d&&i.length>S?E.trim(i,S):i;return this};this.setUA(r);return this};UAParser.VERSION=r;UAParser.BROWSER={NAME:c,MAJOR:b,VERSION:f};UAParser.CPU={ARCHITECTURE:h};UAParser.DEVICE={MODEL:u,VENDOR:p,TYPE:m,CONSOLE:g,MOBILE:v,SMARTTV:k,TABLET:x,WEARABLE:_,EMBEDDED:y};UAParser.ENGINE={NAME:c,VERSION:f};UAParser.OS={NAME:c,VERSION:f};if(typeof s!==l){if("object"!==l&&i.exports){s=i.exports=UAParser}s.UAParser=UAParser}else{if(true){!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return UAParser}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else {}}var z=typeof e!=="undefined"&&(e.jQuery||e.Zepto);if(z&&!z.ua){var O=new UAParser;z.ua=O.getResult();z.ua.get=function(){return O.getUA()};z.ua.set=function(i){O.setUA(i);var s=O.getResult();for(var e in s){z.ua[e]=s[e]}}}})(typeof window==="object"?window:this)}};var s={};function __nccwpck_require__(e){var o=s[e];if(o!==undefined){return o.exports}var r=s[e]={exports:{}};var a=true;try{i[e].call(r.exports,r,r.exports,__nccwpck_require__);a=false}finally{if(a)delete s[e]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var e=__nccwpck_require__(613);module.exports=e})();

/***/ }),

/***/ 83:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.VL = adapter;
exports.OT = blockUnallowedResponse;
exports.gL = enhanceGlobals;
var _error = __webpack_require__(804);
var _utils = __webpack_require__(48);
var _fetchEvent = __webpack_require__(510);
var _request = __webpack_require__(196);
var _response = __webpack_require__(483);
var _relativizeUrl = __webpack_require__(972);
var _nextUrl = __webpack_require__(971);
class NextRequestHint extends _request.NextRequest {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw new _error.PageSignatureError({
            page: this.sourcePage
        });
    }
    respondWith() {
        throw new _error.PageSignatureError({
            page: this.sourcePage
        });
    }
    waitUntil() {
        throw new _error.PageSignatureError({
            page: this.sourcePage
        });
    }
}
async function adapter(params) {
    const requestUrl = new _nextUrl.NextURL(params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Ensure users only see page requests, never data requests.
    const buildId = requestUrl.buildId;
    requestUrl.buildId = "";
    const isDataReq = params.request.headers["x-nextjs-data"];
    if (isDataReq && requestUrl.pathname === "/index") {
        requestUrl.pathname = "/";
    }
    // clean-up any internal query params
    for (const key of [
        ...requestUrl.searchParams.keys()
    ]){
        if (key.startsWith("__next")) {
            requestUrl.searchParams.delete(key);
        }
    }
    const request = new NextRequestHint({
        page: params.page,
        input: String(requestUrl),
        init: {
            body: params.request.body,
            geo: params.request.geo,
            headers: (0, _utils).fromNodeHeaders(params.request.headers),
            ip: params.request.ip,
            method: params.request.method,
            nextConfig: params.request.nextConfig
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isDataReq) {
        Object.defineProperty(request, "__isData", {
            enumerable: false,
            value: true
        });
    }
    const event = new _fetchEvent.NextFetchEvent({
        request,
        page: params.page
    });
    let response = await params.handler(request, event);
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get("x-middleware-rewrite");
    if (response && rewrite) {
        const rewriteUrl = new _nextUrl.NextURL(rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if (rewriteUrl.host === request.nextUrl.host) {
            rewriteUrl.buildId = buildId || rewriteUrl.buildId;
            response.headers.set("x-middleware-rewrite", String(rewriteUrl));
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ if (isDataReq) {
            response.headers.set("x-nextjs-rewrite", (0, _relativizeUrl).relativizeURL(String(rewriteUrl), String(requestUrl)));
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get("Location");
    if (response && redirect) {
        const redirectURL = new _nextUrl.NextURL(redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (redirectURL.host === request.nextUrl.host) {
            redirectURL.buildId = buildId || redirectURL.buildId;
            response.headers.set("Location", String(redirectURL));
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isDataReq) {
            response.headers.delete("Location");
            response.headers.set("x-nextjs-redirect", (0, _relativizeUrl).relativizeURL(String(redirectURL), String(requestUrl)));
        }
    }
    return {
        response: response || _response.NextResponse.next(),
        waitUntil: Promise.all(event[_fetchEvent.waitUntilSymbol])
    };
}
function blockUnallowedResponse(promise) {
    return promise.then((result)=>{
        var ref;
        if ((ref = result.response) == null ? void 0 : ref.body) {
            console.error(new Error(`A middleware can not alter response's body. Learn more: https://nextjs.org/docs/messages/returning-response-body-in-middleware`));
            return {
                ...result,
                response: new Response("Internal Server Error", {
                    status: 500,
                    statusText: "Internal Server Error"
                })
            };
        }
        return result;
    });
}
function enhanceGlobals() {
    // The condition is true when the "process" module is provided
    if (process !== __webpack_require__.g.process) {
        // prefer local process but global.process has correct "env"
        process.env = __webpack_require__.g.process.env;
        __webpack_require__.g.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, "__import_unsupported", {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === "then") {
                return {};
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        construct () {
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        apply (_target, _this, args) {
            if (typeof args[0] === "function") {
                return args[0](proxy);
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}

//# sourceMappingURL=adapter.js.map

/***/ }),

/***/ 804:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
class PageSignatureError extends Error {
    constructor({ page  }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
exports.PageSignatureError = PageSignatureError;
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
exports.RemovedPageError = RemovedPageError;
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
}
exports.RemovedUAError = RemovedUAError;

//# sourceMappingURL=error.js.map

/***/ }),

/***/ 971:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _detectDomainLocale = __webpack_require__(31);
var _formatNextPathnameInfo = __webpack_require__(671);
var _getHostname = __webpack_require__(970);
var _getNextPathnameInfo = __webpack_require__(536);
const Internal = Symbol("NextURLInternal");
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base != null ? base : options.base),
            options: options,
            basePath: ""
        };
        this.analyzeUrl();
    }
    analyzeUrl() {
        var ref, ref1, ref2, ref3, ref4;
        const pathnameInfo = (0, _getNextPathnameInfo).getNextPathnameInfo(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: true
        });
        this[Internal].domainLocale = (0, _detectDomainLocale).detectDomainLocale((ref = this[Internal].options.nextConfig) == null ? void 0 : (ref1 = ref.i18n) == null ? void 0 : ref1.domains, (0, _getHostname).getHostname(this[Internal].url, this[Internal].options.headers));
        const defaultLocale = ((ref2 = this[Internal].domainLocale) == null ? void 0 : ref2.defaultLocale) || ((ref3 = this[Internal].options.nextConfig) == null ? void 0 : (ref4 = ref3.i18n) == null ? void 0 : ref4.defaultLocale);
        this[Internal].url.pathname = pathnameInfo.pathname;
        this[Internal].defaultLocale = defaultLocale;
        var _basePath;
        this[Internal].basePath = (_basePath = pathnameInfo.basePath) != null ? _basePath : "";
        this[Internal].buildId = pathnameInfo.buildId;
        var _locale;
        this[Internal].locale = (_locale = pathnameInfo.locale) != null ? _locale : defaultLocale;
        this[Internal].trailingSlash = pathnameInfo.trailingSlash;
    }
    formatPathname() {
        return (0, _formatNextPathnameInfo).formatNextPathnameInfo({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        var _locale;
        return (_locale = this[Internal].locale) != null ? _locale : "";
    }
    set locale(locale) {
        var ref, ref5;
        if (!this[Internal].locale || !((ref = this[Internal].options.nextConfig) == null ? void 0 : (ref5 = ref.i18n) == null ? void 0 : ref5.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        return `${this.protocol}//${this.host}${pathname}${this[Internal].url.search}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyzeUrl();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
}
exports.NextURL = NextURL;
const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|::1|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
}

//# sourceMappingURL=next-url.js.map

/***/ }),

/***/ 627:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _cookie = _interopRequireDefault(__webpack_require__(379));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const normalizeCookieOptions = (options)=>{
    options = Object.assign({}, options);
    if (options.maxAge) {
        options.expires = new Date(Date.now() + options.maxAge * 1000);
    }
    if (options.path == null) {
        options.path = "/";
    }
    return options;
};
const serializeValue = (value)=>typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
const serializeExpiredCookie = (key, options = {})=>_cookie.default.serialize(key, "", {
        expires: new Date(0),
        path: "/",
        ...options
    });
const deserializeCookie = (input)=>{
    const value = input.headers.get("set-cookie");
    return value !== undefined && value !== null ? value.split(", ") : [];
};
const serializeCookie = (input)=>input.join(", ");
class Cookies extends Map {
    constructor(input){
        const parsedInput = typeof input === "string" ? _cookie.default.parse(input) : {};
        super(Object.entries(parsedInput));
    }
    set(key, value, options = {}) {
        return super.set(key, _cookie.default.serialize(key, serializeValue(value), normalizeCookieOptions(options)));
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return Object.fromEntries(this.entries());
    }
}
exports.Cookies = Cookies;
class NextCookies extends Cookies {
    constructor(response){
        super(response.headers.get("cookie"));
        this.response = response;
    }
    get = (...args)=>{
        return this.getWithOptions(...args).value;
    };
    getWithOptions = (...args)=>{
        const raw = super.get(...args);
        if (typeof raw !== "string") return {
            value: raw,
            options: {}
        };
        const { [args[0]]: value , ...options } = _cookie.default.parse(raw);
        return {
            value,
            options
        };
    };
    set = (...args)=>{
        const isAlreadyAdded = super.has(args[0]);
        super.set(...args);
        const currentCookie = super.get(args[0]);
        if (typeof currentCookie !== "string") {
            throw new Error(`Invariant: failed to generate cookie for ${JSON.stringify(args)}`);
        }
        if (isAlreadyAdded) {
            const setCookie = serializeCookie(deserializeCookie(this.response).filter((value)=>!value.startsWith(`${args[0]}=`)));
            if (setCookie) {
                this.response.headers.set("set-cookie", [
                    currentCookie,
                    setCookie
                ].join(", "));
            } else {
                this.response.headers.set("set-cookie", currentCookie);
            }
        } else {
            this.response.headers.append("set-cookie", currentCookie);
        }
        return this;
    };
    delete = (key, options = {})=>{
        const isDeleted = super.delete(key);
        if (isDeleted) {
            const setCookie = serializeCookie(deserializeCookie(this.response).filter((value)=>!value.startsWith(`${key}=`)));
            const expiredCookie = serializeExpiredCookie(key, options);
            this.response.headers.set("set-cookie", [
                expiredCookie,
                setCookie
            ].join(", "));
        }
        return isDeleted;
    };
    clear = (options = {})=>{
        const expiredCookies = Array.from(super.keys()).map((key)=>serializeExpiredCookie(key, options)).join(", ");
        if (expiredCookies) this.response.headers.set("set-cookie", expiredCookies);
        return super.clear();
    };
}
exports.NextCookies = NextCookies;

//# sourceMappingURL=cookies.js.map

/***/ }),

/***/ 510:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.waitUntilSymbol = void 0;
var _error = __webpack_require__(804);
const responseSymbol = Symbol("response");
const passThroughSymbol = Symbol("passThrough");
const waitUntilSymbol = Symbol("waitUntil");
exports.waitUntilSymbol = waitUntilSymbol;
class FetchEvent {
    [waitUntilSymbol] = [];
    [passThroughSymbol] = false;
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_request){}
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        this[waitUntilSymbol].push(promise);
    }
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        super(params.request);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw new _error.PageSignatureError({
            page: this.sourcePage
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw new _error.PageSignatureError({
            page: this.sourcePage
        });
    }
}
exports.NextFetchEvent = NextFetchEvent;

//# sourceMappingURL=fetch-event.js.map

/***/ }),

/***/ 196:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.INTERNALS = void 0;
var _nextUrl = __webpack_require__(971);
var _utils = __webpack_require__(48);
var _error = __webpack_require__(804);
var _cookies = __webpack_require__(627);
const INTERNALS = Symbol("internal request");
exports.INTERNALS = INTERNALS;
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        (0, _utils).validateURL(url);
        super(url, init);
        this[INTERNALS] = {
            cookies: new _cookies.NextCookies(this),
            geo: init.geo || {},
            ip: init.ip,
            url: new _nextUrl.NextURL(url, {
                headers: (0, _utils).toNodeHeaders(this.headers),
                nextConfig: init.nextConfig
            })
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].url;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new _error.RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new _error.RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url.toString();
    }
}
exports.NextRequest = NextRequest;

//# sourceMappingURL=request.js.map

/***/ }),

/***/ 483:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _nextUrl = __webpack_require__(971);
var _utils = __webpack_require__(48);
var _cookies = __webpack_require__(627);
const INTERNALS = Symbol("internal response");
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        this[INTERNALS] = {
            cookies: new _cookies.NextCookies(this),
            url: init.url ? new _nextUrl.NextURL(init.url, {
                headers: (0, _utils).toNodeHeaders(this.headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        // @ts-expect-error This is not in lib/dom right now, and we can't augment it.
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        var ref;
        const status = typeof init === "number" ? init : (ref = init == null ? void 0 : init.status) != null ? ref : 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === "object" ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set("Location", (0, _utils).validateURL(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-rewrite", (0, _utils).validateURL(destination));
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-next", "1");
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
}
exports.NextResponse = NextResponse;

//# sourceMappingURL=response.js.map

/***/ }),

/***/ 708:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
__webpack_unused_export__ = isBot;
exports.Nf = userAgentFromString;
exports.WE = userAgent;
var _uaParserJs = _interopRequireDefault(__webpack_require__(372));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
}
function userAgentFromString(input) {
    return {
        ...(0, _uaParserJs).default(input),
        isBot: input === undefined ? false : isBot(input)
    };
}
function userAgent({ headers  }) {
    return userAgentFromString(headers.get("user-agent") || undefined);
}

//# sourceMappingURL=user-agent.js.map

/***/ }),

/***/ 48:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.fromNodeHeaders = fromNodeHeaders;
exports.toNodeHeaders = toNodeHeaders;
exports.splitCookiesString = splitCookiesString;
exports.validateURL = validateURL;
function fromNodeHeaders(object) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(object)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (v !== undefined) {
                headers.append(key, v);
            }
        }
    }
    return headers;
}
function toNodeHeaders(headers) {
    const result = {};
    if (headers) {
        for (const [key, value] of headers.entries()){
            result[key] = value;
            if (key.toLowerCase() === "set-cookie") {
                result[key] = splitCookiesString(value);
            }
        }
    }
    return result;
}
function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URLs is malformed. Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 253:
/***/ ((module, exports, __webpack_require__) => {

const serverExports = {
  NextRequest: (__webpack_require__(196).NextRequest),
  NextResponse: (__webpack_require__(483).NextResponse),
  userAgentFromString: (__webpack_require__(708)/* .userAgentFromString */ .Nf),
  userAgent: (__webpack_require__(708)/* .userAgent */ .WE),
}

if (typeof URLPattern !== 'undefined') {
  // eslint-disable-next-line no-undef
  serverExports.URLPattern = URLPattern
}

// https://nodejs.org/api/esm.html#commonjs-namespaces
// When importing CommonJS modules, the module.exports object is provided as the default export
module.exports = serverExports

// make import { xxx } from 'next/server' work
exports.NextRequest = serverExports.NextRequest
exports.NextResponse = serverExports.NextResponse
exports.userAgentFromString = serverExports.userAgentFromString
exports.userAgent = serverExports.userAgent
exports.URLPattern = serverExports.URLPattern


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(102));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES)["middleware_src/middleware"] = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=middleware.js.map