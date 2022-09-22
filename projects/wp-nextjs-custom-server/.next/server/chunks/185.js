"use strict";
exports.id = 185;
exports.ids = [185];
exports.modules = {

/***/ 4030:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ usePost)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3702);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(754);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__, _utils__WEBPACK_IMPORTED_MODULE_2__]);
([_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__, _utils__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



/**
 * The usePost hook. Returns a single post entity
 *
 * ## Usage
 *
 * ### Fetching a post by slug
 * {@codeblock ~~/examples/next/usePost.tsx#post-by-slug}
 *
 * ### Fetching a page by slug
 * {@codeblock ~~/examples/next/usePost.tsx#page-by-slug}
 *
 * ### Fetching a post or page by slug
 * {@codeblock ~~/examples/next/usePost.tsx#post-page-by-slug}
 *
 * ### Custom Post Type
 * {@codeblock ~~/examples/next/usePost.tsx#cpt}
 *
 * ### Automatically mapping URL params in Next.js
 * In order to automatically map URL params create a catch-all route named `[...path].js`.
 * You can create the catch-all at any level e.g: `pages/[...path].js`, `pages/blog/[...path].js`, etc.
 *
 * The `pages/[...path].js` route for instance would yield a URL like this: `/post-slug`, `/2020/01/01/post-slug`, etc.
 *
 * {@codeblock ~~/examples/next/usePost.tsx#url-params}
 *
 * ### Server-Side-Rendering or Static-Site-Generation
 * {@codeblock ~~/examples/next/usePost.tsx#ssr-ssg}
 *
 * @param params The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
function usePost(params = {}, options = {}) {
    const { query } = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
    const path = Array.isArray(query.path) ? query.path : [query.path || ''];
    return (0,_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__/* .useFetchPost */ .K)(params, options, (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .convertToPath */ .YR)(path));
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (usePost) {
    usePost.fetcher = _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__/* .useFetchPost.fetcher */ .K.fetcher;
})(usePost || (usePost = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6996:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ usePosts)
/* harmony export */ });
/* harmony import */ var _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1708);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(754);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__, _utils__WEBPACK_IMPORTED_MODULE_2__]);
([_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__, _utils__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



/**
 * The usePost hook. Returns a collection of post entities
 *
 * ## Usage
 *
 * ### Fetching a list of posts
 * {@codeblock ~~/examples/next/usePosts.tsx#list-of-post}
 *
 * ### Fetching a list of pages
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#list-of-pages}
 *
 * ### Fetching a list of posts from a custom post type
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#cpt}
 *
 * ### Automatically mapping URL params in Next.js
 * In order to automatically map URL params create a catch-all route named `[[...path]].js`.
 * You can create the catch-all at any level e.g: `pages/[[...path]].js`, `pages/blog/[[...path]].js`, etc.
 *
 * The `pages/blog/[[...path]].js` route for instance would yield a URL like this: `/blog`, `/blog/page/2`, `/blog/category/category-name/page/3`, etc.
 *
 * The following URL params are supported:
 * - Category (/category/category-name)
 * - Tag (/tag/tag-name)
 * - Author (/author/author-name)
 * - Pagination (/page/2)
 * - Date (/YYYY/MM/DD)
 * - Custom Taxonomy (/taxonomy/term-name)
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#url-params}
 *
 * ### Handling multiple WordPress routes in a single next.js route
 *
 * The `usePosts` hook is very flexible and can handle multiple WordPress routes in a single next.js route when using the optional-catch-all route (`[[...path]].js`).
 * Alongisde with the actual data, `usePosts` also returns information about the current route so you can conditionally load different components.
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#multiple-wordpress-routes}
 *
 *
 * ### Taxonomy Archive Pages
 *
 * If you want to create specific routes for taxonomy archive pages,
 * you can use the `taxonomy` param to specify the taxonomy slug. When doing so, the term slug will be
 * extracted from the URL.
 *
 * *Important*: When creating taxonomy archive routes, you should not use the optional catch-all ([[...path]].js) route, instead use the
 * catch-all ([...path].js) route as the term name in the URL is required for your route.
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#taxonomy-page}
 *
 *
 * ### Author Archive Pages
 *
 * IF you want to create specific routes for author archive pages (such as `pages/author/[...path.js]) use the {@link useAuthorArchive} hook.
 *
 * If you're you are not using the built-in WordPress authors for your author archives pages check the section "Taxonomy Archive Pages"
 *
 * ### Server-Side-Rendering or Static-Site-Generation
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#ssr-ssg}
 *
 * @param params  The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
function usePosts(params = {}, options = {}) {
    const { query } = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
    const path = Array.isArray(query.path) ? query.path : [query.path || ''];
    return (0,_10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__/* .useFetchPosts */ .b)(params, options, (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .convertToPath */ .YR)(path));
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (usePosts) {
    usePosts.fetcher = _10up_headless_core_react__WEBPACK_IMPORTED_MODULE_1__/* .useFetchPosts.fetcher */ .b.fetcher;
})(usePosts || (usePosts = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8313:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ PageContent)
/* harmony export */ });
/* harmony import */ var _10up_headless_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4030);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5237);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__]);
_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const Blocks = next_dynamic__WEBPACK_IMPORTED_MODULE_0___default()(() => Promise.all(/* import() */[__webpack_require__.e(108), __webpack_require__.e(341), __webpack_require__.e(358), __webpack_require__.e(900), __webpack_require__.e(447)]).then(__webpack_require__.bind(__webpack_require__, 6447)), {
  loadableGenerated: {
    modules: ["../components/PageContent.js -> " + './Blocks']
  }
});
/**
 * This is an example of how an inner componnet can access the data without explicity passing the data to it.
 * This reduces prop drilling but creates an implicit dependecy with its parent. Use this strategy with caution and on components that are tied to a particular route.
 *
 * @param {*} props Props object
 *
 * @returns
 */

