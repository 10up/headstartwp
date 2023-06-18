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
 * @param string $encoded_attrs The serialized block's Attributes
 * @param array $attrs The Block's Attributes
 * @param array $block The Block's schema
 * @param \WP_Block $block_instance The block's instance
 */
$block_attrs_serialized = apply_filters(
    'tenup_headless_wp_render_blocks_attrs_serialized',
    esc_attr( wp_json_encode( $block_attrs ) ),
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