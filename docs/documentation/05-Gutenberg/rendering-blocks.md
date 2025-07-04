---
sidebar_label: Rendering Blocks
sidebar_position: 0
slug: /gutenberg/rendering-blocks
---

# Rendering Blocks

## Introduction

There are multiple approaches to block rendering

### Naive Approach

Simply output the generated markup "as is", using `dangerouslySetInnerHTML` or the safer `SafeHtml` component:

```jsx
// Using dangerouslySetInnerHTML (not recommended)
<div dangerouslySetInnerHTML={{ __html: content }} />

// Using SafeHtml (recommended)
import { SafeHtml } from '@headstartwp/core/react';
<SafeHtml html={content} />
```

### Blocks as JSON Approach

With this approach, there's some custom PHP logic that parses blocks on the PHP side of things and converts them to JSON to be included in the REST API (or GraphQL). 

This approach makes it very easy (and portable) to render blocks anywhere, but on the other hand, it forces the implementation of all supported blocks. Handling server-rendered blocks is also a problem.

In this approach, blocks are parsed on the Backend.

### Blocks as Markup Approach

Instead of simply outputting the generated markup "as is", it runs the block markup through an HTML parser (after sanitizing) and selectively (and progressively) replaces block markup with actual React components as needed.

This approach is the simplest way to render blocks as not all blocks need to be actual React components (e.g paragraphs, lists, etc). You only need to create React Components for very specific blocks such as Links, Images, and "dynamic blocks" such as accordion, etc. You can still ignore certain blocks if you want better control of supported blocks (both on the WP side and the front-end side).

In this approach, blocks are parsed on the Frontend.


### Which approach should you use?

The framework supports all of these approaches. However, it does not ship with a "blocks-to-rest" plugin. But nothing is stopping you from shipping your own.

Instead, it provides a React API for selectively choosing blocks to be replaced with React components and as we'll show in this article this approach works well for most content-focused websites and can even be implemented in React Native apps to power App screens fully curated by Gutenberg.


## The BlocksRenderer component

The `BlocksRenderer` component is the heart of the "HTML to React" approach. It receives arbitrary HTML markup, runs its content through wpKsesPost, and replaces markup with react component based on the child components passed to it. This approach is not tied to Gutenberg markup in any way, it can be used as a generic HTML-to-React conversion tool. Here's a simple example of how it works

```js
const MyLinkBlock = ({ domNode, children }) => {
    // get the html attributes from the dom node
    const { href, rel } = domNode.attribs;

    return (
        <MyFrameWorkSpecificLinkComponent href={href} rel={rel}>
            {children}
        </MyFrameWorkSpecificLinkComponent>
    );
};

export const Blocks = ({ html }) => {
    return (
        <BlocksRenderer html={html}>
            <MyLinkBlock tagName="a" classList="my-special-anchor" />
        </BlocksRenderer>
    );
};
```

In the example above, we're passing the HTML content directly to BlocksRenderer and we're specifying that any anchor tags with a class of "my-special-anchor" should be replaced with MyLinkBlock.

The MyLinkBlock then gets one special prop called domNode which is the DOM Node that's being replaced with a React component. You can use domNode to access attributes of the node such as href and rel in this case.

Alternatively, you can also specify a test function to match dom nodes, the example above could also have been written as shown below

```js
<MyLinkBlock 
  test={ 
        (node) => node.type === 'tag' 
               && node.name === 'a' 
               && node.attribs.class === 'my-special-anchor'
  } 
/>
```

There are a number of utility functions that make matching nodes and blocks specifically very easy as we'll see now.

### Matching blocks with isBlock

The isBlock function matches a DOM node by its tagName and optionally CSS classes.

```js
<BlocksRenderer html={html}>
     <MyCustomBlock
            test={(node) => isBlock(node, { tagName: 'div', classList: ['block-class-name'] })}
        />
</BlocksRenderer>
```

### Matching Blocks with isBlockByName

The isBlockByName matches a DOM node by its Gutenberg block name. This function requires the HeadstartWP plugin. The  plugin appends two special attributes to every block: `data-wp-block-name` and `data-wp-block-attrs`.

This is a very handy function as it makes it very easy to match any registered Gutenberg block.