const PageContent = ({
  params
}) => {
  // This won't require a refetch as long as the data has already been fetched at the page level.
  // additionally, if the request has not been SSR'd, it will be fetched on the client only once, regardless of how many call to usePost (with the same params) you make
  const {
    data
  } = (0,_10up_headless_next__WEBPACK_IMPORTED_MODULE_2__/* .usePost */ .u)(params);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("h1", {
      children: data.post.title.rendered
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(Blocks, {
      html: data.post.content.rendered
    })]
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 892:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Or": () => (/* binding */ singleParams),
/* harmony export */   "ji": () => (/* binding */ indexParams)
/* harmony export */ });
/* unused harmony exports searchParams, blogParams, bookParams, booksParams, indexTermsParams */
/**
 * @type {import('@10up/headless-core').PostParams}
 */
const singleParams = {
  postType: ['page', 'post']
};
/**
 * @type {import('@10up/headless-core').PostParams}
 */

const indexParams = {
  postType: ['page']
};
/**
 * @type {import('@10up/headless-core').PostsArchiveParams}
 */

const searchParams = {
  postType: 'post'
};
/**
 * @type {import('@10up/headless-core').PostsArchiveParams}
 */

const blogParams = {
  postType: 'post',

  /**
   * Specyfing the _fields param reduces the amount of data queried and returned by the API.
   */
  _fields: ['id', 'title', 'link']
}; // The params below are just for the custom post type routes example
// remove them if you don't need them

/**
 * @type {import('@10up/headless-core').PostParams}
 */

const bookParams = {
  postType: ['book']
};
/**
 * @type {import('@10up/headless-core').PostsArchiveParams}
 */

const booksParams = {
  postType: 'book'
};
/**
 * @type {import('@10up/headless-core').TaxonomyArchiveParams}
 */

const indexTermsParams = {
  order: 'asc',
  orderby: 'count'
};

/***/ }),

/***/ 355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "w": () => (/* binding */ PostsArchiveFetchStrategy)
});

// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/getHeadlessConfig.js
var getHeadlessConfig = __webpack_require__(5300);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/errors.js
var errors = __webpack_require__(6778);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/utils/asyncForEach.js
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        // eslint-disable-next-line no-await-in-loop
        await callback(array[index], index, array);
    }
}

// EXTERNAL MODULE: ../../packages/core/dist/mjs/utils/url.js
var utils_url = __webpack_require__(9682);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/data/utils/endpoints.js
var endpoints = __webpack_require__(9047);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/data/api/fetch-utils.js
var fetch_utils = __webpack_require__(3391);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/data/utils/matchers.js
var utils_matchers = __webpack_require__(6269);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/data/utils/parsePath.js
var parsePath = __webpack_require__(4937);
// EXTERNAL MODULE: ../../packages/core/dist/mjs/data/strategies/AbstractFetchStrategy.js
var AbstractFetchStrategy = __webpack_require__(8804);
;// CONCATENATED MODULE: ../../packages/core/dist/mjs/data/strategies/PostsArchiveFetchStrategy.js






const authorsEndpoint = '/wp-json/wp/v2/users';
/**
 * The PostsArchiveFetchStrategy is used to fetch a collection of posts from any post type.
 * Note that custom post types and custom taxonomies should be defined in `headless.config.js`
 *
 * This strategy supports extracting endpoint params from url E.g:
 * - `/category/cat-name/page/2` maps to `{ category: 'cat-name', page: 2 }`
 * - `/page/2/` maps to `{ page: 2 }`
 * - `/genre/genre-name/page/2` maps to `{ genre: 'genre-name', page: 2 }` if a `genre` taxonomy is defined in `headless.config.js`
 *
 * @see [[getParamsFromURL]] to learn about url param mapping
 *
 * @category Data Fetching
 */
