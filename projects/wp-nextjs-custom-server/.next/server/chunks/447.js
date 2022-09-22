exports.id = 447;
exports.ids = [447];
exports.modules = {

/***/ 4338:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ LinkBlock)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9097);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _10up_headless_core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5442);
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9528);
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1503);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_core__WEBPACK_IMPORTED_MODULE_2__]);
_10up_headless_core__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





/**
 * The Link Block converts a anchor tag node into a next/link component if it's an internal link
 *
 * ## Usage
 *
 * ```tsx
 * import { BlocksRenderer } from "@10up/headless-core/react";
 * import { LinkBlock } from "@10up/headless-next";
 *
 * <BlocksRenderer html={html}>
 * 	<LinkBlock />
 * </BlocksRenderer>
 * ```
 *
 * @param props Link Block Props
 * @param props.domNode The domNode element
 * @param props.children Children prop
 *
 * @returns The next/link component
 *
 * @category React Components
 */
function LinkBlock({ domNode, children }) {
    const { href, rel, className } = (0,_10up_headless_core__WEBPACK_IMPORTED_MODULE_2__/* .getAttributes */ .u9)(domNode.attribs);
    const settings = (0,_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_3__/* .useSettings */ .r)();
    const link = (0,_10up_headless_core_utils__WEBPACK_IMPORTED_MODULE_4__/* .removeSourceUrl */ .V)({ link: href, backendUrl: settings.sourceUrl || '' });
    const Component = typeof settings.linkComponent === 'function' ? settings.linkComponent : (next_link__WEBPACK_IMPORTED_MODULE_1___default());
    return (react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, { href: link, children: react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", { rel: rel, className: className, children: children }) }));
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (LinkBlock) {
    LinkBlock.defaultProps = {
        test: (node) => (0,_10up_headless_core__WEBPACK_IMPORTED_MODULE_2__/* .isAnchorTag */ .We)(node, { isInternalLink: true }),
    };
})(LinkBlock || (LinkBlock = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5440:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ TwitterBlock)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _10up_headless_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1503);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5847);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_core__WEBPACK_IMPORTED_MODULE_2__]);
_10up_headless_core__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * Renders a twitter embed
 *
 * ## Usage
 *
 * ```tsx
 * import { BlocksRenderer } from "@10up/headless-core/react";
 * import { TwitterBlock } from "@10up/headless-next";
 *
 * <BlocksRenderer html={html}>
 * 	<TwitterBlock />
 * </BlocksRenderer>
 * ```
 *
 * @param props Link Block Props
 * @param props.domNode The domNode element
 * @param props.children Children prop
 *
 * @category React Components
 */
function TwitterBlock({ children }) {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_script__WEBPACK_IMPORTED_MODULE_1___default()), { src: "https://platform.twitter.com/widgets.js", strategy: "lazyOnload" }), children] }));
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (TwitterBlock) {
    TwitterBlock.defaultProps = {
        test: (node) => (0,_10up_headless_core__WEBPACK_IMPORTED_MODULE_2__/* .isTwitterEmbed */ .IA)(node),
    };
})(TwitterBlock || (TwitterBlock = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ ImageComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6577);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);


/**
 * An implementation of the ImageBlock (core/image).
 *
 * If `width`, `height` or `src` are not provided, this component will not be used.
 *
 * ## Usage
 *
 * ```tsx
 * import { BlocksRenderer, ImageBlock } from "@10up/headless-core/react";
 * import { ImageComponent } from "@10up/headless-next";
 *
 * <BlocksRenderer html={html}>
 * 	<ImageBlock component={ImageComponent} />
 * </BlocksRenderer>
 * ```
 *
 * @param props {@link ImageBlockProps}
 *
 * @category React Components
 */
function ImageComponent({ src, alt, width, height, children }) {
    if (!width || !height) {
        return children;
    }
    if (!src) {
        return children;
    }
    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), { src: src, alt: alt, width: width, height: height, layout: "intrinsic" });
}


/***/ }),