```js
<BlocksRenderer html={html}>
     <MyCustomParagraphBlock
            test={(node) => isBlock(node, 'core/paragraph')}
        />
</BlocksRenderer>
```

## Core Blocks

HeadstartWP takes a distinctive approach to rendering core blocks by rendering them as markup "as-is" without replacing them with custom React components. This design philosophy ensures that core blocks maintain their intended functionality and styling while providing optimal performance.

### Why Render Core Blocks As-Is?

The framework's approach to core blocks is intentionally conservative. Rather than replacing every core block with a custom React component, HeadstartWP preserves the original markup generated by WordPress. This approach offers several advantages:

- **Performance**: No unnecessary JavaScript overhead for simple content blocks
- **Consistency**: Core blocks maintain their intended behavior and styling
- **Reliability**: Reduced risk of breaking changes when WordPress updates core blocks
- **Maintenance**: Less code to maintain and fewer custom components to update

### When to Consider Custom Components

While HeadstartWP renders most core blocks as markup, there are specific cases where custom React components are beneficial:

**Recommended for customization:**
- **Links** - For custom routing, tracking, or styling
- **Images** - For performance optimization, lazy loading, or responsive behavior

**Consider the impact before replacing:**
- **Paragraphs** - Usually better left as markup
- **Headings** - Rarely need custom components
- **Lists** - Simple markup is often sufficient
- **Quotes** - Custom styling can often be achieved with CSS

### Block Styles and Styling

HeadstartWP provides mechanisms to fully load the block styles generated by the block-editor into your Next.js application. This ensures that core blocks maintain their visual appearance without requiring custom React components.

The framework handles:
- Core block styles from WordPress
- Theme-specific block styles
- Custom block editor styles
- Responsive design considerations

### Alternative: Custom Blocks

If you find yourself needing to heavily customize core blocks, consider creating a custom block instead. This approach offers several benefits:

- **Separation of concerns**: Keep core blocks intact while adding custom functionality
- **Future-proof**: Your customizations won't be affected by WordPress core updates
- **Content editor experience**: Provide a tailored editing experience for your specific needs
- **Maintainability**: Easier to maintain and update custom functionality

### Best Practices

1. **Start with core blocks as-is** - Most content blocks work perfectly without customization
2. **Use CSS for styling** - Many visual customizations can be achieved with CSS alone
3. **Custom components for interactivity** - Only replace blocks that need custom JavaScript behavior
4. **Test thoroughly** - When you do replace core blocks, ensure all functionality is preserved
5. **Consider performance** - Each custom component adds JavaScript overhead

By following this approach, you can build performant headless WordPress sites that leverage the full power of Gutenberg while maintaining the flexibility to customize where truly needed.

## Loading Block Styles

WordPress handles block styles in multiple ways, and HeadstartWP provides robust mechanisms to ensure all block styles are properly loaded in your headless application. Understanding how WordPress manages CSS is crucial for maintaining visual consistency between your WordPress backend and Next.js frontend.

### How WordPress Handles Block CSS

WordPress manages block styles through several mechanisms:

1. **Global CSS**: Some CSS is globally loaded by WordPress (e.g., `block-library.css`)
2. **Conditional CSS**: Some CSS is conditionally loaded only when specific blocks are present on the page
3. **Dynamic CSS**: Some CSS is dynamically generated based on the blocks and their configurations on each page

Without proper handling, headless applications would miss these styles, leading to improperly styled blocks.

### The BlockLibraryStyles Component

HeadstartWP provides the `BlockLibraryStyles` component to load WordPress's global block library CSS into your Next.js application. This component fetches the `block-library.css` file from WordPress and injects it inline into your pages.

```jsx
import { BlockLibraryStyles } from '@headstartwp/next/rsc';

export default async function Layout({ children, params }) {
    return (
        <html>
            <head>
                {/* Passing params is only required when using multisite or polylang */}
                <BlockLibraryStyles params={await params} />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
```

#### How BlockLibraryStyles Works

The `BlockLibraryStyles` component:

1. **Fetches CSS from WordPress**: Makes a server-side request to WordPress to get the latest `block-library.css`
2. **Caches the result**: Caches the CSS to avoid repeated requests
3. **Inlines the styles**: Injects the CSS directly into the HTML document as inline styles
4. **Handles updates**: When you redeploy your application, the cache is refreshed with the latest styles, the cache is always refreshed every 24h.

