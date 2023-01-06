---
sidebar_position: 0
slug: /wordpress-integration/previews
---

# Previews

The preview feature requires the 10up's headless WordPress plugin installed. The preview functionality is built on top of [Next.js preview API](https://nextjs.org/docs/advanced-features/preview-mode). It uses a short-lived JWT token generated on the WordPress side that can only be used for previewing, this means it is not neecessary to set up a hardcoded secret between WP and Next.js.

In order for previews to work, make sure the frontend URL is entered in WP settings as per instructions in [Installing WordPress Plugin](/docs/getting-started/installing-wordpress-plugin).

The logic for generated the JWT token and redirecting to the preview endpoint can be seen [here](https://github.com/10up/headless/blob/develop/wp/tenup-headless-wp/includes/classes/Preview/preview.php).

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
- The token is sent alongside the post_type, post_id and a a boolean indicating whether the post being previewed is a revision or not. 
- The token is verify against the parameters and the token is used to fetch the post's draft/revision content.



## Usage

The Next.js project **must** expose a `api/preview` endpoint that uses the [previewHandler](/api/modules/10up_headless_next/#previewhandler).

```javascript
//src/pages/api/preview.js
import { previewHandler } from '@10up/headless-next';

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

That's all that is needed in order to enable WordPress preview.

While previewing the URL will not reflect the actual URL of the post, but instead it will contain the post id and a `-preview` suffix.

## FAQ

**After a while the preview URL stops working**

The JWT token expires after 5 min by default, after this period, open another preview window from WordPress to preview the post.

**I'm unable to preview a custom post type**

Make sure you defined the right `single` property when registering the custom post type. See [headless config docs](/docs/getting-started/headless-config/#customposttypes). The `single` property must match the route prefix for the custom post type.