/***/ 6447:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Blocks": () => (/* binding */ Blocks),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4898);
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4334);
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4365);
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6954);
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4338);
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5440);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__, _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_2__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_4__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_5__, _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_6__]);
([_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__, _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_2__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_4__, _10up_headless_next__WEBPACK_IMPORTED_MODULE_5__, _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const Blocks = ({
  html
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
    className: "dg3g6rf",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__/* .BlocksRenderer */ .i, {
      html: html,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_2__/* .ImageBlock */ .r, {
        component: _10up_headless_next__WEBPACK_IMPORTED_MODULE_3__/* .ImageComponent */ .c
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_10up_headless_next__WEBPACK_IMPORTED_MODULE_4__/* .LinkBlock */ .r, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_10up_headless_next__WEBPACK_IMPORTED_MODULE_5__/* .TwitterBlock */ .q, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_6__/* .YoutubeLiteBlock */ .z, {})]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Blocks);

__webpack_require__(5755);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5755:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4240);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dg3g6rf{position:relative;}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 1503:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IA": () => (/* binding */ isTwitterEmbed),
/* harmony export */   "Lq": () => (/* binding */ isBlock),
/* harmony export */   "Pi": () => (/* binding */ isBlockByName),
/* harmony export */   "We": () => (/* binding */ isAnchorTag),
/* harmony export */   "u9": () => (/* binding */ getAttributes),
/* harmony export */   "vl": () => (/* binding */ isYoutubeEmbed),
/* harmony export */   "yh": () => (/* binding */ youtubeEmbedRegex)
/* harmony export */ });
/* unused harmony export isImageTag */
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2905);
/* harmony import */ var _utils_isInternalLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2617);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([html_react_parser__WEBPACK_IMPORTED_MODULE_0__]);
html_react_parser__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


/**
 * A small helper function that should probably be removed
 *
 * @param attribs The attributes of the element
 *
 * @internal
 *
 * @returns
 */
function getAttributes(attribs) {
    const attributes = { ...attribs };
    attributes.className = '';
    if (attribs?.class) {
        attributes.className = attributes.class;
        delete attributes.class;
    }
    return attributes;
}
/**
 * Checks if the provided node is an valid anchor tag
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by [[BlocksRenderer]].
 *
 * ## Usage
 *
 * ```tsx
 * import { isAnchorTag } from '@10up/headless-core';
 * import { LinkBlock } from '@10up/headless-next';
 *
 * <BlocksRenderer html={html}>
 *  	<LinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true})} />
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 * @param options Supported options
 *
 * @category DOM Helpers
 *
 * @returns Whether it's a anchor tag accoriding to the options passed
 */
function isAnchorTag(node, options = {}) {
    if (!(node instanceof html_react_parser__WEBPACK_IMPORTED_MODULE_0__.Element)) {
        return false;
    }
    const isAnchor = node.type === 'tag' && node.name === 'a' && typeof node?.attribs?.href === 'string';
    if (!isAnchor) {
        return false;
    }
    if (options?.isInternalLink) {
        const { href, target } = node.attribs;
        // there's no client side rendering on links that opens in a new tab
        if (target === '_blank') {
            return false;
        }
        return (0,_utils_isInternalLink__WEBPACK_IMPORTED_MODULE_1__/* .isInternalLink */ .F)(href);
    }
    return true;
}
/**
 * Checks if the provided node is an valid image tag
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by [[BlocksRenderer]].
 *
 * ## Usage
 *
 * ```tsx
 * import { isImageTag, ImageBlock } from '@10up/headless-core';
 * import { ImageComponent } from '@10up/headless-next';
 *
 * <BlocksRenderer html={html}>
 *  	<ImageBlock
 * 			test={(node) => isImageTag(node, { hasDimensions: true})}
 * 			component={ImageComponent}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 * @param options Supported options.
 *
 * @category DOM Helpers
 *
 * @returns Whether it's an image tag or not according to the options passed
 */
function isImageTag(node, options = {}) {
    if (!(node instanceof Element)) {
        return false;
    }
    const isImage = node.type === 'tag' && node.name === 'img' && typeof node?.attribs?.src === 'string';
    if (!isImage) {
        return false;
    }
    if (options?.hasDimensions) {
        return node?.attribs?.width && node?.attribs?.height;
    }
    return true;
}
const youtubeEmbedRegex = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
/**
 * Checks if the node is an youtube embed
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by [[BlocksRenderer]].
 *
 * ## Usage
 *
 * ```tsx
 * import { isYoutubeEmbed } from '@10up/headless-core';
 *
 * <BlocksRenderer html={html}>
 *  	<MyYoutubeBlock
 * 			test={isYoutubeEmbed}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 *
 * @category DOM Helpers
 *
 * @returns true if the node is a youtube embed
 */