class PostsArchiveFetchStrategy extends AbstractFetchStrategy/* AbstractFetchStrategy */.L {
    getDefaultEndpoint() {
        return endpoints/* endpoints.posts */.H.posts;
    }
    /**
     * This strategy automatically extracts taxonomy filters, date filters and paginations params from the URL
     *
     * It also takes into account the custom taxonomies specified in `headless.config.js`
     *
     * @param path The URL path to extract params from
     */
    getParamsFromURL(path, params = {}) {
        const matchers = [...utils_matchers/* postsMatchers */.Lh];
        if (typeof params.taxonomy === 'string') {
            const taxonomyObj = (0,getHeadlessConfig/* getCustomTaxonomy */.MB)(params.taxonomy);
            if (!taxonomyObj) {
                throw new errors/* ConfigError */.x1(`Taxonomy "${params.taxonomy}" not found`);
            }
            const taxonomy = taxonomyObj.rewrite ?? taxonomyObj.slug;
            const taxonomyMatchers = matchers.map((matcher) => ({
                ...matcher,
                name: `${matcher.name}-taxonomy`,
                pattern: `/:${taxonomy}${matcher.pattern}`,
            }));
            taxonomyMatchers.push({
                name: 'taxonomy-term-slug',
                priority: 30,
                pattern: `/:${taxonomy}`,
            });
            return (0,parsePath/* parsePath */.c)(taxonomyMatchers, path);
        }
        const customTaxonomies = (0,getHeadlessConfig/* getCustomTaxonomies */.Jh)();
        customTaxonomies?.forEach((taxonomy) => {
            const slug = taxonomy?.rewrite ?? taxonomy.slug;
            matchers.push({
                name: taxonomy.slug,
                priority: 30,
                pattern: `/${slug}/:${slug}`,
            });
            matchers.push({
                name: `${taxonomy.slug}-with-pagination`,
                priority: 30,
                pattern: `/${slug}/:${slug}/page/:page`,
            });
        });
        return (0,parsePath/* parsePath */.c)(matchers, path);
    }
    /**
     * Handles taxonomy filters and switch endpoint based on post type
     *
     * @param params The params to build the endpoint with
     */
    buildEndpointURL(params) {
        const settings = (0,getHeadlessConfig/* getHeadlessConfig */.fI)();
        // these params should be disregarded whne building out the endpoint
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { category, tag, postType, taxonomy, ...endpointParams } = params;
        const taxonomies = (0,getHeadlessConfig/* getCustomTaxonomies */.Jh)();
        taxonomies.forEach((taxonomy) => {
            const slug = taxonomy.rewrite ?? taxonomy.slug;
            if (endpointParams[slug]) {
                delete endpointParams[slug];
            }
        });
        if (params.postType) {
            const postType = (0,getHeadlessConfig/* getCustomPostType */.KS)(params.postType);
            if (!postType) {
                throw new errors/* ConfigError */.x1('Unkown post type, did you forget to add it to headless.config.js?');
            }
            this.setEndpoint(postType.endpoint);
        }
        // if an author slug was passed
        // and we're not using the WordPress plugin
        // we don't want to include it in the endpoint as is as we need to fetch the author id first.
        if (params.author && typeof params.author === 'string' && !settings.useWordPressPlugin) {
            delete endpointParams.author;
        }
        return super.buildEndpointURL(endpointParams);
    }
    /**
     * Before fetching posts, we need handle taxonomy and authors.
     *
     * If the headless plugin is not being used, then additioinal requests needs to be made to get
     * authors and terms ids
     *
     * @param url The URL to parse
     * @param params The params to build the endpoint with
     * @param options FetchOptions
     */
    async fetcher(url, params, options = {}) {
        let finalUrl = url;
        const settings = (0,getHeadlessConfig/* getHeadlessConfig */.fI)();
        const customTaxonomies = (0,getHeadlessConfig/* getCustomTaxonomies */.Jh)();
        if (customTaxonomies) {
            await asyncForEach(customTaxonomies, async (taxonomy) => {
                const paramSlug = taxonomy?.rewrite ?? taxonomy.slug;
                const restParam = taxonomy?.restParam ?? taxonomy.slug;
                if (!params[paramSlug]) {
                    return;
                }
                if (settings.useWordPressPlugin) {
                    // WordPress plugin extends the REST API to accept a category slug instead of just an id
                    finalUrl = (0,utils_url/* addQueryArgs */.f_)(finalUrl, { [restParam]: params[paramSlug] });
                }
                else {
                    const terms = await (0,fetch_utils/* apiGet */.R1)(`${this.baseURL}${taxonomy.endpoint}?slug=${params[paramSlug]}`);
                    if (terms.json.length > 0) {
                        finalUrl = (0,utils_url/* addQueryArgs */.f_)(finalUrl, {
                            [restParam]: terms.json[0].id,
                        });
                    }
                    else {
                        throw new errors/* NotFoundError */.dR(`Term "${params[paramSlug]}" from "${taxonomy.slug}" has not been found`);
                    }
                }
            });
        }
        // check if we need to fetch author id
        // we need to fetch author id if
        // 1 - params.author is a string
        // 2 - We're not using the WP Plugin
        if (params.author && typeof params.author === 'string' && !settings.useWordPressPlugin) {
            const authors = await (0,fetch_utils/* apiGet */.R1)(`${this.baseURL}${authorsEndpoint}?slug=${params.author}`);
            if (authors.json.length > 0) {
                finalUrl = (0,utils_url/* addQueryArgs */.f_)(finalUrl, {
                    author: authors.json[0].id,
                });
            }
            else {
                throw new errors/* NotFoundError */.dR(`Author "${params.author}" not found`);
            }
        }
        return super.fetcher(finalUrl, params, options);
    }
}


/***/ }),