This approach ensures that:
- CSS is bundled with your application (no external requests from the browser)
- Styles are always up-to-date with your WordPress version
- Performance is optimized through caching

### Dynamic Block Styles with `post.content.block_styles`

For page-specific and dynamically generated CSS, HeadstartWP extends the WordPress REST API to include a `block_styles` property in the content object. This property contains all the CSS required for the specific blocks on that page.

```jsx
import { BlocksRenderer } from '@headstartwp/core/react';

export default function PostContent({ post }) {
    const { content } = post;
    
    return (
        <article>
            {/* Render the blocks with dynamic styles */}
            <BlocksRenderer 
                html={content.rendered}
                blockStyles={content.block_styles}
            >
                {/* Your custom block components */}
            </BlocksRenderer>
        </article>
    );
}
```

#### What's Included in block_styles

The `block_styles` property includes:

1. **Global stylesheet**: WordPress's global stylesheet (`wp_get_global_stylesheet()`)
2. **Core block supports**: CSS for core block features and supports
3. **Block-specific styles**: CSS for each block type present on the page
4. **Theme styles**: Any theme-specific block styles
5. **Custom block styles**: Styles from custom blocks

#### How it works

The WordPress integration is handled by the `Gutenberg.php` class in the HeadstartWP plugin. This class automatically:

- **Extends the REST API**: Adds `block_styles` property to all public post types
- **Collects block styles**: Gathers WordPress global styles, core block supports, and individual block styles
- **Optimizes performance**: Only processes block styles when specifically requested (by slug or id)
- **Provides customization**: Offers multiple filters to control the behavior

The integration works seamlessly without any additional configuration, but you can customize its behavior using the available filters.

#### `tenup_headless_wp_enable_block_styles`

This filter allows the customization of whether block styles should be processed for a particular request. By default, block styles are only processed for requests that include a `slug` or `id` parameter.

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
    
    // Enable for preview requests or when specifically requested
    return $should_enable || isset( $params['preview'] ) || isset( $params['include_styles'] );
}, 10, 4 );
```

#### `tenup_headless_wp_load_global_stylesheet`

By default HeadstartWP will include the global inline styles generated by the WordPress style engine. You can disable it through this filter

```php
add_filter( 'tenup_headless_wp_load_global_stylesheet', '__return_false' );
```

#### `tenup_headless_wp_process_block_styles`

By default, HeadstartWP only processes loading styles for core blocks. This filter can be used to customize which blocks should have it's styles processed.

```php
add_filter( 'tenup_headless_wp_process_block_styles', function( $should_process, $block ) {
    // Only process core blocks
    return str_starts_with( $block['blockName'] ?? '', 'core/' );
}, 10, 2 );
```

#### Control Block Style Handles

This filter allows customization of the style handle used to look up block CSS files. By default, HeadstartWP converts block names like `core/paragraph` to style handles like `wp-block-paragraph`.

**Parameters:**
- `$handle` (string) - The block style handle (default: block name with 'core/' replaced by 'wp-block-')
- `$block` (array) - The block data

```php
// Customize style handles for specific blocks
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
        'core/gallery' => 'wp-block-gallery-custom',
        'core/image' => 'wp-block-image-enhanced',
    ];
    
    return $custom_handles[ $block_name ] ?? $handle;
}, 10, 2 );
```


### Performance Considerations

The block styles system is designed for optimal performance:

1. **Caching**: Both the `BlockLibraryStyles` component and the backend PHP code implement caching
2. **Conditional loading**: Block styles are only generated when specifically requested
3. **Inline delivery**: CSS is delivered inline, reducing HTTP requests
4. **Deduplication**: The system prevents duplicate styles from being included

### Best Practices for Block Styles

1. **Use BlockLibraryStyles globally**: Include it in your layout component to ensure global styles are always available
2. **Include block_styles conditionally**: Only include page-specific styles when rendering block content
3. **Cache appropriately**: Leverage the built-in caching mechanisms
4. **Test thoroughly**: Ensure all block styles render correctly in your headless application
5. **Monitor performance**: Keep an eye on CSS bundle sizes, especially for content-heavy sites

By leveraging these CSS loading mechanisms, your headless WordPress application will maintain perfect visual consistency with your WordPress backend while providing optimal performance for your users.