function isYoutubeEmbed(node) {
    if (!(node instanceof html_react_parser__WEBPACK_IMPORTED_MODULE_0__.Element)) {
        return false;
    }
    const isIframe = node.type === 'tag' && node.name === 'iframe';
    if (!isIframe) {
        return false;
    }
    const { src } = node.attribs || '';
    return !!src.match(youtubeEmbedRegex);
}
/**
 * Checks if the node is an twitter embed
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by [[BlocksRenderer]].
 *
 * ## Usage
 *
 * ```tsx
 * import { isTwitterEmbed } from '@10up/headless-core';
 *
 * <BlocksRenderer html={html}>
 *  	<MyTwitterBlock
 * 			test={isTwitterEmbed}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 *
 * @category DOM Helpers
 *
 * @returns true if the node is a twitter embed
 */
function isTwitterEmbed(node) {
    if (!(node instanceof html_react_parser__WEBPACK_IMPORTED_MODULE_0__.Element)) {
        return false;
    }
    const isFigure = node.type === 'tag' && node.name === 'figure';
    const className = node.attribs?.class || '';
    return isFigure && className.split(' ').includes('wp-block-embed-twitter');
}
/**
 * Tests a node by tagName and/or className
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by [[BlocksRenderer]].
 *
 * ## Usage
 *
 * ```tsx
 * import { isBlock } from '@10up/headless-core';
 *
 * <BlocksRenderer html={html}>
 *  	<MyCustomBlock
 * 			test={(node) => isBlock(node, { tagName: 'div', classList: ['block-class-name'] })}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 *
 * @category DOM Helpers
 *
 * @returns true if the node passes the test
 */
function isBlock(node, _options) {
    if (!(node instanceof html_react_parser__WEBPACK_IMPORTED_MODULE_0__.Element)) {
        return false;
    }
    const options = { tagName: 'div', ..._options };
    const isTag = node.type === 'tag' && node.name === options.tagName;
    if (!isTag) {
        return false;
    }
    const { className } = getAttributes(node.attribs);
    if (Array.isArray(options.className)) {
        return (options.className.filter((c) => className.split(' ').includes(c)).length ===
            options.className.length);
    }
    if (options.className) {
        return className.split(' ').includes(options.className);
    }
    return isTag;
}
/**
 * Tests a node by block name. This requires the Headless WP Plugin to be installed.
 *
 * The Headless WP Plugin will append `data-wp-block-name` and `data-wp-block` to every block,
 * this function relies on those attributes to determine if the node is a block.
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by [[BlocksRenderer]].
 *
 * ## Usage
 *
 * ```tsx
 * import { isBlockByName } from '@10up/headless-core';
 *
 * <BlocksRenderer html={html}>
 *  	<MyCustomBlock
 * 			test={(node) => isBlock(node, 'core/paragraph')}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 * @param name The block name
 *
 * @category DOM Helpers
 *
 * @returns true if the node passes the test
 */
function isBlockByName(node, name) {
    if (!(node instanceof html_react_parser__WEBPACK_IMPORTED_MODULE_0__.Element)) {
        return false;
    }
    const blockName = node.attribs['data-wp-block-name'];
    return blockName === name;
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7312:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ wpKsesPost)
/* harmony export */ });
/* unused harmony export ksesAllowedList */
/* harmony import */ var xss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9314);
/* harmony import */ var xss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xss__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-param-reassign, @typescript-eslint/no-use-before-define */

/**
 * Sanitize HTML content by the wp_kses_post() requirements
 *
 * ## Usage
 *
 * ```tsx
 * import { wpKsesPost } from '@10up/headless-core';
 * wpKsesPost(html);
 * ```
 *
 * @param content The content to sanitize.
 * @param allowList Optional. The list of allowed HTML tags and attributes. If not set, the default allow list will be used.
 *
 * @see https://codex.wordpress.org/Function_Reference/wp_kses_post
 *
 * @category DOM Helpers
 *
 * @returns Sanitized string of HTML.
 */
const wpKsesPost = (content, allowList) => {
    if (typeof allowList === 'undefined') {
        allowList = ksesAllowedList;
    }
    return xss__WEBPACK_IMPORTED_MODULE_0___default()(content, {
        whiteList: allowList,
        stripIgnoreTag: true,
        stripIgnoreTagBody: true,
    });
};
const commonAttributes = [
    'class',
    'aria-describedby',
    'aria-details',
    'aria-label',
    'aria-labelledby',
    'aria-hidden',
    'id',
    'style',
    'role',
    'data-*',
    'data-wp-block',
    'data-wp-block-name',
];
const defaultAllowList = (0,xss__WEBPACK_IMPORTED_MODULE_0__.getDefaultWhiteList)();
for (const tag of Object.keys(defaultAllowList)) {
    if (typeof defaultAllowList[tag] !== 'undefined' && Array.isArray(defaultAllowList[tag])) {
        // @ts-expect-error
        defaultAllowList[tag] = [...defaultAllowList[tag], ...commonAttributes];
    }
}
/**
 * Default Allowed HTML Attributes
 *
 * @see https://codex.wordpress.org/Function_Reference/wp_kses_post
 *
 * @returns Array of allowed attributes for tags.
 */