/***/ 4880:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ SinglePostFetchStrategy)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5300);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6778);
/* harmony import */ var _utils_matchers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6269);
/* harmony import */ var _utils_parsePath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4937);
/* harmony import */ var _AbstractFetchStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8804);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9047);





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
class SinglePostFetchStrategy extends _AbstractFetchStrategy__WEBPACK_IMPORTED_MODULE_0__/* .AbstractFetchStrategy */ .L {
    getDefaultEndpoint() {
        return _utils__WEBPACK_IMPORTED_MODULE_1__/* .endpoints.posts */ .H.posts;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getParamsFromURL(path, nonUrlParams = {}) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { year, day, month, ...params } = (0,_utils_parsePath__WEBPACK_IMPORTED_MODULE_2__/* .parsePath */ .c)(_utils_matchers__WEBPACK_IMPORTED_MODULE_3__/* .postMatchers */ .vq, path);
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
            const postType = (0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .getCustomPostType */ .KS)(postTypeSlug);
            if (!postType) {
                throw new _utils__WEBPACK_IMPORTED_MODULE_5__/* .ConfigError */ .x1('Unkown post type, did you forget to add it to headless.config.js?');
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


/***/ }),

/***/ 6269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lh": () => (/* binding */ postsMatchers),
/* harmony export */   "vq": () => (/* binding */ postMatchers)
/* harmony export */ });
/* unused harmony exports authorArchivesMatchers, searchMatchers */
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


/***/ }),

/***/ 4937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ parsePath)
/* harmony export */ });
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99);
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_0__);

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
            : (0,path_to_regexp__WEBPACK_IMPORTED_MODULE_0__.pathToRegexp)(pattern, keys);
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


/***/ }),

/***/ 9631:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ getPostTerms),
/* harmony export */   "V": () => (/* binding */ getPostAuthor)
/* harmony export */ });
/**
 * Returns the author object from the post object if it exists
 *
 * @param post The Post object
 *
 * @category Data Handling
 */
function getPostAuthor(post) {
    return post?._embedded?.author;
}
/**
 * Returns the terms assoiacted with the post
 *
 * @param post The Post object
 *
 * @category Data Handling
 */
function getPostTerms(post) {
    const terms = {};
    if (typeof post?._embedded === 'undefined' ||
        typeof post._embedded['wp:term'] === 'undefined') {
        return terms;
    }
    post._embedded['wp:term'].forEach((taxonomy) => {
        taxonomy.forEach((term) => {
            const taxonomySlug = term.taxonomy;
            if (typeof terms[taxonomySlug] === 'undefined') {
                terms[taxonomySlug] = [];
            }
            terms[taxonomySlug].push(term);
        });
    });
    return terms;
}


/***/ }),

/***/ 3702:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ useFetchPost)
/* harmony export */ });
/* harmony import */ var _useFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6699);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9631);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4880);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5300);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6371);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useFetch__WEBPACK_IMPORTED_MODULE_0__]);
_useFetch__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/**
 * The useFetchPost hook. Returns a single post entity
 *
 * See {@link usePost} for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @module useFetchPost
 * @category Data Fetching Hooks
 */
function useFetchPost(params, options = {}, path = '') {
    const { data, error } = (0,_useFetch__WEBPACK_IMPORTED_MODULE_0__/* .useFetch */ .i)({ _embed: true, ...params }, useFetchPost.fetcher(), options, path);
    if (error || !data) {
        const fakeData = { post: (0,_util__WEBPACK_IMPORTED_MODULE_1__/* .makeErrorCatchProxy */ .q)('post') };
        return { error, loading: !data, data: fakeData };
    }
    // TODO: fix types
    const post = Array.isArray(data.result) ? data.result[0] : data.result;
    post.author = (0,_data__WEBPACK_IMPORTED_MODULE_2__/* .getPostAuthor */ .V)(post);
    post.terms = (0,_data__WEBPACK_IMPORTED_MODULE_2__/* .getPostTerms */ .A)(post);
    return { data: { post }, loading: false };
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (useFetchPost) {
    useFetchPost.fetcher = () => new _data__WEBPACK_IMPORTED_MODULE_3__/* .SinglePostFetchStrategy */ .a((0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .getWPUrl */ .Bw)());
})(useFetchPost || (useFetchPost = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1708:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ useFetchPosts)
/* harmony export */ });
/* harmony import */ var _useFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6699);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9631);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(355);
/* harmony import */ var _utils_getHeadlessConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5300);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6371);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useFetch__WEBPACK_IMPORTED_MODULE_0__]);
_useFetch__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





