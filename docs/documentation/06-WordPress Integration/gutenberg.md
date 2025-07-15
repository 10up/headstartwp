---
slug: /wordpress-integration/gutenberg
---

# Gutenberg

The HeadstartWP Plugin enhances every block with two special attributes directly in the markup: `data-wp-block-name` and `data-wp-block`. The first holds the name of the block and the second holds all of the block attributes.

These data attributes can be used for matching blocks in `BlocksRenderer` and for accessing block's attributes directly in your React component.

## Available Filters

There are a few filters available that you can hook into.

### tenup_headless_wp_render_block_attrs

This filter allows you to filter the block attributes before serializing them into the markup. You can use this to include additional attributes that you might need on the front-end. For instance, you can add information for a post instead of just a post id to prevent making an extra HTTP request to get the data for a post.

```php
/**
 * Filter's out the block's attributes before serializing in the block markup.
 *
 * @param array $attrs The Block's Attributes
 * @param array $block The Block's schema
 * @param \WP_Block $block_instance The block's instance
 */
$block_attrs = apply_filters( 
    'tenup_headless_wp_render_block_attrs', 
    $block_attrs, 
    $block, 
    $block_instance 
);
```

### tenup_headless_wp_render_blocks_attrs_serialized

This filter is not as useful as the previous one but it allows you to filter the serialized attributes.

```php
/**
 * Filter's out the block's attributes after serialization
 *
 * @param string $encoded_attrs The block attributes serialized to a JSON string
 * @param array $attrs The Block's Attributes
 * @param array $block The Block's schema
 * @param \WP_Block $block_instance The block's instance
 */
$block_attrs_serialized = apply_filters(
    'tenup_headless_wp_render_blocks_attrs_serialized',
    wp_json_encode( $block_attrs ),
    $block_attrs,
    $block,
    $block_instance
);
```

### tenup_headless_wp_render_block_use_tag_processor

HeadstartWP will use the DomDocument API for parsing and enhancing the block markup by default. Since 1.0.7, it is possible to opt into the new `WP_Html_Tag_Processor` API via the `tenup_headless_wp_render_block_use_tag_processor`.

```php
add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );
```

In the next major release, usage of the DomDocument API will be removed in favor of `WP_Html_Tag_Processor` since it's easier to use and a core API. For most users this should not change anything, both APIs should yield the same result and the deprecation of the DomDocument API is merely for simplicity.

### tenup_headless_wp_render_block_markup

This filter is called after adding the data attributes but before returning the block's final markup. You can use this filter to perform any additional modifications to the block markup.

This filter is only called when using the DomDocument API (i.e - the filter `tenup_headless_wp_render_block_use_tag_processor` returns false).

```php
/**
 * Filter the block's DOMElement before rendering
 *
 * @param \DOMElement $root_node
 * @param string $html The original block markup
 * @param array $block The Block's schema
 * @param \WP_Block $block_instance The block's instance
 */
$root_node = apply_filters( 
    'tenup_headless_wp_render_block_markup', 
    $root_node, 
    $html, 
    $block, 
    $block_instance
);
```

### tenup_headless_wp_render_html_tag_processor_block_markup

This filter is called after adding the data attributes but before returning the block's final markup when the `WP_HTML_Tag_Processor` API is being used. You can use this filter to perform any additional modifications to the block markup.

This filter is only called when using the WP_HTML_Tag_Processor API (i.e - the filter `tenup_headless_wp_render_block_use_tag_processor` returns true).

```php
/**
 * Filter the block's before rendering
 *
 * @param \WP_HTML_Tag_Processor $doc
 * @param string $html The original block markup
 * @param array $block The Block's schema
 * @param \WP_Block $block_instance The block's instance
 */
$doc = apply_filters( 
    'tenup_headless_wp_render_html_tag_processor_block_markup', 
    $doc, 
    $html, 
    $block, 
    $block_instance
);
```

### tenup_headless_wp_ensure_image_dimensions

HeadstartWP can automatically add width and height attributes to any internal images in Gutenberg blocks that for some reason is missing width and height attributes to prevent layout shifts. This feature is disabled by default and must be enabled using the `tenup_headless_wp_ensure_image_dimensions` filter. When enabled, it works by:

1. Checking if the image already has width and height attributes
2. If not, attempting to get the image ID from the URL
3. Using WordPress core functions to add the dimensions and srcset attributes

This process is only applied to images hosted on your WordPress site and will be skipped for external images.

```php
/**
 * Filter to enable image dimension processing
 *
 * @param bool   $enable        Whether to enable adding dimensions, defaults to false
 * @param string $block_content The block content
 * @param array  $block        The block schema
 */
add_filter( 'tenup_headless_wp_ensure_image_dimensions', function( $enable, $block_content, $block ) {
    // Return true to enable the feature
    return true;
}, 10, 3 );
```

## Core Blocks CSS Loading Filters

:::warning
The handling of core blocks css requires HeadstartWP plugin version 1.2.0 or higher.
:::

HeadstartWP provides several filters to control how core block CSS is loaded and processed in your headless site. These filters allow you to customize the CSS loading behavior for optimal performance and styling control.