const ksesAllowedList = {
    ...defaultAllowList,
    iframe: [
        ...commonAttributes,
        'allow',
        'allowfullscreen',
        'allowpaymentrequest',
        'csp',
        'height',
        'loading',
        'name',
        'referrerpolicy',
        'sandbox',
        'src',
        'srcdoc',
        'width',
        'title',
    ],
};


/***/ }),

/***/ 4334:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ ImageBlock)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1503);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8174);
/* harmony import */ var _hooks_useBlockAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6093);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_dom__WEBPACK_IMPORTED_MODULE_3__]);
_dom__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function ImageBlock({ domNode: node, children, component: Component }) {
    const { name, className, attributes } = (0,_hooks__WEBPACK_IMPORTED_MODULE_1__/* .useBlock */ .r)(node);
    const blockAttributes = (0,_hooks_useBlockAttributes__WEBPACK_IMPORTED_MODULE_2__/* .useBlockAttributes */ .k)(node);
    const hasFigureNode = node.firstChild.name === 'figure';
    const { width, height } = attributes;
    let imgNode;
    if (hasFigureNode) {
        const figureNode = node.children[0];
        if (figureNode.children[0]) {
            imgNode = figureNode.children[0];
        }
    }
    else {
        imgNode = node.children[0];
    }
    const { src, alt, width: imgNodeWidth, height: imgNodeHeight } = imgNode.attribs;
    return (react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, { name: name, domNode: node, className: className, src: src, alt: alt, attributes: blockAttributes, width: width || Number(imgNodeWidth), height: height || Number(imgNodeHeight), children: children }));
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (ImageBlock) {
    ImageBlock.defaultProps = {
        test: (node) => {
            return (0,_dom__WEBPACK_IMPORTED_MODULE_3__/* .isBlockByName */ .Pi)(node, 'core/image');
        },
    };
})(ImageBlock || (ImageBlock = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4365:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ YoutubeLiteBlock)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1503);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_dom__WEBPACK_IMPORTED_MODULE_2__]);
_dom__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * Renders Youtube embeds with lite-youtube-embed
 *
 * @param {import('@10up/headless-core').BlockDef} props The Block props
 *
 * @returns
 */
function YoutubeLiteBlock({ domNode }) {
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 2594, 23));
    }, []);
    const { src, title } = domNode.attribs;
    const videoId = src.match(_dom__WEBPACK_IMPORTED_MODULE_2__/* .youtubeEmbedRegex */ .yh)[7];
    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("lite-youtube", { videoid: videoId, videotitle: title });
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (YoutubeLiteBlock) {
    YoutubeLiteBlock.defaultProps = {
        test: (node) => (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .isYoutubeEmbed */ .vl)(node),
    };
})(YoutubeLiteBlock || (YoutubeLiteBlock = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ useBlock)
/* harmony export */ });
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9528);

/**
 * Parses Json without throwing errors
 *
 * @param json Serialized JSON
 * @returns JSON object
 */
function safeParsing(json) {
    let parsed = {};
    try {
        parsed = JSON.parse(json);
    }
    catch (e) {
        // do nothing
    }
    return parsed;
}
/**
 * Returns the block name and attributes
 *
 * @param node DomNode
 *
 * @returns
 */
function useBlock(node) {
    const { useWordPressPlugin } = (0,_provider__WEBPACK_IMPORTED_MODULE_0__/* .useSettings */ .r)();
    if (typeof node.attribs['data-wp-block-name'] === 'undefined' &&
        typeof node.attribs['data-wp-block'] === 'undefined') {
        // eslint-disable-next-line no-console
        console.warn('[useBlock] You are using the useBlock hook in a node that is not a block.');
        if (!useWordPressPlugin) {
            // eslint-disable-next-line no-console
            console.warn('[useBlock] In order to use this hook, you must install the WordPress Plugin.');
        }
    }
    const blockName = node.attribs['data-wp-block-name'] || '';
    const attrs = node.attribs['data-wp-block']
        ? safeParsing(node.attribs['data-wp-block'])
        : {};
    return { attributes: attrs, name: blockName, className: node.attribs.class };
}


/***/ }),

/***/ 6093:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "k": () => (/* binding */ useBlockAttributes)
});

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/utils.js

