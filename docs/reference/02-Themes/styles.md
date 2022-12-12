---
sidebar_label: Styling
sidebar_position: 1
---

# How to properly include styles?

First of all the goal we aim for here is parity between the editor and the frontend of the site. The stylesheet that gets loaded on the frontend of the site should also get loaded in the editor. The expectation is that the markup matches between both environments.

## The main stylesheet

In order for our stylesheet to get loaded in the editor including all its variants like the Template Editor, Site Editor, and Widget Editor (some of which are already rendering the content in an iframe) we use the [`add_editor_style`](https://developer.wordpress.org/reference/functions/add_editor_style/) function.

```php
function theme_setup() {
 	// enables the support for editor styles
    add_theme_support( 'editor-styles' );

    // loads the actual stylesheet
    // The path provided is relative to the themes root directory
    // you can also pass a URL for external stylesheets like a font etc.
 	add_editor_style( 'dist/css/style.css' );
}
add_action( 'after_setup_theme', 'theme_setup' );
```

The stylesheets that get added via the `add_editor_style` function get automatically parsed by WordPress and get scoped to the `.editor-styles-wrapper` class. This means that you cannot target anything outside of the `.editor-styles-wrapper` in that stylesheet since core will override that. The parsed and transformed stylesheet then gets inlined in the editor.

:::tip
If you need to load custom fonts from an external source you also need to add a separate `add_editor_style` call for the stylesheet loading the font.
:::tip

<details>
<summary>Enqueueing order on the page:</summary>
<p>

Looking at the DOM we can see that the stylesheets get inlined in a particular order. It first loads the ones added via the `add_editor_style` function, followed by the inline styles generated from the values defined in [`theme.json`](./theme-json.md).

</p>
</details>

In cases where you need to load custom style overrides for the admin interface in the editor you can still do that with the `enqueue_block_editor_assets` hook.

## Block specific styles

If you have stylesheets that are specific to a particular block you **can** also add them via the `wp_enqueue_block_style` function that was introduced in WordPress 5.9. The stylesheets that you add here will also get loaded properly in all the various contexts where a block is being used. The only difference being that they are only loaded when the block is actually used.

```php
function theme_setup() {
    // Same args used for wp_enqueue_style().
    $args = [
        'handle' => 'my-theme-site-title',
        'src'    => get_theme_file_uri( 'assets/blocks/site-title.css' ),
    ];

    // Add "path" to allow inlining asset if the theme opts-in.
    $args['path'] = get_theme_file_path( 'assets/blocks/site-title.css' );

    // Enqueue asset.
    wp_enqueue_block_style( 'core/site-title', $args );
}
add_action( 'after_setup_theme', 'theme_setup' );
```

In order to actually only load the stylesheets for the blocks that are actually used on a page the theme also needs to opt into that behavior by hooking into the `should_load_separate_core_block_assets` filter.

```php
add_filter( 'should_load_separate_core_block_assets', '__return_true' );
```

## Inlining small assets

In some cases small stylesheets get loaded on WordPress sites. These stylesheets require the browser to make an additional request to get an asset, and while they benefit from caching, their small size doesn’t justify that extra request, and performance would improve if they were inlined.

To that end, an inlining mechanism was implemented. This is an opt-in feature, and can be handled on a per-stylesheet basis. Internally, only assets that have data for `path` defined get processed, so to opt-in, a stylesheet can add something like this:

```php
wp_style_add_data( $style_handle, 'path', $file_path );
```

When a page gets rendered, stylesheets that have opted-in to get inlined get added to an array. Their size is retrieved using a `filesize` call (which is why the `path` data is necessary), and the array is then ordered by ascending size (smaller to larger stylesheet). We then start inlining these assets by going from smallest to largest, until a 20kb limit is reached.

A filter is available to change that limit to another value, and can also be used to completely disable inlining.

To completely disable small styles inlining:

```php
add_filter( 'styles_inline_size_limit', '__return_zero' );
```

To change the total inlined styles limit to 50kb:

```php
add_filter( 'styles_inline_size_limit', function() {
    return 50000; // Size in bytes.
});
```

Inlining these styles happens by changing the `src` of the style to `false`, and then adding its contents as inline data. This way we avoid backwards-compatibility issues in themes and any additional styles attached to these stylesheets using `wp_add_inline_style` will still be printed.

:::note
Please note that if a stylesheet opts-in to get inlined, that is no guarantee that it will get inlined.

If for example on a page there are 30 stylesheets that are 1kb each, and they all opt-in to be inlined, then only 20 of them will be converted from `<link rel="stylesheet"/>` to `<style>` elements. When the 20th stylesheet gets inlined the 20kb limit is reached and the inlining process stops. The remaining 10 stylesheets will continue functioning like before and remain `<link>` elements.

If your theme opts-in to the separate block-styles, core block styles by default have `path` defined so they can all be inlined.
:::note

## Links

- [Block-styles loading enhancements in WordPress 5.8](https://make.wordpress.org/core/2021/07/01/block-styles-loading-enhancements-in-wordpress-5-8/)
- [Using multiple stylesheets per block](https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/)
