---
sidebar_position: 0
slug: /wordpress-integration/previews
---

# Previews

The preview feature requires the 10up's headless WordPress plugin installed. The preview functionality is built on top of [Next.js preview API](https://nextjs.org/docs/advanced-features/preview-mode). It uses a short-lived JWT token generated on the WordPress side that can only be used for previewing, this means it is not necessary to set up a hardcoded secret between WP and Next.js.

For previews to work, make sure the frontend URL is entered in WP settings as per instructions in [Installing WordPress Plugin](/learn/getting-started/installing-wordpress-plugin).

The logic for generating the JWT token and redirecting to the preview endpoint can be seen [here](https://github.com/10up/headstartwp/blob/develop/wp/tenup-headless-wp/includes/classes/Preview/preview.php).

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

The Next.js project **must** expose a `api/preview` endpoint that uses the [previewHandler](/api/modules/headstartwp_next/#previewhandler).

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

#### `onRedirect`

The `onRedirect` option allows you to customize the redirected URL that should handle the preview request. This can be useful if you have implemented a non-standard URL structure. For instance, if the permalink for your posts are `/%category%/%postname%/` you could create a `src/pages/[category]/[...path.js]` route to handle single post. However once you do that the `previewHandler` doesn't know how to redirect to that URL and as such you will have to provide your own redirect handling.

:::caution
When handling redirects yourself, make sure to always append `-preview=true` to the end of the redirected URL.
:::caution

```ts
import { getPostTerms } from '@headstartwp/core';
import { previewHandler } from '@headstartwp/next';

export default async function handler(req, res) {
	return previewHandler(req, res, {
		// add categorySlug and post slug to preview data
		preparePreviewData(req, res, post, previewData) {
			const terms = getPostTerms(post);
			if (Array.isArray(terms?.category) && terms.category.length > 0) {
				const [category] = terms.category;

				return { ...previewData, categorySlug: category.slug, slug: post.slug };
			}
			return { ...previewData };
		},
		onRedirect(req, res, previewData, defaultRedirect) {
			const { postType, id, slug, categorySlug } = previewData;

			if (postType === 'post' && typeof categorySlug === 'string') {
				return res.redirect(`/${categorySlug}/${id}/${slug || id}-preview=true`);
			}

			return defaultRedirect(req, res, previewData);
		},
	});
}
```

## FAQ

**After a while, the preview URL stops working**

The JWT token expires after 5 min by default, after this period, open another preview window from WordPress to preview the post.

**I'm unable to preview a custom post type**

Make sure you defined the right `single` property when registering the custom post type. See [headless config docs](/learn/getting-started/headless-config/#customposttypes). The `single` property must match the route prefix for the custom post type.