function getAlignStyle(domNode) {
    if (!domNode.attribs.class) {
        return 'none';
    }
    const classes = domNode.attribs.class.split(' ');
    for (const cls of classes) {
        switch (cls) {
            case 'alignleft':
                return 'left';
            case 'alignright':
                return 'right';
            case 'aligncenter':
                return 'center';
            case 'alignwide':
                return 'wide';
            case 'alignfull':
                return 'full';
            default:
                break;
        }
    }
    return 'none';
}
/**
 * Returns the block style (is-style-{block-style})
 *
 * @param domNode DomNode
 *
 * @returns string with block style
 */
function getBlockStyle(domNode) {
    if (!domNode.attribs.class) {
        return 'none';
    }
    const classes = domNode.attribs.class.split(' ');
    const prefix = 'is-style-';
    for (const cls of classes) {
        if (cls.startsWith('is-style-')) {
            return cls.substring(prefix.length);
        }
    }
    return 'none';
}
/**
 * Infer GB color styles from classnames
 *
 * @param domNode DomNode
 *
 * @returns ColorBlockProps object
 */
function getColorStyles(domNode) {
    const colorObject = {
        textColorSlug: '',
        textColor: '',
        linkColorSlug: '',
        linkColor: '',
        gradientSlug: '',
        gradient: '',
        backgroundColorSlug: '',
        backgroundColor: '',
    };
    if (!domNode.attribs.class) {
        return colorObject;
    }
    const classes = domNode.attribs.class.split(' ');
    const hasText = classes.find((cls) => cls === 'has-text-color') !== undefined;
    const hasLink = classes.find((cls) => cls === 'has-link-color') !== undefined;
    const hasBackground = classes.find((cls) => cls === 'has-background') !== undefined;
    for (const cls of classes) {
        if (!['has-text-color', 'has-background', 'has-link-color'].includes(cls)) {
            if (hasBackground) {
                const match = cls.match(/has-(.*)-background-color/);
                if (match) {
                    colorObject.backgroundColor = match ? match[1] : '';
                }
            }
            if (hasLink) {
                const match = cls.match(/has-(.*)-link-color/);
                if (match) {
                    colorObject.linkColor = match ? match[1] : '';
                }
            }
            if (hasText && !cls.endsWith('-background-color') && !cls.endsWith('-link-color')) {
                const match = cls.match(/has-(.*)-color/);
                if (match) {
                    colorObject.textColor = match ? match[1] : '';
                }
            }
        }
    }
    return colorObject;
}
/**
 * Converts inline styles to a stylesObject for use in react components
 *
 * @param domNode DomNode
 *
 * @returns
 */
function getInlineStyles(domNode) {
    const styles = domNode.attribs.style;
    if (!styles) {
        return false;
    }
    const stylesArray = styles.split(';');
    const stylesObject = {};
    stylesArray.forEach((style) => {
        if (!style) {
            return;
        }
        const position = style.indexOf(':');
        const prop = style.substring(0, position).trim();
        const value = style.substring(position).substring(1).trim();
        stylesObject[camelCase(prop, {})] = value;
    });
    return stylesObject;
}
/**
 * Returns the width size of a block
 *
 * @param domNode DomNode
 *
 * @returns
 */
function getWidthStyles(domNode) {
    if (!domNode.attribs.class) {
        return undefined;
    }
    const classes = domNode.attribs.class.split(' ');
    const hasCustomWidth = classes.find((cls) => cls === 'has-custom-width') !== undefined;
    if (!hasCustomWidth) {
        return undefined;
    }
    for (const cls of classes) {
        const match = cls.match(/.+__width-(\d+)$/);
        if (match) {
            return match[1];
        }
    }
    return undefined;
}
/**
 * Returns the typography styles of a block
 *
 * @param domNode DomNode
 *
 * @returns
 */
function getTypographyStyles(domNode) {
    const typography = {
        fontSize: '',
        style: {
            fontSize: '',
            lineHeight: '',
        },
    };
    if (!domNode.attribs.class) {
        return typography;
    }
    const classes = domNode.attribs.class.split(' ');
    const hasCustomFontSize = classes.find((cls) => cls === 'has-custom-font-size') !== undefined;
    /* const hasCustomLineHeight =
        classes.find((cls) => cls === 'has-custom-line-height') !== undefined; */
    for (const cls of classes) {
        if (!['has-custom-font-size', 'has-custom-line-height'].includes(cls)) {
            const match = cls.match(/has-(.*)-font-size/);
            if (match) {
                typography.fontSize = match ? match[1] : '';
            }
        }
    }
    // didn't find a preset
    if (hasCustomFontSize && typography.fontSize === '') {
        const styles = getInlineStyles(domNode);
        if (styles && styles.fontSize) {
            typography.style.fontSize = styles.fontSize;
        }
        if (styles && styles.lineHeight) {
            typography.style.lineHeight = styles.lineHeight;
        }
    }
    return typography;
}