### tenup_headless_wp_enable_block_styles

This filter controls whether block styles should be processed and included in the REST API response. By default, block styles are only processed for requests that include a `slug` or `id` parameter.

**Parameters:**
- `$should_enable_block_styles` (bool) - Whether to enable block styles (default behavior)
- `$data` (WP_REST_Response) - The REST response object  
- `$post` (WP_Post) - The post object
- `$request` (WP_REST_Request) - The REST request object

```php
// Enable block styles for all requests
add_filter( 'tenup_headless_wp_enable_block_styles', '__return_true' );

// Enable block styles only for specific post types
add_filter( 'tenup_headless_wp_enable_block_styles', function( $should_enable, $data, $post, $request ) {
    // Only enable for pages and posts
    return in_array( $post->post_type, [ 'page', 'post' ] );
}, 10, 4 );

// Enable block styles based on request parameters
add_filter( 'tenup_headless_wp_enable_block_styles', function( $should_enable, $data, $post, $request ) {
    $params = $request->get_params();
    
    // Enable when specifically requested
    return $should_enable || isset( $params['include_styles'] );
}, 10, 4 );
```

### tenup_headless_wp_load_global_stylesheet

This filter controls whether to include the global WordPress stylesheet generated by the WordPress style engine. By default, HeadstartWP will include global inline styles when `wp_get_global_stylesheet()` is available.

**Parameters:**
- `$should_load_global_stylesheet` (bool) - Whether to load the global stylesheet (default: true when `wp_get_global_stylesheet()` exists)

```php
// Disable global stylesheet loading
add_filter( 'tenup_headless_wp_load_global_stylesheet', '__return_false' );

// Conditionally load global stylesheet
add_filter( 'tenup_headless_wp_load_global_stylesheet', function( $should_load ) {
    // Only load global stylesheet for specific post types
    if ( is_singular( 'page' ) ) {
        return true;
    }
    return false;
} );
```

### tenup_headless_wp_process_block_styles

This filter controls which blocks should have their CSS styles processed and included. By default, HeadstartWP only processes core WordPress blocks (blocks with names starting with `core/`).

**Parameters:**
- `$should_process` (bool) - Whether to process the block styles (default: true for core blocks)
- `$block` (array) - The block data

```php
// Process styles for all blocks
add_filter( 'tenup_headless_wp_process_block_styles', '__return_true' );

// Process styles for core blocks and custom blocks
add_filter( 'tenup_headless_wp_process_block_styles', function( $should_process, $block ) {
    $block_name = $block['blockName'] ?? '';
    
    // Process core blocks and custom plugin blocks
    return str_starts_with( $block_name, 'core/' ) || str_starts_with( $block_name, 'my-plugin/' );
}, 10, 2 );

// Only process specific core blocks
add_filter( 'tenup_headless_wp_process_block_styles', function( $should_process, $block ) {
    $block_name = $block['blockName'] ?? '';
    
    $allowed_blocks = [
        'core/paragraph',
        'core/heading',
        'core/image',
        'core/gallery',
        'core/columns',
        'core/column'
    ];
    
    return in_array( $block_name, $allowed_blocks );
}, 10, 2 );
```

### tenup_headless_wp_block_style_handle

This filter allows customization of the style handle used to look up block CSS files. By default, HeadstartWP converts block names like `core/paragraph` to style handles like `wp-block-paragraph`.

**Parameters:**
- `$handle` (string) - The block style handle (default: block name with 'core/' replaced by 'wp-block-')
- `$block` (array) - The block data

```php
// Customize style handles for custom blocks
add_filter( 'tenup_headless_wp_block_style_handle', function( $handle, $block ) {
    $block_name = $block['blockName'] ?? '';
    
    // Use custom handle for custom blocks
    if ( str_starts_with( $block_name, 'my-plugin/' ) ) {
        return str_replace( 'my-plugin/', 'my-custom-block-', $block_name );
    }
    
    return $handle;
}, 10, 2 );

// Map specific blocks to different style handles
add_filter( 'tenup_headless_wp_block_style_handle', function( $handle, $block ) {
    $block_name = $block['blockName'] ?? '';
    
    $custom_handles = [
        'core/gallery' => 'wp-block-gallery-enhanced',
        'core/image' => 'wp-block-image-custom',
        'core/video' => 'wp-block-video-responsive',
    ];
    
    return $custom_handles[ $block_name ] ?? $handle;
}, 10, 2 );
```

## How Block Styles Are Processed

When block styles are enabled, HeadstartWP automatically:

1. **Collects Global Styles**: Includes WordPress global stylesheet (`wp_get_global_stylesheet()`) if enabled
2. **Processes Core Block Supports**: Adds CSS for core block features and supports
3. **Loads Individual Block Styles**: Gathers CSS for each block type present on the page based on style handles
4. **Combines and Delivers**: Combines all styles into a single `block_styles` property in the REST API response

The resulting CSS is then available in your headless frontend through the `post.content.block_styles` property and can be rendered inline or processed as needed by your React components.

This system ensures that only the necessary CSS for the blocks actually used on each page is loaded, optimizing performance while maintaining full styling support for WordPress blocks.