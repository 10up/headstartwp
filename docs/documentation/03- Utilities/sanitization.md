---
slug: /utilities/sanitization
sidebar_label: Escaping & Sanitization
---

# Escaping & Sanitization
As you're probably aware, React won't render raw HTML by default. If you want to do so you must use [dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

This page describes some of the utility functions and components provided by the framework to help with escaping & sanitization when rendering raw markup.

## wpKsesPost

This function sanitizes HTML content with requirements similar to [wp_kses_post](https://developer.wordpress.org/reference/functions/wp_kses_post/). If you are rendering arbitrary HTML markup you should probably run the markup through this function first.

```jsx
import { wpKsesPost } from '@headstartwp/core';

const markup = { __html: wpKsesPost('<p>some raw html</p>') };
return <div dangerouslySetInnerHTML={markup} />;
```

## stripTags

This function simply strips any html tags from a string. This can be useful in contexts where you don't want any HTML to be rendered.

```jsx
import { stripTags } from '@headstartwp/core';

return <h1>{stripTags('this is a title <span>without a span</span>')}</h1>;
```

## BlocksRenderer

When using [BlocksRenderer](/learn/gutenberg/rendering-blocks) your markup already goes through `wpKsesPost` so there's nothing else you need to worry about.

## HtmlDecoder

Sometimes you might just want to decode some HTML entities without actually rendering any HTML tags. For this purpose you can use the `HtmlDecoder` component.

```jsx
import { HtmlDecoder } from '@headstartwp/core/react';

<h1>
    <HtmlDecoder html="Hello world! &#8211; foo bar &#8211;"/>
</h1>
```

## SafeHtml

The `SafeHtml` component provides an easy way to safely render HTML markup. It runs the markup through `wpKsesPost` just like `BlocksRenderer`.

```jsx
import { SafeHtml } from '@headstartwp/core/react';

<SafeHtml html="<div><p>hello world</p> div content</div>">
```