// EXTERNAL MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlock.js
var useBlock = __webpack_require__(8174);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlockAlign.js


/**
 * Returns the block align style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
function useBlockAlign(node) {
    const { attributes } = (0,useBlock/* useBlock */.r)(node);
    if (attributes.align) {
        return attributes.align;
    }
    return getAlignStyle(node);
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlockBorder.js

/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
function useBlockBorder(node) {
    const { attributes } = (0,useBlock/* useBlock */.r)(node);
    return attributes?.style?.border;
}

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/react/provider/ThemeSettingsProvider.js
var ThemeSettingsProvider = __webpack_require__(5635);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/provider/useThemeSettings.js


/**
 * Returns the raw theme.json settings definitions
 *
 * @returns
 */
function useThemeSettings() {
    const { settings } = (0,external_react_.useContext)(ThemeSettingsProvider/* ThemeSettingsContext */.e);
    return settings;
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/provider/useThemeSetting.js

const get = (obj, path, defaultValue = undefined) => {
    const travel = (regexp) => String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
};
/**
 * Returns a single theme setting normalized
 *
 * @param path - The path to the setting
 * @param blockName - The block name
 * @returns
 */
function useThemeSetting(path, blockName = '', defaultValue = '') {
    const settings = useThemeSettings();
    if (blockName && get(settings, `blocks.${blockName}.${path}`)) {
        return get(settings, `blocks.${blockName}.${path}`);
    }
    return get(settings, path, defaultValue);
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlockColors.js



/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
function useBlockColors(node) {
    const { name, attributes } = (0,useBlock/* useBlock */.r)(node);
    const defaultColorsSettings = useThemeSetting('color.palette.default', null, []);
    const defaultGradientsSettings = useThemeSetting('color.palette.default', null, []);
    const colorsSettings = useThemeSetting('color.palette', name, []);
    const grandientsSettings = useThemeSetting('color.gradients', name, []);
    const colors = Array.isArray(colorsSettings) ? colorsSettings : colorsSettings?.theme;
    const gradients = Array.isArray(grandientsSettings)
        ? grandientsSettings
        : grandientsSettings?.theme;
    const allGradients = [...defaultGradientsSettings, ...gradients];
    const allColors = [...defaultColorsSettings, ...colors];
    const color = {
        backgroundColorSlug: '',
        backgroundColor: '',
        textColorSlug: '',
        textColor: '',
        gradientSlug: '',
        gradient: '',
        linkColorSlug: '',
        linkColor: '',
    };
    let foundInAttributes = false;
    if (attributes.backgroundColor) {
        foundInAttributes = true;
        color.backgroundColorSlug = attributes.backgroundColor;
        color.backgroundColor = allColors.find((c) => c.slug === attributes.backgroundColor)?.color;
    }
    if (attributes.textColor) {
        foundInAttributes = true;
        color.textColorSlug = attributes.textColor;
        color.textColor = allColors.find((c) => c.slug === attributes.textColor)?.color;
    }
    if (attributes.gradient) {
        foundInAttributes = true;
        color.gradientSlug = attributes.gradient;
        color.gradient = allGradients.find((c) => c.slug === attributes.gradient)?.gradient;
    }
    if (attributes?.style?.elements?.link?.color?.text) {
        foundInAttributes = true;
        color.linkColorSlug =
            attributes?.style?.elements?.link?.color?.text?.split('|').pop() || '';
        color.linkColor = allColors.find((c) => c.slug === color.linkColorSlug)?.color;
    }
    if (!foundInAttributes) {
        return getColorStyles(node);
    }
    return color;
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/provider/useThemeStyles.js


/**
 * Returns the theme.json styles definitions
 *
 * @returns
 */
function useThemeStyles() {
    const { styles } = (0,external_react_.useContext)(ThemeSettingsProvider/* ThemeSettingsContext */.e);
    return styles;
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlockSpacing.js


/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
function useBlockSpacing(node) {
    const { name, attributes } = (0,useBlock/* useBlock */.r)(node);
    const supportsBlockGap = !!useThemeSetting('spacing.blockGap', name);
    const supportsMargin = !!useThemeSetting('spacing.margin', name);
    const supportsPadding = !!useThemeSetting('spacing.padding', name);
    const styles = useThemeStyles();
    return {
        padding: attributes?.style?.spacing?.padding,
        margin: attributes?.style?.spacing?.margin,
        supportsMargin,
        supportsPadding,
        supportsBlockGap,
        blockGap: supportsBlockGap && styles?.spacing?.blockGap ? styles?.spacing?.blockGap : '',
    };
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlockStyle.js

/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
function useBlockStyle(node) {
    return getBlockStyle(node);
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlockTypography.js


/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
function useBlockTypography(node) {
    const { name, attributes } = (0,useBlock/* useBlock */.r)(node);
    const defaultfFontSizesSettings = useThemeSetting('typography.fontSizes.default', null, []);
    const fontSizesSettings = useThemeSetting('typography.fontSizes', name, []);
    const supportsCustomFontSize = !!useThemeSetting('typography.customFontSize', name);
    const supportsFontStyle = !!useThemeSetting('typography.fontStyle', name);
    const supportsFontWeight = !!useThemeSetting('typography.fontWeight', name);
    const supportsLetterSpacing = !!useThemeSetting('typography.letterSpacing', name);
    const supportsLineHight = !!useThemeSetting('typography.lineHeight', name);
    const supportsTextDecoration = !!useThemeSetting('typography.textDecoration', name);
    const supportsTextTransform = !!useThemeSetting('typography.textTransform', name);
    // either use the block settings or try the theme or default one
    const fontSizes = Array.isArray(fontSizesSettings)
        ? fontSizesSettings
        : fontSizesSettings?.theme;
    const allFontSizes = [...defaultfFontSizesSettings, ...fontSizes];
    const fontSizePreset = attributes?.fontSize;
    if (fontSizePreset) {
        return {
            fontSize: {
                slug: fontSizePreset || '',
                value: allFontSizes.find((f) => f.slug === fontSizePreset)?.size ||
                    attributes?.style?.typography,
            },
            supportsFontStyle,
            supportsCustomFontSize,
            supportsFontWeight,
            supportsLetterSpacing,
            supportsLineHight,
            supportsTextDecoration,
            supportsTextTransform,
            lineHeight: attributes?.style?.typography?.lineHeight,
            textTransform: attributes?.style?.typography?.textTransform,
            letterSpacing: attributes?.style?.typography?.letterSpacing,
        };
    }
    return {
        fontSize: {
            slug: '',
            value: '',
        },
        supportsFontStyle,
        supportsCustomFontSize,
        supportsFontWeight,
        supportsLetterSpacing,
        supportsLineHight,
        supportsTextDecoration,
        supportsTextTransform,
        lineHeight: '',
        textTransform: '',
        letterSpacing: '',
    };
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlockWidth.js


/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
function useBlockWidth(node) {
    const { attributes } = (0,useBlock/* useBlock */.r)(node);
    if (attributes.width) {
        return attributes.width;
    }
    return getWidthStyles(node);
}

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/react/blocks/hooks/useBlockAttributes.js







/**
 * useBlockAttributes hooks returns the block attributes for a given block based on what it supports
 *
 * @param node The reference to the dom node of the block
 *
 *
 * @returns
 */
function useBlockAttributes(node) {
    const align = useBlockAlign(node);
    const blockStyle = useBlockStyle(node);
    const border = useBlockBorder(node);
    const colors = useBlockColors(node);
    const typography = useBlockTypography(node);
    const width = useBlockWidth(node);
    const spacing = useBlockSpacing(node);
    return {
        align,
        blockStyle,
        border,
        colors,
        typography,
        width,
        spacing,
    };
}


/***/ }),

/***/ 4898:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ BlocksRenderer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2905);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1503);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7312);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([html_react_parser__WEBPACK_IMPORTED_MODULE_1__, _dom__WEBPACK_IMPORTED_MODULE_3__]);
([html_react_parser__WEBPACK_IMPORTED_MODULE_1__, _dom__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const shouldReplaceWithBlock = (block, domNode) => {
    if (!(0,react__WEBPACK_IMPORTED_MODULE_2__.isValidElement)(block)) {
        return false;
    }
    const { test: testFn, tagName, classList } = block.props;
    const hasTestFunction = typeof testFn === 'function';
    if (hasTestFunction) {
        return testFn(domNode);
    }
    if (typeof tagName === 'string' && typeof classList !== 'undefined') {
        return (0,_dom__WEBPACK_IMPORTED_MODULE_3__/* .isBlock */ .Lq)(domNode, { tagName, className: classList });
    }
    return false;
};
/**
 * The `BlocksRenderer` components provides an easy way to convert HTML markup into corresponding
 * React components.
 *
 * The `BlocksRenderer` component takes in arbitrary html markup and receives a list of react components
 * as children that allows replacing dom nodes with React Components.
 *
 * The html prop is sanitized through [[wpKsesPost]] so it's safe for rendering arbitrary html markup.
 *
 * The children components must implement the [[BlockProps]] interface
 *
 * ## Usage
 *
 * ### Usage with the test function
 *
 * {@codeblock ~~/examples/core/BlocksRenderer.tsx#test-function}
 *
 * ### Usage with classList and tagName props
 *
 * {@codeblock ~~/examples/core/BlocksRenderer.tsx#props}
 *
 * @param props Component properties
 *
 * @category React Components
 */
function BlocksRenderer({ html, ksesAllowList, children }) {
    const blocks = react__WEBPACK_IMPORTED_MODULE_2___default().Children.toArray(children);
    // Check if components[] has a non-ReactNode type Element
    // const hasInvalidComponent: boolean = blocks.findIndex((block) => !isValidElement(block)) !== -1;
    const hasInvalidComponent = blocks.findIndex((block) => {
        if (!(0,react__WEBPACK_IMPORTED_MODULE_2__.isValidElement)(block)) {
            return true;
        }
        const { test: testFn, tagName, classList } = block.props;
        const hasTestFunction = typeof testFn === 'function';
        // if has a test function component is not invaldi
        if (hasTestFunction) {
            return false;
        }
        // if does not have a test function it must have tagName and classList
        // if it does then it is not invalid
        if (typeof tagName !== 'undefined' && typeof classList !== 'undefined') {
            return false;
        }
        // otherwise it is invalid
        return true;
    }) !== -1;
    if (hasInvalidComponent) {
        console.warn('Children of <BlocksRenderer /> component should be a type of ReactNode<BlockProps>');
    }
    const cleanedHTML = (0,_dom__WEBPACK_IMPORTED_MODULE_4__/* .wpKsesPost */ .l)(html, ksesAllowList);
    const options = {
        replace: (domNode) => {
            let component = null;
            blocks.forEach((block) => {
                if ((0,react__WEBPACK_IMPORTED_MODULE_2__.isValidElement)(block) &&
                    shouldReplaceWithBlock(block, domNode)) {
                    component = react__WEBPACK_IMPORTED_MODULE_2___default().createElement(block.type, {
                        ...block.props,
                        domNode,
                    }, domNode instanceof html_react_parser__WEBPACK_IMPORTED_MODULE_1__.Element
                        ? (0,html_react_parser__WEBPACK_IMPORTED_MODULE_1__.domToReact)(domNode.children, {
                            // eslint-disable-next-line react/no-unstable-nested-components
                            replace: (childNode) => {
                                if (typeof options.replace !== 'function') {
                                    return undefined;
                                }
                                if (typeof block.props.exclude === 'function' &&
                                    block.props.exclude(childNode)) {
                                    // eslint-disable-next-line react/jsx-no-useless-fragment
                                    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
                                }
                                return options.replace(childNode);
                            },
                        })
                        : null);
                }
            });
            return component;
        },
    };
    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: (0,html_react_parser__WEBPACK_IMPORTED_MODULE_1__["default"])(cleanedHTML, options) });
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (BlocksRenderer) {
    BlocksRenderer.defaultProps = {
        ksesAllowList: undefined,
    };
})(BlocksRenderer || (BlocksRenderer = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2617:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "F": () => (/* binding */ isInternalLink)
});

;// CONCATENATED MODULE: ../../packages/core/dist/mjs/utils/isExternalUrl.js
/**
 * Checks if the provided link is an external Url.
 *
 * Inspired on the Frontity implementation
 *
 * @param link The link Url.
 *
 * @see https://github.com/frontity/frontity/blob/dev/packages/components/link/utils.ts
 *
 * @returns True if the link is an external Url.
 */
function isExternalUrl(link) {
    try {
        new URL(link); // eslint-disable-line no-new
        return true;
    }
    catch (e) {
        return false;
    }
}

// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/getHeadlessConfig.js
var getHeadlessConfig = __webpack_require__(5300);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/removeSourceUrl.js
var removeSourceUrl = __webpack_require__(5442);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/utils/isInternalLink.js



/**
 * Checks if the url is for an internal link
 *
 * @param url The url to check
 *
 * @returns
 */
function isInternalLink(url) {
    const link = (0,removeSourceUrl/* removeSourceUrl */.V)({ link: url, backendUrl: (0,getHeadlessConfig/* getWPUrl */.Bw)() });
    if (isExternalUrl(link)) {
        return false;
    }
    return true;
}


/***/ })

};
;