/**
 * The useFetchPosts hook. Returns a collection of post entities
 *
 * See {@link usePosts} for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 * @param fetcher The fetch strategy to use. If none is passed, the default one is used
 *
 * @category Data Fetching Hooks
 */
function useFetchPosts(params, options = {}, path = '', fetcher = undefined) {
    const { data, error, params: queryParams, } = (0,_useFetch__WEBPACK_IMPORTED_MODULE_0__/* .useFetch */ .i)({ _embed: true, ...params }, fetcher ?? useFetchPosts.fetcher(), options, path);
    const pageType = {
        isPostArchive: false,
        isSearch: false,
        isAuthorArchive: false,
        isPostTypeArchive: false,
        postType: '',
        isCategoryArchive: false,
        isTagArchive: false,
        isTaxonomyArchive: false,
        taxonomy: '',
    };
    const queriedObject = { author: undefined, term: undefined };
    if (queryParams.author) {
        pageType.isPostArchive = true;
        pageType.isAuthorArchive = true;
    }
    if (queryParams.category) {
        pageType.isPostArchive = true;
        pageType.isCategoryArchive = true;
    }
    if (queryParams.tag) {
        pageType.isPostArchive = true;
        pageType.isTagArchive = true;
    }
    if (queryParams.postType) {
        pageType.isPostArchive = false;
        pageType.isPostTypeArchive = true;
        pageType.postType = queryParams.postType;
    }
    else {
        pageType.isPostArchive = true;
    }
    const taxonomies = (0,_utils_getHeadlessConfig__WEBPACK_IMPORTED_MODULE_1__/* .getCustomTaxonomies */ .Jh)();
    taxonomies.forEach((taxonomy) => {
        const { slug } = taxonomy;
        if (queryParams[slug]) {
            pageType.isTaxonomyArchive = true;
            pageType.taxonomy = slug;
        }
    });
    if (error || !data) {
        const fakeData = {
            posts: (0,_util__WEBPACK_IMPORTED_MODULE_2__/* .makeErrorCatchProxy */ .q)('posts'),
            pageInfo: (0,_util__WEBPACK_IMPORTED_MODULE_2__/* .makeErrorCatchProxy */ .q)('pageInfo'),
            queriedObject: (0,_util__WEBPACK_IMPORTED_MODULE_2__/* .makeErrorCatchProxy */ .q)('queriedObject'),
        };
        return { error, loading: !data, pageType, data: fakeData };
    }
    const { result, pageInfo } = data;
    // TODO: fix types
    const posts = result.map((post) => {
        post.author = (0,_data__WEBPACK_IMPORTED_MODULE_3__/* .getPostAuthor */ .V)(post);
        post.terms = (0,_data__WEBPACK_IMPORTED_MODULE_3__/* .getPostTerms */ .A)(post);
        return post;
    });
    if (queryParams.author && posts[0].author) {
        queriedObject.author = posts[0].author[0];
    }
    if (queryParams.category && posts[0].terms?.category) {
        queriedObject.term = posts[0].terms?.category[0];
    }
    if (queryParams.tag && posts[0].terms?.post_tag) {
        queriedObject.term = posts[0].terms?.post_tag[0];
    }
    taxonomies.forEach((taxonomy) => {
        const { slug } = taxonomy;
        if (queryParams[slug] && posts[0]?.terms?.[slug]) {
            queriedObject.term = posts[0]?.terms?.[slug][0];
        }
    });
    return { data: { posts, pageInfo, queriedObject }, loading: false, pageType };
}
/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
(function (useFetchPosts) {
    useFetchPosts.fetcher = () => new _data__WEBPACK_IMPORTED_MODULE_4__/* .PostsArchiveFetchStrategy */ .w((0,_utils_getHeadlessConfig__WEBPACK_IMPORTED_MODULE_1__/* .getWPUrl */ .Bw)());
})(useFetchPosts || (useFetchPosts = {}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;