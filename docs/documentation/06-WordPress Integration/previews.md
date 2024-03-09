---
sidebar_position: 0
slug: /wordpress-integration/previews
---

# Previews

The preview feature requires the HeadstartWP plugin installed. The preview functionality is built on top of [Next.js preview API](https://nextjs.org/docs/advanced-features/preview-mode). It uses a short-lived JWT token generated on the WordPress side that can only be used for previewing, this means it is not necessary to set up a hardcoded secret between WP and Next.js.

For previews to work, make sure the frontend URL is entered in WP settings as per instructions in [Installing WordPress Plugin](/learn/getting-started/installing-wordpress-plugin).

The logic for generating the JWT token and redirecting it to the preview endpoint can be seen [here](https://github.com/10up/headstartwp/blob/develop/wp/headless-wp/includes/classes/Preview/preview.php).
```php
$token = PreviewToken::generate(
	[
		'type'      => 'preview',
		'post_type' => $post_type,
		'post_id'   => $post_id,
	]
);

$preview_url = sprintf(
	'%sapi/preview?post_id=%d&post_type=%s&is_revision=%s&token=%s',
	trailingslashit( Plugin::get_react_url() ),
	$post_id,
	$post_type,
	$is_revision ? '1' : '0',
	$token
);

wp_redirect( $preview_url );
die();
```
Below is a summary of the preview workflow.

- First a token of type `preview` is generated
- The token encodes the post type and post id.
- A preview URL is generated assuming the preview endpoint lives at `/api/preview`
- WordPress redirects to the preview endpoint
- The token is sent alongside the post_type, post_id and a boolean indicating whether the post being previewed is a revision or not. 
- The token is verified against the parameters and the token is used to fetch the post's draft/revision content.

## Usage

The Next.js project **must** expose an `api/preview` endpoint that uses the [previewHandler](/api/modules/headstartwp_next/#previewhandler).

```javascript
//src/pages/api/preview.js
import { previewHandler } from '@headstartwp/next';

/**
 * The Preview endpoint just needs to proxy the default preview handler
 *
 * @param {*} req Next.js request object
 * @param {*} res  Next.js response object
 *
 * @returns
 */
export default async function handler(req, res) {
	return previewHandler(req, res);
}
```

That's all that is needed to enable WordPress preview.

While previewing the URL will not reflect the actual URL of the post, but instead, it will contain the post id and a `-preview` suffix.

### `previewHandler` options

#### `preparePreviewData`

This allows you to alter the preview data object before it is stored by Next.js (i.e before calling `res.setPreviewData`). You can use this if you need to add additional fields to preview data object.

```ts
export default async function handler(req, res) {
	return previewHandler(req, res, {
		preparePreviewData(req, res, post, previewData) {
			return { ...previewData, name: post.name };
		},
	});
}
```

`name` would now be available in the context object of `getServerSideProps` and `getStaticProps` (`ctx.previewData`);

#### `getRedirectPath`

:::info
This option was added in `@headstartwp/next@1.1.0`.
:::info

:::tip
A better alternative is using `preview.usePostLinkForRedirect`. With this setting, you can set up previews so that it uses the `post.link` property of the post for redirecting to the appropriate path/route. This requires that your WordPress permalink matches the Next.js route structure. Check out the docs for [preview.usePostLinkForRedirect](/learn/wordpress-integration/previews#the-usepostlinkforredirect-setting).
:::tip

The `getRedirectPath` option allows you to customize the redirected URL that should handle the preview request. This can be useful if you have implemented a non-standard URL structure. For instance, if the permalink for your posts is `/%category%/%postname%/` you could create a `/src/pages/[category]/[...path.js]` route to handle single post. However, once you do that the `previewHandler` doesn't know how to redirect to that URL and as such you will have to provide your own redirect handling.

The framework will also use this value to restrict the preview cookie to the post being previewed to avoid bypassing `getStaticProps` until the cookie expires or the browser is closed. See the [Next.js docs](https://nextjs.org/docs/pages/building-your-application/configuring/preview-mode#specify-the-preview-mode-duration) for more info.

```ts
import { getPostTerms } from '@headstartwp/core';
import { previewHandler } from '@headstartwp/next';

export default async function handler(req, res) {
	return previewHandler(req, res, {
		getRedirectPath(defaultRedirectPath, post) {
			const { type, id, slug } = post;

			if (type === 'post') {
				const terms = getPostTerms(post);
				
				if (Array.isArray(terms?.category) && terms.category.length > 0) {
					const [category] = terms.category;

					return `/${categorySlug}/${id}/${slug || id}`;
				}
			}

			return defaultRedirectPath
		},
	});
}
```

#### `onRedirect`

:::tip
Instead of implementing `onRedirect` we recommend implementing `getRedirectPath` instead as that will only enable the preview cookie for 
the post being previewed.
:::tip

The `onRedirect` gives you full access to the `req` and `res` objects. If you do need implement this function we recommend also implementing `getRedirectPath`.

:::caution
When handling redirects yourself, make sure to always append `-preview=true` to the end of the redirected URL.
:::caution

```ts
import { getPostTerms } from '@headstartwp/core';
import { previewHandler } from '@headstartwp/next';

export default async function handler(req, res) {
	return previewHandler(req, res, {
		onRedirect(req, res, previewData) {
			return res.redirect('/custom-path-preview-true');
		},
	});
}
```

### The `usePostLinkForRedirect` setting

The `preview.usePostLinkForRedirect` was added in `@headstartwp/next@1.3.3` and it tells the preview handler to use the actual post permalink to figure out where it should redirect to. With this setting, previewing a post will automatically redirect to a route in Next.js based on the permalink structure set in WordPress. As an example let's say you have a custom post type called `news` and its permalink structure is `/news/news-name`. If your Next.js URL structure strictly follows that pattern you would have a route at `pages/news/[...path].js`. Therefore HeadstartWP can infer the proper path to a preview request for a post of type `news`.

This becomes even more useful when you have a more complicated permalink structure, let's say your `news` post type adds the category name to the url such as `/news/political/news-name`. If both your Next.js project and WordPress are following the same permalink structure, no additional logic is required to get previews to work. Previously permalinks like this would require providing custom logic in `getRedirectPath`.

Note that by default, `draft` posts will not have a pretty permalink, instead, they have something like `domain.com/?p=id` so HeadstartWP adds a new rest field for all public post types called: `_tenup_preview_link` which will return a pretty permalink even for draft posts. This field will be used by the previewHandler for draft posts.

If you are overriding permalink in WordPress via filter you must ensure that draft posts have a fallback post name. e.g: 

```php
// adds category to the news permalink and prefix it with "newsroom"
add_filter(
	'post_type_link',
	function ( $post_link, $post ) {
		if ( 'news' !== $post->post_type ) {
			return $post_link;
		}

		// draft posts won't have `$post->post_name` set.
		$post_name = empty( $post->post_name ) ? sanitize_title( $post->post_title ) : $post->post_name;
		$post_name = empty( $post_name ) ? $post->ID : $post_name;

		$fallback = esc_url( home_url( sprintf( 'newsroom/%s', $post_name ) ) );

		$news_types = wp_get_post_terms( $post->ID, 'category', [ 'fields' => 'slugs' ] );

		if (
		is_wp_error( $news_types ) ||
		! is_array( $news_types ) ||
		! count( $news_types ) > 0
		) {
			return $fallback;
		}

		return esc_url( home_url( sprintf( 'newsroom/%s/%s', $news_types[0], $post_name ) ) );
	},
	10,
	2
);
```

You can also use a placeholder instead of manually handling post_name yourself e.g:

```php
$post_name = empty( $post->post_name ) ? '%postname%' : $post->post_name;
```

When building the permalink for draft posts the framework will automatically replace `%postname` or `%pagename%` with the post_name (based on the title) or a fallback to post id.

## FAQ

**After a while, the preview URL stops working**

The JWT token expires after 5 min by default, after this period, open another preview window from WordPress to preview the post. The Next.js preview cookie also last for only 5 minutes.

**I'm unable to preview a custom post type**

Make sure you defined the right `single` property when registering the custom post type. See [headless config docs](/learn/getting-started/headless-config/#customposttypes). The `single` property must match the route prefix for the custom post type.

**I have a custom authentication using the Authorization header, how can I use the preview functionality?**

Make sure you have HeadstartWP plugin >= 1.0.1, `@headstartwp/core` >= 1.3.1 and `@headstartwp/next`>= 1.3.1. Then in your `headstartwp.config.js` add the following config:

```js
module.exports = {
	// other configs.
	// ...

	preview: {
		alternativeAuthorizationHeader: true
	}
}
```

This will tell HeadstartWP to use an alternative header (`X-HeadstartWP-Authorization`) instead of the default `Authorization` header.