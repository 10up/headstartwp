---
sidebar_label: Including Frontend JS with a Block
---

# Including Frontend JavaScript with a Block

Sometimes we need to include frontend JavaScript with a block. If it's only a small bit of CSS it's not a big issue to load that script on every page with the main frontend JavaScript bundle of the site.

However, as soon as you start to load larger libraries or a lot of custom JavaScript that is only needed whenever a specific block is present on the page it is bad for performance to always load that entire JS on every single page.

There are two ways we can solve this:

1. Use [dynamic imports (Webpack code splitting)](https://webpack.js.org/guides/code-splitting/)
2. Only enqueue block specific JS when the block is present on the page

In this guide, we are taking a look at the second option as it often is the easier and more robust one of the two.

## Only enqueueing block specific JS when the block is present on the page

To have a JavaScript file that only gets enqueued on the page if the block is present, we can define a `viewScript` in the `block.json` file. This `viewScript` can either be a relative file path to the JS file or a script handle that should get enqueued.

```json title="block.json"
{
	"apiVersion": 2,
	"name": "namespace/example",
	"title": "Example Block",
	"editorScript": "file:../../../dist/js/blocks/example/editor.js",
	// highlight-next-line
	"viewScript": "file:../../../dist/js/blocks/example/view.js"
}
```

This automatically takes the JS file that is located at the relative file path and registers it using the `wp_register_script` function. The script gets the handle `namespace-example-view-script`. The handle is generated using the block namespace, followed by the block name, with the suffix `-view-script` added at the end.

:::note
WordPress expects a file that is provided via a relative file path to also have a `.asset.php` file next to it with the script dependencies and generated version number. Both `@wordpress/scripts` and `10up-toolkit` do this automatically for you using the `@wordpress/dependency-extraction-webpack-plugin`.
:::note

If your script relies on additional non-WordPress dependencies like a 3rd party library that cannot be installed via NPM you can also handle the registration of the view script manually and only provide the script handle you registered to the `viewScript` in the `block.json` file.

```php
$asset_file_name    = 'view-script';
$asset_dependencies = ( include NAMESPACE_PATH . "dist/$asset_file_name.asset.php" );
wp_register_script(
	'my-custom-view-script-handle',
	THEME_URL . "dist/$asset_file_name.js",
	// highlight-next-line
	array_merge( $asset_dependencies['dependencies'], [ 'custom-dependency' ] ),
	$asset_dependencies['version'],
	true
);
```

```json title="block.json"
{
	"apiVersion": 2,
	"name": "namespace/example",
	"title": "Example Block",
	"editorScript": "file:../../../dist/js/blocks/example/editor.js",
	// highlight-next-line
	"viewScript": "my-custom-view-script-handle"
}
```

### Working with dynamic blocks

Out of the box, this mechanism works great for static blocks that store their markup in the Database. However, most of the blocks we are building at 10up get built as dynamic blocks, using the PHP `render_callback` to create the markup on the server.

In these instances, WordPress will not automatically enqueue the script for us. So we manually need to add the `wp_enqueue_script` function to our `render_callback`. In the [10up theme scaffold](https://github.com/10up/wp-scaffold/tree/trunk/themes/10up-theme) this has been abstracted away into the `markup.php` file located in the blocks folder.

```php title="blocks.php"
<?php
/**
 * Example Block Markup
 * @package tenup/theme
 */

// highlight-next-line
wp_enqueue_script('namespace-example-view-script');
?>

<section <?php echo get_block_wrapper_attributes(); ?>>
	<h2>Hello World!</h2>
</section>
```
